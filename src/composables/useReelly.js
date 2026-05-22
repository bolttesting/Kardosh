import { ref, computed } from 'vue'
import {
  fetchProjects,
  fetchProjectById,
  fetchProjectMarkers,
  fetchProjectUnits,
  fetchDeveloperById,
  fetchDeveloperLogos,
} from '@/services/reelly/client'
import { mapReellyProject, mapReellyMarker } from '@/services/reelly/mapProject'
import { enrichProjectsWithAmenities } from '@/services/reelly/enrichAmenities'
import { enrichLiveUnitsWithPlans } from '@/services/reelly/media'
import { properties as localProperties } from '@/component/data/data'
import { formatAed, formatArea } from '@/config/uae'
import { buildDeveloperStats, enrichDeveloperLogo, mapDeveloper } from '@/utils/mapDeveloper'

const projects = ref([])
const markers = ref([])
const developerLogos = ref([])
const loading = ref(false)
const markersLoading = ref(false)
const error = ref(null)

let projectsPromise = null
let markersPromise = null
let logosPromise = null

export async function loadProjects(force = false) {
  if (projects.value.length && !force) return projects.value
  if (projectsPromise && !force) return projectsPromise

  loading.value = true
  error.value = null

  projectsPromise = fetchProjects({ limit: '50', offset: '0' })
    .then(async ({ results }) => {
      projects.value = results.map((p) => mapReellyProject(p))
      void enrichProjectsWithAmenities(projects.value)
      return projects.value
    })
    .catch((e) => {
      error.value = e.message
      projects.value = []
      return []
    })
    .finally(() => {
      loading.value = false
    })

  return projectsPromise
}

export async function loadMarkers(force = false) {
  if (markers.value.length && !force) return markers.value
  if (markersPromise && !force) return markersPromise

  markersLoading.value = true
  markersPromise = fetchProjectMarkers({ limit: '50' })
    .then(({ results }) => {
      markers.value = results.map(mapReellyMarker).filter((m) => m.latitude && m.longitude)
      return markers.value
    })
    .catch(() => {
      markers.value = []
      return []
    })
    .finally(() => {
      markersLoading.value = false
    })

  return markersPromise
}

export async function loadDeveloperLogos(force = false) {
  if (developerLogos.value.length && !force) return developerLogos.value
  if (logosPromise && !force) return logosPromise

  logosPromise = fetchDeveloperLogos()
    .then(({ results }) => {
      developerLogos.value = results
      return results
    })
    .catch(() => {
      developerLogos.value = []
      return []
    })

  return logosPromise
}

export async function fetchFullProject(id) {
  const raw = await fetchProjectById(id, {
    language: 'en-us',
    preferred_currency: 'AED',
    preferred_area_unit: 'm2',
  })
  return mapReellyProject(raw, { full: true })
}

export async function fetchProjectUnitsSafe(projectId, typicalUnitsWithPlans = []) {
  try {
    const { results, count } = await fetchProjectUnits(projectId, { limit: '50' })
    const units = enrichLiveUnitsWithPlans(results, typicalUnitsWithPlans)
    return { units, count, restricted: false }
  } catch (e) {
    if (e.status === 403 || e.status === 401) {
      return {
        units: [],
        count: 0,
        restricted: true,
        message:
          'Live unit inventory requires a Reelly Business package. Typical units and brochures are still available below.',
      }
    }
    throw e
  }
}

export async function fetchDeveloperDetail(id) {
  const raw = await fetchDeveloperById(id)
  return mapDeveloper(raw)
}

export function findDeveloperIdByName(name) {
  if (!name) return null
  const match = developerLogos.value.find((d) => d.name === name)
  return match?.id ?? null
}

function normalizeDeveloper(name) {
  return (name || '').trim().toLowerCase()
}

function locationKey(location) {
  if (!location) return ''
  if (typeof location === 'string') return location.trim().toLowerCase()
  return [location.district, location.region, location.city]
    .filter(Boolean)
    .join('|')
    .toLowerCase()
}

/** Listings for property detail: same developer first, then same area, then other off-plan. */
export async function getRelatedListings({ currentId, developer, location, limit = 4 } = {}) {
  await loadProjects()

  const excludeId = Number(currentId)
  const devNorm = normalizeDeveloper(developer)
  const areaKey = locationKey(location)

  const pool = [
    ...projects.value,
    ...localProperties.filter((p) => p.listingType !== 'rent').map(mapLocal),
  ].filter((p) => p.id !== excludeId)

  const seen = new Set()
  const appendUntil = (related, candidates) => {
    for (const p of candidates) {
      if (related.length >= limit) break
      if (seen.has(p.id)) continue
      seen.add(p.id)
      related.push(p)
    }
    return related
  }

  let related = []
  let matchType = 'explore'

  if (devNorm) {
    const byDev = pool.filter((p) => normalizeDeveloper(p.developer) === devNorm)
    if (byDev.length) matchType = 'developer'
    related = appendUntil(related, byDev)
  }

  if (related.length < limit && areaKey) {
    const byArea = pool.filter((p) => locationKey(p.location) === areaKey)
    if (byArea.length && matchType !== 'developer') matchType = 'area'
    related = appendUntil(related, byArea)
  }

  if (related.length < limit) {
    related = appendUntil(related, pool)
  }

  return { items: related, matchType }
}

function mapLocal(p) {
  return {
    ...p,
    source: 'local',
    listingType: p.listingType || 'rent',
    priceLabel:
      p.listingType === 'rent'
        ? `${formatAed(p.price)}/year`
        : p.price
          ? `From ${formatAed(p.price)}`
          : 'Price on request',
    areaLabel: formatArea(p.square),
    title: p.name,
  }
}

export function useReelly() {
  const rentListings = computed(() =>
    localProperties.filter((p) => p.listingType === 'rent').map(mapLocal)
  )

  const saleListings = computed(() => [
    ...projects.value,
    ...localProperties.filter((p) => p.listingType !== 'rent').map(mapLocal),
  ])

  const developerStatsByName = computed(() => buildDeveloperStats(projects.value))

  /** Developers with active UAE projects, sorted by catalogue size */
  const uaeDevelopers = computed(() => {
    const stats = developerStatsByName.value
    return developerLogos.value
      .filter((d) => stats[d.name]?.projectCount > 0)
      .map((d) => enrichDeveloperLogo(d, stats))
      .sort((a, b) => b.projectCount - a.projectCount)
  })

  return {
    projects,
    markers,
    developerLogos,
    uaeDevelopers,
    loading,
    markersLoading,
    error,
    rentListings,
    saleListings,
    loadProjects,
    loadMarkers,
    loadDeveloperLogos,
  }
}

// Back-compat for existing imports
export { loadProjects as loadReellyProjects }

export async function getListingById(id) {
  const numericId = Number(id)
  const local = localProperties.find((p) => p.id === numericId)
  if (local) return mapLocal(local)

  try {
    return await fetchFullProject(numericId)
  } catch {
    await loadProjects()
    return projects.value.find((p) => p.id === numericId) || null
  }
}
