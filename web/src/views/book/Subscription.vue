<template>
  <div style="padding:20px;margin:20px;">

    <el-form :inline="true" :model="seacheForm" size="small">
      <el-form-item label="教材">
        <el-input v-model="seacheForm.book" clearable placeholder="请输入教材名" size="small" />
      </el-form-item>
      <el-form-item label="任课教师">
        <el-input v-model="seacheForm.teacher" clearable placeholder="请输入任课教师" size="small" />
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="seacheForm.apply"  clearable placeholder="请选择订单状态" size="small">
          <el-option label="审核中" :value="1" />
          <el-option label="已通过" :value="3" />
          <el-option label="已退回" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="refresh">搜索</el-button>
        <el-button type="primary" size="small" @click="onAddCourse">教材征订</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="bookTable" size="small" v-loading="tableLoading" style="width: 100%">
      <el-table-column type="index" label="序号" align="center" fixed="left" width="55"  />
      <el-table-column prop="book" align="center" label="教材名称" fixed="left" width="130" show-overflow-tooltip />
      <el-table-column prop="class" align="center" label="年级专业班级" fixed="left" width="170" show-overflow-tooltip />
      <el-table-column prop="course" align="center" label="课程名称" fixed="left" width="120" show-overflow-tooltip />
      <el-table-column prop="direction" align="center" label="方向" width="90" show-overflow-tooltip />
      <el-table-column prop="editor" align="center" label="主编" width="80" show-overflow-tooltip />
      <el-table-column prop="pubDate" align="center" label="出版时间" width="80" show-overflow-tooltip />
      <el-table-column prop="ISBN" align="center" label="书号" width="115" show-overflow-tooltip />
      <el-table-column prop="publisher" align="center" label="出版社" width="110" show-overflow-tooltip />
      <el-table-column prop="sdt_book_nums" align="center" label="学生用书" width="70" show-overflow-tooltip />
      <el-table-column prop="tch_book_nums" align="center" label="教师用书" width="70" show-overflow-tooltip />
      <el-table-column prop="standby_nums" align="center" label="备用书" width="60" show-overflow-tooltip />
      <el-table-column prop="book_total" align="center" label="教材总数" width="70" fixed="right" show-overflow-tooltip />
      <el-table-column prop="price" align="center" label="单价" width="60"  show-overflow-tooltip />
      <el-table-column prop="total" align="center" label="总价" width="80" fixed="right" show-overflow-tooltip />
      <el-table-column prop="book_type" align="center" label="教材类型" show-overflow-tooltip />
      <el-table-column prop="book_usage" align="center" label="使用情况" show-overflow-tooltip ></el-table-column>
      <el-table-column prop="teacher" align="center" label="任课教师" fixed="right" width="80" show-overflow-tooltip />
      <el-table-column fixed="right" label="征订状态" align="center" width="90">
        <template #default="{row}">
          <div v-if="userInfo.sys_roles[0].code == 'admin' ">
              <el-tag v-if="row.apply==1" :type=" row.apply==1 ? 'warning' : row.apply==2 ? 'danger': 'success' " size="small" style="cursor: pointer;" @click="handleApply(row)">
              {{row.apply==1?"审核中":row.apply==2?"审核不通过":"已通过"}}
            </el-tag>
            <el-tag v-else :type=" row.apply==1 ? 'warning' : row.apply==2 ? 'danger': 'success' " size="small" style="cursor: not-allowed;">
              {{row.apply==1?"审核中":row.apply==2?"审核不通过":"已通过"}}
            </el-tag>
          </div>
          <div v-else>
            <el-tag :type=" row.apply==1 ? 'warning' : row.apply==2 ? 'danger': 'success' " size="small" style="cursor: not-allowed;">
              {{row.apply==1?"审核中":row.apply==2?"审核不通过":"已通过"}}
            </el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[8, 20, 30, 50]"
        :background="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div> 

    <!-- 添加表单 -->
    <el-dialog v-model="Dialog" title="征订教材" width="55%">
      <el-form :model="form" :inline="true"  :rules="rules" ref="ruleFormRef"  label-width="120px">
        <el-form-item label="任课教师">
          <el-input v-model="form.teacher" disabled placeholder="任课教师" /> 
        </el-form-item>
        <el-form-item label="课程名称" prop="course">
          <el-select v-model="form.course"  placeholder="请选择课程" size="large">
            <el-option v-for="item in userInfo.courses" :key="item.id" :label="item.course" :value="item.course" @click="chooseCourse(item.id)" />
          </el-select>
        </el-form-item>
        <el-form-item label="征订班级">
          <el-input v-model="form.class" disabled placeholder="征订班级" /> 
        </el-form-item>
        <el-form-item label="专业方向">
          <el-input v-model="form.direction" disabled placeholder="专业方向" /> 
        </el-form-item>
        <el-form-item label="学生用书" prop="sdt_book_nums">
          <el-input v-model.number="form.sdt_book_nums" placeholder="请输入学生用书数量" /> 
        </el-form-item>
        <el-form-item label="学生备用" prop="standby_nums">
          <el-input v-model.number="form.standby_nums" placeholder="请输入学生备用书数量" /> 
        </el-form-item>
        <el-form-item label="教师用书" prop="tch_book_nums">
          <el-input v-model.number="form.tch_book_nums" placeholder="请输入教师用书数量" /> 
        </el-form-item>
        <el-form-item label="教材单价" prop="price">
          <el-input v-model.number="form.price" placeholder="请输入教材单价(单位：元)" /> 
        </el-form-item>
        <el-form-item label="教材总价">
          <el-input v-model.number="bookTotal" disabled placeholder="教材总价" /> 
        </el-form-item>
        <el-form-item label="教材名称" prop="book">
          <el-input v-model="form.book" placeholder="请输入教材名称" /> 
        </el-form-item>
        <el-form-item label="教材主编" prop="editor">
          <el-input v-model="form.editor" placeholder="请输入教材主编" /> 
        </el-form-item>
        <el-form-item label="出版时间" prop="pubDate">
          <el-date-picker v-model="form.pubDate" type="date" placeholder="请输入教材出版时间" />
        </el-form-item>
        <el-form-item label="教材书号" prop="ISBN">
          <el-input v-model="form.ISBN" placeholder="请输入教材书号" /> 
        </el-form-item>
        <el-form-item label="教材出版社" prop="publisher">
          <el-input v-model="form.publisher" placeholder="请输入教材出版社" /> 
        </el-form-item>
        <el-form-item label="教材类型" prop="book_type">
          <el-input v-model="form.book_type" placeholder="请输入教材类型" /> 
        </el-form-item>
        <el-form-item label="教材使用情况" prop="book_usage">
          <el-select v-model="form.book_usage"  placeholder="请选择教材使用情况">
            <el-option label="选用" value="选用" />
            <el-option label="不选用" value="不选用" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel(ruleFormRef)">取消</el-button>
          <el-button type="primary" @click="onSubmit(ruleFormRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ElMessage,ElMessageBox } from 'element-plus';
import { computed, onMounted, ref,unref, reactive } from 'vue';
import { queryTeacherCourseClass} from '@/api/education/operate';
import { operateRecord } from '@/api/book/operate';
import dayjs from 'dayjs';
onMounted(()=>{
  refresh();
})

const userInfo = ref(JSON.parse(localStorage.getItem("user")));
const tableLoading = ref(false);
const refresh = () =>{
  tableLoading.value = true
  operateRecord({
    limit:pageSize.value,
    page:currentPage.value,
    book:seacheForm.value.book,
    teacher:seacheForm.value.teacher,
    apply:seacheForm.value.apply,
    role:userInfo.value.sys_roles[0].code
  }).then(res=>{
    bookTable.value = res.data.rows;
    total.value = res.data.count;
    bookTable.value.forEach((item)=>{
      item.pubDate ? item.pubDate = dayjs(item.birth).format('YYYY-MM') : ''
    })
    tableLoading.value = false
  })
}

// 搜索表单
const seacheForm = ref({})

// 表格
const bookTable = ref([]);
const total = ref(0);
const handleApply = (row) =>{
  ElMessageBox.confirm(
    '审批教材订单，<span style="color:#67C28A">通过</span>将加入教材库，<span style="color:#F56C6C">拒绝</span>将退回申请！',
    '三思而后行',
    {
      confirmButtonText: '通过',
      cancelButtonText: '拒绝',
      type: 'warning',
      distinguishCancelAndClose: true,
      dangerouslyUseHTMLString: true,
      center: true,
    }
  ).then(() => {
      let data = { apply:3, id:row.id, store_id:row.store_id };
      operateRecord({data,flag:3}).then(res=>{
        if(res.success){
          ElMessage({type:'success',message:'审核成功！'})
          refresh()
        }else{
          ElMessage({type:'danger',message:'审核失败！'})
        }
      })
    })
    .catch((action) => {
      if(action === 'close') return
      let data = { apply:2, id:row.id, store_id:row.store_id };
      operateRecord({data,flag:3}).then(res=>{
        if(res.success){
          ElMessage({type:'success',message:'退回成功！'})
          refresh();
        }else{
          ElMessage({type:'danger',message:'退回失败！'})
        }
      })
    })

}



// 选择课程对应的班级
const chooseCourse = (course_id) =>{
  form.course_id = course_id;
  queryTeacherCourseClass({
    teacher_id:userInfo.value.id,
    course_id
  }).then(res=>{
    let classT = [];
    form.class = [];
    form.sdt_book_nums = 0;
    res.data.forEach((item)=>{
      form.sdt_book_nums += item.nums; 
      classT.push(item.grade_major_class)
      form.class = classT.join(',');
      form.direction = item.direction;
    })
  })
}


const bookTotal = computed(()=>{
  let nums = parseInt(form.standby_nums) + parseInt(form.sdt_book_nums) + parseInt(form.tch_book_nums)
  form.book_total = nums
  return nums * parseInt(form.price)
})


const form = reactive({
  course:"",
  course_id:"",
  class:"",
  direction:"",
  book:"",
  editor:"",
  pubDate:"",
  ISBN:"",
  publisher:"",
  standby_nums:2,
  sdt_book_nums:0,
  tch_book_nums:1,
  price:"",
  total:0,
  teacher:userInfo.value.name,
  book_type:"",
  book_usage:"",
  book_total:0,
});

const rules = reactive({
  course: [
    { required: true, message: '请选择征订教材的课程', trigger: 'blur' },
  ],
  sdt_book_nums: [
    { required: true,  message: '请填写学生用书数量', trigger: 'blur' },
    { type: 'number', message: '必须是阿拉伯数字', trigger: 'blur' },
  ],
  standby_nums: [
    { required: true, message: '请填写学生备用书数量', trigger: 'blur' },
    { type: 'number', message: '必须是阿拉伯数字', trigger: 'blur' },
  ],
  tch_book_nums: [
    { required: true,  message: '请填写教师用书数量', trigger: 'blur' },
    { type: 'number', message: '必须是阿拉伯数字', trigger: 'blur' },
  ],
  price: [
    { required: true, message: '请填写教材单价', trigger: 'blur' },
    { type: 'number', message: '必须是阿拉伯数字', trigger: 'blur' },
  ],
  book: [
    { required: true, message: '请填写教材名称', trigger: 'blur' },
  ],
  editor: [
    { required: true, message: '请填写教材主编', trigger: 'blur' },
  ],
  pubDate: [
    { required: true, type: 'date', message: '请填写教材出版时间', trigger: 'blur' },
  ],
  ISBN: [
    { required: true, message: '请填写教材书号', trigger: 'blur' },
  ],
  publisher: [
    { required: true, message: '请填写教材出版社', trigger: 'blur' },
  ],
  book_type: [
    { required: true, message: '请填写教材类型', trigger: 'blur' },
  ],
  book_usage: [
    { required: true, message: '请填写使用情况', trigger: 'blur' },
  ],
})


const Dialog = ref(false);
const onAddCourse = () =>{
  Dialog.value = true;
}
const ruleFormRef = ref();
const onSubmit = async (formEl) =>{
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      form.total = bookTotal.value;
      operateRecord({
        data:form,
        flag:1
      }).then(res=>{
        if(res.success){
          ElMessage({type:'success',message:'添加成功！'})
          onCancel();
          refresh();
        }else{
          ElMessage({type:'danger',message:'添加失败！'})
        }
      })
    } else {
      console.log('error submit!')
    }
  })
}
const onCancel = (formEl) =>{
  Dialog.value = false;
  if (!formEl) return
  formEl.resetFields()
}

const currentPage = ref(1);
const pageSize = ref(8);
const handleSizeChange = (val) => {
  pageSize.value = val;
  refresh();
}
const handleCurrentChange = (val) => {
  currentPage.value = val;
  refresh();
}

</script>

<style>
</style>
