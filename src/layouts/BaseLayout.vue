<template>
    <div class="flex flex-col min-h-screen">
        <!-- ヘッダー -->
        <AppHeader />

        <!-- メインコンテンツ -->
        <main class="flex-grow p-4">
            <slot />
        </main>

        <!-- フッター -->
        <AppFooter />
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
    components: {
        AppHeader,
        AppFooter,
    },
};
</script>