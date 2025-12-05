<script lang="ts" setup>
import type { TicketStat } from '@/components/affiliate/events/tickets/TicketsStatCard.vue'
import type { TicketType } from '@/components/affiliate/events/tickets/TicketTypeCard.vue'
import { Button } from '@/components/ui/button'
import TicketsStatCard from '~/components/affiliate/events/tickets/TicketsStatCard.vue'
import TicketsChart from '~/components/affiliate/events/tickets/TicketsChart.vue'

definePageMeta({
  layout: 'affiliate',
})

useHead({
  title: 'Tickets Overview',
})

const route = useRoute()
const eventId = computed(() => route.params.id as string)

useBreadcrumb().setBreadcrumbs([
  { text: 'Events', url: '/affiliate/events' },
  { text: 'Event Details', url: `/affiliate/events/${eventId.value}` },
  { text: 'Tickets', url: `/affiliate/events/${eventId.value}/tickets` },
])

// Currency
const currency = 'GHS'

// Stats data
const statsData = ref({
  totalTickets: 500,
  soldTickets: 342,
  ticketRevenue: 17100,
  earnings: 3420,
})

const stats = computed<TicketStat[]>(() => [
  {
    title: 'Total Tickets',
    value: statsData.value.totalTickets.toLocaleString(),
    subtitle: `Across ${ticketTypes.value.length} ticket types`,
    icon: 'lucide:ticket',
    iconBgClass: 'bg-primary/10',
    iconClass: 'text-primary',
  },
  {
    title: 'Sold Tickets',
    value: statsData.value.soldTickets.toLocaleString(),
    progress: {
      value: statsData.value.soldTickets,
      max: statsData.value.totalTickets,
    },
    icon: 'lucide:users',
    iconBgClass: 'bg-chart-2/10',
    iconClass: 'text-chart-2',
  },
  {
    title: 'Ticket Revenue',
    value: formatCurrency(statsData.value.ticketRevenue),
    subtitle: 'from last week',
    trend: { value: 12.5, isPositive: true },
    icon: 'lucide:banknote',
    iconBgClass: 'bg-chart-3/10',
    iconClass: 'text-chart-3',
  },
  {
    title: 'Your Earnings',
    value: formatCurrency(statsData.value.earnings),
    subtitle: '20% affiliate commission',
    icon: 'lucide:wallet',
    iconBgClass: 'bg-chart-4/10',
    iconClass: 'text-chart-4',
  },
])

// Chart data
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

// Ticket types
const ticketTypes = ref<TicketType[]>([
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

// Sheet state
const isSheetOpen = ref(false)
const editingTicket = ref<TicketType | null>(null)

const openCreateSheet = () => {
  editingTicket.value = null
  isSheetOpen.value = true
}

const handleEdit = (ticket: TicketType) => {
  editingTicket.value = { ...ticket }
  isSheetOpen.value = true
}

const handleDuplicate = (ticket: TicketType) => {
  const newTicket: TicketType = {
    ...ticket,
    id: crypto.randomUUID(),
    name: `${ticket.name} (Copy)`,
    sold: 0,
    status: 'available',
  }
  ticketTypes.value.push(newTicket)
}

const handleToggleStatus = (ticket: TicketType) => {
  const index = ticketTypes.value.findIndex((t) => t.id === ticket.id)
  if (index !== -1 && ticketTypes.value[index]) {
    ticketTypes.value[index].status = ticket.status === 'available' ? 'paused' : 'available'
  }
}

const handleDelete = (ticket: TicketType) => {
  ticketTypes.value = ticketTypes.value.filter((t) => t.id !== ticket.id)
}

const handleSaveTicket = (ticketData: Partial<TicketType>) => {
  if (ticketData.id) {
    const index = ticketTypes.value.findIndex((t) => t.id === ticketData.id)
    if (index !== -1) {
      ticketTypes.value[index] = { ...ticketTypes.value[index], ...ticketData } as TicketType
    }
  } else {
    ticketTypes.value.push({
      id: crypto.randomUUID(),
      sold: 0,
      ...ticketData,
    } as TicketType)
  }
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}
</script>

<template>
  <div class="px-5 py-6 space-y-8">
    <div class="grid gap-4 sm:grid-cols-2">
      <!-- Stats Grid: 2x2 -->
      <div class="grid gap-4 sm:grid-cols-2">
        <TicketsStatCard v-for="stat in stats" :key="stat.title" :stat="stat" />
      </div>

      <!-- Sales Chart -->
      <TicketsChart :hourly-data="hourlyData" :daily-data="dailyData" :monthly-data="monthlyData" />
    </div>

    <!-- Ticket Types Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold">Ticket Types</h2>
          <p class="text-sm text-muted-foreground">
            Manage pricing, availability, and track sales for each ticket type
          </p>
        </div>
        <Button @click="openCreateSheet" class="gap-2">
          <Icon name="lucide:plus" class="size-4" />
          Create Ticket
        </Button>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <AffiliateEventsTicketsTicketTypeCard v-for="ticket in ticketTypes" :key="ticket.id" :ticket="ticket"
          :currency="currency" @edit="handleEdit" @duplicate="handleDuplicate" @toggle-status="handleToggleStatus"
          @delete="handleDelete" />
      </div>
    </div>

    <!-- Create/Edit Sheet -->
    <AffiliateEventsTicketsTicketSheet v-model:open="isSheetOpen" :editing-ticket="editingTicket" :currency="currency"
      @save="handleSaveTicket" />
  </div>
</template>