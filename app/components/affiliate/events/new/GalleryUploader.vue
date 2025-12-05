<script lang="ts" setup>
import { useDropZone, useFileDialog } from '@vueuse/core';
import Sortable from 'sortablejs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { GalleryImage } from '~~/schemas/affiliate/events';

const model = defineModel<GalleryImage[]>({ default: () => [] });

defineProps<{
  maxImages?: number;
}>();

const maxImages = computed(() => 10);
const dropZoneRef = ref<HTMLElement | null>(null);
const galleryGridRef = ref<HTMLElement | null>(null);

// Local copy for sortable to manipulate
const localImages = ref<GalleryImage[]>([]);

// Sync from model to local
watch(
    model,
    (newVal) => {
        localImages.value = [...newVal];
    },
    { immediate: true, deep: true }
);

// Setup sortable when grid is mounted
let sortableInstance: Sortable | null = null;

onMounted(() => {
    watchEffect(() => {
        if (galleryGridRef.value && localImages.value.length > 0) {
            if (sortableInstance) {
                sortableInstance.destroy();
            }
            sortableInstance = Sortable.create(galleryGridRef.value, {
                animation: 150,
                handle: '.drag-handle',
                ghostClass: 'opacity-50',
                onEnd: (evt) => {
                    const { oldIndex, newIndex } = evt;
                    if (oldIndex === undefined || newIndex === undefined) return;

                    const updated = [...localImages.value];
                    const [removed] = updated.splice(oldIndex, 1);
                    updated.splice(newIndex, 0, removed!);

                    // Update order values and emit
                    const reordered = updated.map((img, idx) => ({ ...img, order: idx }));
                    localImages.value = reordered;
                    model.value = reordered;
                },
            });
        }
    });
});

onUnmounted(() => {
    if (sortableInstance) {
        sortableInstance.destroy();
    }
});

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
    const currentCount = model.value.length;
    const availableSlots = maxImages.value - currentCount;
    const filesToAdd = files.slice(0, availableSlots);

    const newImages: GalleryImage[] = filesToAdd.map((file, index) => ({
        id: generateId(),
        file,
        caption: '',
        order: currentCount + index,
        isFeatured: false,
    }));

    model.value = [...model.value, ...newImages];
};

const removeImage = (id: string) => {
    const updated = model.value
        .filter((img) => img.id !== id)
        .map((img, index) => ({ ...img, order: index }));
    model.value = updated;
};

const updateCaption = (id: string, caption: string) => {
    const updated = model.value.map((img) =>
        img.id === id ? { ...img, caption } : img
    );
    model.value = updated;
};

const toggleFeatured = (id: string, isFeatured: boolean) => {
    const updated = model.value.map((img) =>
        img.id === id ? { ...img, isFeatured } : img
    );
    model.value = updated;
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
        <div ref="dropZoneRef" :class="[
            'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-muted/60 bg-background p-6 text-center transition',
            isOverDropZone ? 'border-primary bg-primary/10' : 'hover:border-primary/60',
            model.length >= maxImages ? 'opacity-50 pointer-events-none' : '',
        ]" @click="open()">
            <Icon name="lucide:images" class="size-6 text-muted-foreground" />
            <p class="text-sm font-medium text-foreground">
                Drop images or click to upload
            </p>
            <p class="text-xs text-muted-foreground">
                {{ model.length }}/{{ maxImages }} images · PNG or JPEG
            </p>
        </div>

        <!-- Gallery grid -->
        <div v-if="localImages.length > 0" ref="galleryGridRef" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="(image, index) in localImages" :key="image.id"
                class="group relative rounded-lg border bg-card overflow-hidden">
                <!-- Drag handle overlay -->
                <div class="drag-handle absolute inset-0 z-10 cursor-grab active:cursor-grabbing" />

                <!-- Image preview -->
                <div class="aspect-video relative">
                    <img :src="getPreviewUrl(image.file)" :alt="image.caption || `Gallery image ${index + 1}`"
                        class="h-full w-full object-cover pointer-events-none" />
                    <!-- Featured badge -->
                    <div v-if="image.isFeatured"
                        class="absolute top-2 left-2 rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                        Featured
                    </div>
                    <!-- Order badge -->
                    <div class="absolute top-2 right-2 rounded-md bg-background/80 px-2 py-0.5 text-xs font-medium">
                        #{{ index + 1 }}
                    </div>
                    <!-- Drag indicator -->
                    <div
                        class="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-md bg-background/80 px-2 py-1 text-xs text-muted-foreground flex items-center gap-1">
                        <Icon name="lucide:grip-vertical" class="size-3" />
                        Drag to reorder
                    </div>
                </div>

                <!-- Controls (needs higher z-index to be clickable) -->
                <div class="relative z-20 p-3 space-y-3">
                    <!-- Caption input -->
                    <div class="space-y-1">
                        <Label class="text-xs text-muted-foreground">Caption</Label>
                        <Input :model-value="image.caption" placeholder="Add a caption..." class="h-8 text-sm"
                            @update:model-value="(val) => updateCaption(image.id, val as string)" />
                    </div>

                    <!-- Featured toggle and actions -->
                    <div class="flex items-center justify-between">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <Checkbox :model-value="image.isFeatured"
                                @update:model-value="(val) => toggleFeatured(image.id, !!val)" />
                            <span class="text-xs text-muted-foreground">Featured</span>
                        </label>

                        <Button type="button" variant="ghost" size="icon"
                            class="size-7 text-destructive hover:text-destructive" @click="removeImage(image.id)">
                            <Icon name="lucide:trash-2" class="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
