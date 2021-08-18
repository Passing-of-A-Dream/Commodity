<template>
  <el-form
    ref="loginForm"
    :model="loginFood"
    :rules="rules"
    label-width="100px"
    class="loginForm sign-in-form"
  >
    <el-form-item label="账号" prop="userName">
      <el-input
        v-model="loginFood.userName"
        placeholder="请输入账号..."
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="loginFood.password"
        type="password"
        placeholder="请输入密码..."
        @keyup.enter="submitBtn('loginForm')"
      ></el-input>
    </el-form-item>
    <el-form-item class="Submit-button-auto">
      <el-button
        @click="submitBtn('loginForm')"
        type="primary"
        class="submit-btn"
        >提交</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  props: {
    loginFood: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    // @ts-ignore
    const { ctx } = getCurrentInstance();
    const router = useRouter();
    const $store = useStore();
    // console.log($store);
    // 登录
    const submitBtn = (formName: string) => {
      ctx.$refs[formName].validate((valid: boolean) => {
        if (valid) {
          // console.log(props.loginFood);

          ctx.$refs[formName].$axios
            .post("/api/admin", {
              name: props.loginFood.userName,
              password: props.loginFood.password,
            })
            .then((res: any) => {
              // console.log(res.data.data);
              if (res.data.code === 200) {
                ctx.$refs[formName].$store.commit('setName', props.loginFood.userName)
                let shopId = res.data.data
                sessionStorage.setItem('shopId', shopId)
                // console.log(sessionStorage);
                router.push('/');
                // console.log(ctx.$refs[formName].$store.getters.getUserName);
              } else {
                ctx.$refs[formName].$message({
                  message:`登录失败, ${res.data.msg}`,
                  type: 'error'
                });
              }
            });
        } else {
          return false;
        }
      });
    };
    //监听键盘事件
    
    
    return {
      submitBtn,
    };
  },
};
</script>

<style scoped>
/* register */
.loginForm {
  margin-top: 100px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
  float: right;
  width: 40%;
}
</style>
