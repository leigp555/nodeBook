<template>
  <div class="searchWrap">
    <div class="search">
      <a-space direction="vertical" class="inner">
        <a-input-search
            v-model:value="value"
            placeholder="input search text"
            enter-button
            @input="onSearch"
        />
      </a-space>
    </div>
    <div class="searchResult">
      <div class="content" v-if="visible">
        <List kind="search" v-model:haveContent="haveContent" :searchValue="value"/>
      </div>
      <div class="null" v-if="!visible">
        <a-empty description="什么也没有"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, ref} from 'vue';
import List from "@/helper/List.vue"
import {useStore} from "vuex";
const store=useStore()
const initValue=computed(()=>{
  return store.getters.getCurrentSearch
})
const value = ref<string>(initValue.value);
const haveContent = ref(true)
const visible=ref<boolean>(true)
const onSearch = () => {
  store.commit("modifyCurrentSearch",value.value)
  visible.value=true
  haveContent.value=true
};
</script>
<style lang="scss" scoped>
.searchWrap {
  .search {
    display: flex;
    justify-content: center;
    align-items: center;

    > .inner {
      width: 80%;
    }
  }
  .searchResult {
    > .null {
      margin-top: 60px;
    }
  }
}

</style>
