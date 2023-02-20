<template>
  <div
    class="p-4 bg-[#FFD84F]/80 my-auto rounded-xl gap-1 flex flex-col shadow-xl hover:shadow-2xl hover:bg-[#FFD84F]/100 justify-center items-center cursor-pointer"
    @click="_login"
  >
    <h1
      class="text-lg text-[#333] hover:text-[#000] font-semibold capitalize"
    >
      Login Using A Nostr Extension
    </h1>
  </div>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'
import LoginIcon from './icons/LoginIcon.vue'

const { login } = useAuth()

async function _login () {
  const pk = await window.nostr.getPublicKey()
  login(pk)
}
</script>

<style lang="scss" scoped></style>
