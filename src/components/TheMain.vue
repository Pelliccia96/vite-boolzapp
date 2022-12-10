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
                            placeholder="Cerca o inizia una nuova chat" v-model="search">
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
                                <div v-if="users.messages > 0" class="small text-secondary">
                                    {{ users.messages[users.messages - 1].message }}</div>
                                <div v-else>{{ "" }}</div>
                            </div>
                        </div>
                        <div v-if="users.messages > 0" class="small text-secondary pe-2">
                            {{ users.messages[users.messages - 1].date }}</div>
                        <div v-else>{{ "" }}</div>
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
                <div v-if="selectedUser !== null" v-for="message, i in selectedUser.messages"
                    :class="message.status === 'sent' ? 'my-msg' : 'user-msg'">{{ message.message }} <small
                        class="msg-date ps-2">{{ message.date }}</small>
                    <div class="ms-3">
                        <div class="btn-group">
                            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button"
                                data-bs-toggle="dropdown" aria-expanded="false"></button>
                            <ul class="dropdown-menu p-1">
                                <li @click="onInfoMessage(i)">Info messaggio</li>
                                <li @click="onDeleteMessage(i)">Cancella messaggio</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- Footer Section -->
                <div class="d-flex justify-content-between align-items-center p-1 banner-color">
                    <div class="footer-icon ps-3 me-3">
                        <a href="#" class="text-secondary"><i class="fa-regular fa-face-smile"></i></a>
                    </div>
                    <form class="flex-grow-1" @submit.prevent="sendText()">
                        <input class="flex-fill w-100 border-0 rounded p-2 my-2" type="text"
                            placeholder="Scrivi un messaggio" v-model="messageArray.newMessage">
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
            search: "",
            dateTime: luxon.DateTime,
            usersList: [
                {
                    name: "Michele",
                    avatar: "img/avatar_1.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Hai portato a spasso il cane?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Ricordati di dargli da mangiare",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 16:15:22",
                            message: "Tutto fatto!",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Fabio",
                    avatar: "img/avatar_2.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "20/03/2020 16:30:00",
                            message: "Ciao come stai?",
                            status: "sent",
                        },
                        {
                            date: "20/03/2020 16:30:55",
                            message: "Bene grazie! Stasera ci vediamo?",
                            status: "received",
                        },
                        {
                            date: "20/03/2020 16:35:00",
                            message: "Scusa, devo fare la spesa.",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Samuele",
                    avatar: "img/avatar_3.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "28/03/2020 10:10:40",
                            message: "La Marianna va in campagna",
                            status: "received",
                        },
                        {
                            date: "28/03/2020 10:20:10",
                            message: "Sicuro di non aver sbagliato chat?",
                            status: "sent",
                        },
                        {
                            date: "28/03/2020 16:15:22",
                            message: "Ah scusa!",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Luisa",
                    avatar: "img/avatar_4.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Lo sai che ha aperto una nuova pizzeria?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Si, ma preferirei andare al cinema",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Alessandro L.",
                    avatar: "img/avatar_5.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Hai portato a spasso il cane?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Ricordati di dargli da mangiare",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 16:15:22",
                            message: "Tutto fatto!",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Claudia",
                    avatar: "img/avatar_6.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Hai portato a spasso il gatto?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Ricordati di dargli da mangiare",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 16:15:22",
                            message: "Ci penso io!",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Federico",
                    avatar: "img/avatar_7.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Hai portato a spasso il topo?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Ricordati di dargli da mangiare",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 16:15:22",
                            message: "Non dire altro!",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Davide",
                    avatar: "img/avatar_8.jpg",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Hai portato a spasso il lupo?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Ricordati di dargli da mangiare",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 16:15:22",
                            message: "Allora, calma!",
                            status: "received",
                        },
                    ],
                },
            ],
        }
    },
    methods: {
        sendText() {
            this.selectedUser.messages.push({
                date: this.dateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'),
                message: this.messageArray.newMessage,
                status: "sent",
            });
            this.messageArray.newMessage = "";
            setTimeout(this.sendOk, 1000);
        },
        sendOk() {
            this.selectedUser.messages.push({
                date: this.dateTime.now().toFormat('dd/MM/yyyy HH:mm:ss'),
                message: "Ok.",
                status: "received",
            });
        },
        onDeleteMessage(index) {
            this.selectedUser.messages.splice(index, 1);
        },
        onInfoMessage(index) {
            alert("Data e ora dell'ultimo messaggio: " + this.selectedUser.messages[index].date);
        },
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