<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    quote:
      "Tix4u transformed how we manage our events. The live voting feature was a game-changer for our annual awards show.",
    author: 'Sarah Mensah',
    role: 'Event Director',
    company: 'Ghana Music Awards',
    avatar: 'SM',
  },
  {
    quote:
      "We sold out our conference in record time. The platform is incredibly intuitive and the support team is amazing.",
    author: 'Kwame Asante',
    role: 'Founder',
    company: 'Tech Summit Africa',
    avatar: 'KA',
  },
  {
    quote:
      "The USSD voting integration allowed us to reach audiences across the country. Truly inclusive technology.",
    author: 'Ama Serwaa',
    role: 'Producer',
    company: 'National TV',
    avatar: 'AS',
  },
];
</script>

<template>
  <section id="testimonials" class="py-24 sm:py-32">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="max-w-3xl mx-auto text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Loved by Event
          <span class="text-primary">Organizers</span>
        </h2>
        <p class="text-lg text-muted-foreground">
          See what our customers have to say about their experience with Tix4u.
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.author"
          class="border-border/50 bg-background hover:shadow-lg hover:border-primary/30 transition-all duration-300 animate-on-scroll"
          :style="{ animationDelay: `${150 + index * 100}ms` }"
        >
          <CardContent class="p-6">
            <!-- Quote Icon -->
            <Icon name="lucide:quote" class="size-10 text-primary/30 mb-4" />

            <!-- Quote -->
            <p class="text-foreground mb-6 leading-relaxed">
              "{{ testimonial.quote }}"
            </p>

            <!-- Author -->
            <div class="flex items-center gap-3">
              <div
                class="size-11 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary"
              >
                {{ testimonial.avatar }}
              </div>
              <div>
                <div class="font-semibold text-sm">{{ testimonial.author }}</div>
                <div class="text-xs text-muted-foreground">
                  {{ testimonial.role }}, {{ testimonial.company }}
                </div>
              </div>
            </div>
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
