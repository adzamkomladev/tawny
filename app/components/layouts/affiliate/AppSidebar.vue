<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
} from '@/components/ui/sidebar';

import NavEvent from '~/components/layouts/affiliate/NavEvent.vue';
import NavTeam from '~/components/layouts/affiliate/NavTeam.vue';
import NavPlatform from '~/components/layouts/affiliate/NavPlatform.vue';
import NavUser from '~/components/layouts/affiliate/NavUser.vue';
import TeamSwitcher from '~/components/layouts/affiliate/TeamSwitcher.vue';


const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
});

const { affiliateNavLinks, teams } = useNav();
const { user } = useAuth();
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="[...teams]" />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton as-child tooltip="Home">
              <NuxtLink to="/affiliate/home" class="flex items-center">
                <Icon name="lucide:home" />
                <span>Home</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <NavEvent :items="[...affiliateNavLinks.event]" />
      <NavTeam :items="[...affiliateNavLinks.team]" />
      <NavPlatform :platforms="[...affiliateNavLinks.platform]" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="user!" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
