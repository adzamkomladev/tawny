<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

defineProps<{
  items: {
    title: string
    url: string
    icon?: string
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}>()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Event</SidebarGroupLabel>
    <SidebarMenu>
      <Collapsible v-for="(item, index) in items" :key="item.title + index" as-child :default-open="item.isActive"
        class="group/collapsible">
        <SidebarMenuItem>
          <template v-if="item.items">
            <CollapsibleTrigger as-child>
              <SidebarMenuButton class="cursor-pointer" :tooltip="item.title">
                <Icon :name="`lucide:${item.icon}`" v-if="item.icon" />
                <span>{{ item.title }}</span>
                <Icon :name="'lucide:chevron-right'"
                  class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <template v-if="item.items">
                  <SidebarMenuSubItem v-for="(subItem, subIndex) in item.items" :key="subItem.title + subIndex">
                    <SidebarMenuSubButton as-child>
                      <NuxtLink :to="subItem.url">
                        {{ subItem.title }}
                      </NuxtLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </template>
              </SidebarMenuSub>
            </CollapsibleContent>
          </template>
          <template v-else>
            <SidebarMenuButton as-child :tooltip="item.title">
              <NuxtLink :to="item.url" class="flex items-center">
                <Icon :name="`lucide:${item.icon}`" v-if="item.icon" />
                <span>{{ item.title }}</span>
              </NuxtLink>
            </SidebarMenuButton>
          </template>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
