<template>
  <div class="wrap">
    <a-list class="listWrap" :loading="initLoading" item-layout="horizontal" :data-source="list">
      <template #renderItem="{ item }">

        <a-list-item >
          <a-skeleton :title="false" :loading="loading" active>
            <a-list-item-meta :description="hiddenText(item.content)">
              <template #title ><p id="nodeTitle">{{ item.title }}</p></template>
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
          <a-button v-if="!end" @click="onLoadMore">loading more</a-button>
          <div v-if="end" class="noMore">没有更多了</div>
        </div>
      </template>
    </a-list>
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import {getMoreNodes, getNodes, getUserState} from "@/helper/allRequest";
const initLoading = ref(true);
const loading = ref(true);
const data = ref<resNodeType>([]);
const list = ref<resNodeType>([]);
const end=ref<boolean>(false)
const rangItem=ref<number>(0)
type resNodeType = {title: string, content: string}[]
interface listType{
  kind: "nodeBooks"|"collection"|"garbage"|"search"
}
const props = defineProps<listType>()
const requestUrl=computed(()=>{
  if(props.kind==="nodeBooks"){
    return "/getNodes"
  }else if(props.kind==="collection"){
    return "/getCollection"
  }else if(props.kind==="garbage"){
    return "/getGarbage"
  }else if(props.kind==="search"){
    return "/searchResult"
  }
})
const requestMoreUrl=computed(()=>{
  if(props.kind==="nodeBooks"){
    return "/getMoreNodes"
  }else if(props.kind==="collection"){
    return "/getMoreCollection"
  }else if(props.kind==="garbage"){
    return "/getMoreGarbage"
  }else if(props.kind==="search"){
    return "/moreSearchResult"
  }
})
onMounted(() => {
  rangItem.value=0
  const initRang=JSON.stringify([0,(rangItem.value+3)])
  rangItem.value+=3
  //确认登录后部分笔记
  getNodes.request(requestUrl.value!,initRang).then((response) => {
    const res= response as resNodeType
    initLoading.value = false;
    loading.value=false
    data.value = res;
    list.value = res;
  }, (res) => {
    alert(res.msg)
  })
});
const onLoadMore = () => {
  if(!end.value){
    loading.value = true;
    const initRang=JSON.stringify([rangItem.value,(rangItem.value+3)])
    rangItem.value+=3
    getMoreNodes.request(requestMoreUrl.value!,initRang).then((response) => {
      const res=response as resNodeType
      if(res[0]){
        const newData = data.value.concat(res as resNodeType);
        loading.value = false;
        data.value = newData;
        list.value = newData;
      }else{
        loading.value = false
        end.value=true
      }
    })
  }else {
    return
  }

}


//获取登陆状态
getUserState.request().then((response) => {
  const res = response as { land: boolean, message: string }
  // console.log(res)
})

//文字超长隐藏
const hiddenText=(text:string)=>{
  if(text.length>14){
    return text.substring(0,14)+"..."
  }else {
    return text
  }
}
</script>


<style scoped lang="scss">
.wrap {
  padding: 20px;

  > .listWrap {
    min-height: 350px;
  }
}
#nodeTitle{
  max-width: 8em;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 0;
}
</style>
