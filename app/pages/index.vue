<script setup lang="ts">
definePageMeta({
    layout: false,
});

useSeoMeta({
    title: 'Tix4u - Create Unforgettable Events',
    description:
        'The all-in-one platform for ticketing, payments, and live voting. Launch your event in minutes with Tix4u.',
    ogTitle: 'Tix4u - Create Unforgettable Events',
    ogDescription:
        'The all-in-one platform for ticketing, payments, and live voting. Launch your event in minutes.',
    ogImage: '/img/og-image.png',
    twitterCard: 'summary_large_image',
});
</script>

<template>
    <div class="min-h-screen bg-white dark:bg-background">
        <LandingNavbar />
        <main>
            <LandingHero />
            <LandingPartners />
            <LandingFeatures />
            <LandingEvents />
            <LandingHowItWorks />
            <LandingPricing />
            <LandingTestimonials />
            <LandingFAQ />
            <LandingCTA />
        </main>
        <LandingFooter />
    </div>
</template>