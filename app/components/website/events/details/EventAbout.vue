<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

defineProps<{
  description: string
  highlights?: string[]
  tags?: string[]
}>()
</script>

<template>
  <Card class="border-border/50">
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Icon name="lucide:info" class="size-5 text-primary" />
        About This Event
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-6">
      <!-- Description -->
      <div class="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
        <p class="whitespace-pre-line">{{ description }}</p>
      </div>

      <!-- Highlights -->
      <div v-if="highlights && highlights.length > 0">
        <Separator class="my-6" />
        <h4 class="font-semibold mb-4 flex items-center gap-2">
          <Icon name="lucide:sparkles" class="size-4 text-primary" />
          Event Highlights
        </h4>
        <ul class="grid sm:grid-cols-2 gap-3">
          <li
            v-for="(highlight, index) in highlights"
            :key="index"
            class="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div class="size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="lucide:check" class="size-3.5 text-primary" />
            </div>
            <span class="text-sm">{{ highlight }}</span>
          </li>
        </ul>
      </div>

      <!-- Tags -->
      <div v-if="tags && tags.length > 0">
        <Separator class="my-6" />
        <h4 class="font-semibold mb-4 flex items-center gap-2">
          <Icon name="lucide:tag" class="size-4 text-muted-foreground" />
          Tags
        </h4>
        <div class="flex flex-wrap gap-2">
          <Badge
            v-for="tag in tags"
            :key="tag"
            variant="secondary"
            class="text-xs"
          >
            {{ tag }}
          </Badge>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
