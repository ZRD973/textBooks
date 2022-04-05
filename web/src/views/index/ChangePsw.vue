<template>
  <div class="change-psw">
    <el-form size="mini" ref="passForm" :model="passForm" :rules="rules" label-width="100px">
      <el-form-item label="原密码" prop="old_pass">
        <el-input v-model="passForm.old_pass" type="password"/>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="passForm.pass" type="password"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="check_pass">
        <el-input v-model="passForm.check_pass" type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('passForm')">确认</el-button>
        <el-button @click="resetForm('passForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { changePsw } from '@/api/login'
import { removeToken } from '@/utils/cookie'

export default {
  name: 'ChangePsw',
  components: {

  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passForm.check_pass !== '') {
          this.$refs.passForm.validateField('check_pass')
        }
        callback()
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passForm.check_pass !== '') {
          this.$refs.passForm.validateField('check_pass')
        }
        callback()
      }
    }
    return {
      passForm: {
        pass: '',
        check_pass: '',
        old_pass: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        check_pass: [
          { validator: validateCheckPass, trigger: 'blur' }
        ],
        old_pass: [
          { validator: validateOldPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          changePsw(this.passForm).then(res => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '修改密码成功,重新登录!',
                duration: 5000
              })
              removeToken()
              this.$router.push('/')
            } else {
              this.$message.error(res.data)
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style  scoped>
.change-psw {
  padding: 20px;
  
}
.change-psw .el-input {
    width: 300px;
  }
</style>
