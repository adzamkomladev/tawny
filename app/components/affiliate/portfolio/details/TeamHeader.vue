<script setup lang="ts">
import type { TeamDetails } from '~~/types/affiliate/portfolio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const props = defineProps<{
  team: TeamDetails;
}>();

const emit = defineEmits<{
  (e: 'edit'): void;
}>();

const defaultBanner = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=300&fit=crop&q=80';
const defaultLogo = computed(() => 
  `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(props.team.name)}`
);

const bannerSrc = computed(() => props.team.banner || defaultBanner);
const logoSrc = computed(() => props.team.logo || defaultLogo.value);

const formatDate = (date: Date | string | null) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const getOwnerInitials = (owner: { name: string | null; email: string | null }) => {
  if (owner.name) {
    return owner.name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
  return owner.email?.slice(0, 2).toUpperCase() || '??';
};
</script>

<template>
  <div class="relative overflow-hidden rounded-xl border border-border bg-card">
    <!-- Banner -->
    <div class="relative h-40 md:h-48">
      <img
        :src="bannerSrc"
        :alt="`${team.name} banner`"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-linear-to-t from-card via-card/60 to-transparent" />
      
      <!-- Live indicator -->
      <div v-if="team.stats.liveEvents > 0" class="absolute right-4 top-4">
        <Badge variant="secondary" class="gap-1.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {{ team.stats.liveEvents }} Live
        </Badge>
      </div>
    </div>

    <!-- Content -->
    <div class="relative px-6 pb-6">
      <!-- Logo -->
      <div class="-mt-12 mb-4">
        <div class="overflow-hidden rounded-xl border-4 border-card bg-background shadow-lg inline-block">
          <img
            :src="logoSrc"
            :alt="team.name"
            class="h-24 w-24 object-cover"
          />
        </div>
      </div>

      <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div class="space-y-3 flex-1">
          <div>
            <h1 class="text-2xl font-bold tracking-tight text-foreground">{{ team.name }}</h1>
            <p class="text-muted-foreground">@{{ team.slug }}</p>
          </div>

          <p v-if="team.description" class="text-sm text-muted-foreground max-w-xl">
            {{ team.description }}
          </p>

          <div v-if="team.tags?.length" class="flex flex-wrap gap-2">
            <Badge v-for="tag in team.tags" :key="tag" variant="secondary">
              {{ tag }}
            </Badge>
          </div>

          <div class="flex items-center gap-4 text-sm text-muted-foreground pt-2">
            <div class="flex items-center gap-2">
              <Avatar class="h-6 w-6">
                <AvatarImage v-if="team.owner.image" :src="team.owner.image" />
                <AvatarFallback class="text-xs">{{ getOwnerInitials(team.owner) }}</AvatarFallback>
              </Avatar>
              <span>{{ team.owner.name || team.owner.email }}</span>
            </div>
            <span class="text-border">•</span>
            <span>Created {{ formatDate(team.createdAt) }}</span>
          </div>
        </div>

        <Button variant="outline" class="shrink-0" @click="emit('edit')">
          <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
          Edit Team
        </Button>
      </div>
    </div>
  </div>
</template>
