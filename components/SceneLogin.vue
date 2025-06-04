<template>
  <section>
    <form
      class="flex flex-col gap-[16px] | text-white | bg-blue-950 | rounded-lg | p-[12px]"
      @submit.prevent>
      <fieldset class="flex flex-col gap-[4px]">
        <label>Id</label>
        <input
          v-model="formDatas.id"
          autocomplete="username"
          class="p-[4px] | rounded-sm | text-black"
          type="text"
          placeholder="Id" />
      </fieldset>
      <fieldset class="flex flex-col gap-[4px]">
        <label>Password</label>
        <input
          v-model="formDatas.password"
          autocomplete="current-password"
          class="p-[4px] | rounded-sm | text-black"
          type="password"
          placeholder="Password" />
      </fieldset>
      <button
        class="bg-orange-600 | w-full | p-[4px] rounded-sm"
        type="submit"
        @click="login">
        <span class="font-bold">LOGIN</span>
      </button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { COOKIE_LOGGED_IN } from "~/const"

const emit = defineEmits<{
  (e: "next", scene: "lobby"): void
}>()
const runtimeConig = useRuntimeConfig()
const authStore = useAuthStore()
const gameStore = useGameStore()

const formDatas = ref({
  id: "",
  password: "",
})

const login = () => {
  if (formDatas.value.id !== runtimeConig.public.adminId) return
  if (formDatas.value.password !== runtimeConig.public.adminPassword) return
  useCookie(COOKIE_LOGGED_IN, { maxAge: 3600 }).value = "authed"
  authStore.setIsLoggedIn(true)
  emit("next", "lobby")
}

watch(
  () => gameStore.mode,
  (mode) => {
    if (["android", "ios"].includes(mode)) emit("next", "lobby")
  }
)
</script>
