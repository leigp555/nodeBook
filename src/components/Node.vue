<template>
  <div class="nodeWrap">
    <div class="menuWrap">
      <a-menu
          class="menu"
          v-model:selectedKeys="state.selectedKeys"
          style="width: 256px"
          mode="inline"
          :open-keys="state.openKeys"
          @openChange="onOpenChange"
      >
        <a-avatar :size="64" src="../src/assets/avatar.png" class="avatar">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <a-sub-menu key="sub1" @titleClick="titleClick">
          <template #icon>
            <read-outlined/>
          </template>
          <template #title>所有笔记本</template>
          <a-menu-item-group key="g1">
            <template #icon>
              <QqOutlined/>
            </template>
            <a-menu-item key="1">Option 1</a-menu-item>
            <a-menu-item key="2">Option 2</a-menu-item>
            <a-menu-item key="3">Option 3</a-menu-item>
            <a-menu-item key="4">Option 4</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
          <template #icon>
            <heart-outlined />
          </template>
          <template #title>收藏夹</template>
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
          <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="7">Option 7</a-menu-item>
            <a-menu-item key="8">Option 8</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <template #icon>
            <delete-outlined />
          </template>
          <template #title>回收站</template>
          <a-menu-item key="9">Option 9</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="main">主要内容</div>
  </div>

</template>
<script lang="ts" setup>
import {reactive, } from 'vue';
import {QqOutlined, HeartOutlined, DeleteOutlined, UserOutlined ,ReadOutlined} from '@ant-design/icons-vue';
import type {MenuProps} from 'ant-design-vue';

const titleClick = (e: Event) => {
  console.log('titleClick', e);
};


const state = reactive({
  rootSubmenuKeys: ['sub1', 'sub2', 'sub3'],
  openKeys: ['sub1'],
  selectedKeys: ['1'],
});

const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey = openKeys.find(key => state.openKeys.indexOf(key) === -1);
  if (state.rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
    state.openKeys = openKeys;
  } else {
    state.openKeys = latestOpenKey ? [latestOpenKey] : [];
  }
};
</script>


<style lang="scss" scoped>
.nodeWrap{
  height: 100%;
  display: flex;
  >.menuWrap{
    box-shadow: 0 0 0 1px rgba(0,0,0,.1);
    >.menu{
      >.avatar{
        position: relative;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 30px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
