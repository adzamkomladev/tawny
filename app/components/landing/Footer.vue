<script setup lang="ts">
const currentYear = new Date().getFullYear();

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Integrations', href: '#' },
    { label: 'API', href: '#' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Status', href: '#' },
  ],
  legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};

const socialLinks = [
  { icon: 'lucide:twitter', href: '#', label: 'Twitter' },
  { icon: 'lucide:facebook', href: '#', label: 'Facebook' },
  { icon: 'lucide:instagram', href: '#', label: 'Instagram' },
  { icon: 'lucide:linkedin', href: '#', label: 'LinkedIn' },
];
</script>

<template>
  <footer class="bg-muted/50 border-t border-border">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Footer -->
      <div class="py-12 lg:py-16">
        <div class="grid grid-cols-2 md:grid-cols-6 gap-8">
          <!-- Brand -->
          <div class="col-span-2">
            <NuxtLink to="/" class="flex items-center mb-4">
              <img src="/svg/logo.svg" alt="Tix4u" class="h-10" />
            </NuxtLink>
            <p class="text-sm text-muted-foreground mb-6 max-w-xs">
              Powering seamless ticketing and e-voting for events across Africa. Sell tickets, collect votes, get paid.
            </p>
            <!-- Social Links -->
            <div class="flex items-center gap-4">
              <a
                v-for="social in socialLinks"
                :key="social.label"
                :href="social.href"
                :aria-label="social.label"
                class="size-9 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                <Icon :name="social.icon" class="size-4" />
              </a>
            </div>
          </div>

          <!-- Product -->
          <div>
            <h4 class="font-semibold text-sm mb-4">Product</h4>
            <ul class="space-y-3">
              <li v-for="link in footerLinks.product" :key="link.label">
                <a
                  :href="link.href"
                  class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Company -->
          <div>
            <h4 class="font-semibold text-sm mb-4">Company</h4>
            <ul class="space-y-3">
              <li v-for="link in footerLinks.company" :key="link.label">
                <a
                  :href="link.href"
                  class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Resources -->
          <div>
            <h4 class="font-semibold text-sm mb-4">Resources</h4>
            <ul class="space-y-3">
              <li v-for="link in footerLinks.resources" :key="link.label">
                <a
                  :href="link.href"
                  class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Legal -->
          <div>
            <h4 class="font-semibold text-sm mb-4">Legal</h4>
            <ul class="space-y-3">
              <li v-for="link in footerLinks.legal" :key="link.label">
                <a
                  :href="link.href"
                  class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-muted-foreground">
          © {{ currentYear }} Tix4u. All rights reserved.
        </p>
        <p class="text-sm text-muted-foreground">
          Made with <Icon name="lucide:heart" class="size-4 inline text-primary" /> in Ghana
        </p>
      </div>
    </div>
  </footer>
</template>
