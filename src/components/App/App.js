import React, { Component } from 'react'
import { Spin, Tabs } from 'antd'

import TabContent from '../TabContent/TabContent'
import TmdbApi from '../../services/TmdbApi'
import { GenresContext } from '../GenresContext/GenresContext'

import classes from './App.module.scss'
export default class App extends Component {
  state = {
    ratedIds: null,
    needUpdateRated: false,
    needUpdateSearched: false,
    genresList: null,
  }

  tmdbApi = new TmdbApi()
  componentDidMount() {
    this.setState({ ratedIds: Object.entries(localStorage) })
    this.tmdbApi.getGenres().then((data) => {
      this.setState({ genresList: data })
    })
  }

  changeTab(activeTab) {
    //activeTab - тот, на который переключились

    let newEntries = Object.entries(localStorage)
    if (newEntries.length !== this.state.ratedIds.length) {
      if (Number(activeTab) === 1) {
        this.setState((prevState) => {
          return {
            needUpdateSearched: !prevState.needUpdateSearched,
          }
        })
      }
      if (Number(activeTab) === 2) {
        this.setState((prevState) => {
          return {
            needUpdateRated: !prevState.needUpdateRated,
          }
        })
      }
    } else {
      for (let i = 0; i < newEntries.length; i++) {
        if (
          newEntries[i][0] !== this.state.ratedIds[i][0] ||
          newEntries[i][1] !== this.state.ratedIds[i][1]
        ) {
          if (Number(activeTab) === 1) {
            this.setState((prevState) => {
              return {
                needUpdateSearched: !prevState.needUpdateSearched,
              }
            })
          }

          if (Number(activeTab) === 2) {
            this.setState((prevState) => {
              return {
                needUpdateRated: !prevState.needUpdateRated,
              }
            })
          }
          break
        }
      }
    }
    this.setState({ ratedIds: Object.entries(localStorage) })
  }

  render() {
    const items = [
      {
        label: 'Search',
        key: '1',
        children: (
          <TabContent tabNum={1} needUpdate={this.state.needUpdateSearched} />
        ),
      }, // remember to pass the key prop
      {
        label: 'Rated',
        key: '2',
        children: (
          <TabContent tabNum={2} needUpdate={this.state.needUpdateRated} />
        ),
      },
    ]
    const spinStyle = {
      height: '100vh',
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
    }

    return (
      <>
        <GenresContext.Provider value={this.state.genresList}>
          <div className={classes.container}>
            {!this.state.genresList ? (
              <Spin size="large" style={spinStyle}></Spin>
            ) : (
              <>
                <Tabs
                  onChange={(activeTab) => this.changeTab(activeTab)}
                  items={items}
                />
              </>
            )}
          </div>
        </GenresContext.Provider>
      </>
    )
  }
}
