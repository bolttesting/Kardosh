<template>
  <RouterLink
    :to="`/developer/${developer.id}`"
    class="developer-card group flex flex-col overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg hover:-translate-y-0.5"
  >
    <div class="developer-card__head flex items-center gap-4 p-5 md:p-6 border-b border-slate-100 dark:border-slate-800">
      <div
        class="developer-card__logo shrink-0 size-16 md:size-[4.5rem] rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden"
      >
        <img
          v-if="developer.logo?.url"
          :src="developer.logo.url"
          :alt="developer.name"
          class="max-w-full max-h-full object-contain p-2"
          loading="lazy"
        />
        <span
          v-else
          class="text-2xl font-semibold text-primary"
        >{{ developer.name?.charAt(0) }}</span>
      </div>
      <div class="min-w-0 flex-1">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors truncate">
          {{ developer.name }}
        </h3>
        <p
          v-if="developer.projectCount"
          class="text-sm text-slate-500 dark:text-slate-400 mt-0.5"
        >
          {{ developer.projectCount }} active UAE project{{ developer.projectCount === 1 ? '' : 's' }}
        </p>
      </div>
    </div>

    <div class="flex flex-1 flex-col p-5 md:p-6 pt-4">
      <p
        v-if="developer.descriptionExcerpt"
        class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2"
      >
        {{ developer.descriptionExcerpt }}
      </p>
      <ul
        v-if="developer.regions?.length"
        class="mt-4 flex flex-wrap gap-1.5 list-none p-0 m-0"
      >
        <li
          v-for="(r, i) in developer.regions.slice(0, 3)"
          :key="i"
          class="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          {{ r }}
        </li>
        <li
          v-if="developer.regions.length > 3"
          class="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
        >
          +{{ developer.regions.length - 3 }}
        </li>
      </ul>
      <span class="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        View profile
        <ArrowUpRight class="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </span>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'

defineProps({
  developer: { type: Object, required: true },
})
</script>
