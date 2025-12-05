<script lang="ts" setup>
export interface EventStat {
  label: string
  value: number | string
  change?: number
  changeLabel?: string
  trend?: 'up' | 'down' | 'neutral'
  icon: string
  iconBgClass?: string
}

const props = defineProps<{
  stat: EventStat
}>()

const displayValue = ref(0)
const displayChange = ref(0)
const badgeVisible = ref(false)

const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
  switch (trend) {
    case 'up':
      return 'lucide:arrow-up-right'
    case 'down':
      return 'lucide:arrow-down-right'
    default:
      return 'lucide:minus'
  }
}

const getTrendClasses = (trend: 'up' | 'down' | 'neutral') => {
  switch (trend) {
    case 'up':
      return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
    case 'down':
      return 'bg-red-500/15 text-red-600 dark:text-red-400'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

const animateValue = (start: number, end: number, duration: number, setter: (val: number) => void) => {
  const startTime = performance.now()
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    setter(Math.round(start + (end - start) * easeOut))
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
}

onMounted(() => {
  if (typeof props.stat.value === 'number') {
    animateValue(0, props.stat.value, 800, (val) => { displayValue.value = val })
  }
  if (props.stat.change !== undefined) {
    animateValue(0, Math.abs(props.stat.change), 600, (val) => { displayChange.value = val })
  }
  setTimeout(() => { badgeVisible.value = true }, 400)
})

watch(() => props.stat.value, (newVal) => {
  if (typeof newVal === 'number') {
    animateValue(displayValue.value, newVal, 500, (val) => { displayValue.value = val })
  }
})
</script>

<template>
  <div class="group relative rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
    <!-- Gradient accent on hover -->
    <div class="absolute inset-0 rounded-xl bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    
    <div class="relative flex items-start justify-between">
      <div class="space-y-2">
        <p class="text-sm font-medium text-muted-foreground">{{ stat.label }}</p>
        <p class="text-2xl font-bold tracking-tight tabular-nums">
          {{ typeof stat.value === 'number' ? displayValue : stat.value }}
        </p>
        
        <!-- Trend badge -->
        <div
          v-if="stat.trend && stat.change !== undefined"
          class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-all duration-500 ease-out"
          :class="[
            getTrendClasses(stat.trend),
            badgeVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          ]"
        >
          <Icon :name="getTrendIcon(stat.trend)" class="size-3" />
          <span class="tabular-nums">{{ stat.change > 0 ? '+' : '' }}{{ displayChange }}%</span>
          <span v-if="stat.changeLabel" class="font-normal opacity-80">{{ stat.changeLabel }}</span>
        </div>
      </div>

      <div 
        class="flex size-10 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        :class="stat.iconBgClass || 'bg-primary/10'"
      >
        <Icon :name="stat.icon" class="size-5 text-primary" />
      </div>
    </div>
  </div>
</template>
