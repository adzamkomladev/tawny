<script lang="ts" setup>
import { Button } from "@/components/ui/button";

</script>

<template>
    <div>
        <h3>Welcome everyone to our landing page. Let's get started below</h3>
        <div>
            <Button as-child>
                <NuxtLink to="/register">Get Started</NuxtLink>
            </Button>
            <Button variant="outline" as-child>
                <NuxtLink to="/login">Login</NuxtLink>
            </Button>
        </div>
    </div>
</template>