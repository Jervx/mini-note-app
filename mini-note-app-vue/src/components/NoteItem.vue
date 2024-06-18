<script lang="ts">
import axios from 'axios'
import { formatDistanceToNow } from 'date-fns'
import { defineComponent, PropType } from 'vue'

import { FiLoader } from 'vue3-icons/fi'
import { HiOutlineDotsCircleHorizontal, HiOutlineX, HiThumbUp } from 'vue3-icons/hi'

import { cn } from '@/lib/utils'
import { INote } from '@/interfaces'

export default defineComponent({
  name: 'NoteItem',
  props: {
    note : {
      required: true,
      type: {} as PropType<INote>
    },
    fireChange: {
      required: false,
      type: Function as PropType<() => void>
    }
  },
  data() {
    return { loading: false }
  },
  components: {
    FiLoader,
    HiThumbUp,
    HiOutlineX,
    HiOutlineDotsCircleHorizontal
  },
  methods: {
    setLoading(state: boolean) {
      this.loading = state
    },
    async onUpdate(status: boolean) {
      try {
        this.setLoading(true)
                await axios.put(`${import.meta.env.VITE_API}/api/v1/note/${this.note.id}`, { status })
        this.fireChange?.()
      } catch (e) {
        console.error('Failed to update note', e)
      } finally {
        this.setLoading(false)
      }
    },
    async onDelete() {
      try {
        this.setLoading(true)
                await axios.delete(`${import.meta.env.VITE_API}/api/v1/note/${this.note.id}`)
        this.fireChange?.()
      } catch (e) {
        console.error('Failed to delete note', e)
      } finally {
        this.setLoading(false)
      }
    },
    formatDistanceToNow,
    cn
  }
})
</script>

<template>
  <div
    :key="note.id"
    class="relative bg-transparent duration-500 ease-out text-stone-500 hover:text-stone-50 hover:bg-stone-800 group-hover:blur-[2px] group-hover:hover:blur-0 px-3 py-2 rounded-lg flex justify-between"
  >
    <p>{{ note.title }}</p>
    <div class="absolute translate-x-[-50%] top-1/2 translate-y-[-50%] left-1/2">
      <FiLoader v-if="loading" class="size-4 text-stone-500 animate-spin" />
    </div>
    <div class="flex items-center justify-end gap-x-2">
      <div
        :class="
          cn(
            'flex justify-end px-4 opacity-0 group-hover:opacity-50 sm:block sm:w-fit text-right',
            !note.status && 'sm:absolute sm:right-[100%] sm:w-1/4 '
          )
        "
      >
        <p v-if="!note.status" class="text-xs">
          {{
            formatDistanceToNow(note.createdAt, {
              addSuffix: true,
              includeSeconds: false
            })
          }}
        </p>
        <p v-if="note.status && note.updatedAt" class="text-xs">
          Completed
          {{
            formatDistanceToNow(note.updatedAt, {
              addSuffix: true,
              includeSeconds: false
            })
          }}
        </p>
      </div>

      <button
        @click="onUpdate(true)"
        :disabled="loading"
        class="size-fit duration-200 ease-in rounded-md cursor-pointer disabled:cursor-not-allowed outline-transparent w-fit h-fit text-stone-500 hover:text-stone-50"
      >
        <HiOutlineDotsCircleHorizontal
          v-if="!note.status"
          class="duration-200 ease-in-out cursor-pointer size-4 text-stone-500 hover:text-stone-50"
        />
      </button>
      <button
        @click="onUpdate(false)"
        :disabled="loading"
        class="size-fit duration-200 ease-in rounded-md cursor-pointer disabled:cursor-not-allowed outline-transparent w-fit h-fit text-stone-500 hover:text-stone-50"
      >
        <HiThumbUp
          v-if="note.status"
          class="duration-200 ease-in-out cursor-pointer size-4 text-stone-500 hover:text-stone-50"
        />
      </button>
      <button
        @click="onDelete()"
        :disabled="loading"
        class="size-fit duration-200 ease-in rounded-md cursor-pointer disabled:cursor-not-allowed outline-transparent w-fit h-fit text-stone-500 hover:text-stone-50"
      >
        <HiOutlineX
          class="duration-200 ease-in-out cursor-pointer size-4 text-stone-500 hover:text-stone-50"
        />
      </button>
    </div>
  </div>
</template>
