<script lang="ts" setup>

</script>
<template>
    <div class="grid min-h-svh lg:grid-cols-2">
        <div class="flex flex-col gap-4 p-6 md:p-10">
            <div class="flex justify-center gap-2 md:justify-start">
                <NuxtLink to="/" class="flex items-center gap-2 font-medium">
                    <NuxtImg src="/svg/logo.svg" alt="Tix4u Logo" class="w-24" />
                </NuxtLink>
            </div>
            <div class="flex flex-1 items-center justify-center">
                <div class="w-full max-w-sm">
                    <slot />
                </div>
            </div>
        </div>
        <div class="bg-muted relative hidden lg:block">
            <img src="/img/auth/layout.jpg" alt="Image"
                class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale">
        </div>
    </div>
</template>