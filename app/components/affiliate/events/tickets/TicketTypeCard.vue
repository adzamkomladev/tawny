<script lang="ts" setup>
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface TicketType {
  id: string
  name: string
  description: string
  cost: number
  price: number
  stock: number
  sold: number
  status: 'available' | 'sold-out' | 'paused'
}

const props = defineProps<{
  ticket: TicketType
  currency: string
}>()

const emit = defineEmits<{
  edit: [ticket: TicketType]
  duplicate: [ticket: TicketType]
  toggleStatus: [ticket: TicketType]
  delete: [ticket: TicketType]
}>()

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'sold-out':
      return { variant: 'destructive' as const, label: 'Sold Out' }
    case 'available':
      return { variant: 'default' as const, label: 'Available' }
    case 'paused':
      return { variant: 'secondary' as const, label: 'Paused' }
    default:
      return { variant: 'outline' as const, label: status }
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: props.currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

const calculateProgress = (sold: number, stock: number) => {
  return Math.round((sold / stock) * 100)
}

const ticketRevenue = computed(() => props.ticket.sold * props.ticket.price)
const ticketProfit = computed(() => props.ticket.sold * (props.ticket.price - props.ticket.cost))
</script>

<template>
  <Card class="overflow-hidden">
    <CardHeader class="pb-3">
      <div class="flex items-start justify-between gap-2">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <CardTitle class="text-base truncate">{{ ticket.name }}</CardTitle>
            <Badge :variant="getStatusBadge(ticket.status).variant" class="shrink-0">
              {{ getStatusBadge(ticket.status).label }}
            </Badge>
          </div>
          <CardDescription class="mt-1 line-clamp-2">
            {{ ticket.description }}
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon-sm" class="shrink-0">
              <Icon name="lucide:more-vertical" class="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="emit('edit', ticket)">
              <Icon name="lucide:pencil" class="size-4 mr-2" />
              Edit Ticket
            </DropdownMenuItem>
            <DropdownMenuItem @click="emit('duplicate', ticket)">
              <Icon name="lucide:copy" class="size-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem
              v-if="ticket.status === 'available'"
              @click="emit('toggleStatus', ticket)"
            >
              <Icon name="lucide:pause" class="size-4 mr-2" />
              Pause Sales
            </DropdownMenuItem>
            <DropdownMenuItem
              v-else-if="ticket.status === 'paused'"
              @click="emit('toggleStatus', ticket)"
            >
              <Icon name="lucide:play" class="size-4 mr-2" />
              Resume Sales
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              class="text-destructive focus:text-destructive"
              @click="emit('delete', ticket)"
            >
              <Icon name="lucide:trash-2" class="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
    <CardContent class="pb-3">
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-muted-foreground">Cost</span>
          <p class="font-medium">{{ formatCurrency(ticket.cost) }}</p>
        </div>
        <div>
          <span class="text-muted-foreground">Price</span>
          <p class="font-medium">{{ formatCurrency(ticket.price) }}</p>
        </div>
        <div>
          <span class="text-muted-foreground">Revenue</span>
          <p class="font-medium text-green-600 dark:text-green-400">
            {{ formatCurrency(ticketRevenue) }}
          </p>
        </div>
        <div>
          <span class="text-muted-foreground">Profit</span>
          <p class="font-medium text-primary">
            {{ formatCurrency(ticketProfit) }}
          </p>
        </div>
      </div>
    </CardContent>
    <CardFooter class="border-t bg-muted/30 pt-3">
      <div class="w-full space-y-2">
        <div class="flex items-center justify-between text-sm">
          <span class="text-muted-foreground">Sales Progress</span>
          <span class="font-medium">{{ ticket.sold }}/{{ ticket.stock }}</span>
        </div>
        <Progress :model-value="calculateProgress(ticket.sold, ticket.stock)" class="h-2" />
      </div>
    </CardFooter>
  </Card>
</template>
