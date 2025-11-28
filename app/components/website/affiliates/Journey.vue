<script setup lang="ts">
const journeySteps = [
  {
    step: 1,
    title: "Express Interest",
    description:
      "Fill out the application form below with your details and why you want to become an affiliate.",
    icon: "lucide:file-text",
  },
  {
    step: 2,
    title: "We'll Reach Out",
    description:
      "Our team will review your application and contact you to discuss the opportunity.",
    icon: "lucide:phone-call",
  },
  {
    step: 3,
    title: "Get Approved",
    description:
      "Once approved, you'll receive a 6-digit verification code via email and SMS (valid for 7 days).",
    icon: "lucide:badge-check",
  },
  {
    step: 4,
    title: "Create Your Account",
    description:
      "Sign up on Tix4u, select 'Affiliate' as your role, and enter your verification code.",
    icon: "lucide:user-plus",
  },
  {
    step: 5,
    title: "Start Earning",
    description:
      "Set up your team, create events for clients, and earn 20% on every paid ticket and vote.",
    icon: "lucide:rocket",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Your Journey to Becoming an Affiliate
        </h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          From application to earning—here's how the process works
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="space-y-6">
          <div
            v-for="(step, index) in journeySteps"
            :key="step.step"
            class="relative flex gap-6"
          >
            <!-- Timeline line -->
            <div class="flex flex-col items-center">
              <div
                class="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold shrink-0"
              >
                {{ step.step }}
              </div>
              <div
                v-if="index < journeySteps.length - 1"
                class="w-px flex-1 bg-border mt-3"
              />
            </div>

            <!-- Content -->
            <div class="pb-8">
              <div class="flex items-center gap-3 mb-2">
                <Icon :name="step.icon" class="size-5 text-primary" />
                <h3 class="font-semibold text-lg">{{ step.title }}</h3>
              </div>
              <p class="text-muted-foreground">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
