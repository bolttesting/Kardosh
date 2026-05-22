<template>
  <Navbar />
  <KardoshBreadcrumbs />

  <section class="relative md:pb-24 pb-16">
    <div class="container-fluid">
      <PropertyGallerySkeleton v-if="loading" class="mt-4" />
      <PropertyGallery
        v-else
        class="mt-4"
        :items="galleryItems"
        :fallback-url="fallbackImage"
      />
    </div>

    <div class="container-fluid md:mt-10 mt-8">
      <PropertyDetailContentSkeleton v-if="loading" />

      <div v-else-if="property" class="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
        <div class="xl:col-span-8 min-w-0">
          <!-- Description card -->
          <article
            class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
          >
            <header class="property-detail-header p-6 md:p-8 border-b border-slate-100 dark:border-slate-800">
              <span
                class="inline-block text-xs uppercase tracking-wider font-semibold text-primary dark:text-white bg-primary/10 dark:bg-white/10 px-3 py-1 rounded-full"
              >
                {{ property.listingType === 'off-plan' ? 'Off-Plan' : property.listingType }}
              </span>
              <h1 class="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight">
                {{ property.title || property.name }}
              </h1>
              <p v-if="locationLabel" class="text-slate-500 dark:text-slate-400 mt-2 flex items-start gap-2 text-sm">
                <MapPin class="size-4 text-primary shrink-0 mt-0.5" />
                {{ locationLabel }}
              </p>

              <ul class="flex flex-wrap gap-2 mt-5 list-none p-0 m-0">
                <li
                  v-if="property.square"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm"
                >
                  <Maximize class="size-4 text-primary" />
                  {{ property.areaLabel || formatArea(property.square) }}
                </li>
                <li
                  v-if="property.saleStatus"
                  class="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm capitalize"
                >
                  {{ property.saleStatus.replace(/_/g, ' ') }}
                </li>
                <li
                  v-if="property.constructionStatus"
                  class="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-sm capitalize"
                >
                  {{ property.constructionStatus.replace(/_/g, ' ') }}
                </li>
              </ul>
            </header>

            <div class="property-detail-body p-6 md:p-8 space-y-8">
              <!-- Developer + amenities -->
              <div
                v-if="property.developer || property.amenities?.length"
                class="pb-8 border-b border-slate-100 dark:border-slate-800"
              >
                <div v-if="property.developer" class="flex items-center gap-4">
                  <span
                    class="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
                  >
                    <Building2 class="size-6 text-primary" />
                  </span>
                  <div class="min-w-0">
                    <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Developer</p>
                    <RouterLink
                      v-if="developerLink"
                      :to="developerLink"
                      class="text-lg font-semibold text-primary hover:underline mt-0.5 block truncate"
                    >
                      {{ property.developer }}
                    </RouterLink>
                    <p v-else class="text-lg font-semibold text-slate-900 dark:text-white mt-0.5">
                      {{ property.developer }}
                    </p>
                  </div>
                </div>

                <PropertyAmenityGrid
                  v-if="property.amenities?.length"
                  :class="property.developer ? 'mt-6' : ''"
                  :amenities="property.amenities"
                />
              </div>

              <!-- Overview as FAQ -->
              <PropertyOverviewFaq
                v-if="overviewFaqItems.length"
                :items="overviewFaqItems"
              />
            </div>
          </article>

          <PropertyProjectStatus
            class="mt-10"
            :sale-status="property.saleStatus"
            :construction-status="property.constructionStatus"
            :completion-date="property.completionDate"
            :units-count="property.unitsCount"
            :available-unit-types="property.availableUnitTypes"
          />

          <!-- Details tabs -->
          <div class="mt-10">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Property details</h2>
            <ul class="property-detail-tabs flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700 list-none p-0 m-0">
            <li v-for="tab in visibleTabs" :key="tab.id">
              <button
                type="button"
                :class="activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-slate-500'"
                class="px-4 py-2 border-b-2 font-medium text-sm"
                @click="activeTab = tab.id"
              >
                {{ tab.label }}
              </button>
            </li>
          </ul>

          <!-- Units + floor plans -->
          <div v-show="activeTab === 'units'" class="mt-6">
            <p v-if="unitsRestricted" class="text-slate-700 bg-slate-100 dark:bg-slate-800/80 dark:text-slate-200 p-4 rounded-lg text-sm mb-6 border border-slate-200 dark:border-slate-700">
              {{ unitsMessage }}
            </p>

            <PropertyFloorPlanGroups
              v-if="floorPlanGroups.length || property.projectFloorPlanImages?.length"
              :groups="floorPlanGroups"
              :project-plans="property.projectFloorPlanImages || []"
              @open-plan="openPlanLightbox"
            />

            <div
              v-if="property.floorPlanPdfs?.length"
              class="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800"
            >
              <h5 class="font-semibold text-slate-900 dark:text-white mb-1">Building & layout PDFs</h5>
              <p class="text-sm text-slate-500 mb-4">Downloadable floor plans and layout brochures for this project.</p>
              <PropertyDocumentList :documents="property.floorPlanPdfs" />
            </div>

            <p
              v-if="!hasUnitsTabContent"
              class="text-slate-400"
            >No unit configurations listed for this project.</p>
          </div>

          <div v-show="activeTab === 'brochure'" class="mt-6">
            <p class="text-sm text-slate-500 mb-4">
              Official marketing brochure with project highlights, visuals, and key information.
            </p>
            <PropertyDocumentList
              :documents="property.marketingBrochure ? [property.marketingBrochure] : []"
              empty-text="No marketing brochure available for this project."
            />
          </div>

          <div v-show="activeTab === 'payment'" class="mt-6">
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
              Official developer payment structure for this project. Percentages show the split before and after handover where applicable.
            </p>
            <PropertyPaymentPlans :plans="property.paymentPlans" />
          </div>

          <div v-show="activeTab === 'documents'" class="mt-6">
            <p class="text-sm text-slate-500 mb-4">
              Additional project documents (excluding marketing brochure and floor plan PDFs).
            </p>
            <PropertyDocumentList
              :documents="property.documents || []"
              empty-text="No additional documents for this project."
            />
          </div>

          <div v-show="activeTab === 'buildings'" class="mt-6">
            <PropertyBuildings
              v-if="property.buildings?.length"
              :buildings="property.buildings"
            />
            <p v-else class="text-slate-400">No buildings listed for this project.</p>
          </div>

          <PropertyLocationSection
            :location="property.location"
            :location-label="locationLabel"
            :latitude="property.latitude"
            :longitude="property.longitude"
            :project-title="property.title || property.name"
          />
          </div>
        </div>

        <aside class="xl:col-span-4 mt-8 xl:mt-0 min-w-0">
          <div
            class="xl:sticky xl:top-28 xl:max-h-[calc(100vh-8rem)] xl:overflow-y-auto xl:overscroll-contain pb-2"
          >
            <PropertyEnquiryCard :property="property" />
          </div>
        </aside>
      </div>
    </div>

    <RelatedPropertiesSection
      v-if="property"
      :property-id="property.id"
      :developer="property.developer || ''"
      :location="property.location"
    />

    <VueEasyLightbox :visible="planLightboxOpen" :imgs="planLightboxUrls" :index="planLightboxIndex" @hide="planLightboxOpen = false" />
  </section>

  <Footer />
  <Switcher />
</template>

<script setup>
import { ref, computed, watch, onMounted, provide } from 'vue'
import { useRoute } from 'vue-router'
import { formatAed, formatArea } from '@/config/uae'
import { getListingById, fetchProjectUnitsSafe, loadDeveloperLogos, findDeveloperIdByName } from '@/composables/useReelly'
import PropertyGallery from '@/component/kardosh/PropertyGallery.vue'
import PropertyGallerySkeleton from '@/component/kardosh/skeleton/PropertyGallerySkeleton.vue'
import PropertyDetailContentSkeleton from '@/component/kardosh/skeleton/PropertyDetailContentSkeleton.vue'
import PropertyAmenityGrid from '@/component/kardosh/PropertyAmenityGrid.vue'
import PropertyEnquiryCard from '@/component/kardosh/PropertyEnquiryCard.vue'
import PropertyOverviewFaq from '@/component/kardosh/PropertyOverviewFaq.vue'
import PropertyFloorPlanGroups from '@/component/kardosh/PropertyFloorPlanGroups.vue'
import PropertyPaymentPlans from '@/component/kardosh/PropertyPaymentPlans.vue'
import PropertyProjectStatus from '@/component/kardosh/PropertyProjectStatus.vue'
import PropertyBuildings from '@/component/kardosh/PropertyBuildings.vue'
import PropertyDocumentList from '@/component/kardosh/PropertyDocumentList.vue'
import PropertyLocationSection from '@/component/kardosh/PropertyLocationSection.vue'
import RelatedPropertiesSection from '@/component/kardosh/RelatedPropertiesSection.vue'
import { groupFloorPlansByBedroom } from '@/utils/groupFloorPlans'
import { parseOverviewToFaq } from '@/utils/parseOverviewFaq'
import Navbar from '@/component/navbar.vue'
import KardoshBreadcrumbs from '@/component/kardosh/KardoshBreadcrumbs.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import { Maximize, MapPin, Building2 } from 'lucide-vue-next'

import { DUBAI_PROPERTY_FALLBACK } from '@/config/dubai-images'

const route = useRoute()
const property = ref(null)
const loading = ref(true)

const breadcrumbLabel = computed(
  () => property.value?.title || property.value?.name || 'Property'
)
provide('breadcrumbLabel', breadcrumbLabel)
const activeTab = ref('units')
const liveUnits = ref([])
const unitsRestricted = ref(false)
const unitsMessage = ref('')

const planLightboxOpen = ref(false)
const planLightboxUrls = ref([])
const planLightboxIndex = ref(0)

const allTabs = [
  { id: 'units', label: 'Units & floor plans' },
  { id: 'brochure', label: 'Marketing brochure' },
  { id: 'payment', label: 'Payment plans' },
  { id: 'documents', label: 'Documents' },
  { id: 'buildings', label: 'Buildings' },
]

const galleryItems = computed(() => {
  if (property.value?.gallery?.length) return property.value.gallery
  if (property.value?.images?.length) {
    return property.value.images.map((i) => ({
      url: i.url,
      group: i.group || 'cover',
      label: i.label || i.group || 'Photo',
    }))
  }
  if (property.value?.detail?.length) {
    return property.value.detail.map((url, idx) => ({
      url,
      group: 'cover',
      label: idx === 0 ? 'Cover' : `Photo ${idx + 1}`,
    }))
  }
  return []
})

const fallbackImage = computed(() => property.value?.image || DUBAI_PROPERTY_FALLBACK)

const hasUnitsTabContent = computed(() => {
  if (!property.value) return false
  return (
    floorPlanGroups.value.length > 0 ||
    (property.value.projectFloorPlanImages?.length ?? 0) > 0 ||
    (property.value.floorPlanPdfs?.length ?? 0) > 0 ||
    displayUnits.value.length > 0
  )
})

const visibleTabs = computed(() => {
  if (!property.value) return allTabs
  return allTabs.filter((tab) => {
    if (tab.id === 'brochure') return !!property.value.marketingBrochure
    if (tab.id === 'documents') return (property.value.documents?.length ?? 0) > 0
    if (tab.id === 'buildings') return (property.value.buildings?.length ?? 0) > 0
    if (tab.id === 'payment') return (property.value.paymentPlans?.length ?? 0) > 0
    if (tab.id === 'units') return hasUnitsTabContent.value
    return true
  })
})

const overviewFaqItems = computed(() => {
  if (property.value?.overviewFaq?.length) return property.value.overviewFaq
  if (property.value?.overview) return parseOverviewToFaq(property.value.overview)
  return []
})

const locationLabel = computed(() => {
  const loc = property.value?.location
  if (!loc) return property.value?.name?.includes(',') ? property.value.name.split(',').slice(1).join(',').trim() : null
  if (typeof loc === 'string') return loc
  return [loc.district, loc.region, loc.city, loc.country].filter(Boolean).join(', ') || null
})

const displayUnits = computed(() => {
  if (liveUnits.value.length) {
    return liveUnits.value.map((u, i) => ({
      key: u.id || `live-${i}`,
      title: u.unit_number ? `Unit ${u.unit_number}` : `Unit ${i + 1}`,
      subtitle: [u.bedrooms != null ? `${u.bedrooms} BR` : null, u.unit_type].filter(Boolean).join(' · '),
      priceText: u.price ? formatAed(Math.round(u.price)) : null,
      fromPriceAed: u.price != null ? Math.round(Number(u.price)) : null,
      toPriceAed: u.price != null ? Math.round(Number(u.price)) : null,
      meta: [
        u.floor != null ? `Floor ${u.floor}` : null,
        u.size ? formatArea(Math.round(u.size)) : null,
        u.status ? u.status.replace(/_/g, ' ') : null,
      ].filter(Boolean),
      floorPlans: u.floorPlans || [],
      bedrooms: u.bedrooms,
      unitType: u.unit_type,
    }))
  }

  const typical = property.value?.typicalUnitsWithPlans || []
  return typical.map((u) => ({
    key: u.id,
    title: `${u.bedrooms ?? '—'} BR · ${u.unitType || 'Unit'}`,
    subtitle:
      u.minSize || u.maxSize
        ? `${u.minSize ? Math.round(u.minSize) : '—'} – ${u.maxSize ? Math.round(u.maxSize) : '—'} sqm`
        : null,
    priceText:
      u.fromPriceAed || u.toPriceAed
        ? `${formatAed(u.fromPriceAed || 0)}${u.toPriceAed && u.toPriceAed !== u.fromPriceAed ? ` – ${formatAed(u.toPriceAed)}` : ''}`
        : null,
    fromPriceAed: u.fromPriceAed != null ? Math.round(Number(u.fromPriceAed)) : null,
    toPriceAed: u.toPriceAed != null ? Math.round(Number(u.toPriceAed)) : null,
    meta: [],
    floorPlans: u.floorPlans || [],
    bedrooms: u.bedrooms,
    unitType: u.unitType,
  }))
})

const floorPlanGroups = computed(() => groupFloorPlansByBedroom(displayUnits.value))

watch(visibleTabs, (tabs) => {
  if (!tabs.some((t) => t.id === activeTab.value)) {
    activeTab.value = tabs[0]?.id ?? 'units'
  }
})

const developerLink = computed(() => {
  const id = findDeveloperIdByName(property.value?.developer)
  return id ? `/developer/${id}` : null
})

function openPlanLightbox(plans, index) {
  planLightboxUrls.value = plans.map((p) => p.url)
  planLightboxIndex.value = index
  planLightboxOpen.value = true
}

onMounted(async () => {
  await loadDeveloperLogos()
  property.value = await getListingById(route.params.id)

  if (property.value?.source === 'reelly') {
    const typical = property.value.typicalUnitsWithPlans || []
    const unitsResult = await fetchProjectUnitsSafe(route.params.id, typical)
    liveUnits.value = unitsResult.units
    unitsRestricted.value = unitsResult.restricted
    unitsMessage.value = unitsResult.message || ''
  }

  loading.value = false
})
</script>
