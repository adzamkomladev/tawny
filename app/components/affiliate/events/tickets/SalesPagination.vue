<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const props = defineProps<{
  total: number
  itemsPerPage: number
}>()

const currentPage = defineModel<number>({ default: 1 })

const totalPages = computed(() => Math.ceil(props.total / props.itemsPerPage))

const startItem = computed(() => (currentPage.value - 1) * props.itemsPerPage + 1)
const endItem = computed(() => Math.min(currentPage.value * props.itemsPerPage, props.total))

const visiblePages = computed(() => {
  const pages: (number | 'ellipsis')[] = []
  for (let i = 1; i <= totalPages.value; i++) {
    const isNearCurrent = Math.abs(i - currentPage.value) <= 1
    const isFirstOrLast = i === 1 || i === totalPages.value
    
    if (isNearCurrent || isFirstOrLast) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== 'ellipsis') {
      pages.push('ellipsis')
    }
  }
  return pages
})
</script>

<template>
  <div class="flex items-center justify-between border-t px-4 py-4">
    <p class="text-sm text-muted-foreground">
      Showing <span class="font-medium">{{ startItem }}</span> to
      <span class="font-medium">{{ endItem }}</span> of
      <span class="font-medium">{{ total }}</span> results
    </p>

    <div v-if="totalPages > 1" class="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon-sm"
        :disabled="currentPage === 1"
        @click="currentPage = 1"
      >
        <Icon name="lucide:chevrons-left" class="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        :disabled="currentPage === 1"
        @click="currentPage = Math.max(1, currentPage - 1)"
      >
        <Icon name="lucide:chevron-left" class="size-4" />
      </Button>
      
      <template v-for="(page, index) in visiblePages" :key="index">
        <Button
          v-if="page !== 'ellipsis'"
          :variant="currentPage === page ? 'default' : 'outline'"
          size="icon-sm"
          @click="currentPage = page"
        >
          {{ page }}
        </Button>
        <span v-else class="px-2 text-muted-foreground">...</span>
      </template>
      
      <Button
        variant="outline"
        size="icon-sm"
        :disabled="currentPage === totalPages"
        @click="currentPage = Math.min(totalPages, currentPage + 1)"
      >
        <Icon name="lucide:chevron-right" class="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        :disabled="currentPage === totalPages"
        @click="currentPage = totalPages"
      >
        <Icon name="lucide:chevrons-right" class="size-4" />
      </Button>
    </div>
  </div>
</template>
