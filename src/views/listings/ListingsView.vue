<template>
  <Navbar nav-class="navbar-white" />

  <PageHero
    :title="heroTitle"
    :subtitle="heroSubtitle"
    :eyebrow="BRAND.name"
    :image="listingsHeroImage"
  />

  <section class="relative listings-page-section lg:py-16 py-12">
    <div class="container-fluid">
      <div class="listings-search-overlap p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md dark:shadow-gray-700 -mt-20 relative z-10 mb-10">
        <PropertySearchBar variant="listing" :show-tabs="false" :initial-mode="mode" />
      </div>

      <ListingGridSkeleton v-if="loading" :count="12" />
      <p v-else-if="filtered.length === 0" class="text-center text-slate-400 py-8">No properties match your search. Try different filters.</p>

      <Pagination
        v-else
        :items-per-page="12"
        :items="filtered"
        :card-variant="mode === 'off-plan' ? 'luxury' : 'default'"
        grid-class="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-7"
      />
    </div>
  </section>

  <Footer />
  <Switcher />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import PropertySearchBar from '@/component/kardosh/PropertySearchBar.vue'
import Pagination from '@/component/pagination.vue'
import ListingGridSkeleton from '@/component/kardosh/skeleton/ListingGridSkeleton.vue'
import { BRAND } from '@/config/brand'
import { PAGE_HERO_IMAGES } from '@/config/dubai-images'
import { useReelly } from '@/composables/useReelly'

const props = defineProps({
  mode: { type: String, required: true }, // off-plan | rent
})

const route = useRoute()
const { projects, rentListings, loading, loadProjects } = useReelly()

const listingsHeroImage = computed(() =>
  props.mode === 'rent' ? PAGE_HERO_IMAGES.rent : PAGE_HERO_IMAGES.offPlan
)

const heroTitle = computed(() =>
  props.mode === 'rent' ? 'Properties for rent' : 'Off-plan & ready to buy'
)
const heroSubtitle = computed(() =>
  props.mode === 'rent'
    ? 'Annual rent listings across the UAE on Kardosh Realty.'
    : 'New developments from leading UAE developers via Reelly.'
)

const sourceList = computed(() =>
  props.mode === 'rent' ? rentListings.value : projects.value
)

const filtered = computed(() => {
  let list = [...sourceList.value]
  const q = (route.query.q || '').toString().toLowerCase()
  const min = route.query.min ? Number(route.query.min) : null
  const max = route.query.max ? Number(route.query.max) : null
  const developer = (route.query.developer || '').toString()
  const bedrooms = (route.query.bedrooms || '').toString()

  if (q) {
    list = list.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.title?.toLowerCase().includes(q) ||
        p.developer?.toLowerCase().includes(q)
    )
  }
  if (min) list = list.filter((p) => (p.price || 0) >= min)
  if (max) list = list.filter((p) => (p.price || 0) <= max)
  if (developer) {
    list = list.filter((p) => p.developer?.toLowerCase().includes(developer.toLowerCase()))
  }
  if (bedrooms) {
    const want = Number(bedrooms)
    list = list.filter((p) => {
      const beds = p.bedrooms || []
      if (want >= 5) return beds.some((b) => b >= 5)
      return beds.includes(want)
    })
  }

  return list
})

onMounted(() => loadProjects())
</script>
