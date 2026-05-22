import { BRAND } from './brand'

export const SITE_TAGLINE = BRAND.tagline

export const CONTACT = {
  address: 'Office 1204, Index Tower, DIFC, Dubai, UAE',
  addressShort: 'DIFC, Dubai, UAE',
  email: BRAND.email,
  phone: BRAND.phone,
  phoneTel: BRAND.phoneTel,
  hours: 'Sun – Thu: 9am to 6pm',
}

export const GOOGLE_MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178509925!2d55.2744!3d25.1972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e27a403e6b57!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1!5m2!1sen!2sae'

export const CURRENCY = 'AED'
export const AREA_UNIT = 'sqm'

export const EMIRATES = [
  { value: 'DXB', label: 'Dubai' },
  { value: 'AUH', label: 'Abu Dhabi' },
  { value: 'SHJ', label: 'Sharjah' },
  { value: 'AJM', label: 'Ajman' },
  { value: 'RAK', label: 'Ras Al Khaimah' },
  { value: 'FUJ', label: 'Fujairah' },
  { value: 'UAQ', label: 'Umm Al Quwain' },
]

export function formatAed(amount) {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatArea(sqm) {
  return `${sqm} ${AREA_UNIT}`
}

/** Card/listing display — minimum price only (off-plan), annual rent for rentals */
export function formatStartingPrice(item) {
  if (!item) return 'Price on request'
  if (item.listingType === 'rent') {
    const p = Math.round(Number(item.price) || 0)
    return p ? `${formatAed(p)}/year` : 'Price on request'
  }
  const min = Math.round(Number(item.minPrice ?? item.price) || 0)
  const max = Math.round(Number(item.maxPrice) || 0)
  const start = min || max
  return start ? `From ${formatAed(start)}` : 'Price on request'
}

export const MIN_PRICE_OPTIONS = [
  { label: 'AED 500K', value: 500000 },
  { label: 'AED 1M', value: 1000000 },
  { label: 'AED 2M', value: 2000000 },
  { label: 'AED 5M', value: 5000000 },
  { label: 'AED 10M', value: 10000000 },
]

export const MAX_PRICE_OPTIONS = [
  { label: 'AED 2M', value: 2000000 },
  { label: 'AED 5M', value: 5000000 },
  { label: 'AED 10M', value: 10000000 },
  { label: 'AED 25M', value: 25000000 },
  { label: 'AED 50M+', value: 50000000 },
]

/** Single dropdown: min–max encoded as `"min-max"` (empty = any). */
export const BUDGET_RANGE_OPTIONS = [
  { label: 'Up to AED 2M', value: '0-2000000' },
  { label: 'AED 1M – 5M', value: '1000000-5000000' },
  { label: 'AED 2M – 10M', value: '2000000-10000000' },
  { label: 'AED 5M – 25M', value: '5000000-25000000' },
  { label: 'AED 10M – 50M', value: '10000000-50000000' },
  { label: 'AED 25M+', value: '25000000-' },
]

export const RENT_BUDGET_RANGE_OPTIONS = [
  { label: 'Up to AED 80K/yr', value: '0-80000' },
  { label: 'AED 80K – 200K/yr', value: '80000-200000' },
  { label: 'AED 120K – 350K/yr', value: '120000-350000' },
  { label: 'AED 200K+/yr', value: '200000-' },
]

export function parseBudgetRange(value) {
  if (!value) return { min: null, max: null }
  const [minPart, maxPart] = value.split('-')
  return {
    min: minPart ? Number(minPart) : null,
    max: maxPart ? Number(maxPart) : null,
  }
}

/** Rebuild dropdown value from legacy `?min=&max=` query params. */
export function budgetRangeFromQuery(min, max) {
  if (!min && !max) return null
  const minN = min ? Number(min) : null
  const maxN = max ? Number(max) : null
  if (minN && maxN) return `${minN}-${maxN}`
  if (minN) return `${minN}-`
  if (maxN) return `0-${maxN}`
  return ''
}

export const SEARCH_PLACEHOLDER = 'Area, community, or building'
