<template>
  <div class="login">
    <div class="login-container">
      <div class="title">管理平台</div>
      <div class="username">
        <i class="el-icon-user input-icon"></i>
        <input
          type="text"
          v-model="loginForm.username"
          placeholder="请输入账号"
        />
      </div>
      <div class="password">
        <i class="el-icon-lock input-icon"></i>
        <input
          type="text"
          v-model="loginForm.password"
          @keyup.enter="login"
          placeholder="请输入密码"
        />
      </div>
      <div class="login-btn">
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../../api/login";
import { setToken } from "../../utils/cookie";
export default {
  data() {
    return {
      loginForm: {
        username:'admin',
        password:'123456'
      },
      loginFormRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      if (!this.loginForm.username) {
        return this.$message.error("请输入账号");
      }
      if (!this.loginForm.password) {
        return this.$message.error("请输入密码");
      }
      login(this.loginForm).then((res) => {
        if (res.success) {
          setToken(res.data);
          this.$message({ message: "登录成功！", type: "success" });
          this.$router.push("/");
        } else {
          this.$message.error("登录失败！账号或者密码有误！！");
        }
      });
    },
  },
};
</script>

<style   scoped>
.login {
  box-sizing: border-box;
  height: 100vh;
  background: rgb(17, 138, 114);
  
}
.login-container {
    border: 1px solid #fff;
    background: #fff;
    width: 450px;
    text-align: center;
    border-radius: 4px;
    position: fixed;
    top: 40%;
    transform: translate(-50%, -50%);
    left: 50%;
    padding: 50px;
    box-shadow: 3px 3px 13px rgb(95, 95, 95);
    
  }
  .title {
      font-size: 30px;
      font-weight: bold;
      color: rgb(26, 188, 156);
    }
    .password,
    .username,
    .login-btn {
      margin-top: 30px;
      position: relative;
    }
    .login-btn button{
        width: 120px;
        height: 40px;
        color: #fff;
        background: rgb(26, 188, 156);
        border: none;
        outline: none;
        cursor: pointer;
        width: 100%;
        letter-spacing: 10px;
        font-size: 14px;
    }
    input {
      border: 0;
      border-bottom: 1px solid rgb(197, 197, 197);
      outline: none;
      width: 100%;
      padding: 5px 30px;
      box-sizing: border-box;
    }
    input::-webkit-input-placeholder {
      color: #aab2bd;
      font-size: 14px;
    }
  .input-icon {
    position: absolute;
    top: 50%;
    transform: translate(0px, -50%);
  }
</style>
