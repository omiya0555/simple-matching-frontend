<template>
    <div class="flex flex-col items-center justify-center bg-pink-100 rounded-lg relative">
        <!-- 通知エリア -->
        <transition name="fade">
            <div v-if="notification.message"
                class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-6 py-3 rounded shadow-md">
                {{ notification.message }}
            </div>
        </transition>

        <!-- モーダル通知 -->
        <transition name="fade">
            <div v-if="matchModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white p-6 rounded-lg shadow-lg text-center">
                    <h2 class="text-xl font-bold text-green-500 mb-4">マッチング成立！</h2>
                    <p class="text-gray-700 mb-1">{{ matchedUser?.name }} さんとマッチングが成立しました。</p>
                    <p class="text-gray-700 mb-6">さっそくチャットしてみましょう！</p>
                    <button @click="closeMatchModal" class="bg-gray-500 hover:bg-gray-600 transition text-white px-6 py-2 mr-4 rounded">
                        閉じる
                    </button>
                    <button @click="closeMatchModal" class="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded">
                        チャットする！
                    </button>
                </div>
            </div>
        </transition>

        <!-- カード表示エリア -->
        <transition name="slide" mode="out-in">
            <div v-if="currentUser" :key="currentUser.id"
                class="w-64 mt-20 p-6 bg-white shadow-lg rounded-lg transform transition duration-500">
                <div class="text-center">
                    <img :src="currentUser.profile_image" alt="User Image" class="w-32 h-32 rounded-full mx-auto mb-4">
                    <h3 class="text-xl font-bold mb-2">{{ currentUser.name }}</h3>
                    <p class="text-gray-600">Location: {{ currentUser.location }}</p>
                </div>
            </div>
        </transition>

        <!-- ボタンエリア -->
        <div class="flex items-center justify-between w-96 my-6">
            <button @click="handleSkip"
                class="w-80 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold ml-4 py-2 px-6 rounded-l-lg transform hover:scale-105 transition duration-300">
                SKIP
            </button>
            <button @click="handleLike"
                class="w-80 bg-red-500 hover:bg-red-600 text-white font-bold mr-4 py-2 px-6 rounded-r-lg transform hover:scale-105 transition duration-300">
                LIKE
            </button>
        </div>
    </div>
</template>


<script>
import apiClient from "../plugins/axios";

export default {
    data() {
        return {
            randomUsers: [], // ランダムユーザーリスト
            currentIndex: 0, // 現在のカードのインデックス
            notification: { message: "", timeout: null }, // 通知情報
            matchModalVisible: false, // モーダル表示状態
            matchedUser: null, // マッチングしたユーザー情報
        };
    },
    computed: {
        currentUser() {
            return this.randomUsers[this.currentIndex] || null;
        },
    },
    methods: {
        async fetchRandomUsers() {
            try {
                const response = await apiClient.get("http://localhost/api/online-users/random");
                this.randomUsers = response.data;
            } catch (error) {
                console.error("ランダムユーザーの取得に失敗しました", error);
            }
        },
        async handleLike() {
            try {
                const response = await apiClient.post("http://localhost/api/likes", { receiver_id: this.currentUser.id });
                
                // マッチング成功時の処理
                if (response.data.chat_room_id) {
                    this.matchedUser = this.currentUser;
                    this.showMatchModal();
                } else {
                    this.showNotification("いいねを送りました！");
                }
            } catch (error) {
                console.error("いいねの送信に失敗しました", error);
                this.showNotification("いいねを送信できませんでした。");
            }

            this.nextUser();
        },
        handleSkip() {
            this.showNotification("スキップしました");
            this.nextUser();
        },
        nextUser() {
            // 次のカードへ切り替え
            if (this.currentIndex < this.randomUsers.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0; // リストの最後に到達した場合、最初に戻る（必要に応じてカスタマイズ）
            }
        },
        showNotification(message) {
            this.notification.message = message;

            if (this.notification.timeout) {
                clearTimeout(this.notification.timeout);
            }

            this.notification.timeout = setTimeout(() => {
                this.notification.message = "";
            }, 700);
        },
        showMatchModal() {
            this.matchModalVisible = true;
        },
        closeMatchModal() {
            this.matchModalVisible = false;
        },
    },
    async mounted() {
        await this.fetchRandomUsers();
    },
};
</script>

<style scoped>
/* カードスライドアニメーション */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s ease-in-out, opacity 0.5s;
}

.slide-enter {
    transform: translateX(100%);
    opacity: 0;
}

.slide-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

/* 通知フェードアニメーション */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
