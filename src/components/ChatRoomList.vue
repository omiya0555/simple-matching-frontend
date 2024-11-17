<template>
    <div class="justify-center rounded-md">
        <div
            @click="navigateToChatRoom(room.id)"
            :class="[
                'flex w-full mb-2 text-sm hover:shadow-md transition border rounded-md',
                { 'bg-blue-100 font-semibold': room.id === currentChatRoomId }
            ]"
            v-for="(room, index) in chatRooms"
            :key="room.id"
        >
            <div class="py-4 px-4 border-r">
                <label>ChatRoom{{ room.id }}</label>
            </div>
            <div class="flex py-4 px-4">
                <span class="bg-blue-200 text-xs p-1 border-none rounded-2xl">with</span>
                <span v-for="user in otherUsers[index]" :key="user.id" class="ml-4">
                    {{ user.name }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    props: {
        chatRooms: Array,
        otherUsers: Array,
        currentChatRoomId: Number,
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    methods: {
        navigateToChatRoom(roomId) {
            this.router.push({ name: 'ChatRoom', params: { id: roomId } }).then(() => {
                window.location.reload();
            });
        }
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
</style>