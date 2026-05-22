<template>
  <footer class="kardosh-hover-footer relative h-fit rounded-3xl overflow-hidden mx-4 sm:mx-6 lg:mx-8 mt-24 mb-6 text-slate-300">
    <FooterBackgroundGradient />

    <div class="container-fluid max-w-7xl p-8 md:p-12 lg:p-14 relative z-20">
      <div class="kardosh-hover-footer__top pb-10">
        <div class="kardosh-hover-footer__brand">
          <RouterLink to="/" class="kardosh-hover-footer__logo-link focus:outline-none">
            <BrandLogo variant="full" size="footer" invert-on-dark />
          </RouterLink>
          <p class="kardosh-hover-footer__tagline text-sm leading-relaxed text-slate-400">
            {{ BRAND.tagline }}
          </p>
        </div>

        <div class="kardosh-hover-footer__menus">
          <div
            v-for="section in footerLinks"
            :key="section.title"
            class="kardosh-hover-footer__menu-col"
          >
            <h4 class="text-white text-lg font-semibold mb-5">{{ section.title }}</h4>
            <ul class="space-y-3 text-sm">
              <li v-for="link in section.links" :key="link.label" class="relative">
                <RouterLink
                  :to="link.to"
                  class="text-slate-400 hover:text-white transition-colors"
                >
                  {{ link.label }}
                </RouterLink>
                <span
                  v-if="link.pulse"
                  class="absolute top-1 -end-3 size-2 rounded-full bg-white animate-pulse"
                  aria-hidden="true"
                />
              </li>
            </ul>
          </div>

          <div class="kardosh-hover-footer__menu-col">
            <h4 class="text-white text-lg font-semibold mb-5">Contact us</h4>
            <ul class="space-y-4 text-sm">
              <li v-for="(item, i) in contactInfo" :key="i" class="flex items-start gap-3">
                <component :is="item.icon" class="size-[18px] shrink-0 text-slate-300 mt-0.5" aria-hidden="true" />
                <a
                  v-if="item.href"
                  :href="item.href"
                  :target="item.external ? '_blank' : undefined"
                  :rel="item.external ? 'noopener noreferrer' : undefined"
                  class="text-slate-400 hover:text-white transition-colors"
                >
                  {{ item.text }}
                </a>
                <span
                  v-else
                  class="text-slate-400"
                >
                  {{ item.text }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr class="border-t border-slate-800 my-8" />

      <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-1.5 text-slate-400 footer-social-row">
          <FooterLanguageSwitcher />
          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.href"
            :aria-label="social.label"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center size-9 rounded-md border border-slate-800 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
          >
            <component :is="social.icon" class="size-4" />
          </a>
        </div>

        <p class="text-center md:text-end text-slate-500">
          © {{ year }} {{ BRAND.name }}.
          <a
            href="https://logixcontact.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-white transition-colors"
          >Developed by Logix Contact</a>
        </p>
      </div>
    </div>

    <div
      class="kardosh-hover-footer__brand-stage hidden lg:flex h-[28rem] -mt-48 -mb-32 relative z-10 pointer-events-auto"
    >
      <TextHoverEffect :text="hoverBrandText" class="kardosh-hover-footer__brand-text" />
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from 'lucide-vue-next'
import { BRAND, SOCIAL } from '@/config/brand'
import { CONTACT } from '@/config/uae'
import { whatsAppLink } from '@/config/marketing'
import BrandLogo from '@/component/kardosh/BrandLogo.vue'
import FooterLanguageSwitcher from '@/component/kardosh/FooterLanguageSwitcher.vue'
import FooterBackgroundGradient from '@/component/ui/FooterBackgroundGradient.vue'
import TextHoverEffect from '@/component/ui/TextHoverEffect.vue'

const year = new Date().getFullYear()
const hoverBrandText = computed(() => BRAND.name.split(' ')[0] || 'Kardosh')

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'Off-plan', to: '/off-plan' },
      { label: 'Communities', to: '/communities' },
      { label: 'Developers', to: '/developers' },
      { label: 'Why Dubai', to: '/why-dubai' },
      { label: 'About us', to: '/aboutus' },
    ],
  },
  {
    title: 'Helpful links',
    links: [
      { label: 'Contact', to: '/contact', pulse: true },
      { label: 'Map view', to: '/grid-map' },
      { label: 'Terms of service', to: '/terms' },
      { label: 'Privacy policy', to: '/privacy' },
    ],
  },
]

const contactInfo = [
  {
    icon: Mail,
    text: BRAND.email,
    href: `mailto:${BRAND.email}`,
  },
  {
    icon: Phone,
    text: BRAND.phone,
    href: BRAND.phoneTel,
  },
  {
    icon: MapPin,
    text: CONTACT.addressShort,
    href: undefined,
  },
  {
    icon: MessageCircle,
    text: 'WhatsApp',
    href: whatsAppLink(),
    external: true,
  },
]

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: SOCIAL.linkedin },
  { icon: Instagram, label: 'Instagram', href: SOCIAL.instagram },
]
</script>
