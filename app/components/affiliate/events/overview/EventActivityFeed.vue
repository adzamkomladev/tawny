<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export interface ActivityItem {
  id: string
  type: 'ticket_sale' | 'vote' | 'refund' | 'check_in' | 'registration'
  description: string
  amount?: number
  timestamp: string
  user?: {
    name: string
    avatar?: string
  }
}

defineProps<{
  activities: ActivityItem[]
}>()

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'ticket_sale':
      return 'lucide:ticket'
    case 'vote':
      return 'lucide:vote'
    case 'refund':
      return 'lucide:rotate-ccw'
    case 'check_in':
      return 'lucide:scan-line'
    case 'registration':
      return 'lucide:user-plus'
  }
}

const getActivityColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'ticket_sale':
      return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
    case 'vote':
      return 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
    case 'refund':
      return 'bg-red-500/15 text-red-600 dark:text-red-400'
    case 'check_in':
      return 'bg-purple-500/15 text-purple-600 dark:text-purple-400'
    case 'registration':
      return 'bg-primary/15 text-primary'
  }
}

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>

<template>
  <Card class="p-4">
    <CardHeader class="flex flex-row items-center justify-between p-0 pb-3">
      <CardTitle class="text-sm font-semibold">Recent Activity</CardTitle>
      <NuxtLink 
        to="#" 
        class="text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        View all
      </NuxtLink>
    </CardHeader>
    <CardContent class="p-0">
      <ScrollArea class="h-[280px] pr-3">
        <div class="space-y-3">
          <div
            v-for="activity in activities"
            :key="activity.id"
            class="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
          >
            <!-- Activity icon -->
            <div
              class="flex size-8 shrink-0 items-center justify-center rounded-full"
              :class="getActivityColor(activity.type)"
            >
              <Icon :name="getActivityIcon(activity.type)" class="size-4" />
            </div>

            <!-- Content -->
            <div class="min-w-0 flex-1">
              <p class="text-sm leading-snug">
                <span v-if="activity.user" class="font-medium">{{ activity.user.name }}</span>
                {{ activity.description }}
                <span v-if="activity.amount" class="font-semibold text-emerald-600 dark:text-emerald-400">
                  GHS {{ activity.amount.toLocaleString() }}
                </span>
              </p>
              <p class="mt-0.5 text-xs text-muted-foreground">
                {{ formatTime(activity.timestamp) }}
              </p>
            </div>

            <!-- User avatar (if present) -->
            <Avatar v-if="activity.user" class="size-6">
              <AvatarImage v-if="activity.user.avatar" :src="activity.user.avatar!" />
              <AvatarFallback class="text-[10px]">
                {{ getInitials(activity.user.name) }}
              </AvatarFallback>
            </Avatar>
          </div>

          <!-- Empty state -->
          <div
            v-if="activities.length === 0"
            class="flex flex-col items-center justify-center py-8 text-center"
          >
            <div class="flex size-12 items-center justify-center rounded-full bg-muted">
              <Icon name="lucide:activity" class="size-6 text-muted-foreground" />
            </div>
            <p class="mt-3 text-sm font-medium text-muted-foreground">No recent activity</p>
            <p class="text-xs text-muted-foreground">Activities will appear here as they happen</p>
          </div>
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
</template>
