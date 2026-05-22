<template>
  <div class="property-overview-faq">
    <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Project details</h2>
    <div class="space-y-2">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900"
      >
        <button
          type="button"
          class="w-full flex items-center justify-between gap-4 px-5 py-4 text-start hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
          :aria-expanded="openIndex === index"
          @click="toggle(index)"
        >
          <span class="font-medium text-slate-900 dark:text-white">{{ item.title }}</span>
          <ChevronDown
            class="size-5 text-primary shrink-0 transition-transform duration-300"
            :class="openIndex === index ? 'rotate-180' : ''"
          />
        </button>
        <div
          v-show="openIndex === index"
          class="px-5 pb-5 pt-0 text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed whitespace-pre-line border-t border-slate-100 dark:border-slate-800"
        >
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps({
  items: { type: Array, default: () => [] },
})

const openIndex = ref(0)

function toggle(index) {
  openIndex.value = openIndex.value === index ? -1 : index
}

watch(
  () => props.items,
  (list) => {
    openIndex.value = list?.length ? 0 : -1
  },
  { immediate: true }
)
</script>
