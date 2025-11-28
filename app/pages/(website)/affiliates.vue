<script setup lang="ts">
definePageMeta({
  layout: false,
});

useSeoMeta({
  title: "Become an Affiliate - Tix4u",
  description:
    "Join the Tix4u affiliate program and earn 20% commission on every paid event your referrals create. Apply today!",
  ogTitle: "Become an Affiliate - Tix4u",
  ogDescription:
    "Earn 20% commission by referring event organizers to Tix4u. Apply to join our affiliate program.",
  ogImage: "/img/og-affiliate.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="min-h-screen bg-background">
    <LandingNavbar />

    <main>
      <WebsiteAffiliatesHero />
      <WebsiteAffiliatesBenefits />
      <WebsiteAffiliatesJourney />

      <!-- Application Form & Terms Section -->
      <section id="apply" class="py-16 sm:py-24 bg-muted/30">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-12">
            <WebsiteAffiliatesApplicationForm />

            <div>
              <WebsiteAffiliatesTerms />
              <WebsiteAffiliatesFAQ />
            </div>
          </div>
        </div>
      </section>

      <WebsiteAffiliatesCTA />
    </main>

    <LandingFooter />
  </div>
</template>
