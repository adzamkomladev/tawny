<script setup lang="ts">
const paymentPartners = [
  { name: 'Paystack', icon: 'lucide:credit-card' },
  { name: 'Fincra', icon: 'lucide:wallet' },
  { name: 'MTN MoMo', icon: 'lucide:smartphone' },
  { name: 'Telecel Cash', icon: 'lucide:phone' },
  { name: 'AirtelTigo', icon: 'lucide:signal' },
];
</script>

<template>
  <section class="py-12 sm:py-16 border-b border-border/50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-center text-sm text-muted-foreground mb-8">
        Powered by trusted payment partners
      </p>

      <!-- Logo Grid -->
      <div class="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        <div
          v-for="partner in paymentPartners"
          :key="partner.name"
          class="flex items-center gap-2.5 text-muted-foreground/70 hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-muted/50"
        >
          <Icon :name="partner.icon" class="size-5" />
          <span class="text-sm font-medium">{{ partner.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
