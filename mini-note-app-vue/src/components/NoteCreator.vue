<script lang="ts">
import axios, { AxiosError } from "axios";
import { defineComponent, PropType } from "vue";

import { HiOutlinePlus } from "vue3-icons/hi";

export default defineComponent({
    name: "NoteCreator",
    props: {
        onSave: {
            required: false,
            type: Function as PropType<() => void>,
        },
    },
    components: {
        HiOutlinePlus
    },
    data() {
        return { title: "", error: "", creating: false }
    },
    methods: {
        resetForm() { this.title = ""; },
        async saveNote(e: Event) {
            console.log(import.meta.env)
            e.preventDefault();
            try {
                this.creating = true;
                this.error = "";
                await axios.post(import.meta.env.VITE_API+"/api/v1/note", { title: this.title })
                this.resetForm();
                this.onSave?.();
            } catch (e) {
                if (e instanceof AxiosError && e.response) {
                    return this.error = e.response.data.message
                }
                console.error("Failed to create note: ", e)
            }
            finally {
                this.creating = false
            }
        },
    },
});
</script>

<template>
    <div class="w-full space-y-2">
        <form @submit="saveNote"
            class="flex items-center justify-between w-full px-4 py-2 rounded-lg gap-x-4 hover:bg-stone-900">
            <input v-model="title" type="text" name="title" placeholder="Task in mind?"
                class="flex-1 py-2 bg-transparent outline-none placeholder:text-stone-700" />
            <button :disabled="title.length === 0 || creating" type="submit"
                class="p-1 duration-200 ease-in rounded-md cursor-pointer bg-stone-950 disabled:opacity-0 outline-transparent w-fit h-fit text-stone-500 hover:text-stone-50">
                <HiOutlinePlus class="size-4" />
            </button>
        </form>
        <p class="text-xs text-stone-700" v-if="error.length > 0">{{ error }}</p>
    </div>
</template>

