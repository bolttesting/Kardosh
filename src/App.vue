<script setup>
import { RouterView } from 'vue-router'
import ScrollToTop from './component/scroll-to-top.vue'
import WhatsAppFloat from './component/kardosh/WhatsAppFloat.vue'
import AnalyticsScripts from './component/kardosh/AnalyticsScripts.vue'
</script>

<template>
  <AnalyticsScripts />
  <RouterView v-slot="{ Component, route }">
    <Transition name="page-cross" mode="out-in">
      <div v-if="Component" :key="route.path" class="page-view">
        <component :is="Component" />
      </div>
    </Transition>
  </RouterView>
  <WhatsAppFloat />
  <ScrollToTop />
</template>