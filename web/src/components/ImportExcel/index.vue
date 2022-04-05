<template>
  <span :class="[rootClass]">
    <input
      class="input-file"
      type="file"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      @change="exportData"
    >
    <el-button type="primary" size="mini" @click="btnClick">{{ title }}</el-button>
  </span>
</template>

<script>
import XLSX from 'xlsx'

export default {
  name: 'InputExcel',
  props: {
    rootClass: {
      type: String
    }
  },
  data () {
    return {
      title: '导入'
    }
  },
  methods: {
    btnClick () {
      const obj = document.querySelector('.input-file')
      obj.value = ''
      obj.click()
    },
    exportData (event) {
      if (!event.currentTarget.files.length) {
        return
      }
      const that = this
      // 拿取文件对象
      const f = event.currentTarget.files[0]
      // 这里已经拿到了excel的file文件，若是项目需求，可直接$emit丢出文件
      that.$emit('getMyExcelData', f)
      // 用FileReader来读取
      const reader = new FileReader()
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function (f) {
        let binary = ''
        let wb // 读取完成的数据
        let outdata // 你需要的数据
        const reader = new FileReader()
        reader.onload = function (e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          const bytes = new Uint8Array(reader.result)
          const length = bytes.byteLength
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          // 接下来就是xlsx
          wb = XLSX.read(binary, {
            type: 'binary'
          })
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          // 导出格式为json，{表头：[]，表数据：[]}
          that.$emit('getResult', outdata)
        }
        reader.readAsArrayBuffer(f)
      }
      reader.readAsBinaryString(f)
    }
  }
}
</script>

<style scoped>
  .input-file {
    display: none;
  }
</style>
