<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';
</script>

<template>
  <div class="relative flex flex-col rounded-2xl border border-border bg-card">
    <!-- Header skeleton -->
    <div class="relative h-28">
      <Skeleton class="absolute inset-0 rounded-t-2xl" />
      <!-- Logo skeleton -->
      <div class="absolute -bottom-6 left-4 z-20">
        <div class="overflow-hidden rounded-xl border-2 border-card bg-card shadow-lg">
          <Skeleton class="h-14 w-14" />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col px-4 pb-4 pt-10">
      <!-- Team name and badge -->
      <div class="flex items-start justify-between gap-2">
        <div class="space-y-1.5">
          <Skeleton class="h-5 w-32" />
          <Skeleton class="h-3 w-20" />
        </div>
      </div>

      <!-- Owner info skeleton -->
      <div class="mt-4 flex items-center gap-2 rounded-lg bg-muted/50 p-2">
        <Skeleton class="h-7 w-7 rounded-full" />
        <div class="space-y-1">
          <Skeleton class="h-3 w-24" />
          <Skeleton class="h-2.5 w-32" />
        </div>
      </div>

      <!-- Stats grid skeleton -->
      <div class="mt-4 grid grid-cols-2 gap-3">
        <div class="flex flex-col items-center rounded-lg bg-muted/30 p-2.5">
          <Skeleton class="h-3 w-14" />
          <Skeleton class="mt-1.5 h-6 w-8" />
        </div>
        <div class="flex flex-col items-center rounded-lg bg-muted/30 p-2.5">
          <Skeleton class="h-3 w-14" />
          <Skeleton class="mt-1.5 h-5 w-20" />
        </div>
      </div>

      <!-- Footer skeleton -->
      <div class="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
        <Skeleton class="h-3 w-28" />
        <Skeleton class="h-7 w-7 rounded-full" />
      </div>
    </div>
  </div>
</template>
