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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { VoteCategory, Nominee } from './VoteCategoriesList.vue'

const props = defineProps<{
  open: boolean
  editingCategory: VoteCategory | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  save: [category: Partial<VoteCategory>]
}>()

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
})

const form = ref({
  name: '',
  description: '',
  pricePerVote: 1,
  status: 'active' as 'active' | 'paused' | 'ended',
})

// Nominee management
const nominees = ref<Omit<Nominee, 'votes' | 'revenue'>[]>([])
const newNomineeName = ref('')

watch(
  () => props.editingCategory,
  (category) => {
    if (category) {
      form.value = {
        name: category.name,
        description: category.description,
        pricePerVote: category.pricePerVote,
        status: category.status,
      }
      nominees.value = category.nominees.map((n) => ({ id: n.id, name: n.name, image: n.image }))
    } else {
      form.value = {
        name: '',
        description: '',
        pricePerVote: 1,
        status: 'active',
      }
      nominees.value = []
    }
  },
  { immediate: true }
)

const addNominee = () => {
  if (!newNomineeName.value.trim()) return
  nominees.value.push({
    id: crypto.randomUUID(),
    name: newNomineeName.value.trim(),
  })
  newNomineeName.value = ''
}

const removeNominee = (id: string) => {
  nominees.value = nominees.value.filter((n) => n.id !== id)
}

const handleSave = () => {
  const categoryData: Partial<VoteCategory> = {
    ...form.value,
    nominees: nominees.value.map((n) => ({
      ...n,
      votes: props.editingCategory?.nominees.find((en) => en.id === n.id)?.votes ?? 0,
      revenue: props.editingCategory?.nominees.find((en) => en.id === n.id)?.revenue ?? 0,
    })),
  }
  if (props.editingCategory) {
    categoryData.id = props.editingCategory.id
  }
  emit('save', categoryData)
  isOpen.value = false
}
</script>

<template>
  <Sheet v-model:open="isOpen">
    <SheetContent class="sm:max-w-md overflow-y-auto">
      <SheetHeader>
        <SheetTitle>{{ editingCategory ? 'Edit Category' : 'Create Category' }}</SheetTitle>
        <SheetDescription>
          {{ editingCategory ? 'Update your vote category details and nominees.' : 'Create a new vote category with nominees for your event.' }}
        </SheetDescription>
      </SheetHeader>
      <div class="grid gap-4 py-4">
        <!-- Category Name -->
        <div class="space-y-2">
          <Label for="name" class="font-semibold">Category Name</Label>
          <Input id="name" v-model="form.name" placeholder="e.g., Best Artist of the Year" />
        </div>

        <!-- Description -->
        <div class="space-y-2">
          <Label for="description" class="font-semibold">Description</Label>
          <Textarea
            id="description"
            v-model="form.description"
            placeholder="Describe what this category is about..."
            :rows="3"
          />
        </div>

        <!-- Price and Status -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="price" class="font-semibold">Price per Vote (GHS)</Label>
            <Input id="price" v-model.number="form.pricePerVote" type="number" min="0.5" step="0.5" />
          </div>
          <div class="space-y-2">
            <Label for="status" class="font-semibold">Status</Label>
            <Select v-model="form.status">
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="ended">Ended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Nominees Section -->
        <div class="space-y-3">
          <Label class="font-semibold">Nominees</Label>
          <div class="flex gap-2">
            <Input
              v-model="newNomineeName"
              placeholder="Enter nominee name"
              @keyup.enter="addNominee"
            />
            <Button type="button" size="icon" @click="addNominee">
              <Icon name="lucide:plus" class="size-4" />
            </Button>
          </div>

          <!-- Nominees List -->
          <div v-if="nominees.length" class="space-y-2 max-h-48 overflow-y-auto">
            <div
              v-for="nominee in nominees"
              :key="nominee.id"
              class="flex items-center justify-between gap-2 p-2 bg-muted/50 rounded-lg"
            >
              <div class="flex items-center gap-2 min-w-0">
                <div class="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon name="lucide:user" class="size-4 text-primary" />
                </div>
                <span class="text-sm font-medium truncate">{{ nominee.name }}</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="size-7 shrink-0 text-destructive hover:text-destructive"
                @click="removeNominee(nominee.id)"
              >
                <Icon name="lucide:x" class="size-4" />
              </Button>
            </div>
          </div>
          <p v-else class="text-sm text-muted-foreground text-center py-4 bg-muted/30 rounded-lg">
            No nominees added yet. Add nominees above.
          </p>
        </div>
      </div>
      <SheetFooter>
        <SheetClose as-child>
          <Button variant="outline">Cancel</Button>
        </SheetClose>
        <Button @click="handleSave" :disabled="!form.name || nominees.length === 0">
          {{ editingCategory ? 'Save Changes' : 'Create Category' }}
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
