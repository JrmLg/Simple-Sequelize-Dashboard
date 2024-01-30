import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import HomePage from './containers/homePage'
import reportWebVitals from './reportWebVitals'

// async function loadRecords() {
//   const resModeInfo = await fetch(window.location.href + '/modelInfo')
//   const modelInfo = await resModeInfo.json()
//
//   const resRecords = await fetch(window.location.href + '/api')
//   const records = await resRecords.json()
//
//   console.log(modelInfo, records)
//   console.log(records)
// }
//
// loadRecords()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
