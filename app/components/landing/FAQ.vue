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
      'Tix4u is free to get started. We only charge a small percentage on ticket sales. Our Starter plan is completely free, and our Pro plan starts at $29/month for unlimited features.',
  },
  {
    question: 'Can I accept payments in my local currency?',
    answer:
      'Yes! Tix4u supports multiple currencies and payment methods including mobile money (MTN, Vodafone Cash), bank transfers, and major credit/debit cards across 150+ countries.',
  },
  {
    question: 'How does the live voting feature work?',
    answer:
      'Our live voting system supports both web-based voting and USSD for wider reach. Votes are processed in real-time with automatic de-duplication to ensure fair results.',
  },
  {
    question: 'Can I customize my event page?',
    answer:
      'Absolutely! You can customize your event page with your branding, colors, and images. Pro users get access to advanced customization options including custom domains.',
  },
  {
    question: 'How do I receive my payouts?',
    answer:
      'Payouts are processed automatically to your linked bank account or mobile money wallet. You can choose daily, weekly, or monthly payout schedules based on your preference.',
  },
  {
    question: 'Is there a limit on the number of tickets I can sell?',
    answer:
      'The Starter plan allows up to 100 tickets per event. Pro and Enterprise plans have no ticket limits - sell as many as you need!',
  },
];
</script>

<template>
  <section id="faq" class="py-24 sm:py-32 bg-muted/30">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="max-w-3xl mx-auto text-center mb-16">
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
      <div class="max-w-3xl mx-auto">
        <Accordion type="single" collapsible class="w-full space-y-4">
          <AccordionItem
            v-for="(faq, index) in faqs"
            :key="index"
            :value="`item-${index}`"
            class="border border-border/50 rounded-lg bg-background px-6"
          >
            <AccordionTrigger class="text-left hover:no-underline py-4">
              <span class="font-medium">{{ faq.question }}</span>
            </AccordionTrigger>
            <AccordionContent class="text-muted-foreground pb-4">
              {{ faq.answer }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </section>
</template>
