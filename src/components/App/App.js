import React from 'react'
import { Tabs, Input, Pagination } from 'antd'
import '../../assets/styles/global.css'

import Card from '../Card/Card'

const App = () => {
  const items = [
    { label: 'Tab 1', key: 'item-1', children: 'Content 1' }, // remember to pass the key prop
    { label: 'Tab 2', key: 'item-2', children: 'Content 2' },
  ]
  const films = ['first Movie', 'second Movie', 'third Movie']
  return (
    <>
      <Tabs items={items} />
      <Input placeholder="Basic usage" />
      <ul>
        {films.map((el) => {
          return <Card title={el} key={el}></Card>
        })}
      </ul>
      <Pagination size="small" total={50} />
    </>
  )
}

export default App
