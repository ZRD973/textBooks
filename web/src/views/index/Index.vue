<template>
  <div class="head-centent">
    <el-avatar style="margin-right: 10px" :size="56"
      src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    ></el-avatar>
    <div class="head-centent-text">
      <h3>{{ $store.state.user.name }}，欢迎登录系统！！</h3>
      <h6>祝你新的一天工作愉快</h6>
    </div>
    <div id="echart"></div>
  </div>
  <div style="margin-bottom: 50px;"></div>

  <div v-if="userInfo.sys_roles[0].code == 'teacher'">
    <h4>您教的课程如下：</h4>
    <el-button type="primary" size="small"  @click="addDialog=true">添加课程</el-button>
    <el-table :data="userInfo.results" style="width: 70%">
      <el-table-column type="index" label="序号" align="center" />
      <el-table-column prop="course" align="center" label="课程"  />
      <el-table-column prop="grade_major_class" label="年级专业班级" align="center"  />
      <el-table-column prop="direction" label="方向" align="center" />
      <el-table-column prop="nums" label="班级人数" align="center" />
      <el-table-column fixed="right" label="操作" align="center" width="250">
      <template #default="{row}">
        <el-button type="danger" size="small" @click="handleDelete(row)">删除课程</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="addDialog" title="添加课程信息" width="30%">
    <el-form :model="addForm" label-width="50px">
      <el-form-item label="课程" >
        <!-- <el-select v-model="addForm.course_id"  placeholder="请选择课程" size="large">
          <el-option v-for="item in courseTemp" :key="item.value" :label="item.label" :value="item.value" />
        </el-select> -->
        <el-select v-model="addForm.course_id" filterable remote clearable reserve-keyword
          placeholder="请选择课程" :remote-method="remoteCourseMethod" :loading="loading" >
          <el-option
            v-for="item in courseTemp"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="班级" >
        <!-- <el-select v-model="addForm.class_id"  placeholder="请选择课程" size="large">
          <el-option v-for="item in classTemp" :key="item.value" :label="item.label" :value="item.value" />
        </el-select> -->
        <el-select v-model="addForm.class_id" filterable remote clearable reserve-keyword
          placeholder="请选择班级" :remote-method="remoteClassMethod" :loading="loading" >
          <el-option
            v-for="item in classTemp"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onAddCourse">确定</el-button>
      </span>
    </template>
  </el-dialog>
    
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { operateClass,teacherOperateCourse } from '@/api/education/operate';
import { getCurUserInfo } from '@/api/login';
import { ElMessage, ElMessageBox } from "element-plus";
import store from '@/store'

const courseTemp = ref([]);
const classTemp = ref([]);
const queryCourse = () =>{
  teacherOperateCourse().then(res=>{
    let courseArr = res.data.rows;
    courseTemp.value = courseArr.map((item)=>{
      return {
        value:item.id,
        label:item.course
      }
    })
  })
}
const loading = ref(false);
const remoteCourseMethod = (query) =>{
  if(query){
    loading.value = true;
    teacherOperateCourse({course:query}).then(res=>{
      loading.value = false;
      let courseArr = res.data.rows;
      courseTemp.value = courseArr.map((item)=>{
        return {
          value:item.id,
          label:item.course
        }
      })
    })
  }else{
    courseTemp.value = []
  }
}

const queryClass = () =>{
  operateClass().then(res=>{
    let classArr = res.data.rows;
    classTemp.value = classArr.map((item)=>{
      return {
        value:item.id,
        label:item.grade_major_class
      }
    })
  })
}
const remoteClassMethod = (query) =>{
  if(query){
    loading.value = true;
    operateClass({class:query}).then(res=>{
      loading.value = false;
      let classArr = res.data.rows;
      classTemp.value = classArr.map((item)=>{
        return {
          value:item.id,
          label:item.grade_major_class
        }
      })
    })
  }else{
    classTemp.value = []
  }
}

const userInfo = ref({
  id:"",
  name:"",
  results:[],
  sys_roles:[{code:""}],
});


const addDialog = ref(false);
const addForm = reactive({
  course_id:'',
  class_id:'',
  teacher_id:''
})

const onAddCourse = () =>{
  addForm.teacher_id = userInfo.value.id;
  teacherOperateCourse({data:addForm,flag:1}).then(res=>{
    if(res.data.same){
      ElMessage({type:'warning',message:res.data.msg})
    }else{
      ElMessage({type:'success',message:'添加成功！'})
      onCancel();
      getCurUserInfo().then(res => {
        userInfo.value = res.data;
        localStorage.setItem('user',JSON.stringify(res.data));
        store.commit('setUserInfo', res.data)
      })
    }
  })
}
const onCancel = () =>{
  addDialog.value = false;
  addForm.course_id = ''
  addForm.class_id = ''
}
const handleDelete = (row) =>{
  ElMessageBox.confirm(
    '您确定要删除该课程吗？三思哦',
    '请您注意该操作',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
      let data = { teacher_id:row.teacher_id, course_id:row.course_id, class_id:row.class_id }
      teacherOperateCourse({data,flag:2}).then(res=>{
        if(res.success){
          ElMessage({type:'success',message:'删除成功！'})
          getCurUserInfo().then(res => {
            userInfo.value = res.data;
            localStorage.setItem('user',JSON.stringify(res.data));
            store.commit('setUserInfo', res.data)
          })
        }else{
          ElMessage({type:'danger',message:'删除失败！'})
        }
      })
    })
    .catch(() => {
      ElMessage({ type: 'info', message: '取消删除', })
    })
  
}



const echarts = require("echarts");
let option = {
    title: {
      text: "班级人数",
      left: "center"
    },
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "vertical",
      left: "left"
    },
    series: [
      {
        type: "pie",
        radius: "50%",
        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };

const myEcharts = () => {
  let myChart = echarts.init(document.getElementById("echart"));
  myChart.setOption(option);
  window.onresize = function() {
    myChart.resize();
  };
};


onMounted(() => { 
  queryClass();
  queryCourse();
  getCurUserInfo().then(res => {
    userInfo.value = res.data;
    if(userInfo.value.sys_roles[0].code=="teacher"){
      option.series[0].data = userInfo.value.results.map((item)=>{
        return { value:item.nums,name:item.grade_major_class}
      })
      myEcharts();
    }
  })
});
</script>

<style scoped>
#echart{
  width: 40%;
  height: 250px;
  position: absolute;
  top: 150px;
  right: 0;
}
.head-centent {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.head-centent-text {
  height: 56px;
}
.head-centent-text p:nth-child(1) {
  margin-bottom: 7px;
  font-size: 20px;
  color: #292929;
  letter-spacing: 0.1em;
}
.head-centent-text p:nth-child(2) {
  font-size: 12px;
  color: #999999;
  letter-spacing: 0.1em;
}
</style>
