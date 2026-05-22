<template>
  <div :class="gridClass">
    <PropertyListingCard
      v-for="(item, index) in paginatedItems"
      :key="`${item.source || 'item'}-${item.id}-${index}`"
      :item="item"
      :variant="cardVariant"
    />
  </div>
  <div class="grid md:grid-cols-12 grid-cols-1 mt-8">
    <div class="md:col-span-12 text-center">
      <nav>
        <ul class="inline-flex items-center -space-x-px">
          <li>
            <button
              type="button"
              :disabled="currentPage <= 1"
              class="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-xs disabled:opacity-40"
              @click="currentPage--"
            >
              <ChevronLeft class="text-[20px]" />
            </button>
          </li>
          <li v-for="page in totalPages" :key="page">
            <button
              type="button"
              :class="
                page === currentPage
                  ? 'text-white bg-primary'
                  : 'text-slate-400 bg-white dark:bg-slate-900 hover:bg-primary hover:text-white'
              "
              class="size-10 inline-flex justify-center items-center mx-1 rounded-full shadow-xs"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
          </li>
          <li>
            <button
              type="button"
              :disabled="currentPage >= totalPages"
              class="size-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-xs disabled:opacity-40"
              @click="currentPage++"
            >
              <ChevronRight class="text-[20px]" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import PropertyListingCard from '@/component/kardosh/PropertyListingCard.vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  items: { type: Array, required: true },
  itemsPerPage: { type: Number, default: 6 },
  gridClass: { type: String, default: '' },
  /** default | luxury — passed to PropertyListingCard */
  cardVariant: { type: String, default: 'default' },
})

const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(props.items.length / props.itemsPerPage)))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  return props.items.slice(start, start + props.itemsPerPage)
})

watch(
  () => props.items,
  () => {
    currentPage.value = 1
  }
)
</script>
