<script lang="ts" setup>
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface EventInfo {
  id: string
  name: string
  date: string
  time: string
  location: string
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled'
  coverImage?: string
  hasTickets: boolean
  hasVoting: boolean
}

const props = defineProps<{
  event: EventInfo
}>()

const emit = defineEmits<{
  edit: []
  publish: []
  duplicate: []
  delete: []
}>()

const getStatusVariant = (status: EventInfo['status']) => {
  switch (status) {
    case 'published':
      return 'default'
    case 'ongoing':
      return 'default'
    case 'completed':
      return 'secondary'
    case 'cancelled':
      return 'destructive'
    default:
      return 'outline'
  }
}

const getStatusLabel = (status: EventInfo['status']) => {
  switch (status) {
    case 'draft':
      return 'Draft'
    case 'published':
      return 'Published'
    case 'ongoing':
      return 'Live Now'
    case 'completed':
      return 'Completed'
    case 'cancelled':
      return 'Cancelled'
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="relative overflow-hidden rounded-xl border bg-card">
    <!-- Cover image background -->
    <div class="absolute inset-0 h-32">
      <div
        v-if="event.coverImage"
        class="h-full w-full bg-cover bg-center"
        :style="{ backgroundImage: `url(${event.coverImage})` }"
      />
      <div v-else class="h-full w-full bg-linear-to-br from-primary/20 via-primary/10 to-transparent" />
      <div class="absolute inset-0 bg-linear-to-b from-transparent via-card/50 to-card" />
    </div>

    <!-- Content -->
    <div class="relative p-5 pt-20">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <!-- Event info -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <Badge :variant="getStatusVariant(event.status)" class="text-xs">
              <span v-if="event.status === 'ongoing'" class="mr-1.5 h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
              {{ getStatusLabel(event.status) }}
            </Badge>
            <Badge v-if="event.hasTickets" variant="outline" class="text-xs">
              <Icon name="lucide:ticket" class="mr-1 size-3" />
              Tickets
            </Badge>
            <Badge v-if="event.hasVoting" variant="outline" class="text-xs">
              <Icon name="lucide:vote" class="mr-1 size-3" />
              Voting
            </Badge>
          </div>

          <h1 class="text-2xl font-bold tracking-tight">{{ event.name }}</h1>

          <div class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div class="flex items-center gap-1.5">
              <Icon name="lucide:calendar" class="size-4" />
              <span>{{ formatDate(event.date) }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <Icon name="lucide:clock" class="size-4" />
              <span>{{ event.time }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <Icon name="lucide:map-pin" class="size-4" />
              <span>{{ event.location }}</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" @click="emit('edit')">
            <Icon name="lucide:pencil" class="mr-1.5 size-4" />
            Edit
          </Button>
          <Button v-if="event.status === 'draft'" size="sm" @click="emit('publish')">
            <Icon name="lucide:rocket" class="mr-1.5 size-4" />
            Publish
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="icon" class="size-8">
                <Icon name="lucide:more-vertical" class="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="emit('duplicate')">
                <Icon name="lucide:copy" class="mr-2 size-4" />
                Duplicate Event
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem class="text-destructive" @click="emit('delete')">
                <Icon name="lucide:trash-2" class="mr-2 size-4" />
                Delete Event
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </div>
</template>
