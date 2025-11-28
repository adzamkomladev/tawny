<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <section class="py-16 sm:py-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Ready to Build Your Event Portfolio?
        </h2>
        <p class="text-muted-foreground mb-8 max-w-xl mx-auto">
          Apply to become a Tix4u affiliate, manage events for clients, and earn
          20% commission on every paid ticket and vote.
        </p>
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" as-child class="w-full sm:w-auto">
            <a href="#apply">
              Apply to Join
              <Icon name="lucide:arrow-right" class="size-5 ml-2" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            as-child
            class="w-full sm:w-auto"
          >
            <NuxtLink to="/"> Learn More About Tix4u </NuxtLink>
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
