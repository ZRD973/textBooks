export function export2Excel (columns, list, filename) {
  require.ensure([], () => {
    const { export_json_to_excel } = require('../excel/Export2Excel')
    const tHeader = []
    const filterVal = []
    if (!columns) {
      return
    }
    columns.forEach(item => {
      tHeader.push(item.title)
      filterVal.push(item.key)
    })
    const data = list.map(v => filterVal.map(j => v[j]))
    export_json_to_excel(tHeader, data, filename)
  })
}
