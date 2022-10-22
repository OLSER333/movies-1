import React, { Component } from 'react'
import { Spin, Tabs } from 'antd'

import TabContent from '../TabContent/TabContent'
import TmdbApi from '../../services/TmdbApi'
import { GenresContext } from '../GenresContext/GenresContext'

import classes from './App.module.scss'
export default class App extends Component {
  state = {
    shouldUpdateRated: false,
    shouldUpdateSearched: false,
    genresList: null,
    updaterSearch: false,
    updaterRated: false,
  }

  tmdbApi = new TmdbApi()
  componentDidMount() {
    console.log('help')
    if (!localStorage.getItem('tmdb_guest_session_id')) {
      this.tmdbApi.getGuestSessionId().then((data) => {
        localStorage.setItem('tmdb_guest_session_id', data.guest_session_id)
      })
    }

    // this.setState({ ratedIds: Object.entries(localStorage) })
    this.tmdbApi.getGenres().then((data) => {
      this.setState({ genresList: data })
    })
  }

  changeTabTo(newActiveTab) {
    console.log('changeTO', newActiveTab)
    if (newActiveTab === 1) {
      if (this.state.shouldUpdateSearched !== this.state.updaterSearch) {
        this.setState((prevState) => {
          return {
            ...prevState,
            updaterSearch: !prevState.updaterSearch,
          }
        })
      }
    }

    if (newActiveTab === 2) {
      if (this.state.shouldUpdateRated !== this.state.updaterRated) {
        this.setState((prevState) => {
          return {
            ...prevState,
            updaterRated: !prevState.updaterRated,
          }
        })
      }
    }
  }

  setShouldUpdate(changingFrom) {
    console.log('changing from ', changingFrom)
    if (changingFrom === 1) {
      this.setState((prevState) => {
        return {
          ...prevState,
          shouldUpdateRated: !prevState.shouldUpdateRated,
        }
      })
    }
    if (changingFrom === 2) {
      this.setState((prevState) => {
        return {
          ...prevState,
          shouldUpdateSearched: !prevState.shouldUpdateSearched,
        }
      })
    }
  }

  render() {
    // needUpdate={this.state.shouldUpdateSearched}
    // needUpdate={this.state.shouldUpdateRated}
    const items = [
      {
        label: 'Search',
        key: '1',
        children: (
          <TabContent
            tabNum={1}
            onNeedUpdate={() => this.setShouldUpdate(1)}
            needUpdate={this.state.updaterSearch}
          />
        ),
      }, // remember to pass the key prop
      {
        label: 'Rated',
        key: '2',
        children: (
          <TabContent
            tabNum={2}
            onNeedUpdate={() => this.setShouldUpdate(2)}
            needUpdate={this.state.updaterRated}
          />
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
      <GenresContext.Provider value={this.state.genresList}>
        <div className={classes.container}>
          {!this.state.genresList ? (
            <Spin size="large" style={spinStyle}></Spin>
          ) : (
            <>
              <Tabs
                onChange={(activeTab) => this.changeTabTo(activeTab)}
                items={items}
              />
            </>
          )}
        </div>
      </GenresContext.Provider>
    )
  }
}
