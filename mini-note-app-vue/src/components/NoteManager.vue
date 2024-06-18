<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

import { FiLoader } from "vue3-icons/fi";

import NoteItem from "./NoteItem.vue";
import NoteCreator from "./NoteCreator.vue";

import { INote } from "@/interfaces";

export default defineComponent({
    name: "NoteManager",
    components: {
        FiLoader,
        NoteItem,
        NoteCreator,
    },

    data() {
        return {
            notes : [] as INote[],
            loading : false
        }
    },

    async mounted() {
        this.notes = await this.loadNotes();
    },

    methods: {
        setLoading (state : boolean) { this.loading = state },
        async loadNotes() {
            try{
                this.setLoading(true);
                const response = await axios.get(import.meta.env.VITE_API+"/api/v1/note");
                return response.data.notes;
            }catch(e){
                console.error("Failed to load note list : ", e);
            }finally{
                this.setLoading(false);
            }
        },
        async onChange () {
            console.log("Something Changed!");
            this.notes = await this.loadNotes()
        }
    },
});
</script>

<template>
    <div class="w-full max-w-4xl text-white px-4 md:px-0">
        <div class="flex items-center justify-between">
            <p class="w-full pb-4 mb-2 text-2xl font-bold">
              Note <span class="text-sm font-light opacity-40">mini</span>
            </p>
            <FiLoader v-if="this.loading" class="size-4 text-stone-500 animate-spin" /> 
        </div>
        <NoteCreator :onSave="onChange"/>
        <div class="flex flex-col pt-2 mt-2 border-t group border-white/15 gap-y-2">
            <p v-if="notes.length === 0 && !this.loading" class="text-xs w-full text-center opacity-30 py-4">no notes yet, add now</p>
            <NoteItem :fireChange="onChange" :note="note" v-for="note in notes" :key="note.id" />
        </div>
    </div>
</template>

