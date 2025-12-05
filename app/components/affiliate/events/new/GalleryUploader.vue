<script lang="ts" setup>
import { useDropZone, useFileDialog, useObjectUrl } from '@vueuse/core';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { GalleryImage } from '~~/schemas/affiliate/events';

const props = defineProps<{
  modelValue: GalleryImage[];
  maxImages?: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: GalleryImage[]): void;
}>();

const maxImages = computed(() => props.maxImages ?? 10);
const dropZoneRef = ref<HTMLElement | null>(null);

const { open, onChange } = useFileDialog({
  accept: 'image/png,image/jpeg',
  multiple: true,
});

const generateId = () => crypto.randomUUID();

onChange((files) => {
  if (!files?.length) return;
  addFiles(Array.from(files));
});

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop: (files) => {
    if (!files?.length) return;
    addFiles(Array.from(files));
  },
});

const addFiles = (files: File[]) => {
  const currentCount = props.modelValue.length;
  const availableSlots = maxImages.value - currentCount;
  const filesToAdd = files.slice(0, availableSlots);

  const newImages: GalleryImage[] = filesToAdd.map((file, index) => ({
    id: generateId(),
    file,
    caption: '',
    order: currentCount + index,
    isFeatured: false,
  }));

  emit('update:modelValue', [...props.modelValue, ...newImages]);
};

const removeImage = (id: string) => {
  const updated = props.modelValue
    .filter((img) => img.id !== id)
    .map((img, index) => ({ ...img, order: index }));
  emit('update:modelValue', updated);
};

const updateCaption = (id: string, caption: string) => {
  const updated = props.modelValue.map((img) =>
    img.id === id ? { ...img, caption } : img
  );
  emit('update:modelValue', updated);
};

const toggleFeatured = (id: string, isFeatured: boolean) => {
  const updated = props.modelValue.map((img) =>
    img.id === id ? { ...img, isFeatured } : img
  );
  emit('update:modelValue', updated);
};

const moveImage = (id: string, direction: 'up' | 'down') => {
  const index = props.modelValue.findIndex((img) => img.id === id);
  if (index === -1) return;

  const newIndex = direction === 'up' ? index - 1 : index + 1;
  if (newIndex < 0 || newIndex >= props.modelValue.length) return;

  const updated = [...props.modelValue];
  const temp = updated[index];
  updated[index] = updated[newIndex]!;
  updated[newIndex] = temp!;
  
  // Update order values
  const reordered = updated.map((img, idx) => ({ ...img, order: idx }));
  emit('update:modelValue', reordered);
};

// Create preview URLs for each image
const getPreviewUrl = (file: File | null) => {
  if (!file) return '';
  return URL.createObjectURL(file);
};
</script>

<template>
  <div class="space-y-4">
    <!-- Drop zone for adding images -->
    <div
      ref="dropZoneRef"
      :class="[
        'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-muted/60 bg-background p-6 text-center transition',
        isOverDropZone ? 'border-primary bg-primary/10' : 'hover:border-primary/60',
        modelValue.length >= maxImages ? 'opacity-50 pointer-events-none' : '',
      ]"
      @click="open()"
    >
      <Icon name="lucide:images" class="size-6 text-muted-foreground" />
      <p class="text-sm font-medium text-foreground">
        Drop images or click to upload
      </p>
      <p class="text-xs text-muted-foreground">
        {{ modelValue.length }}/{{ maxImages }} images · PNG or JPEG
      </p>
    </div>

    <!-- Gallery grid -->
    <div v-if="modelValue.length > 0" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(image, index) in modelValue"
        :key="image.id"
        class="group relative rounded-lg border bg-card overflow-hidden"
      >
        <!-- Image preview -->
        <div class="aspect-video relative">
          <img
            :src="getPreviewUrl(image.file)"
            :alt="image.caption || `Gallery image ${index + 1}`"
            class="h-full w-full object-cover"
          />
          <!-- Featured badge -->
          <div
            v-if="image.isFeatured"
            class="absolute top-2 left-2 rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground"
          >
            Featured
          </div>
          <!-- Order badge -->
          <div
            class="absolute top-2 right-2 rounded-md bg-background/80 px-2 py-0.5 text-xs font-medium"
          >
            #{{ index + 1 }}
          </div>
        </div>

        <!-- Controls -->
        <div class="p-3 space-y-3">
          <!-- Caption input -->
          <div class="space-y-1">
            <Label class="text-xs text-muted-foreground">Caption</Label>
            <Input
              :model-value="image.caption"
              placeholder="Add a caption..."
              class="h-8 text-sm"
              @update:model-value="(val) => updateCaption(image.id, val as string)"
            />
          </div>

          <!-- Featured toggle and actions -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <Checkbox
                :model-value="image.isFeatured"
                @update:model-value="(val) => toggleFeatured(image.id, !!val)"
              />
              <span class="text-xs text-muted-foreground">Featured</span>
            </label>

            <div class="flex items-center gap-1">
              <!-- Move up -->
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="size-7"
                :disabled="index === 0"
                @click="moveImage(image.id, 'up')"
              >
                <Icon name="lucide:chevron-up" class="size-4" />
              </Button>
              <!-- Move down -->
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="size-7"
                :disabled="index === modelValue.length - 1"
                @click="moveImage(image.id, 'down')"
              >
                <Icon name="lucide:chevron-down" class="size-4" />
              </Button>
              <!-- Remove -->
              <Button
                type="button"
                variant="ghost"
                size="icon"
                class="size-7 text-destructive hover:text-destructive"
                @click="removeImage(image.id)"
              >
                <Icon name="lucide:trash-2" class="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
