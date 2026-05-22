<template>
  <div class="container-fluid lg:mt-24 mt-16">
    <div class="max-w-3xl mx-auto text-center pb-8">
      <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Curated catalogue</p>
      <h3 class="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold text-slate-900 dark:text-white mt-3">
        Featured off-plan projects
      </h3>
      <p class="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Hand-picked Dubai developments for international investors — live data via Reelly.
      </p>
    </div>

    <div v-if="reellyLoading" class="mt-8">
      <ListingGridSkeleton :count="8" />
    </div>
    <p v-else-if="reellyError" class="text-center text-slate-600 dark:text-slate-300 text-sm">{{ reellyError }}</p>

    <div v-else class="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-10 lg:mt-12 gap-6 lg:gap-7">
      <PropertyListingCard
        v-for="(item, index) in displayed"
        :key="`${item.source}-${item.id}-${index}`"
        :item="item"
        variant="luxury"
      />
    </div>

    <p class="text-center mt-8">
      <RouterLink to="/off-plan" class="btn bg-primary hover:bg-primary-dark text-white rounded-md">View all off-plan</RouterLink>
    </p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useReelly } from '@/composables/useReelly'
import PropertyListingCard from '@/component/kardosh/PropertyListingCard.vue'
import ListingGridSkeleton from '@/component/kardosh/skeleton/ListingGridSkeleton.vue'

const { loading: reellyLoading, error: reellyError, projects, loadProjects } = useReelly()

onMounted(() => loadProjects())

const displayed = computed(() => projects.value.slice(0, 8))
</script>
