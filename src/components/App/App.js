import React, { Component } from 'react'
import { Tabs } from 'antd'

import TabSearchedContent from '../Tabs/TabSearchedContent/TabSearchedContent'
import TabRatedContent from '../Tabs/TabRatedContent/TabRatedContent'

import classes from './App.module.scss'

export default class App extends Component {
  render() {
    const items = [
      {
        label: 'Search',
        key: 'item-1',
        children: <TabSearchedContent tabNum={1} />,
      }, // remember to pass the key prop
      {
        label: 'Rated',
        key: 'item-2',
        children: <TabRatedContent tabNum={2} />,
      },
    ]

    // const films = ['first Movie', 'second Movie', 'third Movie']
    return (
      <>
        <div className={classes.container}>
          <Tabs items={items} />
        </div>
      </>
    )
  }
}
