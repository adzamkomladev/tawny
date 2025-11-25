<script setup lang="ts">
import { Button } from '@/components/ui/button';

const isScrolled = ref(false);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
];
</script>

<template>
  <header :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm'
        : 'bg-transparent',
    ]">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <img src="/svg/logo.svg" alt="Tix4u" class="h-10 sm:h-12" />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <a v-for="link in navLinks" :key="link.href" :href="link.href"
            class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            {{ link.label }}
          </a>
        </div>

        <!-- Auth Buttons -->
        <div class="flex items-center gap-3">
          <Button variant="ghost" as-child class="hidden sm:inline-flex">
            <NuxtLink to="/login">Sign in</NuxtLink>
          </Button>
          <Button as-child>
            <NuxtLink to="/register">
              Get Started
              <Icon name="lucide:arrow-right" class="size-5" />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </nav>
  </header>
</template>
