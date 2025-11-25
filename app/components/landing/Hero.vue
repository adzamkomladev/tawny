<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
    <!-- Animated Background -->
    <div class="absolute inset-0 -z-10">
      <!-- Gradient Orbs -->
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
      />
      <div
        class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse delay-700"
      />
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
      />
      
      <!-- Grid Pattern -->
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--muted)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted)/0.3)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"
      />
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Badge -->
        <Badge variant="secondary" class="mb-6 px-4 py-1.5 text-sm animate-fade-in">
          <Icon name="lucide:sparkles" class="size-4 mr-1.5" />
          Powering 30,000+ events across Africa
        </Badge>

        <!-- Main Headline -->
        <h1
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up"
        >
          Power Your Events
          <span class="relative">
            <span
              class="bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
            >
              With Simplicity
            </span>
            <svg
              class="absolute -bottom-2 left-0 w-full h-3 text-primary/40"
              viewBox="0 0 200 12"
              fill="none"
            >
              <path
                d="M2 10C50 2 150 2 198 10"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
              />
            </svg>
          </span>
        </h1>

        <!-- Subheadline -->
        <p
          class="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up delay-100"
        >
          Run events, sell tickets, collect votes, and get paid—all from one powerful platform. 
          Works online, offline, and via USSD.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-200">
          <Button size="lg" as-child class="w-full sm:w-auto text-base px-8">
            <NuxtLink to="/register">
              Start for Free
              <Icon name="lucide:arrow-right" class="size-5 ml-2" />
            </NuxtLink>
          </Button>
          <Button variant="outline" size="lg" as-child class="w-full sm:w-auto text-base px-8">
            <a href="#how-it-works">
              <Icon name="lucide:play-circle" class="size-5 mr-2" />
              See How It Works
            </a>
          </Button>
        </div>

        <!-- Stats -->
        <div
          class="grid grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-up delay-300"
        >
          <div class="text-center">
            <div class="text-3xl sm:text-4xl font-bold text-foreground">30K+</div>
            <div class="text-sm text-muted-foreground mt-1">Events Created</div>
          </div>
          <div class="text-center">
            <div class="text-3xl sm:text-4xl font-bold text-foreground">250K+</div>
            <div class="text-sm text-muted-foreground mt-1">Tickets Sold</div>
          </div>
          <div class="text-center">
            <div class="text-3xl sm:text-4xl font-bold text-foreground">323K+</div>
            <div class="text-sm text-muted-foreground mt-1">Votes Casted</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <a href="#features" class="text-muted-foreground hover:text-foreground transition-colors">
        <Icon name="lucide:chevron-down" class="size-8" />
      </a>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.delay-100 {
  animation-delay: 100ms;
}

.delay-200 {
  animation-delay: 200ms;
}

.delay-300 {
  animation-delay: 300ms;
}

.delay-700 {
  animation-delay: 700ms;
}
</style>
