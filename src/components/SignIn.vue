<template>
  <div class="wrap">
    <div class="inner">
      <a-form class="formWrap" :model="formState" name="normal_login"  @finish="onFinish" @finishFailed="onFinishFailed"
              :wrapper-col="{ span: 24, offset: 0 }">
        <a-form-item class="formItem" label="" name="username" :rules=verifyUserName >
          <a-input v-model:value="formState.username" placeholder="请输入用户名">
            <template #prefix>
              <UserOutlined class="site-form-item-icon"/>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item class="formItem" label="" name="password" :rules=verifyPassWord>
          <a-input-password v-model:value="formState.password" placeholder="请输入密码">
            <template #prefix>
              <LockOutlined class="site-form-item-icon"/>
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item class="formItem" :wrapper-col="{ span: 24, offset: 0 }">
          <a-button type="primary" :disabled="disabled" html-type="submit" class="submit">Submit</a-button>
          <p>没有账号?先 <router-link to="/register">注册</router-link>一个吧</p>
        </a-form-item>
      </a-form>
    </div>
  </div>

</template>


<script lang="ts" setup>
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';
import {computed, reactive} from "vue";
import {FormState} from "@/type";
import {useRouter} from "vue-router";
const router=useRouter()
const formState = reactive<FormState>({
  username: '',
  password: '',
  checkPass: true,
});
const onFinish = (values: any) => {
  console.log(values);
  router.push("/node")
};
// const onFinishFailed = (errorInfo: any) => {
//   console.log(errorInfo);
// };
const verifyUserName=[
  { required: true, message: '填写用户名' },
  {pattern:/^[a-zA-Z0-9_-]{3,16}$/,message: '用户名必须3到16位(字母，数字，下划线，减号)',trigger:"blur"}
]
const verifyPassWord=[
  { required: true, message: 'Please input your password!' },
  {pattern:/^[a-zA-Z0-9_-]{6,16}$/,message: '密码必须6到16位(字母，数字，下划线，减号)',trigger:"blur"}
]
const disabled = computed(() => {
  return !(formState.username && formState.password);
});

</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  position: relative;
  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    transform: translateY(-50%) translateX(-50%);
    padding: 80px 60px 20px 60px ;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.2);
    background-color: #ffffff;
    >.formWrap{
      >.formItem{
        .submit{
          width: 100%;
          color: #ffffff;
          background-color: #ff6a00;
          margin-bottom: 10px;
        }
      }
    }
  }
}

</style>