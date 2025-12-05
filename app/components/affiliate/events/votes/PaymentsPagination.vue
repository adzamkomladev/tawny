<script lang="ts" setup>
import { Button } from '@/components/ui/button'

const props = defineProps<{
  total: number
  itemsPerPage: number
}>()

const currentPage = defineModel<number>({ required: true })

const totalPages = computed(() => Math.ceil(props.total / props.itemsPerPage))

const startItem = computed(() => {
  if (props.total === 0) return 0
  return (currentPage.value - 1) * props.itemsPerPage + 1
})

const endItem = computed(() => {
  return Math.min(currentPage.value * props.itemsPerPage, props.total)
})

const canGoPrev = computed(() => currentPage.value > 1)
const canGoNext = computed(() => currentPage.value < totalPages.value)

const goToPrev = () => {
  if (canGoPrev.value) currentPage.value--
}

const goToNext = () => {
  if (canGoNext.value) currentPage.value++
}

const visiblePages = computed(() => {
  const pages: (number | 'ellipsis')[] = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) pages.push('ellipsis')
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i)
    }
    if (current < total - 2) pages.push('ellipsis')
    pages.push(total)
  }
  return pages
})
</script>

<template>
  <div
    v-if="total > 0"
    class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t px-4 py-4"
  >
    <p class="text-sm text-muted-foreground">
      Showing <span class="font-medium">{{ startItem }}</span> to
      <span class="font-medium">{{ endItem }}</span> of
      <span class="font-medium">{{ total }}</span> payments
    </p>

    <div class="flex items-center gap-1">
      <Button variant="outline" size="icon" class="size-8" :disabled="!canGoPrev" @click="goToPrev">
        <Icon name="lucide:chevron-left" class="size-4" />
      </Button>

      <template v-for="(page, index) in visiblePages" :key="index">
        <span v-if="page === 'ellipsis'" class="px-2 text-muted-foreground">...</span>
        <Button
          v-else
          :variant="page === currentPage ? 'default' : 'outline'"
          size="icon"
          class="size-8"
          @click="currentPage = page"
        >
          {{ page }}
        </Button>
      </template>

      <Button variant="outline" size="icon" class="size-8" :disabled="!canGoNext" @click="goToNext">
        <Icon name="lucide:chevron-right" class="size-4" />
      </Button>
    </div>
  </div>
</template>
