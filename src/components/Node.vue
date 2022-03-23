<template>
  <div class="wrap">
    <Header/>
    <div class="main">
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1">
          <template #tab><span><book-outlined/>笔记</span></template>
          <div class="show">
            <NodeBooks/>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #tab><span><heart-outlined/>收藏</span></template>
          <div class="show">
            <Collection/>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3">
          <template #tab><span><delete-outlined/>回收站</span></template>
          <div class="show">
            <Garbage/>
          </div>
        </a-tab-pane>
        <a-tab-pane key="4">
          <template #tab><span><search-outlined />搜索</span></template>
          <div class="show">
            <Search/>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { BookOutlined, HeartOutlined, DeleteOutlined,SearchOutlined} from '@ant-design/icons-vue';
import Header from "@/components/Header.vue"
import Collection from "@/components/Collection.vue";
import Garbage from "@/components/Garbage.vue";
import NodeBooks from "@/components/NodeBooks.vue";
import Search from "@/components/Search.vue";
import {ref} from "vue";
import {getNodes} from "@/helper/allRequest";
const activeKey = ref<string>("1")
</script>

<style lang="scss" scoped>
.icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>