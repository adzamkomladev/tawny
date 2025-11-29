<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export interface GalleryImage {
    id: string | number
    src: string
    alt?: string
    featured?: boolean
}

defineProps<{
    images: GalleryImage[]
}>()

// Create a mosaic layout pattern
function getImageClass(index: number): string {
    const patterns = [
        'col-span-2 row-span-2', // Large featured
        'col-span-1 row-span-1', // Small
        'col-span-1 row-span-2', // Tall
        'col-span-1 row-span-1', // Small
        'col-span-2 row-span-1', // Wide
        'col-span-1 row-span-1', // Small
        'col-span-1 row-span-1', // Small
        'col-span-1 row-span-2', // Tall
    ]
    return patterns[index % patterns.length]!;
}
</script>

<template>
    <Card class="border-border/50 overflow-hidden">
        <CardHeader>
            <CardTitle class="flex items-center gap-2">
                <Icon name="lucide:images" class="size-5 text-primary" />
                Event Gallery
                <span class="text-sm font-normal text-muted-foreground ml-2">
                    ({{ images.length }} photos)
                </span>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <!-- Mosaic Grid -->
            <div
                class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[120px] sm:auto-rows-[150px] lg:auto-rows-[180px] gap-3">
                <div v-for="(image, index) in images" :key="image.id" :class="[
                    'group relative overflow-hidden rounded-xl cursor-pointer',
                    image.featured ? 'col-span-2 row-span-2' : getImageClass(index),
                ]">
                    <!-- Image -->
                    <NuxtImg :src="image.src" :alt="image.alt || `Gallery image ${index + 1}`"
                        class="size-full object-cover transition-transform duration-500 group-hover:scale-110" />

                    <!-- Hover Overlay -->
                    <div
                        class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                        <div
                            class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                            <div
                                class="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Icon name="lucide:expand" class="size-6 text-white" />
                            </div>
                        </div>
                    </div>

                    <!-- Featured Badge -->
                    <div v-if="image.featured"
                        class="absolute top-3 left-3 px-2 py-1 rounded-md bg-primary/90 text-primary-foreground text-xs font-medium">
                        Featured
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="images.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
                <div class="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Icon name="lucide:image-off" class="size-8 text-muted-foreground" />
                </div>
                <p class="text-muted-foreground">No gallery images available yet</p>
            </div>
        </CardContent>
    </Card>
</template>
