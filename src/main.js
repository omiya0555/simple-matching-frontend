import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from './plugins/axios';
import Pusher from 'pusher-js'
import Echo from 'laravel-echo';
import './assets/tailwind.css'; 

// トークンの有効期限を確認
const token     = localStorage.getItem('auth_token');
const expiresAt = localStorage.getItem('expires_at');

if (token && expiresAt) {
    const now = new Date();
    if (new Date(expiresAt) > now) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // 有効期限切れの場合、トークンを削除
        localStorage.removeItem('auth_token');
        localStorage.removeItem('expires_at');
        location.href = '/login';
    }
}

// Pusherの設定
window.Pusher = Pusher;

//Laravel Echo の設定
window.echo = new Echo({
    broadcaster: 'reverb',
    key:     process.env.VUE_APP_REVERB_APP_KEY,
    wsHost:  process.env.VUE_APP_REVERB_HOST,
    wsPort:  process.env.VUE_APP_REVERB_PORT,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: 'http://localhost/api/broadcasting/auth/', // 認証エンドポイント
    auth: {
        headers: {
            Authorization: `Bearer ${token}`, // 認証トークンを付与
        },
    },
});

createApp(App)
    .use(router)
    .provide('axios', axios)
    .mount('#app');