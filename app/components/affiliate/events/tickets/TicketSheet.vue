<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import type { TicketType } from './TicketTypeCard.vue'

const props = defineProps<{
  open: boolean
  editingTicket: TicketType | null
  currency: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  save: [ticket: Partial<TicketType>]
}>()

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
})

const form = ref({
  name: '',
  description: '',
  cost: 0,
  price: 0,
  stock: 100,
})

watch(
  () => props.editingTicket,
  (ticket) => {
    if (ticket) {
      form.value = {
        name: ticket.name,
        description: ticket.description,
        cost: ticket.cost,
        price: ticket.price,
        stock: ticket.stock,
      }
    } else {
      form.value = {
        name: '',
        description: '',
        cost: 0,
        price: 0,
        stock: 100,
      }
    }
  },
  { immediate: true }
)

const handleSave = () => {
  const ticketData: Partial<TicketType> = {
    ...form.value,
    status: 'available',
  }
  if (props.editingTicket) {
    ticketData.id = props.editingTicket.id
    ticketData.sold = props.editingTicket.sold
    ticketData.status = props.editingTicket.status
  }
  emit('save', ticketData)
  isOpen.value = false
}

const isValid = computed(() => {
  return form.value.name.trim() !== '' && form.value.price > 0 && form.value.stock > 0
})
</script>

<template>
  <Sheet v-model:open="isOpen">
    <SheetContent class="sm:max-w-md overflow-y-auto">
      <SheetHeader>
        <SheetTitle>{{ editingTicket ? 'Edit Ticket' : 'Create Ticket' }}</SheetTitle>
        <SheetDescription>
          {{ editingTicket ? 'Update your ticket details below.' : 'Add a new ticket type for your event.' }}
        </SheetDescription>
      </SheetHeader>
      <div class="grid gap-4 py-4">
        <!-- Ticket Name -->
        <div class="space-y-2">
          <Label for="name" class="font-semibold">Ticket Name</Label>
          <Input
            id="name"
            v-model="form.name"
            placeholder="e.g., VIP, Early Bird"
          />
        </div>

        <!-- Description -->
        <div class="space-y-2">
          <Label for="description" class="font-semibold">Description</Label>
          <Textarea
            id="description"
            v-model="form.description"
            placeholder="Describe what's included with this ticket"
            :rows="3"
          />
        </div>

        <!-- Cost and Price -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="cost" class="font-semibold">Cost ({{ currency }})</Label>
            <Input
              id="cost"
              v-model.number="form.cost"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>
          <div class="space-y-2">
            <Label for="price" class="font-semibold">Price ({{ currency }})</Label>
            <Input
              id="price"
              v-model.number="form.price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>
        </div>

        <!-- Stock -->
        <div class="space-y-2">
          <Label for="stock" class="font-semibold">Stock Quantity</Label>
          <Input
            id="stock"
            v-model.number="form.stock"
            type="number"
            min="1"
            placeholder="100"
          />
          <p class="text-xs text-muted-foreground">
            Set the maximum number of tickets available for sale
          </p>
        </div>
      </div>
      <SheetFooter>
        <SheetClose as-child>
          <Button variant="outline">Cancel</Button>
        </SheetClose>
        <Button :disabled="!isValid" @click="handleSave">
          {{ editingTicket ? 'Save Changes' : 'Create Ticket' }}
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
