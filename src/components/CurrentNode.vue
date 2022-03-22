<template>
  <div class="article-wrapper">
    <textarea class="input" v-model="textarea"/>
    <VueMarkdownIt id="markdownArticle" :source='textarea' :plugins=markDownPlugins></VueMarkdownIt>
  </div>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import {getCurrentNode} from "@/helper/allRequest";
//@ts-ignore
import VueMarkdownIt from "vue3-markdown-it"

import {ref} from "vue";
import {nodeInitString} from "@/helper/nodeEx";
import {markDownPlugins} from "@/helper/markdown-plugin.js";
import "../helper/markdown.scss"
import 'highlight.js/styles/monokai.css'
const  textarea = ref<string>(nodeInitString)


const route = useRoute()
getCurrentNode.request("/getCurrentNode", route.params as {nodeId:string,fileName:string}).then((res) => {
  console.log(res)
})


</script>


<style lang="scss" scoped>
@import url("../helper/markdown.scss");
.article-wrapper {
  .input {
    width: 100%;
    height: 400px;
    display: none;
  }
  #markdownArticle{
    height: 100%;
    padding-left: 8px;
    padding-right: 8px;
    border-radius: 7px;
    margin-top: 7px;
  }
}
</style>
