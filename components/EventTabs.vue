<template>
  <div class="w-full mx-auto max-w-5xl px-4 py-2 sm:px-0">
    <TabGroup>
      <TabList class="flex space-x-1 rounded-xl bg-[#000]/20 p-1 mb-4">
        <Tab
          v-for="category in Object.keys(data)"
          as="template"
          :key="category"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-[#eee]',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-white focus:outline-none focus:ring-2',
              selected
                ? 'bg-[#FFD84F] shadow text-black'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ category }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel
          v-for="category in Object.values(data)"
          :key="category"
          :class="[
            'rounded-xl bg-white p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          ]"
        >
          <ul v-if="category && category.length > 0">
            <ArticlePreview :key="event.id" v-for="event in category" :event="event"></ArticlePreview>
          </ul>
          <ul v-else><div class="w-full flex justify-center text-base"><p>Nothing To Show</p></div></ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
const props = defineProps(['data'])

</script>
