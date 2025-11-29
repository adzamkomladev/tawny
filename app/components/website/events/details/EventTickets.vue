<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export interface Ticket {
  id: string | number
  name: string
  description?: string
  price: number
  currency: string
  originalPrice?: number
  available: number
  total: number
  maxPerOrder: number
  benefits?: string[]
  popular?: boolean
  soldOut?: boolean
  showAvailability?: boolean
}

defineProps<{
  tickets: Ticket[]
  isLive: boolean
}>()

function formatPrice(price: number, currency: string): string {
  return `${currency}${price.toLocaleString()}`
}

function getAvailabilityPercentage(available: number, total: number): number {
  return ((total - available) / total) * 100
}

function getAvailabilityColor(available: number, total: number): string {
  const percentage = getAvailabilityPercentage(available, total)
  if (percentage >= 90) return 'bg-red-500'
  if (percentage >= 70) return 'bg-orange-500'
  return 'bg-primary'
}
</script>

<template>
  <Card class="border-border/50 overflow-hidden">
    <CardHeader class="bg-linear-to-r from-primary/5 to-transparent">
      <div class="flex items-center justify-between">
        <CardTitle class="flex items-center gap-2">
          <Icon name="lucide:ticket" class="size-5 text-primary" />
          Tickets
        </CardTitle>
        <Badge v-if="isLive" class="bg-green-500/10 text-green-600 border-green-500/20">
          <span class="relative flex size-2 mr-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
            <span class="relative inline-flex rounded-full size-2 bg-green-500" />
          </span>
          On Sale
        </Badge>
      </div>
    </CardHeader>
    <CardContent class="p-0">
      <div class="divide-y divide-border">
        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          class="p-6 hover:bg-muted/30 transition-colors relative"
          :class="{ 'opacity-60': ticket.soldOut }"
        >
          <!-- Popular Badge -->
          <Badge
            v-if="ticket.popular && !ticket.soldOut"
            class="absolute top-4 right-4 bg-primary text-primary-foreground"
          >
            <Icon name="lucide:star" class="size-3 mr-1" />
            Popular
          </Badge>

          <!-- Sold Out Overlay -->
          <Badge
            v-if="ticket.soldOut"
            variant="destructive"
            class="absolute top-4 right-4"
          >
            Sold Out
          </Badge>

          <div class="flex flex-col lg:flex-row lg:items-center gap-6">
            <!-- Ticket Info -->
            <div class="flex-1 space-y-3">
              <div>
                <h4 class="font-bold text-lg">{{ ticket.name }}</h4>
                <p v-if="ticket.description" class="text-sm text-muted-foreground mt-1">
                  {{ ticket.description }}
                </p>
              </div>

              <!-- Benefits -->
              <ul v-if="ticket.benefits && ticket.benefits.length > 0" class="space-y-1.5">
                <li
                  v-for="(benefit, index) in ticket.benefits"
                  :key="index"
                  class="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Icon name="lucide:check-circle" class="size-4 text-primary shrink-0" />
                  {{ benefit }}
                </li>
              </ul>

              <!-- Availability Progress -->
              <div v-if="!ticket.soldOut && ticket.showAvailability !== false" class="space-y-1.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-muted-foreground">{{ ticket.available }} remaining</span>
                  <span class="text-muted-foreground">{{ Math.round(getAvailabilityPercentage(ticket.available, ticket.total)) }}% sold</span>
                </div>
                <Progress
                  :model-value="getAvailabilityPercentage(ticket.available, ticket.total)"
                  class="h-1.5"
                  :class="getAvailabilityColor(ticket.available, ticket.total)"
                />
              </div>
            </div>

            <!-- Price & Action -->
            <div class="flex items-center gap-6 lg:flex-col lg:items-end lg:gap-3">
              <div class="text-right">
                <div v-if="ticket.originalPrice" class="text-sm text-muted-foreground line-through">
                  {{ formatPrice(ticket.originalPrice, ticket.currency) }}
                </div>
                <div class="text-2xl font-bold text-primary">
                  {{ formatPrice(ticket.price, ticket.currency) }}
                </div>
              </div>
              <Button
                :disabled="ticket.soldOut"
                class="gap-2 min-w-[140px]"
              >
                <Icon name="lucide:shopping-cart" class="size-4" />
                {{ ticket.soldOut ? 'Sold Out' : 'Buy Now' }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
