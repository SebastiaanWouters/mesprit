<template>
  <div class="w-full mx-auto max-w-5xl px-4 py-2 sm:px-2">
    <TabGroup >
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
          :class="[
            'rounded-xl bg-white px-0 py-2',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          ]"
        >
          <div v-if="true" v-bind="containerPropsTimeline" v-infinite-scroll="() => {useData().updateGlobalTimeline(10)}" class="h-full max-h-[70vh] w-full">
            <div v-bind="wrapperPropsTimeline">
                <ArticlePreview :key="index" v-for="{index, data } in listTimeline" :event="data"></ArticlePreview>
            </div>
          </div>
          <ul v-else><div class="w-full flex justify-center text-base"><p>Nothing To Show</p></div></ul>
        </TabPanel>

        <TabPanel
          :class="[
            'rounded-xl bg-white px-0 py-2',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
          ]"
        >
          <div v-if="Object.values(data)[1] && Object.values(data)[1].length > 0" v-bind="containerPropsTrending" v-infinite-scroll="() => {useData().updateGlobalTrending(10)}" class="h-full max-h-[70vh] w-full">
            <div v-bind="wrapperPropsTrending">
                <ArticlePreview :key="index" v-for="{index, data } in listTrending" :event="data"></ArticlePreview>
            </div>
          </div>
          <ul v-else><div class="w-full flex justify-center text-base"><p>Nothing To Show</p></div></ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { useVirtualList, useInfiniteScroll } from '@vueuse/core'
import { vInfiniteScroll } from '@vueuse/components'

const props = defineProps(['data'])
const reactiveTimeline = toRef(props.data, 'timeline')
const reactiveTrending = toRef(props.data, 'trending')

const { list: listTimeline, containerProps: containerPropsTimeline, wrapperProps: wrapperPropsTimeline } = useVirtualList(reactiveTimeline, {
  itemHeight: 64
})

const { list: listTrending, containerProps: containerPropsTrending, wrapperProps: wrapperPropsTrending } = useVirtualList(reactiveTrending, {
  itemHeight: 64
})

</script>
