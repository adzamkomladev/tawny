<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import { AsYouType, parsePhoneNumber } from "libphonenumber-js";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import SubmitButton from "@/components/common/forms/SubmitButton.vue";

import {
  type ApplyForm,
  applySchema,
} from "~~/schemas/affiliates";

const { handleSubmit, defineField, errors, isSubmitting, meta, setFieldValue } =
  useForm<ApplyForm>({
    validationSchema: toTypedSchema(applySchema),
    initialValues: {
      name: "",
      email: "",
      phone: "",
      reason: "",
      acceptTerms: false,
    },
  });

const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [phone, phoneAttrs] = defineField("phone");
const [reason, reasonAttrs] = defineField("reason");
const [acceptTerms] = defineField("acceptTerms");

// Format phone number as user types (Ghana default)
const formatPhoneNumber = (value: string) => {
  if (!value) return;

  // Use AsYouType for live formatting with Ghana as default
  const formatter = new AsYouType("GH");
  const formatted = formatter.input(value);
  setFieldValue("phone", formatted);
};

// Format to international format on blur
const formatPhoneOnBlur = () => {
  if (!phone.value) return;

  try {
    const parsed = parsePhoneNumber(phone.value, "GH");
    if (parsed && parsed.isValid()) {
      setFieldValue("phone", parsed.formatInternational());
    }
  } catch {
    // Keep the current value if parsing fails
  }
};

const isSubmitted = ref(false);

const onSubmit = handleSubmit(async (payload) => {
  const success = await useAffiliates().apply(payload);

  if (!success) {
    toast.error("Submission failed", {
      description: "Please try again or contact support.",
    });
    return;
  }

  isSubmitted.value = true;

  toast.success("Application received!", {
    description:
      "Check your email and phone for confirmation. We'll be in touch soon!",
  });
});
</script>

<template>
  <div>
    <div class="mb-8">
      <h2 class="text-3xl font-bold tracking-tight mb-4">
        Express Your Interest
      </h2>
      <p class="text-muted-foreground">
        Fill out the form below and our team will reach out to discuss the
        affiliate program with you.
      </p>
    </div>

    <!-- Success State -->
    <Card v-if="isSubmitted">
      <CardContent class="pt-6">
        <div class="text-center py-8">
          <div
            class="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"
          >
            <Icon name="lucide:check-circle" class="size-8 text-primary" />
          </div>
          <h3 class="text-xl font-semibold mb-3">Application Received!</h3>
          <p class="text-muted-foreground mb-6 max-w-sm mx-auto">
            Thank you for your interest in becoming a Tix4u affiliate. We've
            sent a confirmation to your email and phone.
          </p>
          <div class="space-y-4 text-left max-w-sm mx-auto">
            <div class="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Icon
                name="lucide:mail"
                class="size-5 text-primary shrink-0 mt-0.5"
              />
              <div>
                <p class="font-medium text-sm">Check your inbox</p>
                <p class="text-xs text-muted-foreground">
                  We've sent a confirmation email with next steps.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Icon
                name="lucide:phone"
                class="size-5 text-primary shrink-0 mt-0.5"
              />
              <div>
                <p class="font-medium text-sm">Expect a call</p>
                <p class="text-xs text-muted-foreground">
                  Our team will call you within 2-3 business days.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Icon
                name="lucide:clock"
                class="size-5 text-primary shrink-0 mt-0.5"
              />
              <div>
                <p class="font-medium text-sm">Be patient</p>
                <p class="text-xs text-muted-foreground">
                  Once approved, you'll receive a 6-digit code to complete
                  signup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Application Form -->
    <Card v-else>
      <CardContent class="pt-6">
        <form class="flex flex-col gap-6" @submit.prevent="onSubmit">
          <FieldGroup>
            <Field>
              <FieldLabel for="name" class="font-semibold">
                Full Name
              </FieldLabel>
              <Input
                v-model="name"
                v-bind="nameAttrs"
                id="name"
                type="text"
                placeholder="Enter your full name"
                required
              />
              <FieldError v-if="errors.name">{{ errors.name }}</FieldError>
            </Field>

            <Field>
              <FieldLabel for="email" class="font-semibold">
                Email Address
              </FieldLabel>
              <Input
                v-model="email"
                v-bind="emailAttrs"
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
              <FieldError v-if="errors.email">{{ errors.email }}</FieldError>
            </Field>

            <Field>
              <FieldLabel for="phone" class="font-semibold">
                Phone Number
              </FieldLabel>
              <Input
                v-model="phone"
                v-bind="phoneAttrs"
                id="phone"
                type="tel"
                placeholder="+233 XX XXX XXXX"
                required
                @input="formatPhoneNumber(($event.target as HTMLInputElement).value)"
                @blur="formatPhoneOnBlur"
              />
              <FieldError v-if="errors.phone">{{ errors.phone }}</FieldError>
            </Field>

            <Field>
              <FieldLabel for="reason" class="font-semibold">
                Why do you want to become an affiliate?
              </FieldLabel>
              <Textarea
                v-model="reason"
                v-bind="reasonAttrs"
                id="reason"
                placeholder="Tell us about yourself, your experience with events, and why you're interested in the Tix4u affiliate program..."
                class="min-h-32"
                required
              />
              <FieldError v-if="errors.reason">{{ errors.reason }}</FieldError>
            </Field>

            <!-- Agreement Section -->
            <div class="rounded-lg border border-border bg-muted/30 p-4 space-y-4">
              <div class="flex items-center gap-2 text-sm font-medium">
                <Icon name="lucide:file-check" class="size-4 text-primary" />
                <span>Agreement</span>
              </div>

              <div class="space-y-3">
                <!-- Terms Summary -->
                <div class="text-xs text-muted-foreground space-y-2 pl-1">
                  <p>By applying, you acknowledge that:</p>
                  <ul class="space-y-1.5 ml-3">
                    <li class="flex items-start gap-2">
                      <Icon
                        name="lucide:circle"
                        class="size-1.5 mt-1.5 shrink-0 text-muted-foreground"
                      />
                      <span>
                        You must manage at least
                        <strong class="text-foreground">5 paid events per year</strong>
                      </span>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon
                        name="lucide:circle"
                        class="size-1.5 mt-1.5 shrink-0 text-muted-foreground"
                      />
                      <span>
                        Commissions are
                        <strong class="text-foreground">20% of platform fees</strong>
                        on events you manage
                      </span>
                    </li>
                    <li class="flex items-start gap-2">
                      <Icon
                        name="lucide:circle"
                        class="size-1.5 mt-1.5 shrink-0 text-muted-foreground"
                      />
                      <span>
                        Your verification code expires after
                        <strong class="text-foreground">7 days</strong>
                        if not used
                      </span>
                    </li>
                  </ul>
                </div>

                <!-- Checkbox -->
                <div
                  class="flex items-start gap-3 p-3 rounded-md border transition-colors cursor-pointer"
                  :class="[
                    acceptTerms
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-background hover:border-primary/50',
                  ]"
                  @click="setFieldValue('acceptTerms', !acceptTerms)"
                >
                  <Checkbox
                    id="terms"
                    :checked="acceptTerms"
                    class="mt-0.5"
                    @update:checked="(val: boolean) => setFieldValue('acceptTerms', val)"
                  />
                  <div class="flex-1">
                    <Label for="terms" class="text-sm leading-relaxed cursor-pointer">
                      I have read and agree to the
                      <a
                        href="#terms"
                        class="text-primary hover:underline font-medium"
                        @click.stop
                      >
                        Affiliate Terms & Conditions
                      </a>
                    </Label>
                    <p class="text-xs text-muted-foreground mt-1">
                      You can review all terms in the section on the right
                      before agreeing.
                    </p>
                  </div>
                </div>

                <FieldError
                  v-if="errors.acceptTerms"
                  class="text-destructive text-sm"
                >
                  {{ errors.acceptTerms }}
                </FieldError>
              </div>
            </div>

            <Field>
              <SubmitButton
                :disabled="isSubmitting || !meta.valid"
                class="cursor-pointer w-full"
                :loading="isSubmitting"
                text="Submit Application"
                loading-text="Submitting..."
              />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>

    <!-- Requirements Note -->
    <div class="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
      <h4 class="font-semibold text-sm mb-3 flex items-center gap-2">
        <Icon name="lucide:info" class="size-4 text-primary" />
        Program Requirements
      </h4>
      <ul class="space-y-2">
        <li
          v-for="requirement in requirements"
          :key="requirement"
          class="flex items-start gap-2 text-sm text-muted-foreground"
        >
          <Icon
            name="lucide:check"
            class="size-4 text-primary shrink-0 mt-0.5"
          />
          <span>{{ requirement }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
const requirements = [
  "Manage at least 5 paid events per year",
  "Provide accurate contact information for verification",
  "Be available for a brief phone call during approval",
  "Comply with our affiliate terms and conditions",
];
</script>
