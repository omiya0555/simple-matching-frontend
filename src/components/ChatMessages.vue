<template>
    <div class="messages bg-blue-100 w-full border ml-4 p-4 rounded-md flex flex-col min-w-[400px] max-w-[1000px] mx-auto">
        <!-- メッセージリスト -->
        <div ref="messageContainer" class="message-list overflow-y-auto mb-4" style="min-height:160px; max-height: 500px;">
            <div v-for="message in localMessages" :key="message.id" class="message p-2">
                <div v-if="message.user_id !== currentUserId" class="flex justify-start">
                    <span class="ml-6 p-2 w-fit bg-white rounded-xl">{{ message.content }}</span>
                </div>
                <div v-if="message.user_id === currentUserId" class="flex justify-end">
                    <span class="mr-6 p-2 w-fit bg-white rounded-xl">{{ message.content }}</span>
                </div>
            </div>
        </div>
        
        <!-- メッセージ入力エリア -->
        <div class="flex bg-white w-full border p-2 mx-auto rounded-md">
            <input v-model="newMessage" @keyup.enter="sendMessage" required class="w-full px-2 py-1" />
        </div>
    </div>
</template>

<script>
import apiClient from "../plugins/axios";

export default {
    props: {
        messages: Array,
        currentUserId: Number,
    },
    data() {
        return {
            localMessages: [...this.messages], // propsのmessagesのコピー
            newMessage: '',
        };
    },
    methods: {
        async sendMessage() {
            if (this.newMessage.trim() === "") return;

            try {
                // メッセージをサーバーに送信
                await apiClient.post(`http://localhost/api/chat-rooms/${this.$route.params.id}/messages`, {
                    content: this.newMessage,
                });

                // メッセージを送信したら入力フィールドをクリア
                this.newMessage = "";
                this.scrollToBottom();
            } catch (error) {
                console.error("メッセージの送信に失敗しました", error);
            }
        },
        scrollToBottom() {
            this.$nextTick(() => { // DOM更新完了後にスクロール処理
                const container = this.$refs.messageContainer;
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
            });
        },
    },
    mounted() {
        const container = this.$refs.messageContainer;
        container.scrollTop = container.scrollHeight;
        const chatRoomId = this.$route.params.id;
        window.echo.channel(`chat-room.${chatRoomId}`)
            .listen('.message.sent', (event) => {
                this.localMessages.push(event.message);
                this.scrollToBottom();
            });
    },
    watch: {
        // messagesが変更されたとき、localMessagesも更新
        messages(newMessages) {
            this.localMessages = [...newMessages];
        }
    }
};
</script>

<style scoped>
.message-list {
    /* max-height: 500px; */
    height: auto;
    overflow-y: auto; 
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.contents_box::-webkit-scrollbar {
    display: none;
}
</style>