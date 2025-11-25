<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const features = [
  { icon: 'lucide:check', text: 'Unlimited events' },
  { icon: 'lucide:check', text: 'Unlimited tickets' },
  { icon: 'lucide:check', text: 'Web & USSD voting' },
  { icon: 'lucide:check', text: 'Mobile money payments' },
  { icon: 'lucide:check', text: 'Card payments' },
  { icon: 'lucide:check', text: 'Real-time analytics' },
  { icon: 'lucide:check', text: 'Team collaboration' },
  { icon: 'lucide:check', text: 'Priority support' },
];

const highlights = [
  {
    icon: 'lucide:zap',
    title: 'Instant Setup',
    description: 'Create your first event in under 5 minutes',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Secure Payments',
    description: 'Bank-grade encryption on all transactions',
  },
  {
    icon: 'lucide:clock',
    title: 'Fast Payouts',
    description: 'Receive funds within 24-48 hours',
  },
];
</script>

<template>
  <section id="pricing" class="py-24 sm:py-32 bg-muted/30 overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="max-w-3xl mx-auto text-center mb-16 animate-on-scroll">
        <Badge variant="secondary" class="mb-4">
          <Icon name="lucide:sparkles" class="size-4 mr-1.5" />
          Simple Pricing
        </Badge>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Free to Start,
          <span class="text-primary">Pay As You Grow</span>
        </h2>
        <p class="text-lg text-muted-foreground">
          No monthly fees. No hidden charges. Only pay when you make money.
        </p>
      </div>

      <!-- Main Pricing Card -->
      <div class="max-w-4xl mx-auto mb-20">
        <div class="relative animate-on-scroll" style="animation-delay: 150ms">
          <!-- Background Glow -->
          <div class="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl opacity-50" />
          
          <!-- Card -->
          <div class="relative bg-background border-2 border-primary/20 rounded-2xl overflow-hidden shadow-xl">
            <!-- Top Accent -->
            <div class="h-1.5 bg-linear-to-r from-primary via-primary/80 to-primary" />
            
            <div class="p-8 sm:p-12">
              <div class="grid lg:grid-cols-2 gap-10 items-center">
                <!-- Left: Pricing Info -->
                <div class="text-center lg:text-left">
                  <div class="inline-flex items-center gap-2 bg-primary/10 text-black text-sm font-medium px-4 py-2 rounded-full mb-6">
                    <Icon name="lucide:infinity" class="size-4" />
                    Pay As You Earn
                  </div>
                  
                  <div class="mb-6">
                    <div class="flex items-baseline justify-center lg:justify-start gap-2">
                      <span class="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">5</span>
                      <span class="text-4xl sm:text-5xl font-bold text-primary">%</span>
                    </div>
                    <p class="text-lg text-muted-foreground mt-2">per successful transaction</p>
                  </div>
                  
                  <p class="text-muted-foreground mb-8 max-w-md">
                    You keep <span class="text-foreground font-semibold">95%</span> of every ticket sale and vote. 
                    We only earn when you do.
                  </p>
                  
                  <Button size="lg" as-child class="w-full sm:w-auto px-10">
                    <NuxtLink to="/register" class="gap-2">
                      Get Started Free
                      <Icon name="lucide:arrow-right" class="size-5" />
                    </NuxtLink>
                  </Button>
                </div>
                
                <!-- Right: Features List -->
                <div class="bg-muted/50 rounded-xl p-6 sm:p-8">
                  <h3 class="font-semibold mb-6 text-center lg:text-left">Everything included:</h3>
                  <ul class="grid sm:grid-cols-2 gap-4">
                    <li
                      v-for="(feature, index) in features"
                      :key="feature.text"
                      class="flex items-center gap-3 text-sm"
                    >
                      <div class="size-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Icon :name="feature.icon" class="size-3 text-primary" />
                      </div>
                      <span>{{ feature.text }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Highlights -->
      <div class="max-w-4xl mx-auto">
        <div class="grid sm:grid-cols-3 gap-6 sm:gap-8">
          <div
            v-for="(highlight, index) in highlights"
            :key="highlight.title"
            class="text-center group animate-on-scroll"
            :style="{ animationDelay: `${300 + index * 100}ms` }"
          >
            <div
              class="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300"
            >
              <Icon :name="highlight.icon" class="size-7 text-primary" />
            </div>
            <h4 class="font-semibold mb-2">{{ highlight.title }}</h4>
            <p class="text-sm text-muted-foreground">{{ highlight.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  animation: slideUp 0.6s ease-out forwards;
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
