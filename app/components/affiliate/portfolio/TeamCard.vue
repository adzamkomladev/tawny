<script setup lang="ts">
import type { TeamCardData } from '~~/types/affiliate/teams';

const props = defineProps<{
  team: TeamCardData;
}>();

// Default placeholder images
const defaultBanner = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=200&fit=crop&q=80';
const defaultLogo = `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(props.team.name)}`;

const bannerSrc = computed(() => props.team.banner || defaultBanner);
const logoSrc = computed(() => props.team.logo || defaultLogo);

const formatDate = (date: Date | string | null) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
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
  <NuxtLink
    :to="`/affiliate/portfolios/${team.id}`"
    class="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
  >
    <!-- Header with banner -->
    <div class="relative h-28">
      <!-- Banner container with overflow hidden -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- Banner image (always shown - uses default if no banner) -->
        <img
          :src="bannerSrc"
          :alt="`${team.name} banner`"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <!-- Overlay for better contrast -->
        <div class="absolute inset-0 bg-linear-to-t from-card via-card/40 to-card/10" />
      </div>

      <!-- Live indicator pulse -->
      <div
        v-if="team.hasOngoingEvent"
        class="absolute right-3 top-3 z-10"
      >
        <span class="relative flex h-3 w-3">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span class="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
        </span>
      </div>

      <!-- Logo positioned at bottom of header, overlapping -->
      <div class="absolute -bottom-6 left-4 z-20">
        <div class="overflow-hidden rounded-xl border-2 border-card bg-white shadow-lg transition-transform duration-300 group-hover:scale-105">
          <img
            :src="logoSrc"
            :alt="team.name"
            class="h-14 w-14 object-cover"
            @error="($event.target as HTMLImageElement).src = defaultLogo"
          />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col px-4 pb-4 pt-10">
      <!-- Team name and status -->
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0 flex-1">
          <h3 class="truncate text-base font-semibold text-foreground transition-colors group-hover:text-primary">
            {{ team.name }}
          </h3>
          <p class="truncate text-xs text-muted-foreground">
            @{{ team.slug }}
          </p>
        </div>

        <Badge
          v-if="team.hasOngoingEvent"
          variant="default"
          class="shrink-0 gap-1.5 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400"
        >
          <Icon name="lucide:radio" class="h-3 w-3" />
          Live
        </Badge>
      </div>

      <!-- Owner info -->
      <div class="mt-4 flex items-center gap-2 rounded-lg bg-muted/50 p-2">
        <Avatar class="h-7 w-7">
          <AvatarFallback class="bg-primary/10 text-[10px] font-medium text-primary">
            {{ getOwnerInitials(team.owner) }}
          </AvatarFallback>
        </Avatar>
        <div class="min-w-0 flex-1">
          <p class="truncate text-xs font-medium text-foreground">
            {{ team.owner.name || 'Unnamed Owner' }}
          </p>
          <p class="truncate text-[10px] text-muted-foreground">
            {{ team.owner.email }}
          </p>
        </div>
      </div>

      <!-- Stats grid -->
      <div class="mt-4 grid grid-cols-2 gap-3">
        <div class="flex flex-col items-center rounded-lg bg-muted/30 p-2.5 transition-colors group-hover:bg-muted/50">
          <div class="flex items-center gap-1.5 text-muted-foreground">
            <Icon name="lucide:calendar-days" class="h-3.5 w-3.5" />
            <span class="text-[10px] font-medium uppercase tracking-wide">Events</span>
          </div>
          <span class="mt-1 text-lg font-bold text-foreground">{{ team.totalEvents }}</span>
        </div>

        <div class="flex flex-col items-center rounded-lg bg-muted/30 p-2.5 transition-colors group-hover:bg-muted/50">
          <div class="flex items-center gap-1.5 text-muted-foreground">
            <Icon name="lucide:clock-3" class="h-3.5 w-3.5" />
            <span class="text-[10px] font-medium uppercase tracking-wide">Joined</span>
          </div>
          <span class="mt-1 text-sm font-semibold text-foreground">{{ formatDate(team.createdAt) }}</span>
        </div>
      </div>

      <!-- Footer action hint -->
      <div class="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
        <span class="text-xs text-muted-foreground">View portfolio details</span>
        <div class="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon name="lucide:arrow-right" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
