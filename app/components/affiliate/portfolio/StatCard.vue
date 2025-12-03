<script setup lang="ts">
import type { StatCard } from '~~/types/affiliate/portfolio';

const props = defineProps<{
  stat: StatCard;
  icon: string;
}>();

const cardRef = ref<HTMLElement | null>(null);
const displayValue = ref(0);
const displayChange = ref(0);
const badgeVisible = ref(false);
const arrowBounce = ref(false);

const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
  switch (trend) {
    case 'up':
      return 'lucide:arrow-up-right';
    case 'down':
      return 'lucide:arrow-down-right';
    default:
      return 'lucide:minus';
  }
};

const getTrendClasses = (trend: 'up' | 'down' | 'neutral') => {
  switch (trend) {
    case 'up':
      return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400';
    case 'down':
      return 'bg-red-500/15 text-red-600 dark:text-red-400';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getArrowBounceClass = (trend: 'up' | 'down' | 'neutral') => {
  if (!arrowBounce.value) return '';
  switch (trend) {
    case 'up':
      return 'animate-bounce-up';
    case 'down':
      return 'animate-bounce-down';
    default:
      return '';
  }
};

// Animate numbers on mount
const animateValue = (start: number, end: number, duration: number, setter: (val: number) => void) => {
  const startTime = performance.now();
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    setter(Math.round(start + (end - start) * easeOut));
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
};

onMounted(() => {
  animateValue(0, props.stat.value, 800, (val) => { displayValue.value = val; });
  animateValue(0, Math.abs(props.stat.change), 600, (val) => { displayChange.value = val; });
  
  // Animate badge in after a delay
  setTimeout(() => {
    badgeVisible.value = true;
  }, 400);
  
  // Start arrow bounce after badge is visible
  setTimeout(() => {
    arrowBounce.value = true;
  }, 900);
});

watch(() => props.stat.value, (newVal) => {
  animateValue(displayValue.value, newVal, 500, (val) => { displayValue.value = val; });
});
</script>

<template>
  <div 
    ref="cardRef"
    class="group relative rounded-xl border border-border bg-linear-to-br from-card to-card/80 p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
  >
    <!-- Subtle gradient accent -->
    <div class="absolute inset-0 rounded-xl bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    
    <div class="relative flex items-start justify-between">
      <!-- Content -->
      <div class="space-y-3">
        <p class="text-sm font-medium tracking-wide text-muted-foreground">
          {{ stat.label }}
        </p>
        <p class="text-4xl font-extrabold tracking-tight text-foreground tabular-nums">
          {{ displayValue }}
        </p>
        <!-- Trend badge -->
        <div
          class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-500 ease-out"
          :class="[
            getTrendClasses(stat.trend),
            badgeVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-2 opacity-0 scale-95'
          ]"
        >
          <Icon 
            :name="getTrendIcon(stat.trend)" 
            class="h-3.5 w-3.5"
            :class="[
              badgeVisible ? 'rotate-0' : 'rotate-45',
              getArrowBounceClass(stat.trend)
            ]"
          />
          <span class="tabular-nums">{{ stat.change > 0 ? '+' : stat.change < 0 ? '-' : '' }}{{ displayChange }}%</span>
          <span class="font-normal opacity-80">{{ stat.changeLabel }}</span>
        </div>
      </div>

      <!-- Icon -->
      <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-110">
        <Icon :name="icon" class="h-7 w-7 text-primary" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-bounce-up {
  animation: bounce-up 0.6s ease-in-out 3;
}

.animate-bounce-down {
  animation: bounce-down 0.6s ease-in-out 3;
}

@keyframes bounce-up {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(2px, -3px);
  }
}

@keyframes bounce-down {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(2px, 3px);
  }
}
</style>
