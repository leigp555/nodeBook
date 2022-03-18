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
    <div class="newNode">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-add"></use>
      </svg>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import NodeBooks from "@/components/NodeBooks.vue";
import { BookOutlined, HeartOutlined, DeleteOutlined,SearchOutlined} from '@ant-design/icons-vue';
import Collection from "@/components/Collection.vue";
import Garbage from "@/components/Garbage.vue";
import {request} from "@/helper/netRequest";
const activeKey = ref<string>("1")
import Header from "@/components/Header.vue"
import Search from "@/components/Search.vue";


</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  top: 0;
  left: 0;
  > .newNode {
    position: fixed;
    bottom: 120px;
    right: 0;
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 60px;

    > .icon {
      width: 3em;
      height: 3em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }
}

.icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>