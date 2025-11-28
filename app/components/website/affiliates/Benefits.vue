<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const benefits = [
  {
    icon: "lucide:percent",
    title: "20% Commission",
    description:
      "Earn 20% of platform fees from every paid event your team manages",
  },
  {
    icon: "lucide:layout-dashboard",
    title: "Your Own Dashboard",
    description:
      "Manage your team, create events, and track earnings from one place",
  },
  {
    icon: "lucide:credit-card",
    title: "Easy Payouts",
    description:
      "Get paid directly to your mobile money or bank account monthly",
  },
  {
    icon: "lucide:users",
    title: "Build Your Portfolio",
    description: "Create and manage events for clients under your team",
  },
];
</script>

<template>
  <section class="py-16 sm:py-24 bg-muted/30">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Why Become an Affiliate?
        </h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Join our partner network and enjoy these exclusive benefits
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          v-for="benefit in benefits"
          :key="benefit.title"
          class="text-center"
        >
          <CardHeader>
            <div
              class="size-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4"
            >
              <Icon :name="benefit.icon" class="size-6 text-primary" />
            </div>
            <CardTitle class="text-lg">{{ benefit.title }}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{{ benefit.description }}</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
