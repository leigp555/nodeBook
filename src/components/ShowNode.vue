<template>
  <div class="article-wrapper">
    <main class="main">
      <div class="showMarkDownOut">
        <div class="showTitle">
          <Markdown id="markdownTitle" :source='title' typographer :plugins=markDownPlugins breaks linkify></Markdown>
        </div>
        <div class="showArticle">
          <Markdown id="markdownArticle" :source='textarea' typographer :plugins=markDownPlugins breaks
                    linkify></Markdown>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
//@ts-ignore
import Markdown from "vue3-markdown-it"
import {nodeInitString} from "@/helper/nodeEx";
//@ts-ignore
import {markDownPlugins} from "@/helper/markdown-plugin.js";
import {ref, watchEffect} from "vue";
import 'highlight.js/styles/monokai.css'
const textarea = ref<string>(nodeInitString)
const title = ref<string>('示例');
//当内容被弹出时重新获取数据库中的数据
const updateData=()=>{
  let nodeInfo
  if(!props.createNode){
    const localStoreDate=window.localStorage.getItem("__currentNode")
    nodeInfo =localStoreDate&&JSON.parse(localStoreDate!) || {title: "", article: ""}
    title.value = nodeInfo.title
    textarea.value = nodeInfo.article
  }else {
    const localStoreDate=window.localStorage.getItem("__createNode")
    nodeInfo =localStoreDate&&JSON.parse(localStoreDate!) || {title: "", article: ""}
    title.value = nodeInfo.title
    textarea.value = nodeInfo.content
  }
}
const props=defineProps<{visible:boolean,createNode:boolean}>()
watchEffect(()=>{
  if(props.visible){
    updateData()
  }
})


</script>
<style lang="scss" scoped>
.article-wrapper {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  > .main {
    padding-left: 8px;
    padding-right: 8px;
    margin-top: 8px;
    flex-grow: 10;

    > .showMarkDownOut {
      height: 100%;
      display: flex;
      flex-direction: column;

      .showTitle {
        > #markdownTitle {
          height: 3em;
          line-height: 3em;
          text-align: center;
          width: 100%;
          border-bottom: 1px solid black;
        }
      }

      .showArticle {
        width: 100%;
        flex-grow: 10;
        margin-bottom: 10px;
      }
    }

  }

}
</style>
