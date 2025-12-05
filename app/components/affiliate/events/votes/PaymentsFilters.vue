<script lang="ts" setup>
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

defineProps<{
  categories: string[]
  paymentMethods: string[]
}>()

const searchQuery = defineModel<string>('searchQuery', { required: true })
const statusFilter = defineModel<string>('statusFilter', { required: true })
const categoryFilter = defineModel<string>('categoryFilter', { required: true })
const paymentFilter = defineModel<string>('paymentFilter', { required: true })

const emit = defineEmits<{
  clear: []
}>()

const hasFilters = computed(() => {
  return (
    searchQuery.value !== '' ||
    statusFilter.value !== 'all' ||
    categoryFilter.value !== 'all' ||
    paymentFilter.value !== 'all'
  )
})
</script>

<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
    <!-- Search -->
    <div class="relative flex-1">
      <Icon
        name="lucide:search"
        class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        v-model="searchQuery"
        placeholder="Search by name, phone, or nominee..."
        class="pl-9"
      />
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-2">
      <Select v-model="statusFilter">
        <SelectTrigger class="w-[130px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="failed">Failed</SelectItem>
          <SelectItem value="refunded">Refunded</SelectItem>
        </SelectContent>
      </Select>

      <Select v-model="categoryFilter">
        <SelectTrigger class="w-[150px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </SelectItem>
        </SelectContent>
      </Select>

      <Select v-model="paymentFilter">
        <SelectTrigger class="w-[150px]">
          <SelectValue placeholder="Payment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Payments</SelectItem>
          <SelectItem v-for="method in paymentMethods" :key="method" :value="method">
            {{ method }}
          </SelectItem>
        </SelectContent>
      </Select>

      <Button v-if="hasFilters" variant="ghost" size="icon" @click="emit('clear')">
        <Icon name="lucide:x" class="size-4" />
      </Button>
    </div>
  </div>
</template>
