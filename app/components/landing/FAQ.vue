<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How much does Tix4u cost?',
    answer:
      'Tix4u is completely free to use! There are no monthly fees or setup costs. We only take a 5% fee on successful transactions—you keep 95% of every ticket sale and vote.',
  },
  {
    question: 'Can I accept payments in my local currency?',
    answer:
      'Yes! Tix4u supports multiple currencies and payment methods including mobile money (MTN MoMo, Telecel Cash, AirtelTigo), bank transfers via Paystack and Fincra, and major credit/debit cards.',
  },
  {
    question: 'How does the live voting feature work?',
    answer:
      'Our live voting system supports both web-based voting and USSD for wider reach. This means people without internet can still vote via their mobile phones. Votes are processed in real-time with automatic de-duplication to ensure fair results.',
  },
  {
    question: 'Can I customize my event page?',
    answer:
      'Absolutely! You can customize your event page with your branding, images, and ticket types. Create multiple ticket categories, set early bird pricing, and manage stock levels all from your dashboard.',
  },
  {
    question: 'How do I receive my payouts?',
    answer:
      'Payouts are processed automatically to your linked bank account or mobile money wallet within 24-48 hours after your event. You can track all transactions from your real-time dashboard.',
  },
  {
    question: 'Is there a limit on tickets or votes I can sell?',
    answer:
      'No limits at all! Sell unlimited tickets and collect unlimited votes. We scale with your event, whether you\'re hosting 50 people or 50,000.',
  },
];
</script>

<template>
  <section id="faq" class="py-24 sm:py-32 bg-muted/20">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="max-w-3xl mx-auto text-center mb-16 animate-on-scroll">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Frequently Asked
          <span class="text-primary">Questions</span>
        </h2>
        <p class="text-lg text-muted-foreground">
          Got questions? We've got answers. If you can't find what you're looking for,
          reach out to our support team.
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="max-w-3xl mx-auto animate-on-scroll" style="animation-delay: 150ms">
        <Accordion type="single" collapsible class="w-full space-y-4">
          <AccordionItem v-for="(faq, index) in faqs" :key="index" :value="`item-${index}`"
            class="border border-border/50 rounded-lg bg-white dark:bg-background px-6 hover:border-primary/30 transition-colors">
            <AccordionTrigger class="text-left hover:no-underline py-5">
              <span class="font-medium">{{ faq.question }}</span>
            </AccordionTrigger>
            <AccordionContent class="text-muted-foreground pb-5">
              {{ faq.answer }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
