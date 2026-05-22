<template>
  <Navbar nav-class="navbar-white" />

  <PageHero
    title="About Kardosh Realty"
    :subtitle="BRAND.tagline"
    eyebrow="Who we are"
    :image="PAGE_HERO_IMAGES.about"
  />

  <!-- Stats -->
  <section class="relative z-10 -mt-8 lg:-mt-10">
    <div class="container-fluid">
      <ul
        class="grid grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md px-4 py-6 md:px-8"
      >
        <li v-for="stat in ABOUT_STATS" :key="stat.label" class="text-center px-2">
          <p class="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white tabular-nums">
            {{ stat.value }}
          </p>
          <p class="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">{{ stat.label }}</p>
        </li>
      </ul>
    </div>
  </section>

  <!-- Story + pillars (reuse About block) -->
  <About />

  <!-- Mission statement -->
  <section
    class="py-12 lg:py-14 bg-slate-50 dark:bg-slate-900/50"
    aria-labelledby="mission-heading"
  >
    <div class="container-fluid">
      <article
        class="max-w-3xl mx-auto text-center rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-8 md:px-10 md:py-10"
      >
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
          {{ ABOUT_MISSION.eyebrow }}
        </p>
        <h2
          id="mission-heading"
          class="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
        >
          {{ ABOUT_MISSION.title }}
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          {{ ABOUT_MISSION.body }}
        </p>
      </article>
    </div>
  </section>

  <!-- What we do -->
  <section class="lg:py-20 py-14" aria-labelledby="services-heading">
    <div class="container-fluid">
      <div class="max-w-3xl">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">What we do</p>
        <h2
          id="services-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
        >
          One brokerage, full UAE coverage
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          From off-plan launches to rentals and resale — explore the tools we built for modern property buyers.
        </p>
      </div>

      <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        <RouterLink
          v-for="service in ABOUT_SERVICES"
          :key="service.title"
          :to="service.to"
          class="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 transition hover:border-primary/40 hover:shadow-md"
        >
          <h3 class="font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
            {{ service.title }}
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{{ service.desc }}</p>
          <span class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
            Learn more
            <ArrowUpRight class="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- How we work -->
  <section
    class="lg:py-20 py-14 bg-slate-50 dark:bg-slate-900/50"
    aria-labelledby="process-heading"
  >
    <div class="container-fluid">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">How we work</p>
        <h2
          id="process-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3"
        >
          A clear path from hello to handover
        </h2>
      </div>
      <ol class="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5 list-none p-0">
        <li
          v-for="step in HOW_WE_WORK"
          :key="step.step"
          class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6"
        >
          <span class="text-3xl font-semibold text-slate-200 dark:text-slate-700 tabular-nums">
            {{ step.step }}
          </span>
          <h3 class="font-semibold text-slate-900 dark:text-white mt-3">{{ step.title }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{{ step.text }}</p>
        </li>
      </ol>
    </div>
  </section>

  <!-- Differentiators -->
  <section class="lg:py-20 py-14" aria-labelledby="why-kardosh-heading">
    <div class="container-fluid">
      <div class="grid lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-5">
          <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Why Kardosh</p>
          <h2
            id="why-kardosh-heading"
            class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
          >
            Built for serious UAE property buyers
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
            We combine live market data with human advisory — so you compare like with like before you commit.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a
              :href="SOCIAL.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary"
            >
              <Linkedin class="size-4" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              :href="SOCIAL.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary"
            >
              <Instagram class="size-4" aria-hidden="true" />
              Instagram
            </a>
          </div>
        </div>
        <div class="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          <article
            v-for="item in ABOUT_DIFFERENTIATORS"
            :key="item.title"
            class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 md:p-6"
          >
            <CheckCircle2 class="size-5 text-primary mb-3" aria-hidden="true" />
            <h3 class="font-semibold text-slate-900 dark:text-white">{{ item.title }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>

  <!-- Animated counters -->
  <section
    class="relative py-16 md:py-20 overflow-hidden"
    aria-label="Company metrics"
  >
    <img
      :src="PAGE_HERO_IMAGES.about"
      alt=""
      class="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    />
    <div class="absolute inset-0 bg-slate-950/75" aria-hidden="true" />
    <div class="container-fluid relative z-[1]">
      <ul class="grid md:grid-cols-3 gap-8 list-none p-0 text-center">
        <li v-for="(metric, i) in COUNTER_METRICS" :key="metric.label">
          <p class="text-4xl md:text-5xl font-semibold text-white tabular-nums">
            {{ Math.floor(animatedCounts[i]) }}{{ metric.suffix }}
          </p>
          <p class="text-white/80 mt-2 text-sm md:text-base font-medium">{{ metric.label }}</p>
        </li>
      </ul>
    </div>
  </section>

  <!-- Team -->
  <section class="lg:py-20 py-14" aria-labelledby="team-heading">
    <div class="container-fluid">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Our team</p>
        <h2
          id="team-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3"
        >
          Licensed advisors across the UAE
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          Specialists in off-plan, leasing, and investment advisory — here to guide every step of your transaction.
        </p>
      </div>

      <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
        <article
          v-for="member in teamdata"
          :key="member.name"
          class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden text-center"
        >
          <div class="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              :src="member.image"
              :alt="member.name"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="p-5">
            <h3 class="font-semibold text-slate-900 dark:text-white">{{ member.name }}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ member.title }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Testimonials (same data as home — 4×2 grid) -->
  <section
    class="lg:py-20 py-14 bg-slate-50 dark:bg-slate-900/50"
    aria-labelledby="testimonials-heading"
  >
    <div class="container-fluid">
      <div class="max-w-3xl mx-auto text-center mb-10 lg:mb-12">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Client stories</p>
        <h2
          id="testimonials-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3"
        >
          What our clients say
        </h2>
        <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
          Real experiences from buyers and investors who worked with Kardosh Realty in Dubai.
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
        role="list"
      >
        <article
          v-for="(item, index) in aboutTestimonials"
          :key="`${item.name}-${index}`"
          role="listitem"
          class="p-6 md:p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col h-full"
        >
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-[15px] flex-1">
            {{ item.text }}
          </p>
          <div class="flex items-center gap-3 mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
            <img
              :src="item.image"
              :alt="item.name"
              width="40"
              height="40"
              class="size-10 rounded-full object-cover shrink-0"
              loading="lazy"
            />
            <div class="min-w-0">
              <p class="font-medium text-slate-900 dark:text-white text-sm leading-snug">
                {{ item.name }}
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ item.role }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <HomeGetInTouch :mt="false" />

  <!-- CTA -->
  <section class="pb-20 lg:pb-24">
    <div class="container-fluid">
      <div
        class="rounded-3xl border border-slate-200 dark:border-slate-700 bg-primary px-8 py-10 md:px-12 md:py-14 text-center text-white"
      >
        <h2 class="text-2xl md:text-3xl font-semibold">Ready to explore the UAE market?</h2>
        <p class="text-white/80 mt-3 max-w-2xl mx-auto leading-relaxed">
          Browse off-plan projects, open the map, or book a call with our DIFC team.
        </p>
        <div class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink
            to="/off-plan"
            class="btn bg-white text-primary hover:bg-slate-100 rounded-lg inline-flex items-center justify-center px-8 font-semibold"
          >
            View off-plan
          </RouterLink>
          <RouterLink
            to="/contact"
            class="btn border border-white/40 text-white hover:bg-white/10 rounded-lg inline-flex items-center justify-center px-8"
          >
            Contact us
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <Footer />
  <Switcher />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import {
  ArrowUpRight,
  CheckCircle2,
  Instagram,
  Linkedin,
} from 'lucide-vue-next'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import About from '@/component/about.vue'
import HomeGetInTouch from '@/component/kardosh/home/HomeGetInTouch.vue'
import { BRAND, SOCIAL } from '@/config/brand'
import { PAGE_HERO_IMAGES } from '@/config/dubai-images'
import {
  ABOUT_STATS,
  ABOUT_MISSION,
  ABOUT_SERVICES,
  HOW_WE_WORK,
  COUNTER_METRICS,
  ABOUT_DIFFERENTIATORS,
} from '@/config/about'
import { teamdata } from '@/component/data/data'
import { getAboutPageTestimonials } from '@/config/testimonials'

const aboutTestimonials = getAboutPageTestimonials()

const animatedCounts = ref(COUNTER_METRICS.map(() => 0))

onMounted(() => {
  const duration = 1200
  const ends = COUNTER_METRICS.map((m) => m.target)
  const starts = ends.map(() => 0)
  const increments = ends.map((end, i) => (end - starts[i]) / (duration / 16))
  let current = [...starts]
  const timer = setInterval(() => {
    let done = true
    current = current.map((val, i) => {
      const next = val + increments[i]
      if (next < ends[i]) {
        done = false
        return next
      }
      return ends[i]
    })
    animatedCounts.value = [...current]
    if (done) clearInterval(timer)
  }, 16)
})
</script>
