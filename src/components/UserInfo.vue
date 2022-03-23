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
        <a-button type="text" class="save" @click="saveInfo">
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
      <div class="nickname same" @click="showNickname">
        <span>昵称</span>
        <span>{{ data.nickname}}</span>
      </div>
      <div class="gender same" @click="showDrawer">
        <span>性别</span>
        <span>{{data.gender}}</span>
      </div>
      <div class="phoneNumber same" @click="showPhone">
        <span>手机号</span>
        <span>{{data.phoneNumber}}</span>
      </div>
      <div class="exit">
        <a-button type="primary" class="button" @click="signOut">退出登录</a-button>
      </div>
    </div>
  </div>
  <div class="alert">
    <div class="inputPhone">
      <a-modal v-model:visible="phoneVisible" cancelText="取消" okText="确认" title="请输入手机号" @ok="phoneOk">
        <a-input v-model:value="value2" placeholder="请输入手机号" allow-clear />
      </a-modal>
    </div>
    <div class="inputName">
      <a-modal v-model:visible="nicknameVisible" cancelText="取消" okText="确认" title="请输入昵称" @ok="nicknameOk">
        <a-input v-model:value="value1" placeholder="请输入昵称" allow-clear />
      </a-modal>
    </div>
    <a-drawer  :placement="placement" :closable="false" :visible="visibleX" @close="onClose"
               :content-wrapper-style="{height:160+'px'}">
      <p id="genderA" @click="gender('男')">男</p>
      <p id="genderB" @click="gender('女')">女</p>
      <p id="genderC" @click="onClose">取消</p>
    </a-drawer>
  </div>


</template>

<script setup lang="ts">
import {UserOutlined} from '@ant-design/icons-vue';
import {computed, reactive, ref} from "vue";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";
import type { DrawerProps } from 'ant-design-vue';
import {getUserInfo, saveUserInfo, updateAvatar, userSignOut} from "@/helper/allRequest";
import {userInfoData} from "@/type/type";
const router =useRouter()
const avatar =computed(()=>{
  return  window.localStorage.getItem("node-avatar")
})
const imgState = reactive({
  imgSrc: avatar.value,
  error: false
})

const data=reactive<userInfoData>({
  nickname:"未设置",
  gender:"未设置",
  phoneNumber:"未设置"
})

//手机号
const value2 = ref<string>('');
const phoneVisible = ref<boolean>(false);
const showPhone = () => {
  phoneVisible.value = true;
};
const phoneOk = () => {
  data.phoneNumber=value2.value
  phoneVisible.value = false;
};


//昵称
const value1 = ref<string>('');
const nicknameVisible = ref<boolean>(false);
const showNickname = () => {
  nicknameVisible.value = true;
};
const nicknameOk = () => {
  data.nickname=value1.value
  nicknameVisible.value = false;
};


//抽屉组件
const placement = ref<DrawerProps['placement']>('bottom');
const visibleX = ref<boolean>(false);
const showDrawer = () => {
  visibleX.value = true;
};
const onClose = () => {
  visibleX.value = false;
};
const gender=(gender:string)=>{
  data.gender=gender
  visibleX.value = false
}


//网络请求
//更新头像
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
        reject("")
      }).then((result) => {
        imgState.imgSrc=result as string
        //更新头像
        const srcData={"srcData":result}
        updateAvatar.request(srcData as {srcData:string}).then(()=>{},()=>{})
      })
    }
  }
}


//退出
const signOut=()=>{
  userSignOut.request().then(()=>{
    window.localStorage.setItem("__createNode",'')
    window.localStorage.setItem("__currentNode",'')
    message.success({
      content: () => '成功退出,正在跳转到登录页。。。',
      duration:1.5,
      class: 'custom-class',
    })
    setTimeout(()=>{
      router.push("/signIn")
    },2000)
  })
}
//获取用户信息
getUserInfo.request().then((response)=>{
  const res=response as userInfoData
  res.gender&& (data.gender=res.gender)
  res.nickname&&(data.nickname=res.nickname)
  res.phoneNumber&&(data.phoneNumber=res.phoneNumber)
},(res)=>{})
//保存用户信息
const saveInfo=()=>{
  message.success({
    content: () => '保存成功',
    duration:1,
    class: 'custom-class',
  })
   saveUserInfo.request(data).then()
}
</script>



<style lang="scss" scoped>
.infoWrap {
  display: flex;
  height: 100%;
  flex-direction: column;
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
    flex-grow: 1;
    background-color: #ffffff;
    > .same {
      background-color: #ffffff;
      display: flex;
      padding: 12px 20px;
      justify-content: space-between;
      align-items: center;
      box-shadow:inset 0 1px 0 0 rgb(0 0 0 / 10%);
      > label {
        flex-grow: 1;
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
      padding: 10px 14px;
     >.button{
       border: none;
       outline: transparent;
       border-radius: 10px;
       text-align: center;
       color: black;
       background-color: #1890ff;
     }
    }
  }
}
#genderA,#genderB,#genderC{
  background-color: rgba(222, 222, 215, 0.5);
  font-size: 16px;
  color: #6699FF;

  padding: 5px;
  text-align: center;
  border-radius: 10px;
  margin-bottom: 5px;
}
</style>

<style lang="scss">
.custom-class{
  padding: 15px 10px;
  background-color: #ffffff;
  box-shadow: 0 0 1px 1px rgba(0,0,0,.1);
}
.ant-message{
  margin-top: 10vh;
  position: absolute;
  top:0;
  display: flex;
  justify-content: center;
  width: 100%;
  color: #626262;
  span{
    margin-left: 3px;
  }
  svg{
    font-size: 1em;
    vertical-align: center;
    color: #1890ff;
  }
}
</style>