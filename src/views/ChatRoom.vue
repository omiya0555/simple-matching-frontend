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
                <h1 class="w-fit text-2xl font-semibold mx-auto mb-6">チャットルーム</h1>
                <div class="flex justify-center mx-auto">

                    <!-- チャットルーム一覧 -->
                    <ChatRoomList 
                        :chatRooms="chatRooms" 
                        :otherUsers="otherUsers"
                        :currentChatRoomId="currentChatRoomId" 
                    />
                    
                    <!-- チャット画面 -->
                    <ChatMessages 
                        :messages="messages" 
                        :currentUserId="currentUserId"
                    />

                </div>
            </div>
        </transition>
    </BaseLayout>
</template>

<script>
import apiClient from "../plugins/axios";
import BaseLayout from '../layouts/BaseLayout.vue';
import ChatRoomList from "@/components/ChatRoomList.vue";
import ChatMessages from '@/components/ChatMessages.vue';

export default {
    components: {
        BaseLayout,
        ChatRoomList,
        ChatMessages,
    },
    data() {
        return {
            messages: [],
            chatRooms: [],
            otherUsers: [],
            currentUserId: parseInt(localStorage.getItem('user_id'), 10),
            currentChatRoomId: parseInt(this.$route.params.id, 10), // 現在のチャットルームID
            loading: true,
        };
    },
    methods: {
        async fetchMessages() {
            try {
                const response = await apiClient.get(`http://localhost/api/chat-rooms/${this.currentChatRoomId}/messages`);
                this.messages = response.data;
            } catch (error) {
                console.error('メッセージの取得に失敗しました', error);
            }
        },
        async fetchChatRooms() {
            try {
                const response = await apiClient.get(`http://localhost/api/chat-rooms/`);
                this.chatRooms = response.data;

                // 各チャットルームごとに自分以外のユーザーリストを生成
                this.otherUsers = this.chatRooms.map(room =>
                    room.users.filter(user => user.id !== this.currentUserId)
                );
            } catch (error) {
                console.error('チャットルームの取得に失敗しました', error);
            }
        },
    },
    async mounted() {
        await Promise.all([this.fetchChatRooms(), this.fetchMessages()]);
        this.loading = false;
    },
};
</script>

<style scoped>
.loader {
    border-width: 4px;
    border-style: solid;
    border-color: transparent;
    border-top-color: #3b82f6;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>