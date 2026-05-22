<template>
  <Navbar nav-class="navbar-white" />
  <PageHero
    title="Explore the UAE by community"
    subtitle="Off-plan and investment opportunities across Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, and the wider Emirates — curated on Kardosh Realty."
    eyebrow="United Arab Emirates"
    :image="PAGE_HERO_IMAGES.communities"
  />

  <!-- Stats -->
  <section class="relative z-10 -mt-8 lg:-mt-10">
    <div class="container-fluid">
      <ul
        class="communities-stats kardosh-profile-stats kardosh-profile-stats--cols-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 list-none p-0 m-0 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md px-4 py-6 md:px-8"
      >
        <li v-for="stat in PAGE_STATS" :key="stat.label" class="text-center px-2">
          <p class="kardosh-profile-stats__value text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white tabular-nums">{{ stat.value }}</p>
          <p class="kardosh-profile-stats__label text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">{{ stat.label }}</p>
        </li>
      </ul>
    </div>
  </section>

  <!-- Community grid -->
  <section class="lg:py-20 py-14" aria-labelledby="communities-grid-heading">
    <div class="container-fluid">
      <div class="max-w-3xl">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Browse by area</p>
        <h2
          id="communities-grid-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
        >
          Find your next UAE address
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          Filter by emirate and open a community page to see matching off-plan projects from our live Reelly catalogue.
        </p>
      </div>

      <div
        class="mt-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter by emirate"
      >
        <button
          v-for="tab in COMMUNITY_EMIRATES"
          :key="tab.id"
          type="button"
          role="tab"
          :aria-selected="activeEmirate === tab.id"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium border transition-colors',
            activeEmirate === tab.id
              ? 'bg-primary text-white border-primary'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-primary',
          ]"
          @click="activeEmirate = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
        <CommunityCard
          v-for="c in filteredCommunities"
          :key="c.slug"
          :community="c"
        />
      </div>

      <p
        v-if="!filteredCommunities.length"
        class="text-center text-slate-400 py-12"
      >
        No communities in this emirate yet.
      </p>
    </div>
  </section>

  <!-- By emirate -->
  <section class="lg:py-20 py-14 bg-slate-50 dark:bg-slate-900/50" aria-labelledby="emirates-heading">
    <div class="container-fluid">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Seven emirates</p>
        <h2
          id="emirates-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3"
        >
          One country, multiple investment corridors
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          Kardosh Realty covers the UAE — not Dubai alone. Each emirate offers distinct price points, lifestyles, and developer pipelines.
        </p>
      </div>

      <div class="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="em in EMIRATE_OVERVIEWS"
          :key="em.id"
          class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 md:p-7 flex flex-col"
        >
          <h3 class="text-xl font-semibold text-slate-900 dark:text-white">{{ em.name }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed flex-1">{{ em.tagline }}</p>
          <ul class="mt-4 flex flex-wrap gap-2 list-none p-0">
            <li
              v-for="(h, i) in em.highlights"
              :key="i"
              class="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium"
            >
              {{ h }}
            </li>
          </ul>
          <button
            type="button"
            class="mt-6 text-sm font-semibold text-primary hover:underline text-start"
            @click="activeEmirate = em.id; scrollToGrid()"
          >
            View {{ em.name }} communities →
          </button>
        </article>
      </div>
    </div>
  </section>

  <!-- Why explore -->
  <section class="lg:py-20 py-14" aria-labelledby="why-communities-heading">
    <div class="container-fluid">
      <div class="grid lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-5">
          <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Why area-first search</p>
          <h2
            id="why-communities-heading"
            class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
          >
            Invest with local context, not just project names
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
            Community pages group live off-plan stock by lifestyle, commute, and emirate — so you compare like with like before you enquire.
          </p>
        </div>
        <div class="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          <div
            v-for="item in VALUE_POINTS"
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

  <!-- CTA -->
  <section class="pb-20 lg:pb-24">
    <div class="container-fluid">
      <div
        class="rounded-3xl border border-slate-200 dark:border-slate-700 bg-primary px-8 py-10 md:px-12 md:py-14 text-center text-white"
      >
        <h2 class="text-2xl md:text-3xl font-semibold">Ready to browse UAE off-plan?</h2>
        <p class="text-white/80 mt-3 max-w-2xl mx-auto leading-relaxed">
          Search the full catalogue or speak with our DIFC team about a specific emirate or community.
        </p>
        <div class="kardosh-btn-row kardosh-btn-row--center mt-8">
          <RouterLink
            to="/off-plan"
            class="btn bg-white text-primary hover:bg-slate-100 rounded-lg inline-flex items-center justify-center px-8 font-semibold"
          >
            View all off-plan
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
import { ref, computed, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Building2, MapPin, TrendingUp, Shield } from 'lucide-vue-next'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import CommunityCard from '@/component/kardosh/CommunityCard.vue'
import {
  UAE_COMMUNITIES,
  COMMUNITY_EMIRATES,
  EMIRATE_OVERVIEWS,
  communitiesByEmirate,
} from '@/config/communities'
import { PAGE_HERO_IMAGES } from '@/config/dubai-images'

const route = useRoute()
const activeEmirate = ref('all')

const VALID_EMIRATES = new Set(COMMUNITY_EMIRATES.map((e) => e.id))

onMounted(() => {
  const q = route.query.emirate?.toString()
  if (q && VALID_EMIRATES.has(q)) activeEmirate.value = q
})

watch(
  () => route.query.emirate,
  (q) => {
    if (q && VALID_EMIRATES.has(String(q))) activeEmirate.value = String(q)
  }
)

const PAGE_STATS = [
  { value: '7', label: 'Emirates covered' },
  { value: String(UAE_COMMUNITIES.length), label: 'Featured communities' },
  { value: '1,500+', label: 'Off-plan projects (UAE)' },
  { value: 'AED', label: 'Transparent pricing' },
]

const VALUE_POINTS = [
  {
    icon: MapPin,
    title: 'Emirate-level clarity',
    text: 'See which projects align with Dubai, Abu Dhabi, Sharjah, Ajman, or RAK before you dive into brochures.',
  },
  {
    icon: TrendingUp,
    title: 'Live catalogue',
    text: 'Community pages pull matching stock from Reelly so listings stay current as developers launch.',
  },
  {
    icon: Building2,
    title: 'Developer diversity',
    text: 'From Emaar and Aldar to regional specialists — compare pipelines across the UAE in one place.',
  },
  {
    icon: Shield,
    title: 'Licensed advisory',
    text: 'Kardosh Realty guides international buyers through AED pricing, payment plans, and reservation steps.',
  },
]

const filteredCommunities = computed(() => communitiesByEmirate(activeEmirate.value))

function scrollToGrid() {
  document.getElementById('communities-grid-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
