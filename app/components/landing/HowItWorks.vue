<script setup lang="ts">
const steps = [
  {
    step: '01',
    title: 'Create Your Event',
    description:
      'Set up your event in minutes with our intuitive builder. Add details, configure tickets or voting categories.',
    icon: 'lucide:calendar-plus',
  },
  {
    step: '02',
    title: 'Sell Tickets & Votes',
    description:
      'Share your event link and start selling tickets or collecting votes. Accept payments via cards, mobile money, and USSD.',
    icon: 'lucide:ticket',
  },
  {
    step: '03',
    title: 'Track & Get Paid',
    description:
      'Monitor sales and votes in real-time. Funds are automatically deposited to your account after each event.',
    icon: 'lucide:wallet',
  },
];
</script>

<template>
  <section id="how-it-works" class="py-24 sm:py-32">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4 animate-on-scroll">
          Launch Your Event in
          <span class="text-primary">3 Simple Steps</span>
        </h2>
        <p class="text-lg text-muted-foreground animate-on-scroll">
          Get started in minutes. No technical expertise required.
        </p>
      </div>

      <!-- Steps -->
      <div class="max-w-5xl mx-auto">
        <div class="grid md:grid-cols-3 gap-8 md:gap-12">
          <div
            v-for="(item, index) in steps"
            :key="item.step"
            class="relative animate-on-scroll"
            :style="{ animationDelay: `${index * 150}ms` }"
          >
            <!-- Connector Line (Desktop) -->
            <div
              v-if="index < steps.length - 1"
              class="hidden md:block absolute top-14 left-[calc(50%+3.5rem)] w-[calc(100%-3.5rem)] h-0.5 bg-border"
            >
              <div class="absolute right-0 top-1/2 -translate-y-1/2 size-2.5 rounded-full bg-primary" />
            </div>

            <!-- Step Card -->
            <div class="text-center group">
              <!-- Step Number -->
              <div class="relative inline-flex mb-6">
                <div
                  class="size-28 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300"
                >
                  <Icon :name="item.icon" class="size-12 text-primary" />
                </div>
                <span
                  class="absolute -top-2 -right-2 size-9 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-lg shadow-primary/25"
                >
                  {{ item.step }}
                </span>
              </div>

              <!-- Content -->
              <h3 class="text-xl font-semibold mb-3">{{ item.title }}</h3>
              <p class="text-muted-foreground text-sm leading-relaxed">
                {{ item.description }}
              </p>
            </div>
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
