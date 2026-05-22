<template>
  <section class="lg:mt-24 mt-16" aria-labelledby="most-sold-off-plan-heading">
    <div class="container-fluid">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Investor favourites</p>
        <h2
          id="most-sold-off-plan-heading"
          class="text-3xl md:text-4xl lg:text-[2.5rem] font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
        >
          Most sold off-plan properties
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          Top-performing developments from our live catalogue — ranked by sale status, availability, and investor demand.
        </p>
      </div>

      <div v-if="loading" class="mt-10 lg:mt-12">
        <ListingGridSkeleton :count="8" />
      </div>

      <p
        v-else-if="error"
        class="text-center text-slate-600 dark:text-slate-300 text-sm mt-10"
      >
        {{ error }}
      </p>

      <p
        v-else-if="!displayed.length"
        class="text-center text-slate-500 dark:text-slate-400 mt-10 py-12 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700"
      >
        Off-plan highlights will appear here once the catalogue loads.
      </p>

      <div
        v-else
        class="mt-10 lg:mt-12 grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-7"
      >
        <PropertyListingCard
          v-for="(item, index) in displayed"
          :key="`most-sold-${item.id}-${index}`"
          :item="item"
          :badge="demandBadge(item)"
          variant="luxury"
        />
      </div>

      <p class="text-center mt-10">
        <RouterLink
          to="/off-plan"
          class="btn bg-primary hover:bg-primary-dark text-white rounded-lg inline-flex items-center justify-center gap-2 px-8"
        >
          View all off-plan
          <ArrowRight class="size-4" aria-hidden="true" />
        </RouterLink>
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import { useReelly } from '@/composables/useReelly'
import PropertyListingCard from '@/component/kardosh/PropertyListingCard.vue'
import ListingGridSkeleton from '@/component/kardosh/skeleton/ListingGridSkeleton.vue'
import { demandBadge, pickMostSoldOffPlan } from '@/utils/offPlanRanking'

const ROWS = 2
const COLS_XL = 4
const DISPLAY_COUNT = ROWS * COLS_XL

const { loading, error, projects, loadProjects } = useReelly()

const displayed = computed(() => {
  const featuredIds = projects.value.slice(0, 8).map((p) => p.id)
  return pickMostSoldOffPlan(projects.value, {
    limit: DISPLAY_COUNT,
    excludeIds: featuredIds,
  })
})

onMounted(() => loadProjects())
</script>
