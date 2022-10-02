import React from 'react'
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
    tabNum: null,
  }

  // const getWordGenre = (genreIds) => {
  //   return genreIds.map(el => this.state.genres)
  // }

  componentDidMount() {
    this.setState({ tabNum: this.props.tabNum })
    this.updateTab()
    // this.setState({ tabNum: this.props.tabNum })
  }

  componentDidUpdate(prevProps) {
    if (this.props.needUpdate !== prevProps.needUpdate) {
      console.log('try update')
      this.updateTab()
    }
  }

  updateTab() {
    if (this.props.tabNum === 1) {
      console.log('in Search now')
      this.getDataMovies('', 1)
    } else if (this.props.tabNum === 2) {
      console.log('in Rated now')
      this.getRatedMovies(1)
    }

    this.props.hasUpdated(this.props.tabNum)
    const tmdbApi = new TmdbApi()

    tmdbApi.getGenres().then((data) => {
      this.setState({ genres: data })
      // console.log('this state', this.state.genres)
    })
  }

  getDataMovies(searchedTitle, page = 1) {
    const tmdbApi = new TmdbApi()

    console.log('!!! search title now :', searchedTitle)

    if (searchedTitle !== '') {
      tmdbApi.searchMovie(searchedTitle, page).then((data) => {
        data.results = data.results.map((el) => {
          el.userRate = localStorage.getItem(el.id)
          return el
        })
        console.log('data.results', data.results)
        this.setState({ movies: data.results, totalPages: data.total_pages })
      })
    } else {
      tmdbApi.getTopMovies(page).then((data) => {
        data.results = data.results.map((el) => {
          el.userRate = localStorage.getItem(el.id)
          return el
        })
        console.log('data.results Top', data.results)
        this.setState({ movies: data.results, totalPages: data.total_pages })
        // console.log('this TOP state', this.state)
      })
    }
  }

  async getRatedMovies(page = 1) {
    const tmdbApi = new TmdbApi()
    const ratedMovies = []
    const countMoviesOnPage =
      localStorage.length < page * 20 ? localStorage.length : page * 20

    for (let i = (page - 1) * 20; i < countMoviesOnPage; i++) {
      // массив
      ratedMovies.push(tmdbApi.searchMovieById(localStorage.key(i)))
    }
    // eslint-disable-next-line no-undef
    await Promise.all(ratedMovies).then((data) => {
      console.log('Promiseall', data)
      data = data.map((el) => {
        el.userRate = localStorage.getItem(el.id)
        return el
      })
      this.setState({
        movies: data,
        totalPages: Math.ceil(localStorage.length / 20),
      })
    })
    // try to update rate
  }

  // ==================================================================
  searchNewMovie = _debounce((title) => {
    this.setState({ curSearch: title })
    this.setState({ curPage: 1 })
    this.getDataMovies(title, 1)
  }, 1000)

  goToPagPage(numPage) {
    this.setState({ curPage: numPage })

    if (this.state.tabNum === 1) {
      this.getDataMovies(this.state.curSearch, numPage)
    } else {
      this.getRatedMovies(numPage)
    }
    // this.getDataMovies(this.state.curSearch, numPage)
  }

  usualFn() {
    // const tmdbApi = new TmdbApi()
    console.log('state for NOOOOW', this.state)
    // tmdbApi.freeFetch()
  }

  //for Rated - it's has another (id + word) I take only ids
  getIdsGenres(genres) {
    return genres.reduce((newArr, cur) => {
      newArr.push(cur.id)
      return newArr
    }, [])
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
                genres,
                poster_path,
                id,
                userRate,
              } = el
              return (
                <Card
                  title={title}
                  vote_average={vote_average}
                  release_date={release_date}
                  overview={overview}
                  genres={genre_ids ? genre_ids : this.getIdsGenres(genres)}
                  imgPath={poster_path}
                  id={id}
                  key={id}
                  userRate={userRate}
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
