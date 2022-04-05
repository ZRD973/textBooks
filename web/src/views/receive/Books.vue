<template>
  <div style="padding:10px;margin:10px;">


      <el-steps :active="active" finish-status="success" simple style="margin-bottom:20px;">
        <el-step title="选择班级" />
        <el-step title="选择课程" />
        <el-step title="领取教材" />
        <el-step title="打印" />
      </el-steps>

      <el-form :inline="true" :model="seacheForm" size="large">
          <el-form-item label="班级" prop="class"  v-if="classOptions.length">
            <!-- <el-select v-model="seacheForm.class"  placeholder="请选择班级" size="large">
              <el-option v-for="item in classOptions" :key="item.id" :label="item.cla" :value="item.cla"  />
            </el-select> -->
            <el-select v-model="seacheForm.class" filterable size="large"
                remote clearable reserve-keyword placeholder="请选择班级"
                :remote-method="remoteMethod" :loading="loading" >
                <el-option v-for="item in classOptions" :key="item.id" 
                  :label="item.grade_major_class"
                  :value="item.grade_major_class"
                  @click="chooseClass(item)" />
            </el-select>
          </el-form-item>
          <el-form-item label="课程" v-if="courseOptions.length">
            <!-- <el-input  clearable placeholder="请选择课程" size="small" /> -->
            <el-select v-model="seacheForm.course" @change="chooseBook"  placeholder="请选择课程" size="large">
              <el-option v-for="item in courseOptions" :key="item.id" :label="item.course" :value="item.id"  />
            </el-select>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" size="large" @click="printTableMethod">打印</el-button>
            </el-form-item>
    </el-form>


       <el-table v-if="bookTable.length" :data="bookTable" style="width: 100%;margin-bottom: 50px;" >
        <el-table-column type="index" label="序号" align="center" fixed="left" width="55"  />
        <el-table-column prop="book" align="center" label="教材名称" fixed="left" width="200" show-overflow-tooltip />
        <el-table-column prop="editor" align="center" label="主编" show-overflow-tooltip />
        <el-table-column prop="pubDate" align="center" label="出版时间" show-overflow-tooltip />
        <el-table-column prop="ISBN" align="center" label="书号"  show-overflow-tooltip />
        <el-table-column prop="publisher" align="center" label="出版社" show-overflow-tooltip />
        <el-table-column prop="book_type" align="center" label="教材类型" show-overflow-tooltip />
        <el-table-column prop="book_usage" align="center" label="使用情况" show-overflow-tooltip />
        <el-table-column prop="price" align="center" label="单价"  show-overflow-tooltip />
        <el-table-column prop="book_total" align="center" label="教材库存" fixed="right" show-overflow-tooltip />
        <el-table-column fixed="right" label="操作" align="center" width="120">
          <template #default="{row}">
            <el-button type="primary" size="large" @click="handleReceive(row)">领取</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog v-model="receiveDialog" title="领取教材" width="55%">
        <el-form :model="applyDetail" :inline="true"   ref="ruleFormRef"  label-width="120px">
          <el-form-item label="征订班级">
            <el-input v-model="applyDetail.class" disabled placeholder="征订班级" /> 
          </el-form-item>
          <el-form-item label="专业方向">
            <el-input v-model="applyDetail.direction" disabled placeholder="专业方向" /> 
          </el-form-item>
          <el-form-item label="学生用书">
            <el-input v-model.number="applyDetail.sdt_book_nums" placeholder="请输入学生用书数量" /> 
          </el-form-item>
          <el-form-item label="教师用书">
            <el-input v-model.number="applyDetail.tch_book_nums" placeholder="请输入教师用书数量" /> 
          </el-form-item>
            <el-form-item label="剩余库存" >
              <el-input v-model.number="bookStore" disabled  placeholder="库存" /> 
            </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="receiveDialog=false">取消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
          </span>
        </template>
    </el-dialog>


    <div id="printTable" v-if="printTable.length">
      <table  class="gridtable" border="1" cellspacing="0">
        <tr>
          <th>班级</th>
          <th>教材</th>
          <th>领取时间</th>
          <th>领取数量</th>
          <th>备注</th>
        </tr>
        <tr v-for="item in printTable">
          <td>{{item.class}}</td>
          <td>{{item.book}}</td>
          <td>{{item.created_at}}</td>
          <td>{{item.sdt_book_nums+item.tch_book_nums}}</td>
          <td>{{item.memo}}</td>
        </tr>
      </table>

		  <p class="signature">签名：__________________</p>
	</div>

  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { operateClass ,getClassCourse, getCourseBook, getRecordDetail } from '@/api/education/operate';
import { operateStore } from '@/api/book/operate';
import { ElMessage } from 'element-plus';
import dayjs from 'dayjs';
import printJS from "print-js";
onMounted(()=>{
  getClass()
})
const active = ref(0);
const seacheForm = reactive({});
const classOptions = ref([]);
const getClass = () =>{
  operateClass().then(res=>{
    classOptions.value = res.data.rows;
  })
}
watch(() => seacheForm.class, (cla) => {
    if(!cla){
      active.value = 0
      courseOptions.value = [];
    }
})
const loading = ref(false);
const remoteMethod = (query) => {
  if (query) {
    loading.value = true;
    operateClass({ class:query }).then(res=>{
      loading.value = false
      classOptions.value = res.data.rows;
      if(classOptions.value.length == 0){
        classOptions.value = [{id:0,class:"没有该班级"}];
      }
    })
  } else {
    classOptions.value = [{id:0,class:"请输入班级"}];
  }
}
const courseOptions = ref([]);
const chooseClass = (item) =>{
  active.value = 1
  printTable.value = [];
  bookTable.value=[]
  getClassCourse({class_id:item.id}).then(res=>{
    seacheForm.course = "";
    if(res.success){
        courseOptions.value = res.data;
        if(res.data.length == 0){
          active.value = 0
          ElMessage({type:'warning',message:'该班级没有添加相应课程，占时还没有可领取的教材！'})
          bookTable.value=[]
        }else if(res.data.length == 1){
          seacheForm.course = res.data[0].id;
          active.value = 2
          queryCourseBook(res.data[0].id)
        }
    }
  })
}
const chooseBook = (book_id) =>{
  queryCourseBook(book_id);
}
const bookTable = ref([]);
const queryCourseBook = (id) =>{
  
  getCourseBook({course_id:id}).then(res=>{
    if(res.data.length==0){
      ElMessage({type:'warning',message:'该课程占时还没有可领取的教材！'})
      bookTable.value=[]
    }else{
      active.value = 2
      bookTable.value = res.data;
      totalTemp = bookTable.value[0].book_total;
      bookTable.value.forEach((item)=>{
        item.pubDate ? item.pubDate = dayjs(item.birth).format('YYYY-MM') : ''
      })
    }
  })
}
const printTable = ref([]);
const applyDetail = ref({});
const receiveDialog = ref(false);
const handleReceive = (row) =>{
  receiveDialog.value = true;
  getRecordDetail({record_id:row.record_id}).then(res=>{
    applyDetail.value = res.data[0];
    applyDetail.value.updated_at = dayjs(new Date()).format('YYYY-MM-DD');
    applyDetail.value.created_at = dayjs(new Date()).format('YYYY-MM-DD');
    
  })
}
let totalTemp;
const bookStore = computed(()=>{
  let total = totalTemp - applyDetail.value.sdt_book_nums - applyDetail.value.tch_book_nums;
 return total;
});


const onSubmit = () =>{
  if(bookStore.value <0){
     ElMessage({type:'warning',message:'库存不足,请重新输入数量或去征订教材！'});
     return
  }
  printTable.value.push(applyDetail.value);
  applyDetail.value.book_total = bookStore.value;
  bookTable.value[0].book_total = bookStore.value;
  receiveDialog.value = false;
  active.value = 3
  operateStore({ 
    data:bookTable.value[0],
    record:applyDetail.value,
    flag:3
  }).then(res=>{
      if(res.success){
          ElMessage({type:'success',message:'领取成功！'});
          // bookTable.value = []
          bookTable.value = []
    }else{
      ElMessage({type:'danger',message:'领取失败，联系管理员！'});
    }
  })
}


const printTableMethod = () =>{
  if(!printTable.value.length){
    ElMessage({type:'warning',message:'没有领取记录，无法打印！'});
    return
  }
    active.value = 4
		printJS({
			printable: "printTable",
			type: "html",
			header: "教材领取",
			headerStyle:"text-align: center;",
			// targetStyles: ["*"],
			style: "@page {margin:0 10mm}" + `
				table.gridtable {
					width: 100%;
					font-family: verdana, arial, sans-serif;
					font-size: 11px;
					color: #333333;
					border-width: 1px;
					border-color: #666666;
					border-collapse: collapse;
				}
				table.gridtable th {
					border-width: 1px;
					padding: 8px;
					border-style: solid;
					border-color: #666666;
					background-color: #dedede;
				}
				table.gridtable td {
					text-align: center;
					border-width: 1px;
					padding: 8px;
					border-style: solid;
					border-color: #666666;
					background-color: #ffffff;
				}
				#printTable .signature{
					float: right;
					margin-top: 50px;
				}`,
		});
  }

</script>
<style>

#printTable{
	position: relative;
	/* left: 10000px; */
}
table.gridtable {
  width: 100%;
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #666666;
  border-collapse: collapse;
}
table.gridtable th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #666666;
  background-color: #dedede;
}
table.gridtable td {
  text-align: center;
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #666666;
  background-color: #ffffff;
}
#printTable .signature{
	float: right;
	margin-top: 50px;
}
</style>
