<template>
  <div class="article-wrapper">
    <div class="action">
      <div class="button">
        <a-button class="action" @click="collection" type="link"><span style="margin-right:2px "><heart-outlined :class="{clt:data.collection}"/></span>收藏</a-button>
      </div>
      <div class="button">
        <a-button class="action" @click="preview" type="link"><span style="margin-right:2px "><eye-outlined /></span>点击预览</a-button>
      </div>
      <div class="button">
        <a-button class="action" @click="saveInfo" type="link"><span style="margin-right:2px "><save-outlined /></span>保存</a-button>
      </div>
    </div>
    <main class="main">
      <div class="showUserInput">
        <a-input class="title" :bordered="false" v-model:value="data.title" placeholder="标题" autofocus @change="modifyNode"/>
        <div class="article">
          <textarea class="input" v-model="data.textarea" @change="modifyNode"/>
        </div>
      </div>
    </main>
  </div>
  <a-drawer size="large" placement="bottom" :closable="false" :visible="markDownOutVisible" @close="onClose">
    <ShowNode :visible="markDownOutVisible" createNode/>
  </a-drawer>
  <a-button style="display: none" type="primary" @click="success"></a-button>

</template>

<script lang="ts" setup>
import { ExclamationCircleOutlined,EyeOutlined ,SaveOutlined,HeartOutlined} from '@ant-design/icons-vue';
import {createVNode, onMounted, reactive} from 'vue';
import { Modal } from 'ant-design-vue';
import {createNewNode} from "@/helper/allRequest";
import ShowNode from "@/components/ShowNode.vue"
import {ref} from "vue";
import { message } from 'ant-design-vue';
import dayjs from "dayjs";




const data=reactive({
  title:"",
  textarea:"",
  filename:"",
  collection:true,
  timeAt:dayjs(),
})
const initData=()=>{
  const localData=window.localStorage.getItem("__createNode")!
  const initValue=localData&&JSON.parse(localData)||{title:"", article:"", filename:"", collection:false, timeAt:dayjs()}
  data.title=initValue.title
  data.textarea=initValue.content
  data.filename=initValue.filename
  data.collection=initValue.collection
  data.timeAt=initValue.timeAt
}
initData()

const postData=()=>{
  return {title:data.title,content:data.textarea,fileName:data.filename,collection:data.collection,timeAt:dayjs()}
}
//网络请求
const saveInfo = () => {
  const article=postData()
  Modal.confirm({
    title: '确定保存？',
    cancelText:"取消",
    okText:'确定',
    icon: createVNode(ExclamationCircleOutlined),
    onOk() {
      createNewNode.request(article).then((res)=>{
      },(res)=>{
        alert("修改失败")
      })
    },
    onCancel() {},
  });
}
const markDownOutVisible = ref<boolean>(false);
const preview=()=>{
  const article=postData()
  window.localStorage.setItem("__createNode",JSON.stringify(article))
  markDownOutVisible.value = true;
}
const modifyNode=()=>{
  const article=postData()
  window.localStorage.setItem("__createNode",JSON.stringify(article))
}
const onClose = () => {
  markDownOutVisible.value = false;
};
const collection=()=>{
   data.collection=!data.collection
}
const success = () => {
  message.info('回到上次编辑');
};
onMounted(()=>{
  success()
})
</script>


<style lang="scss" scoped>
.article-wrapper {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  >.action{
    margin-top: 20px;
    display: flex;
    justify-content: start;
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


