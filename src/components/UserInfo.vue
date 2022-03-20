<template>
  <div class="infoWrap">
    <div class="header">
      <div class="iconWrap">
        <router-link to="/">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fanhui"></use>
          </svg>
          <span>返回</span>
        </router-link>
      </div>
      <div class="saveWrap">
        <a-button type="text" class="save">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-baocun"></use>
          </svg>
        </a-button>
      </div>
    </div>
    <div class="main">
      <div class="avatar same">
        <label>
          <span>头像</span>
          <input class="imgFile" type="file" title=" " accept="image/png, image/jpeg, image/gif, image/jpg"
                 @change="handleFile"/>
        </label>
        <a-avatar :size="32" :src="imgState.imgSrc? imgState.imgSrc :''" class="avatar">
          <template #icon>
            <UserOutlined/>
          </template>
        </a-avatar>
      </div>
      <div class="username same">
        <span>昵称</span>
        <span>username</span>
      </div>
      <div class="gender same">
        <span>性别</span>
        <span>男</span>
      </div>
      <div class="phoneNumber same">
        <span>手机号</span>
        <span>17397015285</span>
      </div>
      <div class="exit">
        <a-button type="primary" class="button" @click="signOut">退出登录</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {UserOutlined} from '@ant-design/icons-vue';
import {computed, reactive, ref, watchEffect} from "vue";
import {request} from "@/helper/netRequest";
import {updateAvatar} from "@/helper/updateAvatar";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";
const router =useRouter()
const avatar =computed(()=>{
  return  window.localStorage.getItem("node-avatar")
})
const imgState = reactive({
  imgSrc: avatar.value,
  error: false
})
const handleFile = (e: Event) => {
  imgState.error = false
  const el = e.target as HTMLElement
  //@ts-ignore
  const files = el.files
  if (files.length) {
    let file = files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onerror = function () {
      imgState.error = true
    }
    reader.onloadend = function () {
      return new Promise((resolve, reject) => {
        resolve(reader.result as string)
        reject("error")
      }).then((result) => {
        request("/loadPng", "POST", result as string).then((res) => {
          imgState.imgSrc = res as string
          updateAvatar()
        })
      })
    }
  }

}
const signOut=()=>{
  message.success({
    content: () => '成功退出,正在跳转到登录页。。。',
    duration:1,
    class: 'custom-class',
  });
  request("/user/signOut","POST").then((res)=>{
    updateAvatar()
    setTimeout(()=>{
      router.push("/signIn")
    },2000)
  })
}
</script>

<style lang="scss" scoped>
.infoWrap {

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
    padding: 0 20px;
    > .same {
      display: flex;
      padding: 12px 0;
      justify-content: space-between;
      align-items: center;
      box-shadow:inset 0 1px 0 0 rgb(0 0 0 / 10%);
      > label {
        color: black;
        > .imgFile {
          display: none;
        }
      }
    }
    >.exit{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 60px;
     >.button{
       border: none;
       border-radius: 10px;
       background-color: #ff6a00;
     }
    }
  }
}
</style>
<style>



.ant-message{
  margin-top: 10vh;
  position: absolute;
  top:0;
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>