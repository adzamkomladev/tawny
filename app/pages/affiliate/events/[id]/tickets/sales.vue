<script lang="ts" setup>
import type { TicketSale } from '@/components/affiliate/events/tickets/SalesTable.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

definePageMeta({
  layout: 'affiliate'
})

useHead({
  title: 'Ticket Sales'
})

const route = useRoute()
const eventId = computed(() => route.params.id as string)

useBreadcrumb().setBreadcrumbs([
  { text: 'Events', url: '/affiliate/events' },
  { text: 'Event Details', url: `/affiliate/events/${eventId.value}` },
  { text: 'Tickets', url: `/affiliate/events/${eventId.value}/tickets` },
  { text: 'Sales', url: `/affiliate/events/${eventId.value}/tickets/sales` },
])

// Stats
const currency = 'GHS'
const stats = computed(() => [
  {
    title: 'Total Sales',
    value: '342',
    subtitle: 'from last week',
    trend: { value: '8.2%', direction: 'up' as const },
    icon: 'lucide:shopping-cart',
    iconBgClass: 'bg-primary/10',
    iconClass: 'text-primary',
  },
  {
    title: 'Total Revenue',
    value: formatCurrency(17100),
    subtitle: 'from last week',
    trend: { value: '12.5%', direction: 'up' as const },
    icon: 'lucide:banknote',
    iconBgClass: 'bg-chart-2/10',
    iconClass: 'text-chart-2',
  },
  {
    title: "Today's Sales",
    value: '28',
    subtitle: `${formatCurrency(1400)} revenue today`,
    icon: 'lucide:calendar-check',
    iconBgClass: 'bg-chart-3/10',
    iconClass: 'text-chart-3',
  },
  {
    title: 'Avg. Order Value',
    value: formatCurrency(50),
    subtitle: 'Per transaction',
    icon: 'lucide:trending-up',
    iconBgClass: 'bg-chart-4/10',
    iconClass: 'text-chart-4',
  },
])

// Search and filters
const searchQuery = ref('')
const statusFilter = ref('all')
const ticketFilter = ref('all')
const paymentFilter = ref('all')

// Pagination
const currentPage = ref(1)
const itemsPerPage = 10

// Mock sales data
const allSales = ref<TicketSale[]>([
  { id: '1', ticket: 'VIP', price: 150, quantity: 2, contact: '+233 24 123 4567', name: 'Kofi Mensah', paymentMethod: 'Mobile Money', status: 'completed', date: '2024-12-05 14:32' },
  { id: '2', ticket: 'Regular', price: 60, quantity: 3, contact: '+233 50 987 6543', name: 'Ama Serwaa', paymentMethod: 'Card', status: 'completed', date: '2024-12-05 13:15' },
  { id: '3', ticket: 'Early Bird', price: 50, quantity: 1, contact: '+233 27 555 1234', name: 'Kwame Asante', paymentMethod: 'Mobile Money', status: 'pending', date: '2024-12-05 12:45' },
  { id: '4', ticket: 'Group (5+)', price: 45, quantity: 5, contact: '+233 20 111 2222', name: 'Akua Boateng', paymentMethod: 'Bank Transfer', status: 'completed', date: '2024-12-05 11:20' },
  { id: '5', ticket: 'VIP', price: 150, quantity: 1, contact: '+233 24 333 4444', name: 'Yaw Darko', paymentMethod: 'Card', status: 'failed', date: '2024-12-05 10:05' },
  { id: '6', ticket: 'Regular', price: 60, quantity: 2, contact: '+233 55 666 7777', name: 'Efua Owusu', paymentMethod: 'Mobile Money', status: 'completed', date: '2024-12-05 09:30' },
  { id: '7', ticket: 'Regular', price: 60, quantity: 1, contact: '+233 26 888 9999', name: 'Kojo Amoah', paymentMethod: 'Card', status: 'refunded', date: '2024-12-04 18:45' },
  { id: '8', ticket: 'VIP', price: 150, quantity: 2, contact: '+233 23 000 1111', name: 'Abena Frimpong', paymentMethod: 'Mobile Money', status: 'completed', date: '2024-12-04 16:20' },
  { id: '9', ticket: 'Early Bird', price: 50, quantity: 4, contact: '+233 54 222 3333', name: 'Kweku Tetteh', paymentMethod: 'Bank Transfer', status: 'completed', date: '2024-12-04 14:10' },
  { id: '10', ticket: 'Group (5+)', price: 45, quantity: 6, contact: '+233 20 444 5555', name: 'Adwoa Mensah', paymentMethod: 'Mobile Money', status: 'pending', date: '2024-12-04 12:55' },
  { id: '11', ticket: 'Regular', price: 60, quantity: 2, contact: '+233 24 777 8888', name: 'Kofi Adjei', paymentMethod: 'Card', status: 'completed', date: '2024-12-04 10:30' },
  { id: '12', ticket: 'VIP', price: 150, quantity: 1, contact: '+233 50 999 0000', name: 'Ama Konadu', paymentMethod: 'Mobile Money', status: 'completed', date: '2024-12-03 17:45' },
  { id: '13', ticket: 'Regular', price: 60, quantity: 3, contact: '+233 27 123 4567', name: 'Yaw Opoku', paymentMethod: 'Bank Transfer', status: 'failed', date: '2024-12-03 15:20' },
  { id: '14', ticket: 'Early Bird', price: 50, quantity: 2, contact: '+233 26 234 5678', name: 'Efua Addai', paymentMethod: 'Mobile Money', status: 'completed', date: '2024-12-03 13:10' },
  { id: '15', ticket: 'Group (5+)', price: 45, quantity: 8, contact: '+233 55 345 6789', name: 'Kojo Antwi', paymentMethod: 'Card', status: 'completed', date: '2024-12-03 11:05' },
])

// Computed values
const ticketTypes = computed(() => [...new Set(allSales.value.map(s => s.ticket))])
const paymentMethods = computed(() => [...new Set(allSales.value.map(s => s.paymentMethod))])

const filteredSales = computed(() => {
  return allSales.value.filter(sale => {
    const matchesSearch = searchQuery.value === '' ||
      sale.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      sale.contact.includes(searchQuery.value) ||
      sale.ticket.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus = statusFilter.value === 'all' || sale.status === statusFilter.value
    const matchesTicket = ticketFilter.value === 'all' || sale.ticket === ticketFilter.value
    const matchesPayment = paymentFilter.value === 'all' || sale.paymentMethod === paymentFilter.value

    return matchesSearch && matchesStatus && matchesTicket && matchesPayment
  })
})

const paginatedSales = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredSales.value.slice(start, end)
})

const hasActiveFilters = computed(() => {
  return searchQuery.value !== '' ||
    statusFilter.value !== 'all' ||
    ticketFilter.value !== 'all' ||
    paymentFilter.value !== 'all'
})

// Reset to page 1 when filters change
watch([searchQuery, statusFilter, ticketFilter, paymentFilter], () => {
  currentPage.value = 1
})

// Helpers
function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

function clearFilters() {
  searchQuery.value = ''
  statusFilter.value = 'all'
  ticketFilter.value = 'all'
  paymentFilter.value = 'all'
}

// Handlers
function handleViewDetails(sale: TicketSale) {
  console.log('View details:', sale)
}

function handleSendReceipt(sale: TicketSale) {
  console.log('Send receipt:', sale)
}

function handleProcessRefund(sale: TicketSale) {
  console.log('Process refund:', sale)
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-6 p-4 pt-0">
    <!-- Page Header -->
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl font-semibold tracking-tight">Ticket Sales</h1>
      <p class="text-muted-foreground text-sm">
        View and manage all ticket purchases for this event
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <AffiliateEventsTicketsSalesStatCard v-for="stat in stats" :key="stat.title" :stat="stat" />
    </div>

    <!-- Sales Table Card -->
    <Card>
      <CardHeader class="pb-4">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Sales History</CardTitle>
          <Button variant="outline" size="sm" class="gap-2">
            <Icon name="lucide:download" class="size-4" />
            Export
          </Button>
        </div>

        <!-- Filters -->
        <div class="pt-4">
          <AffiliateEventsTicketsSalesFilters v-model:search-query="searchQuery" v-model:status-filter="statusFilter"
            v-model:ticket-filter="ticketFilter" v-model:payment-filter="paymentFilter" :ticket-types="ticketTypes"
            :payment-methods="paymentMethods" @clear="clearFilters" />
        </div>
      </CardHeader>

      <CardContent class="p-0">
        <!-- Table -->
        <AffiliateEventsTicketsSalesTable :sales="paginatedSales" :currency="currency"
          :has-active-filters="hasActiveFilters" @view-details="handleViewDetails" @send-receipt="handleSendReceipt"
          @process-refund="handleProcessRefund" @clear-filters="clearFilters" />

        <!-- Pagination -->
        <AffiliateEventsTicketsSalesPagination v-model="currentPage" :total="filteredSales.length"
          :items-per-page="itemsPerPage" />
      </CardContent>
    </Card>
  </div>
</template>