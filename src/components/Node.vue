<template>
  <div class="wrap">
    <div class="header">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-back"></use>
      </svg>
      <div class="avatarWrap">
        <a-avatar :size="40" src="../src/assets/avatar.png" class="avatar">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </div>
    </div>
    <div class="main">
      <a-tabs v-model:activeKey="activeKey" centered>
        <a-tab-pane key="1">
          <template #tab>
        <span>
          <book-outlined />笔记本
        </span>
          </template>
          Tab 1
        </a-tab-pane>

        <a-tab-pane key="2">
          <template #tab>
        <span>
          <heart-outlined />收藏
        </span>
          </template>
          Tab 2
        </a-tab-pane>
        <a-tab-pane key="3">
          <template #tab>
        <span>
          <delete-outlined />回收站
        </span>
          </template>
          Tab 3
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {BookOutlined,HeartOutlined,DeleteOutlined,UserOutlined} from '@ant-design/icons-vue';
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons-vue';
import {ref} from "vue";
const activeKey=ref<number>("1")
</script>

<style lang="scss" scoped>
.wrap{
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: green;
    padding: 5px 10px;
    .avatarWrap{
      display: flex;
      justify-content: end;
    }
  }
}

.icon {
  width: 2em; height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>