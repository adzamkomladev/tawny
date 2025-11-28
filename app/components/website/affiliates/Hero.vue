<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
</script>

<template>
  <section class="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 -z-10">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
      />
      <div
        class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse delay-700"
      />
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <Badge variant="secondary" class="mb-6 px-4 py-1.5 text-sm">
          <Icon name="lucide:handshake" class="size-4 mr-1.5" />
          Affiliate Program
        </Badge>

        <h1
          class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
        >
          Earn
          <span
            class="bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent"
          >
            20% Commission
          </span>
          on Every Event
        </h1>

        <p
          class="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Partner with Tix4u to manage events for clients. Build your team,
          create paid events, and earn 20% of platform fees on every ticket
          and vote.
        </p>

        <div
          class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground"
        >
          <div class="flex items-center gap-2">
            <Icon name="lucide:check-circle" class="size-5 text-primary" />
            <span>Free to apply</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon name="lucide:check-circle" class="size-5 text-primary" />
            <span>Your own dashboard</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon name="lucide:check-circle" class="size-5 text-primary" />
            <span>Monthly payouts</span>
          </div>
        </div>

        <div class="mt-8">
          <Button size="lg" as-child>
            <a href="#apply">
              Apply to Join
              <Icon name="lucide:arrow-down" class="size-5 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.delay-700 {
  animation-delay: 700ms;
}
</style>
