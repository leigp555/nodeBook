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
        <a-form-item class="formItem" label="" name="password" :rules=verifyPassWord has-feedback>
          <a-input v-model:value="formState.password" placeholder="请输入密码">
            <template #prefix>
              <LockOutlined class="site-form-item-icon"/>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item has-feedback label="" name="checkPass" class="formItem" :rules="verifyAgain">
          <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" placeholder="确认密码">
            <template #prefix>
              <LockOutlined class="site-form-item-icon"/>
            </template>
          </a-input>
        </a-form-item>

        <a-form-item class="formItem" :wrapper-col="{ span: 24, offset: 0 }">
          <a-button type="primary" :disabled="disabled" html-type="submit" class="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {UserOutlined, LockOutlined} from '@ant-design/icons-vue';
import {computed, reactive} from "vue";
import {FormState} from "@/type";
import {RuleObject} from "ant-design-vue/es/form";
const formState = reactive<FormState>({
  username: '',
  password: '',
  checkPass: '',
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};
// const onFinishFailed = (errorInfo: any) => {
//   console.log('Failed:', errorInfo);
// };
const verifyUserName=[
  { required: true, message: '填写用户名' },
  {pattern:/^[a-zA-Z0-9_-]{3,16}$/,message: '用户名必须4到16位(字母，数字，下划线，减号)',trigger:"blur"}
]
const verifyPassWord=[
  { required: true, message: '填写密码' },
  {pattern:/^[a-zA-Z0-9_-]{3,16}$/,message: '密码必须4到16位(字母，数字，下划线，减号)',trigger:"blur"}
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
const verifyAgain=[
  { validator: validatePass, trigger: 'change' }
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