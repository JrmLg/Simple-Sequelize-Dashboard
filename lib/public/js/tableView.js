import { w2layout, w2grid } from './w2ui-2.0.es6.min.js'

const layout = new w2layout({
  layout: {
    name: 'layout',
    padding: 10,
    panels: [{ type: 'main', minSize: 550, overflow: 'hidden' }],
  },
})

// initialization
layout.render('#tableContainer')

async function loadRecords() {
  const resModeInfo = await fetch(window.location.href + '/modelInfo')
  const modelInfo = await resModeInfo.json()

  const resRecords = await fetch(window.location.href + '/api')
  const records = await resRecords.json()

  console.log(modelInfo, records)

  const grid = new w2grid({
    name: modelInfo.modelName,
    show: {
      lineNumbers: true,
    },
    columns: modelInfo.fieldsOrder.map((f) => {
      return { field: f, text: f }
    }),
    autoSize: true,
    records,
  })

  layout.html('main', grid)

  console.log(records)
}
loadRecords()
