<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: 'lucide:ticket',
    title: 'Smart Ticketing',
    description:
      'Create unlimited ticket types with dynamic pricing, early bird discounts, and automatic stock management.',
  },
  {
    icon: 'lucide:credit-card',
    title: 'Seamless Payments',
    description:
      'Accept payments globally with multiple payment methods. Instant payouts to your account.',
  },
  {
    icon: 'lucide:vote',
    title: 'Live Voting',
    description:
      'Engage your audience with real-time voting via web and USSD. Perfect for competitions and polls.',
  },
  {
    icon: 'lucide:users',
    title: 'Team Management',
    description:
      'Invite team members with role-based access. Collaborate efficiently on event management.',
  },
  {
    icon: 'lucide:bar-chart-3',
    title: 'Real-time Analytics',
    description:
      'Track sales, attendance, and engagement with beautiful dashboards and exportable reports.',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Enterprise Security',
    description:
      'Bank-grade encryption, fraud detection, and compliance with global data protection standards.',
  },
];
</script>

<template>
  <section id="features" class="py-24 sm:py-32 bg-muted/30">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="max-w-3xl mx-auto text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Everything You Need to
          <span class="text-primary">Succeed</span>
        </h2>
        <p class="text-lg text-muted-foreground">
          Powerful features designed to help you create, manage, and scale your events effortlessly.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="(feature, index) in features"
          :key="feature.title"
          class="group relative overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 animate-on-scroll"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <CardContent class="p-6">
            <!-- Icon -->
            <div
              class="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300"
            >
              <Icon :name="feature.icon" class="size-7 text-primary" />
            </div>

            <!-- Content -->
            <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-muted-foreground text-sm leading-relaxed">
              {{ feature.description }}
            </p>

            <!-- Hover Gradient -->
            <div
              class="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            />
          </CardContent>
        </Card>
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
