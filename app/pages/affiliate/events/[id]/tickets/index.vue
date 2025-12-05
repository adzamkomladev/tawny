<script lang="ts" setup>
import { VisXYContainer, VisLine, VisArea, VisAxis, VisBulletLegend } from '@unovis/vue'
import type { ChartConfig } from '@/components/ui/chart'
import { ChartContainer, ChartTooltip, ChartCrosshair, ChartTooltipContent, componentToString } from '@/components/ui/chart'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

definePageMeta({
  layout: 'affiliate'
})

useHead({
  title: 'Tickets Overview'
})

const route = useRoute()
const eventId = computed(() => route.params.id as string)

useBreadcrumb().setBreadcrumbs([
  { text: 'Events', url: '/affiliate/events' },
  { text: 'Event Details', url: `/affiliate/events/${eventId.value}` },
  { text: 'Tickets', url: `/affiliate/events/${eventId.value}/tickets` },
])

// Stats data
const stats = ref({
  totalTickets: 500,
  soldTickets: 342,
  ticketRevenue: 17100,
  earnings: 3420,
  currency: 'GHS'
})

// Chart period
const chartPeriod = ref<'hourly' | 'daily' | 'monthly'>('daily')

// Chart data for different periods
const hourlyData = ref([
  { time: '6AM', sales: 5, revenue: 250 },
  { time: '8AM', sales: 12, revenue: 600 },
  { time: '10AM', sales: 25, revenue: 1250 },
  { time: '12PM', sales: 45, revenue: 2250 },
  { time: '2PM', sales: 38, revenue: 1900 },
  { time: '4PM', sales: 52, revenue: 2600 },
  { time: '6PM', sales: 68, revenue: 3400 },
  { time: '8PM', sales: 55, revenue: 2750 },
  { time: '10PM', sales: 42, revenue: 2100 },
])

const dailyData = ref([
  { time: 'Mon', sales: 45, revenue: 2250 },
  { time: 'Tue', sales: 52, revenue: 2600 },
  { time: 'Wed', sales: 38, revenue: 1900 },
  { time: 'Thu', sales: 65, revenue: 3250 },
  { time: 'Fri', sales: 78, revenue: 3900 },
  { time: 'Sat', sales: 42, revenue: 2100 },
  { time: 'Sun', sales: 22, revenue: 1100 },
])

const monthlyData = ref([
  { time: 'Jan', sales: 120, revenue: 6000 },
  { time: 'Feb', sales: 180, revenue: 9000 },
  { time: 'Mar', sales: 250, revenue: 12500 },
  { time: 'Apr', sales: 310, revenue: 15500 },
  { time: 'May', sales: 280, revenue: 14000 },
  { time: 'Jun', sales: 342, revenue: 17100 },
])

const chartData = computed(() => {
  switch (chartPeriod.value) {
    case 'hourly':
      return hourlyData.value
    case 'monthly':
      return monthlyData.value
    default:
      return dailyData.value
  }
})

const chartConfig: ChartConfig = {
  sales: {
    label: 'Tickets Sold',
    color: 'var(--primary)',
  },
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-2)',
  },
}

// Ticket types
const ticketTypes = ref([
  {
    id: '1',
    name: 'Early Bird',
    description: 'Limited early access tickets at a discounted price',
    cost: 35,
    price: 50,
    stock: 100,
    sold: 100,
    status: 'sold-out',
  },
  {
    id: '2',
    name: 'Regular',
    description: 'Standard admission ticket for general entry',
    cost: 40,
    price: 60,
    stock: 300,
    sold: 192,
    status: 'available',
  },
  {
    id: '3',
    name: 'VIP',
    description: 'Premium experience with exclusive perks and front-row access',
    cost: 80,
    price: 150,
    stock: 50,
    sold: 35,
    status: 'available',
  },
  {
    id: '4',
    name: 'Group (5+)',
    description: 'Special rate for groups of 5 or more attendees',
    cost: 35,
    price: 45,
    stock: 50,
    sold: 15,
    status: 'available',
  },
])

// Sheet state for create/edit
const isSheetOpen = ref(false)
const editingTicket = ref<typeof ticketTypes.value[0] | null>(null)

const openCreateSheet = () => {
  editingTicket.value = null
  isSheetOpen.value = true
}

const openEditSheet = (ticket: typeof ticketTypes.value[0]) => {
  editingTicket.value = { ...ticket }
  isSheetOpen.value = true
}

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
    currency: stats.value.currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

const calculateProgress = (sold: number, stock: number) => {
  return Math.round((sold / stock) * 100)
}

const calculateTicketRevenue = (ticket: typeof ticketTypes.value[0]) => {
  return ticket.sold * ticket.price
}

const calculateTicketProfit = (ticket: typeof ticketTypes.value[0]) => {
  return ticket.sold * (ticket.price - ticket.cost)
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-6 p-4 pt-0">
    <!-- Page Header -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Tickets Overview</h1>
        <p class="text-muted-foreground text-sm">
          Monitor sales, revenue, and manage your event tickets
        </p>
      </div>
      <Button @click="openCreateSheet" class="gap-2">
        <Icon name="lucide:plus" class="size-4" />
        Create Ticket
      </Button>
    </div>

    <!-- Stats Grid: 2x2 -->
    <div class="grid gap-4 sm:grid-cols-2">
      <!-- Total Tickets -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">Total Tickets</CardTitle>
          <div class="rounded-md bg-primary/10 p-2">
            <Icon name="lucide:ticket" class="size-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-3xl font-bold">{{ stats.totalTickets.toLocaleString() }}</div>
          <p class="text-xs text-muted-foreground mt-1">
            Across {{ ticketTypes.length }} ticket types
          </p>
        </CardContent>
      </Card>

      <!-- Sold Tickets -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">Sold Tickets</CardTitle>
          <div class="rounded-md bg-chart-2/10 p-2">
            <Icon name="lucide:users" class="size-4 text-chart-2" />
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-3xl font-bold">{{ stats.soldTickets.toLocaleString() }}</div>
          <div class="flex items-center gap-2 mt-1">
            <Progress :model-value="(stats.soldTickets / stats.totalTickets) * 100" class="h-1.5" />
            <span class="text-xs text-muted-foreground">
              {{ Math.round((stats.soldTickets / stats.totalTickets) * 100) }}%
            </span>
          </div>
        </CardContent>
      </Card>

      <!-- Ticket Revenue -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">Ticket Revenue</CardTitle>
          <div class="rounded-md bg-chart-3/10 p-2">
            <Icon name="lucide:banknote" class="size-4 text-chart-3" />
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-3xl font-bold">{{ formatCurrency(stats.ticketRevenue) }}</div>
          <p class="text-xs text-muted-foreground mt-1">
            <span class="text-green-600 dark:text-green-400 font-medium">↑ 12.5%</span> from last week
          </p>
        </CardContent>
      </Card>

      <!-- Earnings -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">Your Earnings</CardTitle>
          <div class="rounded-md bg-chart-4/10 p-2">
            <Icon name="lucide:wallet" class="size-4 text-chart-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-3xl font-bold">{{ formatCurrency(stats.earnings) }}</div>
          <p class="text-xs text-muted-foreground mt-1">
            20% affiliate commission
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Sales Chart -->
    <Card>
      <CardHeader class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Sales Analytics</CardTitle>
          <CardDescription>
            Track ticket sales and revenue over time
          </CardDescription>
        </div>
        <Tabs v-model="chartPeriod" class="w-auto">
          <TabsList class="h-8">
            <TabsTrigger value="hourly" class="text-xs px-3">Hourly</TabsTrigger>
            <TabsTrigger value="daily" class="text-xs px-3">Daily</TabsTrigger>
            <TabsTrigger value="monthly" class="text-xs px-3">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent class="pt-0">
        <ChartContainer :config="chartConfig" class="h-[300px] w-full">
          <VisBulletLegend :items="[
            { name: 'Tickets Sold', color: 'var(--primary)' },
            { name: 'Revenue', color: 'var(--chart-2)' }
          ]" />
          <VisXYContainer :data="chartData" :margin="{ top: 20, right: 20, bottom: 30, left: 50 }">
            <VisArea :x="(_: any, i: number) => i" :y="(d: any) => d.sales" color="var(--primary)" :opacity="0.15"
              curve-type="monotone" />
            <VisLine :x="(_: any, i: number) => i" :y="(d: any) => d.sales" color="var(--primary)" :line-width="2"
              curve-type="monotone" />
            <VisArea :x="(_: any, i: number) => i" :y="(d: any) => d.revenue / 50" color="var(--chart-2)" :opacity="0.1"
              curve-type="monotone" />
            <VisLine :x="(_: any, i: number) => i" :y="(d: any) => d.revenue / 50" color="var(--chart-2)"
              :line-width="2" curve-type="monotone" />
            <VisAxis type="x" :tick-format="(i: number) => chartData[i]?.time ?? ''" :grid-line="false" />
            <VisAxis type="y" :grid-line="true" />
            <ChartCrosshair color="var(--primary)" :opacity="0.3" />
            <ChartTooltip :render="componentToString(chartConfig, ChartTooltipContent, {
              labelFormatter: (d: number | Date) => {
                const i = typeof d === 'number' ? d : 0
                return chartData[i]?.time ?? ''
              }
            })" />
          </VisXYContainer>
        </ChartContainer>
      </CardContent>
    </Card>

    <!-- Ticket Types Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold">Ticket Types</h2>
          <p class="text-sm text-muted-foreground">
            Manage pricing, availability, and track sales for each ticket type
          </p>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <Card v-for="ticket in ticketTypes" :key="ticket.id" class="overflow-hidden">
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
                  <DropdownMenuItem @click="openEditSheet(ticket)">
                    <Icon name="lucide:pencil" class="size-4 mr-2" />
                    Edit Ticket
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="lucide:copy" class="size-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem v-if="ticket.status === 'available'">
                    <Icon name="lucide:pause" class="size-4 mr-2" />
                    Pause Sales
                  </DropdownMenuItem>
                  <DropdownMenuItem v-else-if="ticket.status === 'paused'">
                    <Icon name="lucide:play" class="size-4 mr-2" />
                    Resume Sales
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem class="text-destructive focus:text-destructive">
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
                  {{ formatCurrency(calculateTicketRevenue(ticket)) }}
                </p>
              </div>
              <div>
                <span class="text-muted-foreground">Profit</span>
                <p class="font-medium text-primary">
                  {{ formatCurrency(calculateTicketProfit(ticket)) }}
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
      </div>
    </div>

    <!-- Create/Edit Sheet -->
    <Sheet v-model:open="isSheetOpen">
      <SheetContent class="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{{ editingTicket ? 'Edit Ticket' : 'Create Ticket' }}</SheetTitle>
          <SheetDescription>
            {{ editingTicket ? 'Update your ticket details below.' : 'Add a new ticket type for your event.' }}
          </SheetDescription>
        </SheetHeader>
        <div class="grid gap-4 py-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Ticket Name</label>
            <input type="text" :value="editingTicket?.name ?? ''" placeholder="e.g., VIP, Early Bird"
              class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Description</label>
            <textarea :value="editingTicket?.description ?? ''" placeholder="Describe what's included with this ticket"
              rows="3"
              class="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">Cost ({{ stats.currency }})</label>
              <input type="number" :value="editingTicket?.cost ?? ''" placeholder="0.00"
                class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Price ({{ stats.currency }})</label>
              <input type="number" :value="editingTicket?.price ?? ''" placeholder="0.00"
                class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Stock Quantity</label>
            <input type="number" :value="editingTicket?.stock ?? ''" placeholder="100"
              class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
            <p class="text-xs text-muted-foreground">
              Leave empty for unlimited tickets
            </p>
          </div>
        </div>
        <SheetFooter>
          <SheetClose as-child>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>
            {{ editingTicket ? 'Save Changes' : 'Create Ticket' }}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>