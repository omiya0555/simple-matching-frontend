<template>
    <rainbowCube />
    <div class="flex items-center justify-center min-h-screen bg-login-gradient">
        <div class="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm">
            <h4 class="flex justify-start text-gray-800">RandChat</h4>
            <h3 class="text-2xl text-gray-600 font-bold mb-6 text-center">Log in</h3>
            <form @submit.prevent="login">
                <input v-model="email" type="email" placeholder="Email" required
                    class="w-full p-3 mb-4 border hover:border-pink-300 transition outline-none rounded" />
                <input v-model="password" type="password" placeholder="Password" required
                    class="w-full p-3 mb-6 border hover:border-pink-300 transition outline-none rounded" />
                <button :disabled="isSubmitting" type="submit"
                    class="w-full bg-pink-300 hover:bg-pink-400 transition text-white py-3 rounded">
                    ログイン
                </button>
            </form>
            <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
            <div class="flex justify-end mt-4">
                <div class="flex-rows">
                    <p class="text-sm text-gray-600 hover:text-gray-800 transition">パスワードを忘れた方はこちら</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import apiClient from "../plugins/axios";
import { useRouter } from 'vue-router';
import rainbowCube from "@/components/rainbowCube.vue";


export default {
    components : {
        rainbowCube,
    },
    data() {
        return {
            email: "",
            password: "",
            errorMessage: "",
            isSubmitting: false, // 通信状態を管理
        };
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    methods: {
        async login() {
            if (!this.email || !this.password) {
                this.errorMessage = "すべてのフィールドを入力してください";
                return;
            }

            this.isSubmitting = true; // 通信開始
            try {
                const response = await apiClient.post("http://localhost/api/login", {
                    email: this.email,
                    password: this.password,
                });

                const userId = response.data.user.id;
                const token = response.data.token;
                const expiresAt = new Date();
                expiresAt.setHours(expiresAt.getHours() + 24);

                localStorage.setItem('user_id', userId);
                localStorage.setItem('auth_token', token);
                localStorage.setItem('expires_at', expiresAt.toISOString());

                this.router.push('/');
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    this.errorMessage = error.response.data.message;
                } else {
                    this.errorMessage = "ログインに失敗しました";
                }
            } finally {
                this.isSubmitting = false; // 通信終了
            }
        },
    },
};
</script>

<style scoped>

</style>
