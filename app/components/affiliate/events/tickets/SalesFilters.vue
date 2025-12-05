<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const props = defineProps<{
  ticketTypes: string[]
  paymentMethods: string[]
}>()

const searchQuery = defineModel<string>('searchQuery', { default: '' })
const statusFilter = defineModel<string>('statusFilter', { default: 'all' })
const ticketFilter = defineModel<string>('ticketFilter', { default: 'all' })
const paymentFilter = defineModel<string>('paymentFilter', { default: 'all' })

const emit = defineEmits<{
  clear: []
}>()

const hasActiveFilters = computed(() => {
  return searchQuery.value !== '' ||
    statusFilter.value !== 'all' ||
    ticketFilter.value !== 'all' ||
    paymentFilter.value !== 'all'
})

const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = 'all'
  ticketFilter.value = 'all'
  paymentFilter.value = 'all'
  emit('clear')
}
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
    <!-- Search -->
    <div class="relative flex-1 max-w-sm">
      <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input v-model="searchQuery" placeholder="Search by name, contact, ticket..." class="pl-9" />
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-2">
      <!-- Status Filter -->
      <Select v-model="statusFilter">
        <SelectTrigger class="w-[130px]" size="sm">
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

      <!-- Ticket Filter -->
      <Select v-model="ticketFilter">
        <SelectTrigger class="w-[130px]" size="sm">
          <SelectValue placeholder="Ticket" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tickets</SelectItem>
          <SelectItem v-for="ticket in ticketTypes" :key="ticket" :value="ticket">
            {{ ticket }}
          </SelectItem>
        </SelectContent>
      </Select>

      <!-- Payment Filter -->
      <Select v-model="paymentFilter">
        <SelectTrigger class="w-[150px]" size="sm">
          <SelectValue placeholder="Payment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Payments</SelectItem>
          <SelectItem v-for="method in paymentMethods" :key="method" :value="method">
            {{ method }}
          </SelectItem>
        </SelectContent>
      </Select>

      <!-- Clear Filters -->
      <Button
        v-if="hasActiveFilters"
        variant="ghost"
        size="sm"
        class="gap-1 text-muted-foreground"
        @click="clearFilters"
      >
        <Icon name="lucide:x" class="size-4" />
        Clear
      </Button>
    </div>
  </div>
</template>
