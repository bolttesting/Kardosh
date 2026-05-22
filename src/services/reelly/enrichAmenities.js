import { fetchProjectById } from './client'
import { extractProjectAmenities } from './mapProject'

const amenityCache = new Map()

async function runPool(items, worker, concurrency = 8) {
  let index = 0
  async function next() {
    while (index < items.length) {
      const i = index++
      await worker(items[i])
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, next))
}

/**
 * List `/projects` responses omit `project_amenities`; fetch detail per project.
 * Mutates listing objects in place and caches by project id for the session.
 */
export async function enrichProjectsWithAmenities(projects, { concurrency = 8 } = {}) {
  const reelly = projects.filter((p) => p?.id && p.source === 'reelly')
  if (!reelly.length) return

  for (const p of reelly) {
    const cached = amenityCache.get(p.id)
    if (cached?.length) p.amenities = cached
  }

  const pending = reelly.filter((p) => !p.amenities?.length)
  if (!pending.length) return

  await runPool(
    pending,
    async (listing) => {
      try {
        const raw = await fetchProjectById(listing.id, {
          language: 'en-us',
          preferred_currency: 'AED',
          preferred_area_unit: 'm2',
        })
        const amenities = extractProjectAmenities(raw)
        amenityCache.set(listing.id, amenities)
        listing.amenities = amenities
      } catch {
        amenityCache.set(listing.id, [])
        listing.amenities = []
      }
    },
    concurrency
  )
}
