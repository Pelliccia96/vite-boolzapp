import axios from "axios";
import { reactive } from "vue";

export const store = reactive({
    charactersList: [],
    messagesList: [],
})

export function fetchCharacters(num) {
    axios.get(`https://randomuser.me/api/?results=${num}`)
    .then((resp) => {
            console.log(resp);
            store.charactersList = resp.data.results;
            console.log(resp.data.results)
        })
        .catch((error) => {
            console.log(error);
            console.log("Codice errore: ", error.response.status);
        })
}

export function fetchMessages() {
    axios.get("https://jsonplaceholder.typicode.com/comments")
    .then((resp) => {
            console.log(resp);
            store.messagesList = resp.data;
            console.log(resp.data)
        })
        .catch((error) => {
            console.log(error);
            console.log("Codice errore: ", error.response.status);
        })
}
