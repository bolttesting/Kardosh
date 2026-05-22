<template>
  <Navbar nav-class="navbar-white" />

  <PageHero
    title="UAE property developers"
    subtitle="Explore established and emerging developers with active off-plan stock across the Emirates — powered by Reelly and curated on Kardosh Realty."
    eyebrow="Developers"
    :image="PAGE_HERO_IMAGES.developers"
  />

  <section class="relative z-10 -mt-8 lg:-mt-10">
    <div class="container-fluid">
      <ul
        class="kardosh-profile-stats kardosh-profile-stats--cols-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 list-none p-0 m-0 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md px-4 py-6 md:px-8"
      >
        <li v-for="stat in pageStats" :key="stat.label" class="text-center px-2">
          <p class="kardosh-profile-stats__value text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white tabular-nums">
            {{ stat.value }}
          </p>
          <p class="kardosh-profile-stats__label text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">{{ stat.label }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="lg:py-20 py-14" aria-labelledby="developers-grid-heading">
    <div class="container-fluid">
      <div class="max-w-3xl">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Developer directory</p>
        <h2
          id="developers-grid-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
        >
          Compare UAE developer pipelines
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          Each profile shows live project counts, key regions, and sales contacts where Reelly provides them.
          Open a developer to browse their full off-plan catalogue.
        </p>
      </div>

      <div class="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <label class="relative flex-1 max-w-md">
          <span class="sr-only">Search developers</span>
          <Search
            class="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search by developer name…"
            class="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </label>
        <p class="text-sm text-slate-500 dark:text-slate-400 shrink-0">
          {{ filteredDevelopers.length }} developer{{ filteredDevelopers.length === 1 ? '' : 's' }}
        </p>
      </div>

      <DeveloperGridSkeleton
        v-if="loading"
        :count="8"
        grid-class="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7"
      />
      <p
        v-else-if="!filteredDevelopers.length"
        class="text-center text-slate-400 py-12 mt-10 rounded-xl border border-dashed border-slate-200 dark:border-slate-700"
      >
        {{ searchQuery ? 'No developers match your search.' : 'No developers found in the catalogue.' }}
      </p>

      <div
        v-else
        class="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7"
      >
        <DeveloperCard
          v-for="dev in filteredDevelopers"
          :key="dev.id"
          :developer="dev"
        />
      </div>
    </div>
  </section>

  <section
    v-if="featuredDevelopers.length && !loading"
    class="lg:py-16 py-12 bg-slate-50 dark:bg-slate-900/50"
    aria-labelledby="featured-developers-heading"
  >
    <div class="container-fluid">
      <div class="max-w-3xl">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Most active</p>
        <h2
          id="featured-developers-heading"
          class="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mt-3"
        >
          Largest UAE pipelines in our catalogue
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-3 text-sm leading-relaxed">
          Ranked by the number of active off-plan projects currently listed for each developer.
        </p>
      </div>
      <ol class="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0">
        <li
          v-for="(dev, index) in featuredDevelopers"
          :key="dev.id"
        >
          <RouterLink
            :to="`/developer/${dev.id}`"
            class="flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 hover:border-primary/40 hover:shadow-md transition-all"
          >
            <span class="text-2xl font-semibold text-slate-300 dark:text-slate-600 tabular-nums w-8">
              {{ index + 1 }}
            </span>
            <div class="min-w-0 flex-1">
              <p class="font-semibold text-slate-900 dark:text-white truncate">{{ dev.name }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {{ dev.projectCount }} projects
              </p>
            </div>
          </RouterLink>
        </li>
      </ol>
    </div>
  </section>

  <section class="lg:py-20 py-14" aria-labelledby="why-developers-heading">
    <div class="container-fluid">
      <div class="grid lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-5">
          <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Why developer-first</p>
          <h2
            id="why-developers-heading"
            class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
          >
            Trust the builder before you reserve a unit
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
            Developer profiles consolidate biography, regional focus, sales offices, and every active UAE project
            in one place — so you compare track records alongside payment plans and handover dates.
          </p>
        </div>
        <div class="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          <div
            v-for="item in valuePoints"
            :key="item.title"
            class="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 md:p-6 bg-white dark:bg-slate-900"
          >
            <component :is="item.icon" class="size-6 text-primary mb-3" aria-hidden="true" />
            <h3 class="font-semibold text-slate-900 dark:text-white">{{ item.title }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="pb-20 lg:pb-24">
    <div class="container-fluid">
      <div
        class="rounded-3xl border border-slate-200 dark:border-slate-700 bg-primary px-8 py-10 md:px-12 md:py-14 text-center text-white"
      >
        <h2 class="text-2xl md:text-3xl font-semibold">Browse all UAE off-plan</h2>
        <p class="text-white/80 mt-3 max-w-2xl mx-auto leading-relaxed">
          Filter by price, area, or community — or contact our DIFC team for a shortlist from your preferred developers.
        </p>
        <div class="kardosh-btn-row kardosh-btn-row--center mt-8">
          <RouterLink
            to="/off-plan"
            class="btn bg-white text-primary hover:bg-slate-100 rounded-lg inline-flex items-center justify-center px-8 font-semibold"
          >
            View off-plan catalogue
          </RouterLink>
          <RouterLink
            to="/contact"
            class="btn border border-white/40 text-white hover:bg-white/10 rounded-lg inline-flex items-center justify-center px-8"
          >
            Contact advisory
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <Footer />
  <Switcher />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Building2, Handshake, MapPin, Shield, Search } from 'lucide-vue-next'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import DeveloperCard from '@/component/kardosh/DeveloperCard.vue'
import DeveloperGridSkeleton from '@/component/kardosh/skeleton/DeveloperGridSkeleton.vue'
import { PAGE_HERO_IMAGES } from '@/config/dubai-images'
import { useReelly } from '@/composables/useReelly'

const { uaeDevelopers, loading, loadProjects, loadDeveloperLogos } = useReelly()
const searchQuery = ref('')

const filteredDevelopers = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return uaeDevelopers.value
  return uaeDevelopers.value.filter((d) => d.name?.toLowerCase().includes(q))
})

const featuredDevelopers = computed(() => uaeDevelopers.value.slice(0, 4))

const pageStats = computed(() => [
  { value: String(uaeDevelopers.value.length || '—'), label: 'Developers in catalogue' },
  {
    value: String(
      uaeDevelopers.value.reduce((n, d) => n + (d.projectCount || 0), 0) || '—'
    ),
    label: 'Active UAE projects',
  },
  { value: '7', label: 'Emirates covered' },
  { value: 'AED', label: 'Live starting prices' },
])

const valuePoints = [
  {
    icon: Building2,
    title: 'Full project roster',
    text: 'See every active UAE listing for a developer without jumping between brochure pages.',
  },
  {
    icon: Handshake,
    title: 'Sales contacts',
    text: 'Where Reelly provides them, reach licensed sales executives with WhatsApp and office hours.',
  },
  {
    icon: MapPin,
    title: 'Regional footprint',
    text: 'Quickly spot whether a developer focuses on Dubai, Abu Dhabi, Ras Al Khaimah, or multiple emirates.',
  },
  {
    icon: Shield,
    title: 'Licensed advisory',
    text: 'Kardosh Realty helps you compare developers, escrow terms, and payment plans before you reserve.',
  },
]

onMounted(async () => {
  await loadProjects()
  await loadDeveloperLogos()
})
</script>
