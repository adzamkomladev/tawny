<script lang="ts" setup>
import { useDropZone, useFileDialog, useObjectUrl } from '@vueuse/core';

const props = defineProps<{
  modelValue: File | null;
  previewClass?: string;
  helperText?: string;
  hasError?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | null): void;
}>();

const dropZoneRef = ref<HTMLElement | null>(null);

const { open, onChange } = useFileDialog({
  accept: 'image/png,image/jpeg,image/svg+xml',
  multiple: false,
});

onChange((files) => {
  if (files?.length) emit('update:modelValue', files[0]);
});

const { isOver } = useDropZone(dropZoneRef, {
  onDrop: (files) => {
    if (files?.length) emit('update:modelValue', files[0]);
  },
});

const fileRef = computed(() => props.modelValue);
const previewUrl = useObjectUrl(fileRef);
</script>

<template>
  <div
    ref="dropZoneRef"
    :class="[
      'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-muted/60 bg-background p-6 text-center transition',
      isOver ? 'border-primary bg-primary/10' : 'hover:border-primary/60',
      hasError ? 'border-destructive text-destructive' : '',
    ]"
    @click="open()"
  >
    <Icon name="lucide:upload" class="size-5 text-muted-foreground" />
    <p class="text-sm font-medium text-foreground">
      Drop or click to upload
    </p>
    <p class="text-xs text-muted-foreground">
      {{ modelValue ? modelValue.name : helperText }}
    </p>

    <div v-if="previewUrl" class="w-full">
      <img
        :src="previewUrl"
        alt="Preview"
        :class="previewClass"
      />
    </div>
  </div>
</template>
