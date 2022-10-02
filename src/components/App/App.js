import React, { Component } from 'react'
import { Button, Tabs } from 'antd'

import TabSearchedContent from '../Tabs/TabSearchedContent/TabSearchedContent'

import classes from './App.module.scss'

export default class App extends Component {
  state = {
    ratedIds: null,
    needUpdateRated: false,
    needUpdateSearched: false,
  }

  componentDidMount() {
    this.setState({ ratedIds: Object.entries(localStorage) })
  }

  changeTab(activeTab) {
    //activeTab - тот, на который переключились

    //!!  дать табам ручку изменения состояния needUpdate
    // в false после обновления ) (compUpdate() {})

    console.log('new active tab', activeTab)
    // let needUpdate = false
    let newEntries = Object.entries(localStorage)
    if (newEntries.length !== this.state.ratedIds.length) {
      if (Number(activeTab) === 1) this.setState({ needUpdateSearched: true })
      if (Number(activeTab) === 2) this.setState({ needUpdateRated: true })
      // return true
    } else {
      for (let i = 0; i < newEntries.length; i++) {
        if (
          newEntries[i][0] !== this.state.ratedIds[i][0] ||
          newEntries[i][1] !== this.state.ratedIds[i][1]
        ) {
          if (Number(activeTab) === 1)
            this.setState({ needUpdateSearched: true })
          if (Number(activeTab) === 2) {
            this.setState({ needUpdateRated: true })
          }
          break
        }
      }
    }
    this.setState({ ratedIds: Object.entries(localStorage) })

    // console.log('diff?', newEntries, this.state.ratedIds)
    // console.log('needUpdateRated ', needUpdate)
    // return needUpdate
  }

  hasUpdated(tabNum) {
    if (tabNum === 1 && this.state.needUpdateSearched) {
      this.setState({ needUpdateSearched: false })
    }
    if (tabNum === 2 && this.state.needUpdateRated) {
      this.setState({ needUpdateRated: false })
    }
    // this.setState({ ratedIds: Object.entries(localStorage) })
  }

  render() {
    const items = [
      {
        label: 'Search',
        key: '1',
        children: (
          <TabSearchedContent
            tabNum={1}
            needUpdate={this.state.needUpdateSearched}
            hasUpdated={(tabNum) => this.hasUpdated(tabNum)}
          />
        ),
      }, // remember to pass the key prop
      {
        label: 'Rated',
        key: '2',
        children: (
          <TabSearchedContent
            tabNum={2}
            needUpdate={this.state.needUpdateRated}
            hasUpdated={(tabNum) => this.hasUpdated(tabNum)}
          />
        ),
      },
    ]

    return (
      <>
        <div className={classes.container}>
          <Button onClick={() => console.log('state APP', this.state)}>
            Слово
          </Button>
          <Tabs
            onChange={(activeTab) => this.changeTab(activeTab)}
            items={items}
          />
        </div>
      </>
    )
  }
}
