<template>
  <div class="wrap">
    <div class="alert" :class="{showAlert:alterTip}" v-if="loginKind==='signIn'">
      <a-alert type="error" message="用户名或密码不正确" banner/>
    </div>
    <div class="alert" :class="{showAlert:alterTip}" v-else-if="loginKind==='register'">
      <a-alert type="error" message="用户已存在" banner/>
    </div>
    <div class="inner">
      <div class="avatarWrap">
        <a-avatar :size="64" :src="loginKind==='signIn'? avatarSrc :''" class="avatar">
          <template #icon>
            <UserOutlined/>
          </template>
        </a-avatar>
      </div>
      <a-form class="formWrap" :model="formState" name="normal_login" @finish="onFinish"
              :wrapper-col="{ span: 24, offset: 0 }">
        <a-form-item class="formItem" label="" name="username" :rules=verifyUserName has-feedback>
          <a-input v-model:value="formState.username" placeholder="请输入用户名" class="formInput">
            <template #prefix>
              <UserOutlined class="site-form-item-icon"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item class="formItem" label="" name="password" :rules=verifyPassWord has-feedback>
          <a-input-password v-model:value="formState.password" placeholder="请输入密码" class="formInput">
            <template #prefix>
              <LockOutlined class="site-form-item-icon"/>
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item v-if="loginKind==='register'" has-feedback label="" name="checkPass" class="formItem"
                     :rules="verifyAgain">
          <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" placeholder="确认密码"
                   class="formInput">
            <template #prefix>
              <LockOutlined class="site-form-item-icon"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item v-if="loginKind==='register'" class="formItem" :wrapper-col="{ span: 24, offset: 0 }">
          <a-button type="primary" html-type="submit" class="submit">Submit</a-button>
          <p class="link">已有账号?直接
            <router-link to="/signIn">登录</router-link>
          </p>
        </a-form-item>
        <a-form-item v-if="loginKind==='signIn'" class="formItem" :wrapper-col="{ span: 24, offset: 0 }">
          <a-button type="primary" html-type="submit" class="submit">Submit</a-button>
          <p class="link">没有账号?先
            <router-link to="/register">注册</router-link>
            一个吧
          </p>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {reactive, ref, toRefs} from "vue";
import {FormState} from "@/type/type";
import {useRouter} from "vue-router";
import {RuleObject} from "ant-design-vue/es/form";
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';
import {getAvatar, register, signIn} from "@/helper/allRequest";

const router = useRouter()
const props = defineProps<{
  loginKind: "signIn"|"register"
}>()
const {loginKind } = toRefs(props)
const formState = reactive<FormState>({
  username: '',
  password: '',
  checkPass: '',
});
//校验
const verifyUserName = [
  {required: true, message: '请填写用户名'},
  {pattern: /^[a-zA-Z0-9_-]{3,16}$/, message: '用户名必须3到16位(字母，数字，下划线，减号)', trigger: "blur"}
]
const verifyPassWord = [
  {required: true, message: '请填写密码'},
  {pattern: /^[a-zA-Z0-9_-]{6,16}$/, message: '密码必须6到16位(字母，数字，下划线，减号)', trigger: "blur"}
]
let validatePass = async (_rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject('请再输入一次密码');
  } else if (value !== formState.password) {
    return Promise.reject("两次输入不一致");
  } else {
    return Promise.resolve();
  }
}
const verifyAgain = [
  {validator: validatePass, trigger: 'change'}
]
//获取本地用户头像
const avatarSrc = ref<string | null>()
const string=window.localStorage.getItem("node-avatar")||""
avatarSrc.value=string

//网络请求
const alterTip = ref<boolean>(false)
const onFinish = (values: FormState) => {
  if (loginKind!.value === "signIn") {
    signIn.request(values,router).then(()=>{
      getAvatar.request().then(()=>{
        avatarSrc.value=window.localStorage.getItem("node-avatar") || ""
      },()=>{})
    },()=>{
      alterTip.value = true
      setTimeout(() => {
        alterTip.value = false
      }, 2000)
    })
  } else if (loginKind!.value === "register") {
    delete values.checkPass
    register.request(values,router).then((res)=>{
    },(res)=>{
      alterTip.value = true
      setTimeout(() => {
        alterTip.value = false
      }, 2000)
    })
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  position: relative;

  .alert {
    position: absolute;
    top: -50px;
    left: 50%;
    transition: all 250ms;
    transform: translateX(-50%);

    &.showAlert {
      top: -50px;
      left: 50%;
      transform: translateX(-50%) translateY(70px);
    }
  }

  .inner {
    padding: 80px 20px 20px 20px;
    background-color: #ffffff;

    > .avatarWrap {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 60px;
    }

    > .formWrap {
      > .formItem {
        .formInput {
          line-height: 3em;
          border-radius: 6px;
        }

        .submit {
          width: 100%;
          height: 3em;
          border-radius: 6px;
          color: #ffffff;
          font-size: 16px;
          background-color: #ff6a00;
          margin-bottom: 10px;
          border: none;
        }

        .link {
          font-size: 16px;
        }
      }
    }
  }
}

</style>