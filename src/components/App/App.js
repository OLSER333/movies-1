import React, { Component } from 'react'
import { Spin, Tabs } from 'antd'

import TabContent from '../TabContent/TabContent'
import TmdbApi from '../../services/TmdbApi'
import { GenresContext } from '../GenresContext/GenresContext'

import classes from './App.module.scss'
export default class App extends Component {
  state = {
    genresList: null,
    updaterSearched: false,
    updaterRated: false,
  }

  tmdbApi = new TmdbApi()
  componentDidMount() {
    if (!localStorage.getItem('tmdb_guest_session_id')) {
      this.tmdbApi.getGuestSessionId().then((data) => {
        localStorage.setItem('tmdb_guest_session_id', data.guest_session_id)
      })
    }

    localStorage.setItem('needUpdRated', '0')
    localStorage.setItem('needUpdSearched', '0')

    this.tmdbApi.getGenres().then((data) => {
      this.setState({ genresList: data })
    })
  }

  changeTabTo(newActiveTab) {
    if (
      newActiveTab === '1' &&
      localStorage.getItem('needUpdSearched') === '1'
    ) {
      this.setState((prevState) => {
        return {
          ...prevState,
          updaterSearched: !prevState.updaterSearched,
        }
      })
    }

    if (newActiveTab === '2' && localStorage.getItem('needUpdRated') === '1') {
      this.setState((prevState) => {
        return {
          ...prevState,
          updaterRated: !prevState.updaterRated,
        }
      })
    }
  }

  render() {
    const items = [
      {
        label: 'Search',
        key: '1',
        children: (
          <TabContent tabNum={1} needUpdate={this.state.updaterSearched} />
        ),
      }, // remember to pass the key prop
      {
        label: 'Rated',
        key: '2',
        children: (
          <TabContent tabNum={2} needUpdate={this.state.updaterRated} />
        ),
      },
    ]

    return (
      <GenresContext.Provider value={this.state.genresList}>
        <div className={classes.container}>
          {!this.state.genresList ? (
            <Spin size="large" style={classes.mainSpiner}></Spin>
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
