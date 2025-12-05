<script lang="ts" setup>
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

export interface VotePayment {
  id: string
  category: string
  nominee: string
  amount: number
  voteCount: number
  customerName: string
  customerPhone: string
  customerEmail?: string
  paymentMethod: string
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  date: string
}

const props = defineProps<{
  payments: VotePayment[]
  currency: string
  hasActiveFilters: boolean
}>()

const emit = defineEmits<{
  viewDetails: [payment: VotePayment]
  sendReceipt: [payment: VotePayment]
  processRefund: [payment: VotePayment]
  clearFilters: []
}>()

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return { variant: 'default' as const, label: 'Completed' }
    case 'pending':
      return { variant: 'secondary' as const, label: 'Pending' }
    case 'failed':
      return { variant: 'destructive' as const, label: 'Failed' }
    case 'refunded':
      return { variant: 'outline' as const, label: 'Refunded' }
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-GH', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

const getPaymentIcon = (method: string) => {
  switch (method.toLowerCase()) {
    case 'mobile money':
      return 'lucide:smartphone'
    case 'card':
      return 'lucide:credit-card'
    case 'bank transfer':
      return 'lucide:landmark'
    case 'ussd':
      return 'lucide:hash'
    default:
      return 'lucide:wallet'
  }
}
</script>

<template>
  <div class="overflow-x-auto">
    <Table v-if="payments.length > 0">
      <TableHeader>
        <TableRow>
          <TableHead>Category / Nominee</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead class="text-right">Votes</TableHead>
          <TableHead class="text-right">Amount</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead class="text-right">Date</TableHead>
          <TableHead class="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="payment in payments" :key="payment.id">
          <TableCell>
            <div class="flex flex-col">
              <span class="font-medium">{{ payment.nominee }}</span>
              <span class="text-xs text-muted-foreground">{{ payment.category }}</span>
            </div>
          </TableCell>
          <TableCell>
            <div class="flex flex-col">
              <span class="font-medium">{{ payment.customerName }}</span>
              <span class="text-xs text-muted-foreground">{{ payment.customerPhone }}</span>
            </div>
          </TableCell>
          <TableCell class="text-right font-medium">
            {{ payment.voteCount }}
          </TableCell>
          <TableCell class="text-right font-medium">
            {{ formatCurrency(payment.amount) }}
          </TableCell>
          <TableCell>
            <div class="flex items-center gap-2">
              <Icon :name="getPaymentIcon(payment.paymentMethod)" class="size-4 text-muted-foreground" />
              <span class="text-sm">{{ payment.paymentMethod }}</span>
            </div>
          </TableCell>
          <TableCell>
            <Badge :variant="getStatusBadge(payment.status).variant">
              {{ getStatusBadge(payment.status).label }}
            </Badge>
          </TableCell>
          <TableCell class="text-right text-sm text-muted-foreground">
            {{ formatDate(payment.date) }}
          </TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon" class="size-8">
                  <Icon name="lucide:more-horizontal" class="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem @click="emit('viewDetails', payment)">
                  <Icon name="lucide:eye" class="size-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  v-if="payment.status === 'completed'"
                  @click="emit('sendReceipt', payment)"
                >
                  <Icon name="lucide:receipt" class="size-4 mr-2" />
                  Send Receipt
                </DropdownMenuItem>
                <DropdownMenuSeparator v-if="payment.status === 'completed'" />
                <DropdownMenuItem
                  v-if="payment.status === 'completed'"
                  class="text-destructive"
                  @click="emit('processRefund', payment)"
                >
                  <Icon name="lucide:rotate-ccw" class="size-4 mr-2" />
                  Process Refund
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <!-- Empty State -->
    <Empty v-else class="py-12">
      <EmptyMedia>
        <Icon name="lucide:vote" class="size-12 text-muted-foreground/50" />
      </EmptyMedia>
      <EmptyContent>
        <EmptyTitle>No vote payments found</EmptyTitle>
        <EmptyDescription>
          <template v-if="hasActiveFilters">
            No payments match your current filters. Try adjusting your search criteria.
          </template>
          <template v-else>
            Vote payments will appear here once customers start voting.
          </template>
        </EmptyDescription>
      </EmptyContent>
      <Button v-if="hasActiveFilters" variant="outline" size="sm" @click="emit('clearFilters')">
        Clear Filters
      </Button>
    </Empty>
  </div>
</template>
