<template>
  <div class="container-fluid lg:mt-24 mt-16 home-section-compact scroll-mt-24">
    <div class="max-w-3xl mx-auto text-center pb-6 md:pb-8">
      <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Curated catalogue</p>
      <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-slate-900 dark:text-white mt-3">
        Featured off-plan projects
      </h3>
      <p class="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Hand-picked Dubai developments for international investors — live data via Reelly.
      </p>
    </div>

    <div v-if="reellyLoading" class="mt-6 md:mt-8">
      <ListingGridSkeleton :count="8" />
    </div>
    <p v-else-if="reellyError" class="text-center text-slate-600 dark:text-slate-300 text-sm">{{ reellyError }}</p>

    <template v-else>
      <!-- Mobile / tablet: swipe instead of long vertical stack -->
      <div class="lg:hidden kardosh-mobile-carousel featured-offplan-carousel">
        <button
          type="button"
          class="kardosh-mobile-carousel__nav kardosh-mobile-carousel__nav--prev featured-offplan-carousel__nav--prev"
          aria-label="Previous featured projects"
        >
          <ChevronLeft class="size-5" aria-hidden="true" />
        </button>

        <Swiper
          :modules="modules"
          :slides-per-view="1.08"
          :space-between="14"
          :slides-per-group="1"
          :breakpoints="carouselBreakpoints"
          :watch-overflow="true"
          :navigation="{
            prevEl: '.featured-offplan-carousel__nav--prev',
            nextEl: '.featured-offplan-carousel__nav--next',
          }"
          :pagination="{ el: '.featured-offplan-carousel__pagination', clickable: true }"
          class="kardosh-mobile-carousel__swiper featured-offplan-carousel__swiper"
        >
          <SwiperSlide v-for="(item, index) in displayedMobile" :key="`featured-mobile-${item.id}-${index}`">
            <PropertyListingCard :item="item" variant="luxury" />
          </SwiperSlide>
        </Swiper>

        <button
          type="button"
          class="kardosh-mobile-carousel__nav kardosh-mobile-carousel__nav--next featured-offplan-carousel__nav--next"
          aria-label="Next featured projects"
        >
          <ChevronRight class="size-5" aria-hidden="true" />
        </button>

        <div class="kardosh-mobile-carousel__pagination featured-offplan-carousel__pagination" />
      </div>

      <!-- Desktop: grid -->
      <div class="hidden lg:grid xl:grid-cols-4 lg:grid-cols-4 gap-6 lg:gap-7 mt-10 lg:mt-12">
        <PropertyListingCard
          v-for="(item, index) in displayed"
          :key="`featured-${item.source}-${item.id}-${index}`"
          :item="item"
          variant="luxury"
        />
      </div>
    </template>

    <p class="text-center mt-6 md:mt-8 home-cta-strip">
      <RouterLink to="/off-plan" class="btn bg-primary hover:bg-primary-dark text-white rounded-md">View all off-plan</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import { useReelly } from '@/composables/useReelly'
import PropertyListingCard from '@/component/kardosh/PropertyListingCard.vue'
import ListingGridSkeleton from '@/component/kardosh/skeleton/ListingGridSkeleton.vue'
import { HOME_PROPERTY_CAROUSEL, toSwiperBreakpoints } from '@/config/home-carousels'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const MOBILE_SLIDE_COUNT = 6
const DESKTOP_COUNT = 8

const modules = [Navigation, Pagination]
const carouselBreakpoints = toSwiperBreakpoints(HOME_PROPERTY_CAROUSEL)

const { loading: reellyLoading, error: reellyError, projects, loadProjects } = useReelly()

onMounted(() => loadProjects())

const displayed = computed(() => projects.value.slice(0, DESKTOP_COUNT))
const displayedMobile = computed(() => projects.value.slice(0, MOBILE_SLIDE_COUNT))
</script>
