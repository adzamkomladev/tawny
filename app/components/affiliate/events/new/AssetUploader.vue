<script lang="ts" setup>
import { useDropZone, useFileDialog, useObjectUrl } from '@vueuse/core';

const model = defineModel<File | null>({ default: null });

defineProps<{
  previewClass?: string;
  helperText?: string;
  hasError?: boolean;
}>();

const dropZoneRef = useTemplateRef<HTMLElement>('dropZoneRef');

const { open, onChange } = useFileDialog({
  accept: 'image/png,image/jpeg,image/svg+xml',
  multiple: false,
});

onChange((files) => {
    if (files?.[0]) model.value = files[0];
});

const { isOverDropZone } = useDropZone(dropZoneRef, {
    onDrop: (files) => {
        if (files?.[0]) model.value = files[0];
    },
});

const previewUrl = useObjectUrl(model);
</script>

<template>
    <div ref="dropZoneRef" :class="[
        'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-muted/60 bg-background p-6 text-center transition',
        isOverDropZone ? 'border-primary bg-primary/10' : 'hover:border-primary/60',
        hasError ? 'border-destructive text-destructive' : '',
    ]" @click="open()">
        <Icon name="lucide:upload" class="size-5 text-muted-foreground" />
        <p class="text-sm font-medium text-foreground">
            Drop or click to upload
        </p>
        <p class="text-xs text-muted-foreground">
            {{ model ? model.name : helperText }}
        </p>

        <div v-if="previewUrl" class="w-full">
            <img :src="previewUrl" alt="Preview" :class="previewClass" />
        </div>
    </div>
</template>
