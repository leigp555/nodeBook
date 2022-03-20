<template>
  <div class="headerWrap">
    <div class="slideTop" >
      <div class="avatarWrap">
        <router-link to="/userInfo">
          <a-avatar :size="42" :src="avatarSrc" class="avatar">
            <template #icon>
              <UserOutlined/>
            </template>
          </a-avatar>
        </router-link>
        <span>{{dataState.userName}}</span>
      </div>
      <a-button type="primary" v-if="dataState.isPunch" class="button" @click="punch">已打卡</a-button>
      <a-button type="primary" v-else class="button noPunch" @click="punch">未打卡</a-button>
    </div>
    <div class="slideBottom">
      <div class="punk">
        <span>{{ dataState.totalPunch }}</span>
        <span>已连续打卡</span>
      </div>
      <div class="totalDay">
        <span>{{dataState.totalDay}}</span>
        <span>记录总天数</span>
      </div>
      <div class="totalNode">
        <span>{{dataState.totalNode}}</span>
        <span>笔记总数</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {getUserState} from "@/helper/allRequest";
import {UserOutlined} from '@ant-design/icons-vue';
const dataState=reactive({
  isPunch:false,
  userName:"用户名",
  totalPunch:10,
  totalDay:50,
  totalNode:100
})
const punch=()=>{
  if (!dataState.isPunch){
    dataState.totalPunch+=1
  }
  dataState.isPunch=true
}
const avatarSrc = ref<string>("")
getUserState.request().then((res)=>{
  if(res.land){
    avatarSrc.value=window.localStorage.getItem("node-avatar")
  }else {
    avatarSrc.value=''
  }
},()=>{
  avatarSrc.value=''
})
</script>

<style lang="scss" scoped>
.headerWrap{
  background-color: #FF9966;
  padding: 0 20px;
  .slideTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0 5px 0;
    margin-bottom: 10px;
    >.button{
      border-radius: 20%;
      text-align: center;
      font-size: 12px;
      padding: 5px 5px;
      border: none;
      background-color: #CCCCCC;
      &.noPunch{
        background-color: #0099CC;
      }
    }
    .avatarWrap {
      >a>.avatar{
        box-shadow: 0 0 1px 2px rgba(255,255,255,.5);
      }
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 14px;
    }
  }
  .slideBottom{
    padding: 0 15px 10px 15px;
    display: flex;
    justify-content: space-between;
    div{
      display: flex;
      flex-direction: column;
      align-items: center;
      >span{
        &:first-child{
          font-size: 16px;
          font-weight: bold;
        }
        &:nth-child(2){
          font-size: 12px;
        }
      }

    }
  }
}

</style>