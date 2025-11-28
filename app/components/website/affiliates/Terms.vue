<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const termsAccordion = [
  {
    value: "eligibility",
    title: "1. Eligibility Requirements",
    content:
      "To become a Tix4u affiliate, you must be at least 18 years old, have a valid email address and phone number, and agree to comply with these terms. You must be able to receive payments through supported methods in your region (Mobile Money, Bank Transfer). All applications are subject to review and approval by the Tix4u team.",
  },
  {
    value: "approval",
    title: "2. Application & Approval Process",
    content:
      "After submitting your application, our team will review your details and may contact you via phone to discuss the program. Approved applicants will receive a 6-digit verification code via email and SMS. This code expires after 7 days. You must create a Tix4u account and complete verification using this code to activate your affiliate status.",
  },
  {
    value: "commission",
    title: "3. Commission Structure",
    content:
      "Affiliates earn 20% of the platform fees collected from paid events managed under their team. Platform fees are calculated as a percentage of ticket sales and voting revenue. Commissions are calculated monthly and paid out within 15 business days of the month end. Minimum payout threshold is GHS 50 or equivalent.",
  },
  {
    value: "requirements",
    title: "4. Activity Requirements",
    content:
      "To maintain active affiliate status, you must manage at least 5 paid events per calendar year through your team. Failure to meet this requirement may result in account review or termination. We understand seasonality and will consider reasonable exceptions on a case-by-case basis.",
  },
  {
    value: "portfolio",
    title: "5. Team & Event Management",
    content:
      "As an affiliate, you can create a team (portfolio) and manage events on behalf of clients. You have full control over event setup, ticketing, voting configurations, and participant management. Revenue from these events contributes to your commission earnings.",
  },
  {
    value: "prohibited",
    title: "6. Prohibited Activities",
    content:
      "Affiliates may not engage in spam, misleading advertising, trademark infringement, or any illegal activities. Sharing verification codes, creating fake applications, or fraudulent activity will result in immediate termination and forfeiture of pending commissions.",
  },
  {
    value: "termination",
    title: "7. Termination",
    content:
      "Either party may terminate the affiliate relationship at any time with 30 days written notice. Tix4u reserves the right to immediately terminate affiliates who violate these terms. Upon termination, pending valid commissions will be paid according to the regular schedule.",
  },
  {
    value: "modifications",
    title: "8. Modifications to Terms",
    content:
      "Tix4u reserves the right to modify these terms at any time. Significant changes will be communicated via email at least 30 days before taking effect. Continued participation after changes take effect constitutes acceptance of the new terms.",
  },
];
</script>

<template>
  <div id="terms">
    <div class="mb-8">
      <h2 class="text-3xl font-bold tracking-tight mb-4">
        Terms & Conditions
      </h2>
      <p class="text-muted-foreground">
        Please review our affiliate program terms before applying.
      </p>
    </div>

    <Card>
      <CardContent class="pt-6">
        <Accordion type="single" collapsible class="w-full">
          <AccordionItem
            v-for="item in termsAccordion"
            :key="item.value"
            :value="item.value"
          >
            <AccordionTrigger class="text-left">
              {{ item.title }}
            </AccordionTrigger>
            <AccordionContent>
              <p class="text-sm text-muted-foreground leading-relaxed">
                {{ item.content }}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  </div>
</template>
