<template>
    <nav class="bg-login-gradient text-white px-4 py-2 flex justify-between items-center">
        <!-- 左：タイトルとアイコン -->
        <div class="flex items-center space-x-2">
            <h1 class="text-lg text-gray-700 font-semibold">RandChat</h1>
        </div>

        <!-- ハンバーガーメニュー (モバイル用) -->
        <div class="md:hidden">
            <button @click="isOpen = !isOpen" class="focus:outline-none">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>

        <!-- 中央：メニュー (PC用) -->
        <div class="hidden md:flex space-x-4">
            <router-link to="/" class="text-gray-600 hover:text-gray-900 transition">ホーム</router-link>
            <router-link to="/chat" class="text-gray-600 hover:text-gray-900 transition">チャット</router-link>
            <router-link to="/profile" class="text-gray-600 hover:text-gray-900 transition">プロフィール</router-link>
            <router-link to="/notifications" class="text-gray-600 hover:text-gray-900 transition">通知</router-link>
        </div>

        <!-- 右：ログアウトボタン (PC用) -->
        <div class="hidden md:block">
            <button @click="logout" class="hover:bg-red-500 text-white px-4 py-1 rounded transition">ログアウト</button>
        </div>

        <!-- ドロップダウンメニュー (モバイル用) -->
        <div v-if="isOpen" class="z-50 md:hidden absolute top-16 left-0 right-0 bg-gray-900 shadow-md">
            <router-link to="/" class="block px-4 py-2 hover:bg-gray-700">ホーム</router-link>
            <router-link to="/chat" class="block px-4 py-2 hover:bg-gray-700">チャット</router-link>
            <router-link to="/profile" class="block px-4 py-2 hover:bg-gray-700">プロフィール</router-link>
            <router-link to="/notifications" class="block px-4 py-2 hover:bg-gray-700">通知</router-link>
            <button @click="logout" class="block w-full text-left px-4 py-2  hover:bg-red-500 text-white">ログアウト</button>
        </div>
    </nav>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const isOpen = ref(false);

        const logout = () => {
            if(confirm('ログアウトしますか？')){
                localStorage.removeItem('authToken');
                localStorage.removeItem('expires_at');
                router.push('/login').then(() => window.location.reload());
            }
        };
        return { isOpen, logout };
    },
};
</script>

<style scoped>
/* ナビゲーションバーに追加のスタイリングが必要な場合 */
</style>