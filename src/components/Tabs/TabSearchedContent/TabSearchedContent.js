import React from 'react'
// import { Empty, Input, Pagination, Spin } from 'antd'
// import Card from '../Card/Card'
//==================================================================
import { Input, Pagination, Spin, Empty, Button } from 'antd'
import '../../../assets/styles/global.css'
import '../../../assets/styles/null.scss'
import '../../../assets/styles/vars.scss'
import _debounce from 'lodash/debounce'

import Card from '../../Card/Card'
import TmdbApi from '../../../services/TmdbApi'

import classes from './TabSearchedContent.module.scss'

export default class TabSearchedContent extends React.Component {
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
    // this.setState({ tabNum: this.props.tabNum })
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

  usualFn() {
    // const tmdbApi = new TmdbApi()
    console.log('state for NOOOOW', this.state)
    // tmdbApi.freeFetch()
  }

  render() {
    return (
      <div className={classes.tabContainer}>
        <Button onClick={() => this.usualFn()}>Ghkdf</Button>

        <Input
          onChange={
            (e) => this.searchNewMovie(e.target.value)
            // this.searchNewMovie(e.target.value)
          }
          placeholder="Type to search"
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
                  id={id}
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
            total={this.state.totalPages * 20}
            showSizeChanger={false}
            defaultPageSize={20}
          />
        )}
      </div>
    )
  }
}
