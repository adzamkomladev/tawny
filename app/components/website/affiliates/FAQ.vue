<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    value: "faq-1",
    question: "How long does the approval process take?",
    answer:
      "We typically review applications within 2-3 business days. If your application is promising, we'll reach out to schedule a brief phone call. The entire process usually takes about a week.",
  },
  {
    value: "faq-2",
    question: "What happens if my verification code expires?",
    answer:
      "If your 6-digit code expires before you complete registration, please contact our support team. We can issue a new code after verifying your identity.",
  },
  {
    value: "faq-3",
    question: "Can I manage events for multiple clients?",
    answer:
      "Yes! Once you're an affiliate, you can create a team and manage multiple events for different clients. Each event you manage contributes to your commission earnings.",
  },
  {
    value: "faq-4",
    question: "When do I get paid?",
    answer:
      "Commissions are calculated at the end of each month and paid within 15 business days. You can choose Mobile Money or bank transfer for payouts.",
  },
  {
    value: "faq-5",
    question: "What kind of events can I manage?",
    answer:
      "You can manage any type of paid event including concerts, conferences, pageants, competitions with voting, and more. Both ticket sales and voting revenue count towards your earnings.",
  },
];
</script>

<template>
  <div class="mt-8">
    <h3 class="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
    <Card>
      <CardContent class="pt-6">
        <Accordion type="single" collapsible class="w-full">
          <AccordionItem
            v-for="faq in faqItems"
            :key="faq.value"
            :value="faq.value"
          >
            <AccordionTrigger class="text-left">
              {{ faq.question }}
            </AccordionTrigger>
            <AccordionContent>
              <p class="text-sm text-muted-foreground leading-relaxed">
                {{ faq.answer }}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  </div>
</template>
