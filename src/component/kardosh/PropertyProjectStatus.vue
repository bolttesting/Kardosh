<template>
  <section
    class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/30 p-5 md:p-6"
    aria-labelledby="project-status-heading"
  >
    <h3 id="project-status-heading" class="text-base font-semibold text-slate-900 dark:text-white">
      Project availability
    </h3>
    <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
      Live catalogue data from Reelly. Individual sale or transaction history is not exposed in the API.
    </p>

    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
      <div v-for="item in items" :key="item.label">
        <dt class="text-xs font-semibold uppercase tracking-wider text-slate-400">{{ item.label }}</dt>
        <dd class="text-sm font-medium text-slate-900 dark:text-white mt-1 capitalize">{{ item.value }}</dd>
      </div>
    </dl>

    <p
      v-if="unitTypes.length"
      class="text-sm text-slate-600 dark:text-slate-300 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700"
    >
      <span class="font-medium text-slate-900 dark:text-white">Unit types:</span>
      {{ unitTypes.join(', ') }}
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  saleStatus: { type: String, default: '' },
  constructionStatus: { type: String, default: '' },
  completionDate: { type: String, default: '' },
  unitsCount: { type: Number, default: null },
  availableUnitTypes: { type: Array, default: () => [] },
})

function formatStatus(value) {
  if (!value) return '—'
  return String(value).replace(/_/g, ' ')
}

const items = computed(() => {
  const rows = [
    { label: 'Sale status', value: formatStatus(props.saleStatus) },
    { label: 'Construction', value: formatStatus(props.constructionStatus) },
    { label: 'Completion', value: props.completionDate || '—' },
  ]
  if (props.unitsCount != null && props.unitsCount > 0) {
    rows.push({
      label: 'Units in catalogue',
      value: `${props.unitsCount} listed`,
    })
  }
  return rows
})

const unitTypes = computed(() =>
  (props.availableUnitTypes || [])
    .map((t) => (typeof t === 'string' ? t : t?.name || t?.label))
    .filter(Boolean)
)
</script>
