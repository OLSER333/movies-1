import React, { Component } from 'react'
import { Tabs, Input, Pagination, Button, Spin, Empty } from 'antd'
import '../../assets/styles/global.css'
import '../../assets/styles/null.scss'
import '../../assets/styles/vars.scss'
import _debounce from 'lodash/debounce'

import Card from '../Card/Card'
import TmdbApi from '../../services/TmdbApi'

import classes from './App.module.scss'

export default class App extends Component {
  state = {
    movies: null,
    genres: null,
    curPage: 1,
    curSearch: '',
    totalPages: 0,
  }

  // const getWordGenre = (genreIds) => {
  //   return genreIds.map(el => this.state.genres)
  // }

  componentDidMount() {
    this.getDataMovies('', 1)

    const tmdbApi = new TmdbApi()

    tmdbApi.getGenres().then((data) => {
      this.setState({ genres: data })
      console.log('this state', this.state.genres)
    })
  }

  getDataMovies(searchedTitle, page = 1) {
    const tmdbApi = new TmdbApi()

    console.log('!!! search title now :', searchedTitle)

    if (searchedTitle !== '') {
      tmdbApi.searchMovie(searchedTitle, page).then((data) => {
        this.setState({ movies: data.results, totalPages: data.total_pages })
      })
    } else {
      tmdbApi.getTopMovies(page).then((data) => {
        this.setState({ movies: data.results, totalPages: data.total_pages })
        console.log('this TOP state', this.state)
      })
    }
  }

  usualFn() {
    // const tmdbApi = new TmdbApi()
    console.log('state for NOOOOW', this.state)
    // tmdbApi.freeFetch()
  }

  // ==================================================================
  searchNewMovie = _debounce((title) => {
    this.setState({ curSearch: title })
    this.setState({ curPage: 1 })
    this.getDataMovies(title, 1)
  }, 1000)

  goToPagPage(numPage) {
    console.log('onChange here', numPage)
    this.setState({ curPage: numPage })
    this.getDataMovies(this.state.curSearch, numPage)
    // this.getDataMovies(this.state.curSearch, numPage)
  }

  render() {
    const items = [
      { label: 'Search', key: 'item-1', children: 'Content 1' }, // remember to pass the key prop
      { label: 'Rated', key: 'item-2', children: 'Content 2' },
    ]

    // const films = ['first Movie', 'second Movie', 'third Movie']
    return (
      <>
        <div className={classes.container}>
          <Button onClick={() => this.usualFn()}>Ghkdf</Button>
          <Tabs items={items} />
          <Input
            onChange={
              (e) => this.searchNewMovie(e.target.value)
              // this.searchNewMovie(e.target.value)
            }
            placeholder="Basic usage"
          />
          {!this.state.movies && <Spin size="large"></Spin>}
          <ul className={classes.moviesList}>
            {this.state.totalPages !== 0 &&
              this.state.movies.map((el) => {
                const {
                  title,
                  vote_average,
                  release_date,
                  overview,
                  genre_ids,
                  poster_path,
                  id,
                } = el
                return (
                  <Card
                    title={title}
                    vote_average={vote_average}
                    release_date={release_date}
                    overview={overview}
                    genres={genre_ids}
                    imgPath={poster_path}
                    key={id}
                  ></Card>
                )
              })}
          </ul>

          {this.state.movies && this.state.totalPages === 0 && <Empty />}
          {Boolean(this.state.totalPages) && (
            <Pagination
              current={this.state.curPage}
              onChange={(e) => this.goToPagPage(e)}
              size="small"
              total={this.state.totalPages}
              showSizeChanger={false}
            />
          )}
        </div>
      </>
    )
  }
}
