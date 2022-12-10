<template>
    <div class="main-container d-flex py-3">
        <div class="sx-row">
            <div class="d-flex justify-content-between align-items-center banner-color p-2 pb-4 border">
                <div class="d-flex align-items-center">
                    <div class="me-2">
                        <img src="img/avatar_io.jpg" alt="">
                    </div>
                    <div class="fw-semibold">Sofia</div>
                </div>
                <div class="d-flex gap-3 pe-3">
                    <a href="#" class="text-secondary"><i class="fa-solid fa-circle-notch"></i></a>
                    <a href="" class="text-secondary"><i class="fa-solid fa-message"></i></a>
                    <a href="" class="text-secondary"><i class="fa-solid fa-ellipsis-vertical"></i></a>
                </div>
            </div>
            <div class="d-flex bg-alert p-4">
                <div class="icon-alert me-2"><i class="fa-solid fa-bell-slash"></i></div>
                <div>
                    <div class="fw-semibold">Ricevi notifiche di nuovi messaggi</div>
                    <div><a href="#" class="text-secondary">Attiva notifiche desktop</a></div>
                </div>
            </div>
            <div class="d-flex align-items-center banner-color">
                <div class="my-2 ms-2 p-2 border rounded-start bg-white">
                    <a href="#" class="text-secondary"><i class="fa-solid fa-magnifying-glass"></i></a>
                </div>
                <div class="flex-fill me-2">
                    <form>
                        <input type="text" class="p-2 border border-start-0 rounded-end w-100"
                            placeholder="Cerca o inizia una nuova chat">
                    </form>
                </div>
            </div>
            <!-- Users Container sx -->
            <div class="d-flex flex-column flex-grow-1 flex-shrink-0 scrollbar-y">
                <div @click="selectedUser = users" v-for="(users, i) in store.charactersList" :key="i + users.id">
                    <div class="d-flex justify-content-between my-2 pb-2 border-bottom user-hover">
                        <div class="d-flex">
                            <div class="image px-2">
                                <img v-bind:src="users.picture.thumbnail" alt="">
                            </div>
                            <div>
                                <div class="fw-semibold">{{ users.name.first }}</div>
                                <div class="small text-secondary">{{ users.email }}</div>
                            </div>
                        </div>
                        <div class="small text-secondary pe-2">{{ users.gender }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Row Right -->
        <div class="d-flex flex-column flex-grow-1">
            <div class="d-flex justify-content-between align-items-center banner-color p-3 border gap-1">
                <div class="p-2 pb-3 fw-semibold" v-if="selectedUser === null">Seleziona una chat</div>
                <div v-else>
                    <div class="d-flex">
                        <div class="me-2">
                            <img v-bind:src="selectedUser.picture.thumbnail" alt="">
                        </div>
                        <div>
                            <div class="fw-semibold">{{ selectedUser.name.first }}</div>
                            <div class="text-secondary">Ultimo accesso oggi alle 12:00</div>
                        </div>
                    </div>
                </div>
                <div class="icons-container-dx d-flex gap-3 pe-2">
                    <a href="#" class="text-secondary"><i class="fa-solid fa-magnifying-glass"></i></a>
                    <a href="#" class="text-secondary"><i class="fa-solid fa-paperclip"></i></a>
                    <a href="#" class="text-secondary"><i class="fa-solid fa-ellipsis-vertical"></i></a>
                </div>
            </div>
            <!-- Text Section -->
            <div class="dx-row d-flex flex-column flex-grow-1 pt-5 scrollbar-y">
                <div v-for="message, i in store.messagesList"
                    :class="message.name === 'sent' ? 'my-msg' : 'user-msg'">{{ message.name }} <small
                        class="msg-date ps-2">{{ message.email }}</small>
                </div>
                <!-- Footer Section -->
                <div class="d-flex justify-content-between align-items-center p-1 banner-color">
                    <div class="footer-icon ps-3 me-3">
                        <a href="#" class="text-secondary"><i class="fa-regular fa-face-smile"></i></a>
                    </div>
                    <form class="flex-grow-1" @submit.prevent="sendText()">
                        <input class="flex-fill w-100 border-0 rounded p-2 my-2" type="text" placeholder="Scrivi un messaggio">
                    </form>
                    <div class="footer-icon pe-3 ms-3">
                        <a href="#" class="text-secondary"><i class="fa-solid fa-microphone"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {store, fetchCharacters, fetchMessages} from '../store'
export default {
    data() {
        return {
            store,
            fetchCharacters,
            fetchMessages,
            messageArray: [
                {
                    newMessage: "",
                },
            ],
            selectedUser: null,
        }
    },
    computed: {
        searchUserChat() {
            return this.usersList.filter(user => {
                return user.name.toLowerCase().includes(this.search.toLowerCase())
            });
        },
    },
    mounted() {
        fetchCharacters(8);
        fetchMessages();
    },
}
</script>

<style scoped>
</style>