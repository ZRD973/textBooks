<template>
  <div style="padding:20px;margin:20px;">

    <el-form :inline="true" :model="seacheForm" size="small">
      <el-form-item label="教材">
        <el-input v-model="seacheForm.book" clearable placeholder="请输入教材名称" size="small" />
      </el-form-item>
      <el-form-item label="书号">
        <el-input v-model="seacheForm.ISBN" clearable placeholder="请输入教材书号" size="small" />
      </el-form-item>
      <el-form-item label="出入库">
        <el-select v-model="seacheForm.apply"  clearable placeholder="请选择出库或者入库" size="small">
          <el-option label="出库" :value="4" />
          <el-option label="入库" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="refresh">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="bookTable" v-loading="tableLoading" size="small" style="width: 100%">
       <el-table-column type="index" label="序号" align="center" fixed="left" width="55"  />
      <el-table-column prop="class" align="center" label="年级专业班级" fixed="left" width="170" show-overflow-tooltip />
      <el-table-column prop="course" align="center" label="课程名称" fixed="left" width="120" show-overflow-tooltip />
      <el-table-column prop="book" align="center" label="教材名称" fixed="left" width="130" show-overflow-tooltip />
      <el-table-column prop="direction" align="center" label="方向" width="90" show-overflow-tooltip />
      <el-table-column prop="editor" align="center" label="主编" width="80" show-overflow-tooltip />
      <el-table-column prop="pubDate" align="center" label="出版时间" width="80" show-overflow-tooltip />
      <el-table-column prop="ISBN" align="center" label="书号" width="115" show-overflow-tooltip />
      <el-table-column prop="publisher" align="center" label="出版社" width="110" show-overflow-tooltip />
      <el-table-column prop="sdt_book_nums" align="center" label="学生用书" width="70" show-overflow-tooltip />
      <el-table-column prop="tch_book_nums" align="center" label="教师用书" width="70" show-overflow-tooltip />
      <el-table-column prop="standby_nums" align="center" label="备用书" width="60" show-overflow-tooltip />
      <el-table-column prop="book_total" align="center" label="教材总数" width="70" show-overflow-tooltip />
      <el-table-column prop="price" align="center" label="单价" width="60" show-overflow-tooltip />
      <el-table-column prop="total" align="center" label="总价" width="80" show-overflow-tooltip />
      <el-table-column prop="book_type" align="center" label="教材类型" show-overflow-tooltip />
      <el-table-column prop="book_usage" align="center" label="使用情况" show-overflow-tooltip />
      <el-table-column prop="teacher" align="center" label="征订教师" fixed="right" width="80" show-overflow-tooltip />
      <el-table-column prop="apply" align="center" label="记录" fixed="right" show-overflow-tooltip >
        <template #default="{row}">
            <el-tag :type=" row.apply == 3 ? 'success' : row.apply==4 ? 'primary': '' " size="large">
              {{row.apply==3?"入库":row.apply==4?"出库":""}}
            </el-tag>
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

  </div>
</template>
<script setup>
import { onMounted, reactive, ref} from 'vue';
import { operateRecord } from '@/api/book/operate';
import dayjs from 'dayjs';
onMounted(()=>{
  refresh();
})
const tableLoading = ref(false);
const refresh = () =>{
  tableLoading.value = true
  operateRecord({
    limit:pageSize.value,
    page:currentPage.value,
    book:seacheForm.book,
    ISBN:seacheForm.ISBN,
    apply:seacheForm.apply,
    record:true
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
const seacheForm = reactive({});

// 表格
const bookTable = ref([]);
const total = ref(0);

// 分页
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
