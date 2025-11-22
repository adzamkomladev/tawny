<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-vue-next"
import NavMain from '~/components/layouts/affiliate/NavMain.vue'
import NavProjects from '~/components/layouts/affiliate/NavProjects.vue'
import NavUser from '~/components/layouts/affiliate/NavUser.vue'
import TeamSwitcher from '~/components/layouts/affiliate/TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
});

const { affiliateNavLinks, teams } = useNav();


// This is sample data.
const data = {
  user: {
    name: "Daniel Boakye",
    email: "daniel.boakye@yopmail.com",
    avatar: "https://ui-avatars.com/api/?name=Daniel+Boakye",
  }
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="[...teams]" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="[...affiliateNavLinks.events]" />
      <NavProjects :platforms="[...affiliateNavLinks.platform]" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
