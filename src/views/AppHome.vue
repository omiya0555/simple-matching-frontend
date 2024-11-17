<template>
    <BaseLayout>
        <div class="home-container p-6">
            <h1 class="w-fit text-2xl font-semibold mx-auto mb-6">Matching</h1>
            <div>
                <!-- マッチング画面コンポーネント -->
                <p class="text-lg text-gray-600">気になった相手にLIKEしよう</p>
                <MatchHome />
            </div>
        </div>
    </BaseLayout>
</template>

<script>
import BaseLayout from '../layouts/BaseLayout.vue';
import MatchHome from '../components/MatchHome.vue';

export default {
    components: {
        BaseLayout,
        MatchHome
    },
};
</script>

<style scoped>
</style>