<template>
    <BaseLayout>
        <div class="home-container p-6">
            <h1 class="w-fit text-2xl font-semibold mx-auto mb-6">チャット一覧</h1>
            <!-- チャットルーム一覧 -->
            <div>
                <!-- チャットルームリストコンポーネント -->
                <ChatRoomList 
                    :chatRooms="chatRooms"
                    :otherUsers="otherUsers"
                    :currentChatRoomId="currentChatRoomId" 
                />
            </div>
        </div>
    </BaseLayout>
</template>

<script>
import apiClient from "../plugins/axios";
import BaseLayout from '@/layouts/BaseLayout.vue';
import ChatRoomList from '@/components/ChatRoomList.vue';

export default {
    components :{
        BaseLayout,
        ChatRoomList
    },
    data() {
        return {
            chatRooms: [],
            otherUsers: [],
            currentUserId: parseInt(localStorage.getItem('user_id'), 10),
            loading: true,
        };
    },
    methods: {
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
    mounted() {
        this.fetchChatRooms();
        this.loading = false;
    },
};
</script>

<style scoped>
.chat-room {
    height: 100vh;
}
</style>