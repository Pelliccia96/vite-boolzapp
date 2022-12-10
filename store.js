import axios from "axios";
import { reactive } from "vue";

export const store = reactive({
    charactersList: [],
    paginationInfo: {},
})

export function fetchCharacters() {
    axios.get("https://rickandmortyapi.com/api/character", {

    })
        .then((resp) => {
            console.log(resp);
            store.charactersList = resp.data.results;
            console.log(resp.data.results)
            store.paginationInfo = resp.data.info;
            console.log(resp.data.info)
        })
        .catch((error) => {
            console.log(error);
            console.log("Codice errore: ", error.response.status);
        })
}
