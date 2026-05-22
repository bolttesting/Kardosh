import { DUBAI_PROPERTY_FALLBACK } from '@/config/dubai-images'
import { formatAed, formatArea } from '@/config/uae'
import { parseOverviewToFaq } from '@/utils/parseOverviewFaq'
import { collectProjectMedia } from './media'
import { normalizePaymentPlans } from '@/utils/parsePaymentPlans'
import { normalizeBuildings } from '@/utils/parseBuildings'

function locationLabel(location = {}) {
  if (typeof location === 'string') return location
  const parts = [location.district, location.region, location.city, location.country].filter(Boolean)
  return parts.length ? parts.join(', ') : 'UAE'
}

function priceLabel(minPrice, maxPrice) {
  const min = Math.round(Number(minPrice) || 0)
  const max = Math.round(Number(maxPrice) || 0)
  if (!min && !max) return 'Price on request'
  return `From ${formatAed(min || max)}`
}

/** Reelly list endpoint omits amenities; detail includes `project_amenities`. */
export function extractProjectAmenities(project) {
  const raw = project?.project_amenities ?? project?.amenities ?? []
  if (!Array.isArray(raw)) return []
  return raw
    .map((a) => {
      if (typeof a === 'string') return a
      return a?.amenity?.name ?? a?.name ?? a?.title ?? null
    })
    .filter(Boolean)
}

export function mapReellyProject(project, { full = false } = {}) {
  const minPrice = project.min_price
  const maxPrice = project.max_price
  const square = Math.round(Number(project.min_size) || Number(project.max_size) || 0)
  const developerName =
    typeof project.developer === 'string'
      ? project.developer
      : project.developer?.name

  const amenities = extractProjectAmenities(project)

  const mapped = {
    id: project.id,
    slug: project.slug_name,
    image: project.cover_image?.url || DUBAI_PROPERTY_FALLBACK,
    name: `${project.name}, ${locationLabel(project.location)}`,
    title: project.name,
    square,
    beds: null,
    baths: null,
    price: Math.round(Number(minPrice) || Number(maxPrice) || 0),
    minPrice: Math.round(Number(minPrice) || 0),
    maxPrice: Math.round(Number(maxPrice) || 0),
    priceLabel: priceLabel(minPrice, maxPrice),
    rating: 5,
    source: 'reelly',
    listingType: 'off-plan',
    developer: developerName,
    developerId: typeof project.developer === 'object' ? project.developer?.id : null,
    saleStatus: project.sale_status,
    constructionStatus: project.construction_status || project.status,
    completionDate: project.completion_date,
    overview: project.overview || project.short_description || '',
    bedrooms: (project.typical_units || []).map((u) => u.bedrooms).filter((b) => b != null),
    amenities,
    areaLabel: square ? formatArea(square) : '—',
    location: project.location,
    latitude: project.location?.latitude,
    longitude: project.location?.longitude,
    detail: project.cover_image?.url ? [project.cover_image.url] : [],
    _raw: project,
  }

  if (full) {
    const media = collectProjectMedia(project)
    mapped.media = media
    mapped.gallery = media.gallery
    mapped.images = media.images
    mapped.marketingBrochure = media.marketingBrochure
    mapped.floorPlanPdfs = media.floorPlanPdfs
    mapped.documents = media.documents
    mapped.typicalUnitsWithPlans = media.typicalUnitsWithPlans
    mapped.projectFloorPlanImages = media.projectFloorPlans
    mapped.amenities = amenities
    mapped.buildings = normalizeBuildings(project.buildings, {
      areaUnit: project.area_unit || 'm2',
    })
    mapped.typicalUnits = project.typical_units || []
    mapped.paymentPlans = normalizePaymentPlans(project.payment_plans)
    mapped.overviewFaq = parseOverviewToFaq(mapped.overview)
    mapped.maxSize = project.max_size
    mapped.minSize = project.min_size
    mapped.priceCurrency = project.price_currency
    mapped.areaUnit = project.area_unit
    mapped.unitsCount = project.units_count ?? null
    mapped.availableUnitTypes = project.available_unit_types || []
    mapped.updatedAt = project.modified || project.updated || null
  }

  return mapped
}

export function mapReellyMarker(marker) {
  return {
    id: marker.id,
    name: marker.name,
    latitude: marker.location?.latitude,
    longitude: marker.location?.longitude,
    location: marker.location,
    image: marker.cover_image?.url,
    minPrice: marker.min_price,
    saleStatus: marker.sale_status,
    developer: typeof marker.developer === 'object' ? marker.developer?.name : marker.developer,
  }
}
