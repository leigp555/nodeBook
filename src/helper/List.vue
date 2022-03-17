<template>
  <div class="wrap">
    <a-list class="listWrap" :loading="initLoading" item-layout="horizontal" :data-source="list">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-skeleton :title="false" :loading="!!item.loading" active>
            <a-list-item-meta description="Ant Design, a design language for background applications">
              <template #title><a href="https://www.antdv.com/">{{ item.name.last }}</a></template>
            </a-list-item-meta>
          </a-skeleton>
          <template #actions>
            <a key="list-loadmore-edit">编辑</a>
            <a key="list-loadmore-more">收藏</a>
            <a key="list-loadmore-more">删除</a>
          </template>
        </a-list-item>
      </template>
      <template #loadMore>
        <div v-if="!initLoading && !loading" class="loadMore"
             :style="{ textAlign: 'center', marginTop: '16px', height: '32px', lineHeight: '32px' }">
          <a-button @click="onLoadMore">loading more</a-button>
        </div>
      </template>
    </a-list>
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import {request} from "@/helper/netRequest";
import {useStore} from "vuex";


const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const initLoading = ref(true);
const loading = ref(false);
const data = ref([]);
const list = ref([]);
onMounted(() => {
  fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        initLoading.value = false;
        data.value = res.results;
        list.value = res.results;
      });
  request("/nodeBooks", "GET").then((res) => {       //获取登录状态
    console.log(res)
  })
  request("/getAvatar", "GET").then((res) => {       //获取头像

  })
  request("/getNodes", "GET").then((res) => {        //获取所有笔记
    console.log(res)
  })
  request("/getCollection", "GET").then((res) => {     //获取所有收藏
    console.log(res)
  })
  request("/getGarbage", "GET").then((res) => {        //获取所有回收站
    console.log(res)
  })
});

const onLoadMore = () => {
  loading.value = true;
  //@ts-ignore
  list.value = data.value.concat([...new Array(count)].map(() => ({loading: true, name: {}, picture: {}})));
  fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        const newData = data.value.concat(res.results);
        loading.value = false;
        data.value = newData;
        list.value = newData;
      });
}

</script>


<style scoped lang="scss">
.wrap {
  padding: 20px;

  > .listWrap {
    min-height: 350px;
  }
}
</style>
