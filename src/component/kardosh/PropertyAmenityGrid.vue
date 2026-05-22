<template>
  <div v-if="amenities?.length" class="property-amenity-grid">
    <h6 class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
      Amenities & features
    </h6>
    <ul class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 list-none p-0 m-0">
      <li
        v-for="(name, i) in amenities"
        :key="i"
        class="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/80 hover:border-primary/30 transition"
      >
        <span class="shrink-0 size-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <component :is="iconFor(name)" class="size-4 text-primary" />
        </span>
        <span class="text-sm text-slate-700 dark:text-slate-200 leading-snug pt-0.5">{{ name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {
  Check,
  Waves,
  Dumbbell,
  Car,
  Trees,
  Shield,
  Wifi,
  Sparkles,
} from 'lucide-vue-next'

defineProps({
  amenities: { type: Array, default: () => [] },
})

const ICON_RULES = [
  { test: /pool|swim/i, icon: Waves },
  { test: /gym|fitness/i, icon: Dumbbell },
  { test: /parking|car\b/i, icon: Car },
  { test: /park|garden|green/i, icon: Trees },
  { test: /security|concierge|guard/i, icon: Shield },
  { test: /wifi|internet/i, icon: Wifi },
  { test: /spa|wellness|luxury/i, icon: Sparkles },
]

function iconFor(name) {
  const n = String(name)
  for (const { test, icon } of ICON_RULES) {
    if (test.test(n)) return icon
  }
  return Check
}
</script>
