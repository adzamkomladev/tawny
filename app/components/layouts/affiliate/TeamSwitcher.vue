<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { toast } from "vue-sonner";

const { isMobile } = useSidebar();
const { user, switchEvent: switchEventAuth } = useAuth();

// Computed properties with null safety
const teams = computed(() => user.value?.teams ?? []);
const hasTeams = computed(() => teams.value.length > 0);
const hasSelected = computed(() => !!user.value?.selected);
const hasSelectedTeam = computed(() => hasSelected.value && !!user.value?.selected?.teamId);
const hasSelectedEvent = computed(() => hasSelectedTeam.value && !!user.value?.selected?.eventId);

const activeTeam = computed(() => {
  if (!hasSelectedTeam.value) return null;
  return teams.value.find(team => team.id === user.value?.selected?.teamId) ?? null;
});

const activeEvent = computed(() => {
  if (!hasSelectedEvent.value || !activeTeam.value) return null;
  return activeTeam.value.events.find(event => event.id === user.value?.selected?.eventId) ?? null;
});

// Display text for the trigger button
const triggerTitle = computed(() => {
  if (!hasTeams.value) return 'No teams';
  if (!activeTeam.value) return 'Select a team';
  return activeTeam.value.name;
});

const triggerSubtitle = computed(() => {
  if (!hasTeams.value) return 'Create your first team';
  if (!activeTeam.value) return 'Choose from your teams';
  if (!activeEvent.value) return 'Select an event';
  return activeEvent.value.title;
});

const switchEvent = async (eventId: string) => {
  const { success, error } = await switchEventAuth({ eventId });

  if (!success) {
    toast.error('Failed to switch to event', { description: error })
    return;
  }

  toast.success('Switched event successfully');
};

const isActiveEvent = (eventId: string) => eventId === user.value?.selected?.eventId;
const isActiveTeam = (teamId: string) => teamId === user.value?.selected?.teamId;
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <!-- Team logo or placeholder -->
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <NuxtImg v-if="activeTeam?.logo" :src="activeTeam.logo" class="size-4"
                :alt="`${activeTeam.name}'s logo`" />
              <Icon v-else name="lucide:users" class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">
                {{ triggerTitle }}
              </span>
              <span class="truncate text-xs text-muted-foreground">{{ triggerSubtitle }}</span>
            </div>
            <Icon name="lucide:chevrons-up-down" class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start"
          :side="isMobile ? 'bottom' : 'right'" :side-offset="4">

          <!-- No teams state -->
          <template v-if="!hasTeams">
            <div class="px-2 py-4 text-center">
              <Icon name="lucide:users" class="mx-auto size-8 text-muted-foreground/50" />
              <p class="mt-2 text-sm font-medium">No teams yet</p>
              <p class="text-xs text-muted-foreground">Create your first team to get started</p>
            </div>
          </template>

          <!-- Teams list -->
          <template v-else>
            <DropdownMenuLabel class="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            <DropdownMenuSub v-for="(team, index) in teams" :key="team.slug">
              <DropdownMenuSubTrigger class="gap-2 p-2" :class="{ 'bg-accent': isActiveTeam(team.id) }">
                <div class="flex size-6 items-center justify-center rounded-sm border">
                  <NuxtImg v-if="team.logo" :src="team.logo" class="size-4" :alt="`${team.name}'s logo`" />
                  <Icon v-else name="lucide:users" class="size-3.5" />
                </div>
                <span class="flex-1">{{ team.name }}</span>
                <Icon v-if="isActiveTeam(team.id)" name="lucide:check" class="size-4 shrink-0 text-primary" />
                <DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent class="min-w-48">
                <DropdownMenuLabel class="text-xs text-muted-foreground">
                  Events
                </DropdownMenuLabel>
                <DropdownMenuItem v-for="event in team.events" :key="event.id" class="gap-2 p-2"
                  :class="{ 'bg-accent': isActiveEvent(event.id) }" @click="switchEvent(event.id)">
                  <Icon name="lucide:calendar" class="size-4 shrink-0 text-muted-foreground" />
                  <span class="flex-1 truncate">{{ event.title }}</span>
                  <Icon v-if="isActiveEvent(event.id)" name="lucide:check" class="size-4 shrink-0 text-primary" />
                </DropdownMenuItem>
                <template v-if="team.events.length === 0">
                  <DropdownMenuItem disabled class="gap-2 p-2 text-muted-foreground">
                    <Icon name="lucide:calendar-off" class="size-4 shrink-0" />
                    No events yet
                  </DropdownMenuItem>
                </template>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="gap-2 p-2" as-child>
                  <NuxtLink :to="`/affiliate/events/new?team=${team.id}`">
                    <Icon name="lucide:plus" class="size-4 shrink-0" />
                    <span class="text-muted-foreground">Create event</span>
                  </NuxtLink>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </template>

          <DropdownMenuSeparator />
          <DropdownMenuItem class="gap-2 p-2" as-child>
            <NuxtLink to="/affiliate/teams/new">
              <div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Icon name="lucide:plus" class="size-4" />
              </div>
              <span class="font-medium text-muted-foreground">
                Add team
              </span>
            </NuxtLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
