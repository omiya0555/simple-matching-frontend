import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginForm.vue";
import Home from "../views/AppHome.vue";
import ChatHome from "../views/ChatHome.vue";
import ChatRoom from "../views/ChatRoom.vue";
// import Profile from "../views/AppProfile.vue";
// import Notification from "../views/NotificationHome.vue";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: { layout: "BaseLayout", requiresAuth: true },
    },
    {
        path: "/chat",
        name: "Chat",
        component: ChatHome,
        meta: { layout: "BaseLayout", requiresAuth: true },
    },
    {
        path: "/chat/:id",
        name: "ChatRoom",
        component: ChatRoom,
        meta: { layout: "BaseLayout", requiresAuth: true },
    },
    // {
    //     path: "/profile",
    //     name: "Profile",
    //     component: Profile,
    //     meta: { layout: "BaseLayout", requiresAuth: true },
    // },
    // {
    //     path: "/notifications",
    //     name: "Notification",
    //     component: Notification,
    //     meta: { layout: "BaseLayout", requiresAuth: true },
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// ナビゲーションガードを設定
router.beforeEach((to, from, next) => {
    const token     = localStorage.getItem('auth_token');
    const expiresAt = localStorage.getItem('expires_at');
    const now       = new Date();

    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(!token || new Date(expiresAt) <= now){
            //トークンが存在しないか、期限切れの場合
            alert('認証情報が無効です。ログインしなおしてください。');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('expires_at');
            localStorage.removeItem('user_id');
            next({ name: 'Login' });
        }else{
            next();
        }
    }else{
        next();
    }
});

export default router;