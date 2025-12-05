<script setup lang="ts">
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

export interface TicketSale {
  id: string
  ticket: string
  price: number
  quantity: number
  contact: string
  name: string
  paymentMethod: string
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  date: string
}

const props = defineProps<{
  sales: TicketSale[]
  currency: string
  hasActiveFilters?: boolean
}>()

const emit = defineEmits<{
  viewDetails: [sale: TicketSale]
  sendReceipt: [sale: TicketSale]
  processRefund: [sale: TicketSale]
  clearFilters: []
}>()

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return { variant: 'default' as const, label: 'Completed', class: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' }
    case 'pending':
      return { variant: 'secondary' as const, label: 'Pending', class: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20' }
    case 'failed':
      return { variant: 'destructive' as const, label: 'Failed', class: '' }
    case 'refunded':
      return { variant: 'outline' as const, label: 'Refunded', class: 'bg-muted' }
    default:
      return { variant: 'outline' as const, label: status, class: '' }
  }
}

const getPaymentIcon = (method: string) => {
  switch (method) {
    case 'Mobile Money':
      return 'lucide:smartphone'
    case 'Card':
      return 'lucide:credit-card'
    case 'Bank Transfer':
      return 'lucide:landmark'
    default:
      return 'lucide:wallet'
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: props.currency,
    minimumFractionDigits: 0,
  }).format(amount)
}
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow class="hover:bg-transparent">
        <TableHead>Ticket</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Qty</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Payment</TableHead>
        <TableHead>Status</TableHead>
        <TableHead class="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="sale in sales" :key="sale.id">
        <TableCell>
          <div class="flex items-center gap-2">
            <div class="rounded-md bg-primary/10 p-1.5">
              <Icon name="lucide:ticket" class="size-3.5 text-primary" />
            </div>
            <span class="font-medium">{{ sale.ticket }}</span>
          </div>
        </TableCell>
        <TableCell class="font-medium">{{ formatCurrency(sale.price) }}</TableCell>
        <TableCell>
          <Badge variant="secondary" class="font-mono">×{{ sale.quantity }}</Badge>
        </TableCell>
        <TableCell>
          <div class="flex flex-col">
            <span class="font-medium">{{ sale.name }}</span>
            <span class="text-xs text-muted-foreground">{{ sale.contact }}</span>
          </div>
        </TableCell>
        <TableCell>
          <div class="flex items-center gap-2">
            <Icon :name="getPaymentIcon(sale.paymentMethod)" class="size-4 text-muted-foreground" />
            <span class="text-sm">{{ sale.paymentMethod }}</span>
          </div>
        </TableCell>
        <TableCell>
          <Badge :variant="getStatusBadge(sale.status).variant" :class="getStatusBadge(sale.status).class">
            {{ getStatusBadge(sale.status).label }}
          </Badge>
        </TableCell>
        <TableCell class="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="icon-sm">
                <Icon name="lucide:more-horizontal" class="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="emit('viewDetails', sale)">
                <Icon name="lucide:eye" class="size-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem @click="emit('sendReceipt', sale)">
                <Icon name="lucide:receipt" class="size-4 mr-2" />
                Send Receipt
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                v-if="sale.status === 'completed'"
                class="text-destructive focus:text-destructive"
                @click="emit('processRefund', sale)"
              >
                <Icon name="lucide:rotate-ccw" class="size-4 mr-2" />
                Process Refund
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <!-- Empty State -->
      <TableRow v-if="sales.length === 0">
        <TableCell colspan="7" class="h-32 text-center">
          <div class="flex flex-col items-center gap-2">
            <Icon name="lucide:inbox" class="size-8 text-muted-foreground/50" />
            <p class="text-muted-foreground">No sales found</p>
            <Button v-if="hasActiveFilters" variant="outline" size="sm" @click="emit('clearFilters')">
              Clear filters
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
