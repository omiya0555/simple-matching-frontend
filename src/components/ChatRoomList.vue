<template>
    <div class="justify-center rounded-md">
        <div
            @click="navigateToChatRoom(room.id)"
            :class="[ 
                'flex w-full mb-2 text-sm hover:shadow-md transition border rounded-md items-center',
                { 'bg-blue-100 font-semibold': room.id === currentChatRoomId }
            ]"
            v-for="room in chatRooms"
            :key="room.id"
        >
            <!-- 左側: チャット相手 -->
            <div class="py-4 px-4 flex items-center">
                <img
                    :src="getChatPartner(room.users).profile_image"
                    alt="User Icon"
                    class="w-8 h-8 rounded-full mr-2"
                />
                <span class="font-medium">{{ getChatPartner(room.users).name }}</span>
            </div>

            <!-- 中央: 最新メッセージ -->
            <div class="flex flex-col py-4 px-4 flex-grow">
                <span class="text-gray-600 text-sm truncate">
                    {{ room.latest_message?.content }}
                </span>
            </div>

            <!-- 右側: 最終メッセージ時間 -->
            <div class="py-4 px-4 text-right text-gray-400 text-xs whitespace-nowrap">
                {{ formatMessageTime(room.latest_message?.created_at) }}
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
    props: {
        chatRooms: Array,
        currentChatRoomId: Number,
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    data() {
        return {
            localChatRoomId: this.currentChatRoomId, // ローカルにコピー
        };
    },
    methods: {
        navigateToChatRoom(roomId) {
            this.localChatRoomId = roomId; // ローカル変数を更新
            this.router.push({ name: "ChatRoom", params: { id: roomId } });
        },
        getChatPartner(users) {
            // 自分以外のユーザー情報を取得
            const currentUserId = Number(localStorage.getItem("user_id"));
            return users.find((user) => user.id !== currentUserId) || {};
        },
        formatMessageTime(timestamp) {
            if (!timestamp) return "";

            const date = new Date(timestamp);
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            return `${hours}:${minutes}`;
        },
    },
    watch: {
        // 親コンポーネントからの変更を監視
        currentChatRoomId(newVal) {
            this.localChatRoomId = newVal;
        },
    },
};
</script>

<style scoped>
.bg-blue-100 {
    background-color: #ebf8ff;
}
.font-semibold {
    font-weight: 600;
}
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
