<template>
    <footer class="footer bg-login-gradient text-white text-sm p-4 mt-auto">
        <div class="flex justify-between items-center">
            <span>&copy; 2024 SSC プロジェクト</span>
            <div class="footer-links space-x-4">
                <router-link to="/" class="hover:underline">ホーム</router-link>
                <router-link to="/profile" class="hover:underline">プロフィール</router-link>
                <router-link to="/contact" class="hover:underline">お問い合わせ</router-link>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'AppFooter'
};
</script>

<style scoped>
.footer {
    width: 100%;
    position: relative;
    bottom: 0;
}
</style>