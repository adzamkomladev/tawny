<script setup lang="ts">
import { Button } from '@/components/ui/button';
</script>

<template>
  <section class="py-24 sm:py-32 relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-primary/5" />
      <div
        class="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
      />
      <div
        class="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-500"
      />
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          Ready to Create Your Next
          <span class="text-primary">Unforgettable Event?</span>
        </h2>
        <p class="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Join thousands of event organizers who trust Tix4u to power their events. 
          Start free, no credit card required.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" as-child class="w-full sm:w-auto text-base px-8">
            <NuxtLink to="/register">
              Create Your First Event
              <Icon name="lucide:arrow-right" class="size-5 ml-2" />
            </NuxtLink>
          </Button>
          <Button variant="outline" size="lg" as-child class="w-full sm:w-auto text-base px-8">
            <NuxtLink to="/login">
              Sign In
            </NuxtLink>
          </Button>
        </div>

        <!-- Trust Badges -->
        <div class="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground animate-on-scroll" style="animation-delay: 200ms">
          <div class="flex items-center gap-2 text-sm">
            <Icon name="lucide:shield-check" class="size-5" />
            <span>Secure Payments</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <Icon name="lucide:clock" class="size-5" />
            <span>24/7 Support</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <Icon name="lucide:globe" class="size-5" />
            <span>Ghana & Beyond</span>
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

.delay-500 {
  animation-delay: 500ms;
}
</style>
