<template>
  <div class="whatsapp-float fixed bottom-6 end-6 z-[998] flex flex-col items-end gap-3">
    <a
      v-if="showCall"
      :href="CONTACT.phoneTel"
      class="size-12 rounded-full bg-slate-900 text-white shadow-lg flex items-center justify-center hover:bg-primary transition md:hidden"
      aria-label="Call us"
    >
      <Phone class="size-5" />
    </a>
    <a
      :href="waLink"
      target="_blank"
      rel="noopener noreferrer"
      class="group flex items-center gap-2 rounded-full bg-slate-900 hover:bg-black text-white shadow-lg hover:shadow-xl transition pl-4 pe-5 py-3 border border-white/10"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle class="size-6" />
      <span class="text-sm font-medium hidden sm:inline">WhatsApp</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { MessageCircle, Phone } from 'lucide-vue-next'
import { CONTACT } from '@/config/uae'
import { whatsAppLink, WHATSAPP } from '@/config/marketing'

const props = defineProps({
  showCall: { type: Boolean, default: true },
  message: { type: String, default: '' },
})

const route = useRoute()

const waLink = computed(() => {
  if (props.message) return whatsAppLink(props.message)
  if (route.name === 'property-detail' && route.params.id) {
    return `${WHATSAPP.url}?text=${WHATSAPP.propertyMessage('Property #' + route.params.id)}`
  }
  return whatsAppLink(WHATSAPP.defaultMessage)
})
</script>
