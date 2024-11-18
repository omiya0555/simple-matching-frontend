<template>
    <BaseLayout>
        <!-- ローディングスピナー -->
        <transition name="fade">
            <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                <div class="loader"></div>
            </div>
        </transition>

        <!-- メイン画面 -->
        <transition name="fade">
            <div v-if="!loading" class="home-container p-6">
                <h1 class="w-fit text-2xl font-semibold mx-auto mb-6">マイプロフィール</h1>
                <div class="w-fit mx-auto p-8 border rounded-sm shadow-md">
                    <img :src="user.profile_image" alt="ユーザーアイコン" class="w-32 h-32 rounded-full mx-auto mb-4">
                    <p>名前&emsp;: {{ user.name }}</p>
                    <p>地域&emsp;: {{ user.location }}</p>
                    <p v-if="user.gender==='male'">性別&emsp;: 男</p>
                    <p v-else>性別&emsp;: 女</p>
                </div>
            </div>
        </transition>
    </BaseLayout>
</template>

<script>
import apiClient from "../plugins/axios";
import BaseLayout from '@/layouts/BaseLayout.vue';

export default {
    components :{
        BaseLayout,
    },
    data() {
        return {
            user: '',
            loading: true,
        };
    },
    methods: {
        async fetchUser() {
            try {
                const response = await apiClient.get(`http://localhost/api/user/`);
                this.user = response.data;
            } catch (error) {
                console.error('ユーザーの取得に失敗しました', error);
            }
        },
    },
    mounted() {
        this.fetchUser();
        this.loading = false;
    },
};
</script>

<style scoped>
.chat-room {
    height: 100vh;
}
</style>