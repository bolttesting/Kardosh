<template>
  <section class="lg:mt-24 mt-16" aria-labelledby="trusted-partners-heading">
    <div class="container-fluid">
      <div
        class="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 p-6 md:p-10 lg:p-12"
      >
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div class="lg:col-span-4 lg:sticky lg:top-28">
            <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Trusted partners</p>
            <h2
              id="trusted-partners-heading"
              class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
            >
              Featured developers
            </h2>
            <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
              Browse off-plan inventory from established UAE developers — live project data on our
              Reelly-powered catalogue.
            </p>

            <ul class="mt-6 space-y-3.5" role="list">
              <li
                v-for="point in TRUST_POINTS"
                :key="point"
                class="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300"
              >
                <span
                  class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  <Check class="size-3.5 stroke-[2.5]" />
                </span>
                {{ point }}
              </li>
            </ul>

            <div
              v-if="!loading && catalogStats.developers > 0"
              class="mt-8 flex flex-wrap gap-3"
            >
              <div
                class="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900 px-4 py-3 min-w-[7rem]"
              >
                <p class="text-2xl font-semibold text-slate-900 dark:text-white tabular-nums">
                  {{ catalogStats.developers }}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Active developers</p>
              </div>
              <div
                class="rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900 px-4 py-3 min-w-[7rem]"
              >
                <p class="text-2xl font-semibold text-slate-900 dark:text-white tabular-nums">
                  {{ catalogStats.projects }}+
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Off-plan projects</p>
              </div>
            </div>

            <div class="mt-8 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
              <RouterLink
                to="/developers"
                class="btn bg-primary hover:bg-primary-dark text-white rounded-lg inline-flex items-center justify-center gap-2 px-6"
              >
                View all developers
                <ArrowRight class="size-4" aria-hidden="true" />
              </RouterLink>
              <RouterLink
                to="/off-plan"
                class="btn border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary dark:hover:text-primary rounded-lg inline-flex items-center justify-center px-6"
              >
                Browse off-plan
              </RouterLink>
            </div>
          </div>

          <div class="lg:col-span-8 min-w-0">
            <div
              class="flex items-center justify-between gap-4 mb-5 pb-5 border-b border-slate-200/80 dark:border-slate-700/80"
            >
              <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Layers class="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>Reelly-powered catalogue</span>
              </div>
              <span
                v-if="!loading && featured.length"
                class="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500"
              >
                Top {{ featured.length }} partners
              </span>
            </div>

            <DeveloperGridSkeleton
              v-if="loading"
              :count="9"
              compact
              grid-class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            />

            <p
              v-else-if="!featured.length"
              class="text-center text-slate-500 dark:text-slate-400 py-16 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700"
            >
              Developer catalogue loading soon — check back shortly.
            </p>

            <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <RouterLink
                v-for="dev in featured"
                :key="dev.id"
                :to="`/developer/${dev.id}`"
                class="group flex items-center gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 md:p-5 transition duration-300 hover:border-primary/35 hover:shadow-md dark:hover:border-primary/40"
              >
                <div
                  class="flex size-14 md:size-16 shrink-0 items-center justify-center rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 p-2 transition-colors duration-300 group-hover:border-primary/20 group-hover:bg-primary/5"
                >
                  <img
                    v-if="dev.logo?.url"
                    :src="dev.logo.url"
                    :alt="`${dev.name} logo`"
                    class="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                  <span
                    v-else
                    class="text-xl font-bold text-primary"
                  >{{ dev.name?.charAt(0) }}</span>
                </div>
                <div class="min-w-0 flex-1">
                  <h3 class="font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {{ dev.name }}
                  </h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <template v-if="dev.projectCount">
                      {{ dev.projectCount }} {{ dev.projectCount === 1 ? 'project' : 'projects' }}
                    </template>
                    <template v-else>View projects</template>
                  </p>
                </div>
                <ChevronRight
                  class="size-5 shrink-0 text-slate-300 dark:text-slate-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, Check, ChevronRight, Layers } from 'lucide-vue-next'
import { useReelly } from '@/composables/useReelly'
import DeveloperGridSkeleton from '@/component/kardosh/skeleton/DeveloperGridSkeleton.vue'

const TRUST_POINTS = [
  'Verified developer logos linked to live off-plan stock',
  'Project pages with pricing, payment plans, and galleries',
  'Filter by community, bedrooms, and budget on our catalogue',
]

const { projects, uaeDevelopers, loading, loadProjects, loadDeveloperLogos } = useReelly()

const projectCountByDeveloper = computed(() => {
  const map = {}
  for (const p of projects.value) {
    if (!p.developer) continue
    map[p.developer] = (map[p.developer] || 0) + 1
  }
  return map
})

const featured = computed(() =>
  uaeDevelopers.value.slice(0, 9).map((d) => ({
    ...d,
    projectCount: projectCountByDeveloper.value[d.name] || 0,
  }))
)

const catalogStats = computed(() => ({
  developers: uaeDevelopers.value.length,
  projects: projects.value.length,
}))

onMounted(async () => {
  await loadProjects()
  await loadDeveloperLogos()
})
</script>
