<template>
  <Navbar nav-class="navbar-white" />

  <PageHero
    title="Contact Kardosh Realty"
    subtitle="Speak with our DIFC team about off-plan, ready homes, rentals, and investor advisory across the UAE."
    eyebrow="Get in touch"
    :image="PAGE_HERO_IMAGES.contact"
  />

  <!-- Stats -->
  <section class="relative z-10 -mt-8 lg:-mt-10">
    <div class="container-fluid">
      <ul
        class="kardosh-profile-stats kardosh-profile-stats--cols-4 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 list-none p-0 m-0 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md px-4 py-6 md:px-8"
      >
        <li v-for="stat in CONTACT_PAGE_STATS" :key="stat.label" class="text-center px-2">
          <p class="kardosh-profile-stats__value text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white tabular-nums">
            {{ stat.value }}
          </p>
          <p class="kardosh-profile-stats__label text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">{{ stat.label }}</p>
        </li>
      </ul>
    </div>
  </section>

  <!-- Enquiry form + channels -->
  <HomeGetInTouch :mt="false" page-mode />

  <!-- Map & office -->
  <section class="lg:py-20 py-14 bg-slate-50 dark:bg-slate-900/50" aria-labelledby="office-heading">
    <div class="container-fluid">
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        <div class="lg:col-span-5 flex flex-col gap-6">
          <div>
            <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Visit us</p>
            <h2
              id="office-heading"
              class="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
            >
              DIFC, Dubai
            </h2>
            <p class="text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              {{ CONTACT.address }}
            </p>
            <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">{{ CONTACT.hours }}</p>
          </div>

          <ul class="space-y-3 list-none p-0" role="list">
            <li>
              <a
                :href="CONTACT.phoneTel"
                class="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 hover:border-primary/40 transition"
              >
                <Phone class="size-5 text-primary shrink-0" aria-hidden="true" />
                <span>
                  <span class="block text-sm font-semibold text-slate-900 dark:text-white">Phone</span>
                  <span class="block text-sm text-slate-500 dark:text-slate-400">{{ CONTACT.phone }}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                :href="`mailto:${BRAND.email}`"
                class="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 hover:border-primary/40 transition"
              >
                <Mail class="size-5 text-primary shrink-0" aria-hidden="true" />
                <span>
                  <span class="block text-sm font-semibold text-slate-900 dark:text-white">Email</span>
                  <span class="block text-sm text-slate-500 dark:text-slate-400">{{ BRAND.email }}</span>
                </span>
              </a>
            </li>
            <li>
              <a
                :href="mapsDirectionsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 hover:border-primary/40 transition"
              >
                <MapPin class="size-5 text-primary shrink-0" aria-hidden="true" />
                <span>
                  <span class="block text-sm font-semibold text-slate-900 dark:text-white">Directions</span>
                  <span class="block text-sm text-primary">Open in Google Maps</span>
                </span>
              </a>
            </li>
          </ul>

          <div class="flex flex-wrap gap-3">
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

        <div
          class="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm min-h-[320px] lg:min-h-[480px]"
        >
          <iframe
            title="Kardosh Realty office — DIFC Dubai"
            :src="GOOGLE_MAP_EMBED"
            class="w-full h-full min-h-[320px] lg:min-h-[480px] border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          />
        </div>
      </div>
    </div>
  </section>

  <!-- What to expect -->
  <section class="lg:py-20 py-14" aria-labelledby="expect-heading">
    <div class="container-fluid">
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">What happens next</p>
        <h2
          id="expect-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3"
        >
          After you reach out
        </h2>
      </div>
      <div class="mt-10 grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
        <article
          v-for="(item, index) in CONTACT_EXPECTATIONS"
          :key="item.title"
          class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 text-center"
        >
          <span
            class="inline-flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold tabular-nums"
          >
            {{ index + 1 }}
          </span>
          <h3 class="font-semibold text-slate-900 dark:text-white mt-4">{{ item.title }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section
    class="lg:py-20 py-14 bg-slate-50 dark:bg-slate-900/50"
    aria-labelledby="contact-faq-heading"
  >
    <div class="container-fluid">
      <div class="max-w-3xl mx-auto text-center mb-10">
        <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">FAQ</p>
        <h2
          id="contact-faq-heading"
          class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3"
        >
          Before you enquire
        </h2>
      </div>
      <div class="max-w-3xl mx-auto space-y-3">
        <details
          v-for="item in CONTACT_FAQ"
          :key="item.id"
          class="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden"
        >
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 font-semibold text-slate-900 dark:text-white marker:content-none [&::-webkit-details-marker]:hidden"
          >
            {{ item.question }}
            <ChevronDown
              class="size-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p
            class="px-5 pb-5 md:px-6 md:pb-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4"
          >
            {{ item.answer }}
          </p>
        </details>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="pb-20 lg:pb-24">
    <div class="container-fluid">
      <div
        class="rounded-3xl border border-slate-200 dark:border-slate-700 bg-primary px-8 py-10 md:px-12 md:py-14 text-center text-white"
      >
        <h2 class="text-2xl md:text-3xl font-semibold">Explore while you wait</h2>
        <p class="text-white/80 mt-3 max-w-2xl mx-auto leading-relaxed">
          Browse live off-plan stock, UAE communities, or our Why Dubai investor guide.
        </p>
        <div class="kardosh-btn-row kardosh-btn-row--center mt-8">
          <RouterLink
            to="/off-plan"
            class="btn bg-white text-primary hover:bg-slate-100 rounded-lg inline-flex items-center justify-center px-8 font-semibold"
          >
            View off-plan
          </RouterLink>
          <RouterLink
            to="/why-dubai"
            class="btn border border-white/40 text-white hover:bg-white/10 rounded-lg inline-flex items-center justify-center px-8"
          >
            Why Dubai
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <Footer />
  <Switcher />
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ChevronDown, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-vue-next'
import Navbar from '@/component/navbar.vue'
import Footer from '@/component/footer.vue'
import Switcher from '@/component/switcher.vue'
import PageHero from '@/component/kardosh/PageHero.vue'
import HomeGetInTouch from '@/component/kardosh/home/HomeGetInTouch.vue'
import { BRAND, SOCIAL } from '@/config/brand'
import { CONTACT, GOOGLE_MAP_EMBED } from '@/config/uae'
import { PAGE_HERO_IMAGES } from '@/config/dubai-images'
import {
  CONTACT_PAGE_STATS,
  CONTACT_EXPECTATIONS,
  CONTACT_FAQ,
} from '@/config/contact-page'

const mapsDirectionsUrl =
  'https://www.google.com/maps/search/?api=1&query=Index+Tower+DIFC+Dubai'
</script>
