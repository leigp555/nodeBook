<template>
  <div class="wrap">
    <div class="header">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-back"></use>
      </svg>
      <div class="avatarWrap">
        <a-avatar :size="40" src="http://localhost:8888/getAvatar" class="avatar">
          <template #icon>
            <UserOutlined/>
          </template>
        </a-avatar>
      </div>
    </div>
    <div class="main">
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1">
          <template #tab><span><book-outlined/>笔记</span></template>
          <div class="show">
            <NodeBooks />
          </div>
        </a-tab-pane>
        <a-tab-pane key="2"><template #tab><span><heart-outlined/>收藏</span></template>
          <div class="show">
            <Collection/>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3"><template #tab><span><delete-outlined/>回收站</span></template>
         <div class="show">
           <Garbage/>
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
import { ref} from "vue";
import NodeBooks from "@/components/NodeBooks.vue";
import { UserOutlined, BookOutlined ,HeartOutlined,DeleteOutlined} from '@ant-design/icons-vue';
import Collection from "@/components/Collection.vue";
import Garbage from "@/components/Garbage.vue";

const activeKey = ref<string>("1")
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  top: 0;
  left: 0;
  >.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: green;
    padding: 5px 10px;
    margin-bottom: 10px;
    .avatarWrap {
      display: flex;
      justify-content: end;
    }
  }
  >.newNode{
    position: sticky;
    bottom: 150px;
    right: 0;
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 50px;
    >.icon {
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