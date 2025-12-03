<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const props = defineProps<{
  teamId: string;
  teamSlug: string;
}>();

const actions = computed(() => [
  {
    label: 'Create Event',
    icon: 'lucide:plus',
    href: `/affiliate/events/new?team=${props.teamId}`,
    description: 'Launch a new event for this team',
    variant: 'default' as const,
  },
  {
    label: 'View All Events',
    icon: 'lucide:calendar',
    href: `/affiliate/teams/${props.teamId}/events`,
    description: 'Browse all team events',
    variant: 'outline' as const,
  },
  {
    label: 'Team Settings',
    icon: 'lucide:settings',
    href: `/affiliate/teams/${props.teamId}/settings`,
    description: 'Manage team configuration',
    variant: 'outline' as const,
  },
  {
    label: 'Public Page',
    icon: 'lucide:external-link',
    href: `/teams/${props.teamSlug}`,
    description: 'View public team profile',
    variant: 'ghost' as const,
    external: true,
  },
]);
</script>

<template>
  <Card>
    <CardHeader class="pb-3">
      <CardTitle class="text-lg font-semibold flex items-center gap-2">
        <Icon name="lucide:zap" class="h-5 w-5 text-primary" />
        Quick Actions
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Button
          v-for="action in actions"
          :key="action.label"
          :variant="action.variant"
          class="h-auto flex-col items-start gap-1 p-4 text-left"
          as-child
        >
          <NuxtLink :to="action.href" :target="action.external ? '_blank' : undefined">
            <div class="flex w-full items-center justify-between">
              <Icon :name="action.icon" class="h-5 w-5" />
              <Icon v-if="action.external" name="lucide:arrow-up-right" class="h-4 w-4 text-muted-foreground" />
            </div>
            <span class="font-medium">{{ action.label }}</span>
            <span class="text-xs text-muted-foreground font-normal">{{ action.description }}</span>
          </NuxtLink>
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
