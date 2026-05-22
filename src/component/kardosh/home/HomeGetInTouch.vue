<template>
  <section
    class="relative"
    :class="mt ? 'lg:mt-24 mt-16' : 'mt-0'"
    aria-labelledby="get-in-touch-heading"
  >
    <div class="container-fluid">
      <div
        class="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/40 p-6 md:p-10 lg:p-12"
      >
        <div class="max-w-3xl mx-auto text-center">
          <p class="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Contact</p>
          <h2
            id="get-in-touch-heading"
            class="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mt-3 leading-tight"
          >
            Have a question?<br />
            <span class="text-slate-600 dark:text-slate-300">Get in touch.</span>
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed mx-auto">
            Speak with our DIFC team about off-plan, ready homes, rentals, or selling your property.
            We typically respond within one business day.
          </p>
        </div>

        <div class="mt-10 lg:mt-12 grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <ul class="lg:col-span-4 space-y-3 xl:space-y-4 order-2 lg:order-1" role="list">
            <li v-for="channel in contactChannels" :key="channel.label">
              <component
                :is="channel.external ? 'a' : 'RouterLink'"
                :href="channel.external ? channel.href : undefined"
                :to="!channel.external ? channel.href : undefined"
                :target="channel.external ? '_blank' : undefined"
                :rel="channel.external ? 'noopener noreferrer' : undefined"
                class="group flex items-start gap-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 md:p-4 transition duration-300 hover:border-primary/35 hover:shadow-sm dark:hover:border-primary/40"
              >
                <span
                  class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-primary transition-colors group-hover:bg-primary group-hover:text-white dark:group-hover:text-slate-900"
                >
                  <component :is="channel.icon" class="size-4" aria-hidden="true" />
                </span>
                <span class="min-w-0">
                  <span class="block text-sm font-semibold text-slate-900 dark:text-white">{{ channel.label }}</span>
                  <span class="block text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{{ channel.value }}</span>
                  <span v-if="channel.hint" class="block text-[11px] text-slate-400 dark:text-slate-500 mt-1 leading-snug">{{ channel.hint }}</span>
                </span>
              </component>
            </li>
          </ul>

          <div class="lg:col-span-8 min-w-0 order-1 lg:order-2">
            <div
              class="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-sm h-full"
            >
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white">
                {{ pageMode ? 'Send your enquiry' : 'Send a quick enquiry' }}
              </h3>
              <p v-if="!pageMode" class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Prefer the full form?
                <RouterLink to="/contact" class="text-primary hover:underline">Contact page</RouterLink>
              </p>
              <p v-else class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                All fields are optional except name. We store enquiries securely when Supabase is connected.
              </p>

              <form class="mt-6" @submit.prevent="onSubmit">
                <p v-if="formError" class="text-red-600 dark:text-red-400 text-sm mb-4">{{ formError }}</p>
                <p v-if="formSuccess" class="text-slate-700 dark:text-slate-200 text-sm mb-4">{{ formSuccess }}</p>

                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label :for="`${fieldPrefix}-name`" class="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                    <input
                      :id="`${fieldPrefix}-name`"
                      v-model="form.name"
                      type="text"
                      required
                      autocomplete="name"
                      class="form-input border border-slate-200! dark:border-slate-700! mt-1.5 w-full rounded-lg"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label :for="`${fieldPrefix}-email`" class="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                    <input
                      :id="`${fieldPrefix}-email`"
                      v-model="form.email"
                      type="email"
                      autocomplete="email"
                      class="form-input border border-slate-200! dark:border-slate-700! mt-1.5 w-full rounded-lg"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div class="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label :for="`${fieldPrefix}-phone`" class="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                    <input
                      :id="`${fieldPrefix}-phone`"
                      v-model="form.phone"
                      type="tel"
                      autocomplete="tel"
                      class="form-input border border-slate-200! dark:border-slate-700! mt-1.5 w-full rounded-lg"
                      placeholder="+971 50 …"
                    />
                  </div>
                  <div>
                    <label :for="`${fieldPrefix}-type`" class="text-sm font-medium text-slate-700 dark:text-slate-300">Interested in</label>
                    <select
                      :id="`${fieldPrefix}-type`"
                      v-model="form.listingType"
                      class="form-select form-input border border-slate-200! dark:border-slate-700! mt-1.5 w-full rounded-lg"
                    >
                      <option value="sale">Buy / Off-plan</option>
                      <option value="rent">Rent</option>
                      <option value="sell">Sell my property</option>
                    </select>
                  </div>
                </div>

                <div class="mt-4">
                  <label :for="`${fieldPrefix}-message`" class="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                  <textarea
                    :id="`${fieldPrefix}-message`"
                    v-model="form.message"
                    rows="4"
                    class="form-input border border-slate-200! dark:border-slate-700! mt-1.5 w-full rounded-lg textarea"
                    placeholder="Tell us about your budget, community, or timeline…"
                  />
                </div>

                <div class="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    :disabled="submitting"
                    class="btn bg-primary hover:bg-primary-dark text-white rounded-lg inline-flex items-center justify-center gap-2 px-6"
                  >
                    {{ submitting ? 'Sending…' : 'Send message' }}
                    <Send v-if="!submitting" class="size-4" aria-hidden="true" />
                  </button>
                  <a
                    :href="whatsAppLink()"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary dark:hover:text-primary rounded-lg inline-flex items-center justify-center gap-2 px-6"
                  >
                    <MessageCircle class="size-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-vue-next'
import { BRAND } from '@/config/brand'
import { CONTACT } from '@/config/uae'
import { whatsAppLink } from '@/config/marketing'
import { submitLead } from '@/services/leads'

const props = defineProps({
  mt: { type: Boolean, default: true },
  /** Full contact page: hide link to /contact and use distinct field ids */
  pageMode: { type: Boolean, default: false },
})

const fieldPrefix = computed(() => (props.pageMode ? 'contact' : 'home-contact'))

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
  listingType: 'sale',
})

const submitting = ref(false)
const formError = ref('')
const formSuccess = ref('')

const GOOGLE_MAPS_DIRECTIONS =
  'https://www.google.com/maps/search/?api=1&query=Index+Tower+DIFC+Dubai'

const contactChannels = computed(() => [
  {
    label: 'Phone',
    value: CONTACT.phone,
    href: CONTACT.phoneTel,
    hint: CONTACT.hours,
    icon: Phone,
    external: true,
  },
  {
    label: 'Email',
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
    hint: 'We reply within 24 hours',
    icon: Mail,
    external: true,
  },
  {
    label: 'WhatsApp',
    value: 'Chat with our team',
    href: whatsAppLink(),
    hint: 'Fastest for international clients',
    icon: MessageCircle,
    external: true,
  },
  {
    label: 'Office',
    value: CONTACT.addressShort,
    href: props.pageMode ? GOOGLE_MAPS_DIRECTIONS : '/contact',
    hint: CONTACT.address,
    icon: MapPin,
    external: props.pageMode,
  },
])

async function onSubmit() {
  formError.value = ''
  formSuccess.value = ''
  submitting.value = true
  try {
    const result = await submitLead({
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      message: form.value.message,
      listingType: form.value.listingType,
    })
    if (result.stored) {
      formSuccess.value = 'Thank you — Kardosh Realty will contact you shortly.'
      form.value = { name: '', email: '', phone: '', message: '', listingType: 'sale' }
    } else if (result.dev) {
      formSuccess.value = 'Message received (dev mode). Connect Supabase to store leads.'
    }
  } catch (e) {
    formError.value = e.message || 'Could not send message. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>
