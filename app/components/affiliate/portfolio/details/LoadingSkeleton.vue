<script setup lang="ts">
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Header skeleton -->
    <div class="relative overflow-hidden rounded-xl border border-border bg-card">
      <Skeleton class="h-40 w-full md:h-48" />
      <div class="relative px-6 pb-6">
        <div class="-mt-12 mb-4">
          <Skeleton class="h-24 w-24 rounded-xl" />
        </div>
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div class="space-y-3 flex-1">
            <div>
              <Skeleton class="h-8 w-48 mb-2" />
              <Skeleton class="h-4 w-24" />
            </div>
            <Skeleton class="h-4 w-96 max-w-full" />
            <div class="flex gap-2">
              <Skeleton class="h-6 w-16 rounded-full" />
              <Skeleton class="h-6 w-20 rounded-full" />
              <Skeleton class="h-6 w-14 rounded-full" />
            </div>
            <div class="flex items-center gap-4 pt-2">
              <Skeleton class="h-6 w-32" />
              <Skeleton class="h-4 w-40" />
            </div>
          </div>
          <Skeleton class="h-10 w-28" />
        </div>
      </div>
    </div>

    <!-- Stats grid skeleton -->
    <div class="grid gap-4 md:grid-cols-3">
      <Card v-for="i in 3" :key="i">
        <CardContent class="p-4">
          <div class="flex items-center gap-3">
            <Skeleton class="h-10 w-10 rounded-lg" />
            <div>
              <Skeleton class="h-4 w-20 mb-1" />
              <Skeleton class="h-8 w-16" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Earnings card skeleton -->
    <Card>
      <CardHeader class="pb-3">
        <Skeleton class="h-6 w-40" />
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="grid gap-4 md:grid-cols-3">
          <div v-for="i in 3" :key="i" class="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/30 p-4">
            <Skeleton class="h-10 w-10 rounded-lg" />
            <div>
              <Skeleton class="h-4 w-24 mb-1" />
              <Skeleton class="h-6 w-20" />
            </div>
          </div>
        </div>
        <div class="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <div class="flex items-center justify-between mb-3">
            <Skeleton class="h-5 w-32" />
            <Skeleton class="h-6 w-24" />
          </div>
          <Skeleton class="h-2 w-full rounded-full" />
          <Skeleton class="h-3 w-40 mt-2" />
        </div>
      </CardContent>
    </Card>

    <!-- Events list skeleton -->
    <Card>
      <CardHeader class="flex flex-row items-center justify-between pb-3">
        <Skeleton class="h-6 w-32" />
        <Skeleton class="h-8 w-20" />
      </CardHeader>
      <CardContent>
        <div class="space-y-3">
          <div v-for="i in 3" :key="i" class="flex items-center justify-between gap-4 rounded-lg border border-border/50 bg-muted/20 p-4">
            <div class="flex items-center gap-4 flex-1">
              <Skeleton class="h-3 w-3 rounded-full" />
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <Skeleton class="h-5 w-48" />
                  <Skeleton class="h-5 w-16 rounded-full" />
                </div>
                <div class="flex items-center gap-3">
                  <Skeleton class="h-4 w-24" />
                  <Skeleton class="h-4 w-32" />
                </div>
              </div>
            </div>
            <div class="text-right">
              <Skeleton class="h-5 w-20 mb-1" />
              <Skeleton class="h-4 w-16" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
