<template>
  <div class="article-wrapper">
    <header class="header">
      <div class="iconWrap">
        <router-link to="/">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fanhui"></use>
          </svg>
          <span>返回</span>
        </router-link>
      </div>
      <div class="saveWrap">
        <a-button type="text" class="save" @click="saveInfo">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-baocun"></use>
          </svg>
        </a-button>
      </div>
    </header>
    <div class="action">
      <div class="button" v-if="route.params.fileName==='node'||route.params.fileName==='collection'">
        <a-button class="action" @click="collection" type="link"><span style="margin-right:2px" ><heart-outlined :class="{clt:collectionState}"/></span>收藏</a-button>
        <a-button class="action" @click="deleteNode" type="link"><span style="margin-right:2px"><delete-outlined/>删除</span></a-button>
      </div>
      <div class="button" v-else-if="route.params.fileName==='garbage'">
        <a-button class="action" @click="reset" type="link"><span style="margin-right:2px" ><redo-outlined /></span>还原</a-button>
        <a-button class="action" @click="foreverDelete" type="link"><span style="margin-right:2px"><delete-outlined/>彻底删除</span></a-button>
      </div>
      <div class="iconWrap" @click="preview">
        <eye-outlined /><span>点击预览</span>
      </div>
    </div>
    <main class="main">
      <div class="showUserInput">
        <a-input class="title" :bordered="false" v-model:value="title" placeholder="标题" autofocus @change="modifyNode"/>
        <div class="article">
          <textarea class="input" v-model="textarea" @change="modifyNode"/>
        </div>
      </div>
    </main>
  </div>
  <a-drawer size="large" placement="bottom" :closable="false" :visible="markDownOutVisible" @close="onClose">
    <ShowNode :visible="markDownOutVisible" :create-node="false"/>
  </a-drawer>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import { ExclamationCircleOutlined,EyeOutlined } from '@ant-design/icons-vue';
import {createVNode, watchEffect} from 'vue';
import { Modal } from 'ant-design-vue';
import {
  getCurrentNode,
  modifyNodeRse,
  modifyNodeRseCollection,
  deleteNodeRes,
  resetNode,
  foreverDeleteRes
} from "@/helper/allRequest";
import ShowNode from "@/components/ShowNode.vue"
import {ref} from "vue";
import {collectionType, nodeInfoType} from "@/type/type";
import {HeartOutlined, DeleteOutlined,RedoOutlined} from '@ant-design/icons-vue';

const router=useRouter()
const route = useRoute()
const title = ref<string>('');
const textarea = ref<string>('')
const nodeId=ref<number>()
const collectionState=ref<boolean>()
//网络请求
getCurrentNode.request("/getCurrentNode", route.params as { nodeId: string, fileName: string }).then((response) => {
  const res = response as { nodeId: number, title: string, content: string,collection:boolean }[]
  title.value = res[0].title
  textarea.value = res[0].content
  nodeId.value=res[0].nodeId
  collectionState.value=res[0].collection
})
const saveInfo = () => {
  const article={title:title.value,article:textarea.value,nodeId:nodeId.value,fileName:route.params.fileName} as nodeInfoType
  Modal.confirm({
    title: '确定修改？',
    cancelText:"取消",
    okText:'确定',
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      modifyNodeRse.request(article).then((res)=>{
      },(res)=>{
        alert("修改失败")
      })
    },
    onCancel() {},
  });
}

const markDownOutVisible = ref<boolean>(false);
const preview=()=>{
  const article={title:title.value,article:textarea.value,nodeId:nodeId.value,fileName:route.params.fileName} as nodeInfoType
  window.localStorage.setItem("__currentNode",JSON.stringify(article))
  markDownOutVisible.value = true;
}
const modifyNode=()=>{
  const article={title:title.value,article:textarea.value}
  window.localStorage.setItem("__currentNode",JSON.stringify(article))
}

const onClose = () => {
  markDownOutVisible.value = false;
};

const collection=()=>{
  collectionState.value=!collectionState.value
  const postData={nodeId:nodeId.value,currentCollectionState:collectionState.value} as collectionType
  modifyNodeRseCollection.request(postData).then(()=>{})
}
const deleteNode=()=>{
  Modal.confirm({
    title: '确定删除？',
    cancelText:"取消",
    okText:'确定',
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      deleteNodeRes.request({nodeId:nodeId.value!}).then(()=>{},()=>{})
      router.back()
    },
    onCancel() {},
  });

}
const reset=()=>{
  resetNode.request({nodeId:nodeId.value!}).then(()=>{})
  router.back()
}
const foreverDelete=()=>{
  Modal.confirm({
    title: '删除将不可复原，确定删除？',
    cancelText:"取消",
    okText:'确定',
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      foreverDeleteRes.request({nodeId:nodeId.value!}).then(()=>{})
      router.back()
    },
    onCancel() {},
  })
}

</script>


<style lang="scss" scoped>
.article-wrapper {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  >.action{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 8px;
    padding-right: 8px;
    .clt{
      color: red;
    }
    >.iconWrap{
      display: flex;
      justify-content: center;
      align-items: center;
      color: #189eff;
      >.icon {
        width: 1em; height:1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
    }
  }
  > .header {
    padding: 12px 5px 12px 12px;
    background-color: #99CC66;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;

    > .iconWrap {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      text-align: center;

      > a {
        color: black;

        > .icon {
          width: 1.2em;
          height: 1.2em;
          vertical-align: -0.25em;
          fill: currentColor;
          overflow: hidden;
        }

        > span {
          text-align: center;
          vertical-align: center;
        }
      }
    }

    > .saveWrap {
      > .save {
        font-size: 16px;

        > .icon {
          width: 1.5em;
          height: 1.5em;
          vertical-align: -0.15em;
          fill: currentColor;
          overflow: hidden;
        }
      }
    }

  }
  > .main {
    padding-left: 8px;
    padding-right: 8px;
    margin-top: 8px;
    flex-grow: 10;
    > .showUserInput {
      height: 100%;
      display: flex;
      flex-direction: column;
      > .title {
        border: none;
        margin-bottom: 20px;
        border-bottom: 1px solid black;
        padding: 10px;
        text-align: center;
      }
      >.article{
        position: relative;
        top: 0;
        left: 0;
        flex-grow: 10;
        margin-bottom: 10px;
        >.input {
          height: 100%;
          width: 100%;
          padding: 15px 10px;
        }
      }
    }

  }

}

</style>


