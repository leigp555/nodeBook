<template>
  <a-input-group compact>
    <a-select v-model:value="wordInfo.lang">
      <a-select-option value="Zhejiang">中译英</a-select-option>
      <a-select-option value="Jiangsu">英译中</a-select-option>
    </a-select>
    <a-input v-model:value="wordInfo.word" style="width: 50%" @pressEnter="submit"/>
    <a-button type="primary" @click="submit" :disabled="loading">Submit</a-button>
  </a-input-group>
  <a-spin :spinning="spinning" :delay="delayTime">
    <div class="content">
      {{ wordInfo.result }}
    </div>
  </a-spin>

  <a-button type="primary" @click="info" style="display: none"></a-button>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {searchWord} from "@/helper/allRequest";
import { message } from 'ant-design-vue';

const wordInfo = reactive({
  lang: "中译英",
  word: "",
  result: ""
});
const spinning = ref<boolean>(false);
const delayTime = 500;
const loading=ref(false)
const submit = () => {
  spinning.value = true;
  if(!loading.value){
    const postDate = {word: wordInfo.word, from: "zh", to: "en"}
    searchWord.request(postDate).then((response) => {
      const res = response as { result: string }
      spinning.value=false
      wordInfo.result = res.result
      loading.value=false
    },()=>{
      spinning.value=false
      info()
      wordInfo.result = "请重试"
      loading.value=false
    })
    loading.value=true
  }
}
const info = () => {
  message.info('查询失败请重试');
};
</script>

<style lang="scss" scoped>

</style>