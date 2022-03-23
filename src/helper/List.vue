<template>
  <div class="wrap">
    <a-list class="listWrap" :loading="initLoading" item-layout="horizontal" :data-source="list">
      <template #renderItem="{ item }">
        <router-link :to="routerUrl(item.nodeId)">
          <a-list-item>
            <a-skeleton :title="false" :loading="loading" active>
              <a-list-item-meta :description="hiddenText(item.content)">
                <template #title>
                  <div class="titleWrapX">
                    <div>
                      <a-divider class="line"/>
                    </div>
                    <div class="inner">
                      <span id="nodeTitle" v-html="item.title"></span>
                      <span> {{ formatTime(item.timeAt) }}</span>
                    </div>
                  </div>
                </template>
              </a-list-item-meta>
            </a-skeleton>
          </a-list-item>
        </router-link>
      </template>
      <template #loadMore>
        <div v-if="!initLoading && !loading" class="loadMore"
             :style="{ textAlign: 'center', marginTop: '16px', height: '32px', lineHeight: '32px' }">
          <a-button v-if="!end" @click="onLoadMore">加载更多</a-button>
          <div v-if="end" class="noMore">没有更多了, <a href="#">回到顶部?</a></div>
        </div>
      </template>
    </a-list>
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, ref, watchEffect} from 'vue';
import {getMoreNodes, getNodes, searchNodes} from "@/helper/allRequest";
import dayjs from "dayjs";

const initLoading = ref(true);
const loading = ref(true);
const data = ref<resNodeType>([]);
const list = ref<resNodeType>([]);
const end = ref<boolean>(false)
const rangItem = ref<number>(0)

type resNodeType = { title: string, content: string }[]

interface listType {
  kind: "nodeBooks" | "collection" | "garbage" | "search",
  haveContent?: boolean,
  searchValue?: string
}

const props = defineProps<listType>()
const requestUrl = computed(() => {
  if (props.kind === "nodeBooks") {
    return "/getNodes"
  } else if (props.kind === "collection") {
    return "/getCollection"
  } else if (props.kind === "garbage") {
    return "/getGarbage"
  }
})
const requestMoreUrl = computed(() => {
  if (props.kind === "nodeBooks") {
    return "/getMoreNodes"
  } else if (props.kind === "collection") {
    return "/getMoreCollection"
  } else if (props.kind === "garbage") {
    return "/getMoreGarbage"
  }
})
onMounted(() => {
  if (props.kind !== "search") {
    rangItem.value = 0
    const initRang = JSON.stringify([0, (rangItem.value + 3)])
    rangItem.value += 3
    //确认登录后部分笔记
    getNodes.request(requestUrl.value!, initRang).then((response) => {
      const res = response as resNodeType
      initLoading.value = false;
      loading.value = false
      data.value = res;
      list.value = res;
    }, (res) => {
      alert(res.msg)
    })
  } else {

  }
});
const onLoadMore = () => {
  if (!end.value) {
    loading.value = true;
    const initRang = JSON.stringify([rangItem.value, (rangItem.value + 3)])
    rangItem.value += 3
    getMoreNodes.request(requestMoreUrl.value!, initRang).then((response) => {
      const res = response as resNodeType
      if (res[0]) {
        const newData = data.value.concat(res as resNodeType);
        loading.value = false;
        data.value = newData;
        list.value = newData;
      } else {
        loading.value = false
        end.value = true
      }
    })
  } else {
    return
  }

}

//文字超长隐藏
const hiddenText = (text: string) => {
  if (text.length > 14) {
    return text.substring(0, 14) + "..."
  } else {
    return text
  }
}

const routerUrl = (nodeId: number) => {
  if (props.kind === "nodeBooks") {
    return `/node/currentNode/node/${nodeId}`
  } else if (props.kind === "collection") {
    return `/node/currentNode/collection/${nodeId}`
  } else if (props.kind === "garbage") {
    return `/node/currentNode/garbage/${nodeId}`
  } else if (props.kind === "search") {
    return `/node/currentNode/search/${nodeId}`
  }
}

const formatTime = (time: string) => {
  return dayjs(time).format("MM月DD日HH:mm")
}


//防抖函数
let timer = ref<boolean>(false)
const clock = ref<number>()
const debounce = (fn:()=>void, delay = 2000) => {
  if (!timer.value) {
    window.clearTimeout(clock.value);
    fn()
    timer.value = true
    clock.value = window.setTimeout(() => {
      timer.value = false
      emit("update:haveContent",false)
    }, delay)
  } else {
  }
}

const emit=defineEmits(["update:haveContent"])
const fn =()=>{
  searchNodes.request({value: props.searchValue!}).then((response) => {
    initLoading.value = false;
    loading.value = false
    end.value=true
    list.value = response as resNodeType
  })
}
watchEffect(() => {
  if (props.haveContent && props.kind === "search") {
    //添加节流函数
    debounce(fn,1000)
  }
})

if(props.kind === "search"){
 initLoading.value=false
  loading .value=false
  end.value=true
}
</script>


<style scoped lang="scss">
.wrap {
  padding: 0 20px;

  > .listWrap {
    min-height: 350px;
  }

  .noMore {
    margin-top: 20px;

  }

  .titleWrapX {
    .inner {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    .line {
      margin-top: 0;
      background-color: rgba(42, 42, 42, .2);
    }
  }

}

#nodeTitle {
  max-width: 8em;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 0;
}
</style>
