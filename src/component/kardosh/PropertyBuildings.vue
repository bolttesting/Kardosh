<template>
  <div class="property-buildings space-y-6">
    <p
      v-if="buildings.length"
      class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
    >
      {{ buildings.length }} building{{ buildings.length === 1 ? '' : 's' }} in this master development — layouts, timelines, and escrow details from the developer catalogue.
    </p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <article
        v-for="building in buildings"
        :key="building.id"
        class="property-buildings__card rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden flex flex-col"
      >
        <div v-if="building.imageUrl" class="property-buildings__media relative aspect-[16/10] bg-slate-100 dark:bg-slate-800">
          <ProtectedPropertyImage
            fill
            :src="building.imageUrl"
            :alt="building.name"
            watermark-size="md"
            wrapper-class="absolute inset-0"
          />
        </div>

        <div class="p-5 md:p-6 flex flex-col flex-1">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <h5 class="text-lg font-semibold text-slate-900 dark:text-white">
              {{ building.name }}
            </h5>
            <span
              v-if="building.buildingType"
              class="inline-flex px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 capitalize"
            >
              {{ building.buildingType }}
            </span>
          </div>

          <p
            v-if="building.description"
            class="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed"
          >
            {{ building.description }}
          </p>

          <dl
            v-if="building.hasDetails"
            class="property-buildings__details mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4"
          >
            <div
              v-for="row in building.details"
              :key="row.label"
              :class="row.label === 'Escrow account' ? 'sm:col-span-2' : ''"
            >
              <dt class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {{ row.label }}
              </dt>
              <dd
                class="text-sm font-medium text-slate-900 dark:text-white mt-1 break-words"
                :class="row.label === 'Escrow account' ? 'font-mono text-[13px]' : ''"
              >
                {{ row.value }}
              </dd>
            </div>
          </dl>

          <p
            v-else-if="!building.description"
            class="text-sm text-slate-400 mt-4"
          >
            Additional building specifications will be published by the developer.
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import ProtectedPropertyImage from '@/component/kardosh/ProtectedPropertyImage.vue'

defineProps({
  buildings: { type: Array, default: () => [] },
})
</script>
