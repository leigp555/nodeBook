<template>
  <div class="searchWrap">
    <div class="search">
      <a-space direction="vertical" class="inner">
        <a-input-search
            v-model:value="value"
            placeholder="input search text"
            enter-button
            @search="onSearch"
        />
      </a-space>
    </div>
    <div class="searchResult">
      <div class="content" v-if="haveContent">
        <List kind="garbage"/>
      </div>
      <div class="null" v-if="!haveContent">
        <a-empty :description="null"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import List from "@/helper/List.vue"
const value = ref<string>('');
const haveContent = ref(false)
const onSearch = (searchValue: string) => {
  console.log(searchValue);
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
