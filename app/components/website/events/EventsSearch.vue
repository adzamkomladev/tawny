<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const props = defineProps<{
  modelValue: string
  type: string
  category: string
  showFilters?: boolean
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:type': [value: string]
  'update:category': [value: string]
}>()

const searchQuery = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})

const selectedType = computed({
  get: () => props.type,
  set: (value: string) => emit('update:type', value),
})

const selectedCategory = computed({
  get: () => props.category,
  set: (value: string) => emit('update:category', value),
})

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'music', label: 'Music & Concerts' },
  { value: 'awards', label: 'Awards' },
  { value: 'pageant', label: 'Pageants' },
  { value: 'conference', label: 'Conferences' },
  { value: 'festival', label: 'Festivals' },
  { value: 'sports', label: 'Sports' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'other', label: 'Other' },
]

const eventTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'tickets', label: 'Tickets' },
  { value: 'voting', label: 'Voting' },
]

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedType.value !== 'all' || selectedCategory.value !== 'all'
})
</script>

<template>
  <div class="space-y-4">
    <!-- Search Input -->
    <div class="relative">
      <div class="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground">
        <Icon name="lucide:search" class="size-5" />
      </div>
      <Input
        v-model="searchQuery"
        type="search"
        :placeholder="placeholder || 'Search events or organizers...'"
        class="pl-12 h-14 text-base bg-background border-2 border-border/50 focus:border-primary/50 rounded-xl shadow-sm"
      />
      <div
        v-if="searchQuery"
        class="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <Button
          variant="ghost"
          size="sm"
          class="size-8 p-0 hover:bg-muted"
          @click="searchQuery = ''"
        >
          <Icon name="lucide:x" class="size-4" />
        </Button>
      </div>
    </div>

    <!-- Filters Row -->
    <div v-if="showFilters !== false" class="flex flex-wrap items-center gap-3">
      <!-- Event Type Filter -->
      <Select v-model="selectedType">
        <SelectTrigger class="w-[150px] h-10 bg-background">
          <div class="flex items-center gap-2">
            <Icon name="lucide:tag" class="size-4 text-muted-foreground" />
            <SelectValue placeholder="Event Type" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="type in eventTypes"
            :key="type.value"
            :value="type.value"
          >
            {{ type.label }}
          </SelectItem>
        </SelectContent>
      </Select>

      <!-- Category Filter -->
      <Select v-model="selectedCategory">
        <SelectTrigger class="w-[170px] h-10 bg-background">
          <div class="flex items-center gap-2">
            <Icon name="lucide:layout-grid" class="size-4 text-muted-foreground" />
            <SelectValue placeholder="Category" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="cat in categories"
            :key="cat.value"
            :value="cat.value"
          >
            {{ cat.label }}
          </SelectItem>
        </SelectContent>
      </Select>

      <!-- Clear Filters -->
      <Button
        v-if="hasActiveFilters"
        variant="outline"
        size="sm"
        class="h-10 gap-1.5"
        @click="searchQuery = ''; selectedType = 'all'; selectedCategory = 'all'"
      >
        <Icon name="lucide:x" class="size-4" />
        Clear filters
      </Button>
    </div>
  </div>
</template>
