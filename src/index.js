import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/antd.css'

import App from './components/App/App'
export const RateContext = React.createContext()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <RateContext.Provider value={'Reed'}>
    <App />
  </RateContext.Provider>
)
