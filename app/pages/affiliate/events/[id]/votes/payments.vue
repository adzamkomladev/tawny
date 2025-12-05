<script lang="ts" setup>
import type { VotePayment } from '@/components/affiliate/events/votes/PaymentsTable.vue'
import type { VoteStat } from '@/components/affiliate/events/votes/VotesStatCard.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import VotesStatCard from '@/components/affiliate/events/votes/VotesStatCard.vue'

definePageMeta({
  layout: 'affiliate',
})

useHead({
  title: 'Vote Payments',
})

const route = useRoute()
const eventId = computed(() => route.params.id as string)

useBreadcrumb().setBreadcrumbs([
  { text: 'Events', url: '/affiliate/events' },
  { text: 'Event Details', url: `/affiliate/events/${eventId.value}` },
  { text: 'Votes', url: `/affiliate/events/${eventId.value}/votes` },
  { text: 'Payments', url: `/affiliate/events/${eventId.value}/votes/payments` },
])

// Currency
const currency = 'GHS'

// Stats
const stats = computed<VoteStat[]>(() => [
  {
    title: 'Total Votes',
    value: '12,458',
    subtitle: 'from last week',
    trend: { value: 18.2, isPositive: true },
    icon: 'lucide:vote',
    iconBgClass: 'bg-primary/10',
    iconClass: 'text-primary',
  },
  {
    title: 'Total Revenue',
    value: formatCurrency(24916),
    subtitle: 'from last week',
    trend: { value: 15.8, isPositive: true },
    icon: 'lucide:banknote',
    iconBgClass: 'bg-chart-2/10',
    iconClass: 'text-chart-2',
  },
  {
    title: 'Affiliate Earnings',
    value: formatCurrency(4983),
    subtitle: '20% commission rate',
    icon: 'lucide:wallet',
    iconBgClass: 'bg-chart-3/10',
    iconClass: 'text-chart-3',
  },
  {
    title: "Today's Votes",
    value: '842',
    subtitle: `${formatCurrency(1684)} revenue today`,
    icon: 'lucide:calendar-check',
    iconBgClass: 'bg-chart-4/10',
    iconClass: 'text-chart-4',
  },
])

// Search and filters
const searchQuery = ref('')
const statusFilter = ref('all')
const categoryFilter = ref('all')
const paymentFilter = ref('all')

// Pagination
const currentPage = ref(1)
const itemsPerPage = 10

// Mock payments data
const allPayments = ref<VotePayment[]>([
  { id: '1', category: 'Best Artist', nominee: 'Kofi Artiste', amount: 20, voteCount: 10, customerName: 'Kwame Asante', customerPhone: '+233 24 123 4567', paymentMethod: 'Mobile Money', status: 'completed', date: '2024-12-05 14:32' },
  { id: '2', category: 'Song of the Year', nominee: 'Summer Vibes', amount: 40, voteCount: 20, customerName: 'Ama Serwaa', customerPhone: '+233 50 987 6543', paymentMethod: 'Card', status: 'completed', date: '2024-12-05 13:15' },
  { id: '3', category: 'Best New Artist', nominee: 'Fresh Prince', amount: 15, voteCount: 10, customerName: 'Yaw Mensah', customerPhone: '+233 27 555 1234', paymentMethod: 'USSD', status: 'pending', date: '2024-12-05 12:45' },
  { id: '4', category: 'Best Artist', nominee: 'Ama Stars', amount: 100, voteCount: 50, customerName: 'Akua Boateng', customerPhone: '+233 20 111 2222', paymentMethod: 'Mobile Money', status: 'completed', date: '2024-12-05 11:20' },
  { id: '5', category: 'Best Collaboration', nominee: 'Unity ft. Harmony', amount: 30, voteCount: 15, customerName: 'Kojo Antwi', customerPhone: '+233 24 333 4444', paymentMethod: 'Card', status: 'failed', date: '2024-12-05 10:05' },
  { id: '6', category: 'Song of the Year', nominee: 'Midnight Love', amount: 24, voteCount: 12, customerName: 'Efua Owusu', customerPhone: '+233 55 666 7777', paymentMethod: 'Mobile Money', status: 'completed', date: '2024-12-05 09:30' },
  { id: '7', category: 'Best Music Video', nominee: 'Cinematic Dream', amount: 18, voteCount: 12, customerName: 'Kweku Darko', customerPhone: '+233 26 888 9999', paymentMethod: 'USSD', status: 'refunded', date: '2024-12-04 18:45' },
  { id: '8', category: 'Best Artist', nominee: 'DJ Beats', amount: 50, voteCount: 25, customerName: 'Abena Frimpong', customerPhone: '+233 23 000 1111', paymentMethod: 'Mobile Money', status: 'completed', date: '2024-12-04 16:20' },
  { id: '9', category: 'Fan Favorite', nominee: 'Star Power', amount: 75, voteCount: 30, customerName: 'Kofi Adjei', customerPhone: '+233 54 222 3333', paymentMethod: 'Bank Transfer', status: 'completed', date: '2024-12-04 14:10' },
  { id: '10', category: 'Best New Artist', nominee: 'Young Flow', amount: 22.5, voteCount: 15, customerName: 'Adwoa Mensah', customerPhone: '+233 20 444 5555', paymentMethod: 'Mobile Money', status: 'pending', date: '2024-12-04 12:55' },
  { id: '11', category: 'Song of the Year', nominee: 'Dance Floor', amount: 16, voteCount: 8, customerName: 'Yaw Opoku', customerPhone: '+233 24 777 8888', paymentMethod: 'Card', status: 'completed', date: '2024-12-04 10:30' },
  { id: '12', category: 'Best Artist', nominee: 'Lyrical King', amount: 60, voteCount: 30, customerName: 'Ama Konadu', customerPhone: '+233 50 999 0000', paymentMethod: 'Mobile Money', status: 'completed', date: '2024-12-03 17:45' },
  { id: '13', category: 'Best Collaboration', nominee: 'Duo Masters', amount: 28, voteCount: 14, customerName: 'Kwame Tetteh', customerPhone: '+233 27 123 4567', paymentMethod: 'USSD', status: 'failed', date: '2024-12-03 15:20' },
  { id: '14', category: 'Fan Favorite', nominee: 'The Legend', amount: 50, voteCount: 20, customerName: 'Efua Addai', customerPhone: '+233 26 234 5678', paymentMethod: 'Mobile Money', status: 'completed', date: '2024-12-03 13:10' },
  { id: '15', category: 'Best Music Video', nominee: 'Visual Poetry', amount: 27, voteCount: 18, customerName: 'Kojo Mensah', customerPhone: '+233 55 345 6789', paymentMethod: 'Card', status: 'completed', date: '2024-12-03 11:05' },
])

// Computed values
const categories = computed(() => [...new Set(allPayments.value.map((p) => p.category))])
const paymentMethods = computed(() => [...new Set(allPayments.value.map((p) => p.paymentMethod))])

const filteredPayments = computed(() => {
  return allPayments.value.filter((payment) => {
    const matchesSearch =
      searchQuery.value === '' ||
      payment.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      payment.customerPhone.includes(searchQuery.value) ||
      payment.nominee.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      payment.category.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus = statusFilter.value === 'all' || payment.status === statusFilter.value
    const matchesCategory = categoryFilter.value === 'all' || payment.category === categoryFilter.value
    const matchesPayment = paymentFilter.value === 'all' || payment.paymentMethod === paymentFilter.value

    return matchesSearch && matchesStatus && matchesCategory && matchesPayment
  })
})

const paginatedPayments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredPayments.value.slice(start, end)
})

const hasActiveFilters = computed(() => {
  return (
    searchQuery.value !== '' ||
    statusFilter.value !== 'all' ||
    categoryFilter.value !== 'all' ||
    paymentFilter.value !== 'all'
  )
})

// Reset to page 1 when filters change
watch([searchQuery, statusFilter, categoryFilter, paymentFilter], () => {
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
  categoryFilter.value = 'all'
  paymentFilter.value = 'all'
}

// Handlers
function handleViewDetails(payment: VotePayment) {
  console.log('View details:', payment)
}

function handleSendReceipt(payment: VotePayment) {
  console.log('Send receipt:', payment)
}

function handleProcessRefund(payment: VotePayment) {
  console.log('Process refund:', payment)
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-6 p-4 pt-0">
    <!-- Stats Grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <VotesStatCard v-for="stat in stats" :key="stat.title" :stat="stat" />
    </div>

    <!-- Payments Table Card -->
    <Card>
      <CardHeader class="pb-4">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Payment History</CardTitle>
          <Button variant="outline" size="sm" class="gap-2">
            <Icon name="lucide:download" class="size-4" />
            Export
          </Button>
        </div>

        <!-- Filters -->
        <div class="pt-4">
          <AffiliateEventsVotesPaymentsFilters v-model:search-query="searchQuery" v-model:status-filter="statusFilter"
            v-model:category-filter="categoryFilter" v-model:payment-filter="paymentFilter" :categories="categories"
            :payment-methods="paymentMethods" @clear="clearFilters" />
        </div>
      </CardHeader>

      <CardContent class="p-0">
        <!-- Table -->
        <AffiliateEventsVotesPaymentsTable :payments="paginatedPayments" :currency="currency"
          :has-active-filters="hasActiveFilters" @view-details="handleViewDetails" @send-receipt="handleSendReceipt"
          @process-refund="handleProcessRefund" @clear-filters="clearFilters" />

        <!-- Pagination -->
        <AffiliateEventsVotesPaymentsPagination v-model="currentPage" :total="filteredPayments.length"
          :items-per-page="itemsPerPage" />
      </CardContent>
    </Card>
  </div>
</template>