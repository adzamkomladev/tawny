<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';
</script>

<template>
    <div class="rounded-xl border border-border p-5">
        <div class="flex items-start justify-between">
            <div class="flex-1 space-y-3">
                <Skeleton class="h-4 w-24" />
                <Skeleton class="h-10 w-16" />
                <Skeleton class="h-6 w-32 rounded-full" />
            </div>
            <Skeleton class="h-14 w-14 rounded-xl" />
        </div>
    </div>
</template>
