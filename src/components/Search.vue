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
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-null"></use>
        </svg>
        <p>什么也没有!!!</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import List from "@/helper/List.vue"
const value = ref<string>('');
const haveContent=ref(true)
const onSearch = (searchValue: string) => {
  console.log(searchValue);
};

</script>

<style lang="scss" scoped>
.searchWrap{
  .search{
    display: flex;
    justify-content: center;
    align-items: center;
    >.inner{
      width: 80%;
    }
  }
  .searchResult{
    >.null {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 60px;
      gap: 5px;
      color: #666666;
    }
  }
}
.icon {
  width: 4em; height:4em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
