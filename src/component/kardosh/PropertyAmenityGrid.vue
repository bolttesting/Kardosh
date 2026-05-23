<template>
  <div v-if="amenities?.length" class="property-amenity-grid">
    <h6 class="property-amenity-grid__title">Amenities &amp; features</h6>
    <ul class="property-amenity-grid__list list-none p-0 m-0">
      <li
        v-for="(name, i) in amenities"
        :key="i"
        class="property-amenity-grid__card"
      >
        <span class="property-amenity-grid__icon" aria-hidden="true">
          <component :is="iconFor(name)" class="size-[1.125rem]" />
        </span>
        <span class="property-amenity-grid__label">{{ name }}</span>
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
  ConciergeBell,
  Sofa,
  Clapperboard,
  Cigarette,
  CarFront,
  Smartphone,
} from 'lucide-vue-next'

defineProps({
  amenities: { type: Array, default: () => [] },
})

const ICON_RULES = [
  { test: /pool|swim|infinity/i, icon: Waves },
  { test: /gym|fitness|yoga/i, icon: Dumbbell },
  { test: /parking|car\b|chauffeur/i, icon: CarFront },
  { test: /park|garden|green|beach/i, icon: Trees },
  { test: /security|concierge|guard/i, icon: ConciergeBell },
  { test: /wifi|internet|app/i, icon: Smartphone },
  { test: /spa|wellness|luxury/i, icon: Sparkles },
  { test: /lounge|residents/i, icon: Sofa },
  { test: /screen|cinema|theatre|theater/i, icon: Clapperboard },
  { test: /cigar/i, icon: Cigarette },
  { test: /valet|parking/i, icon: Car },
]

function iconFor(name) {
  const n = String(name)
  for (const { test, icon } of ICON_RULES) {
    if (test.test(n)) return icon
  }
  return Check
}
</script>
