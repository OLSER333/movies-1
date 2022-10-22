import React from 'react'
import { Input, Pagination, Spin, Empty, Alert } from 'antd'
import '../../assets/styles/global.css'
import '../../assets/styles/null.scss'
import _debounce from 'lodash/debounce'

import Card from '../Card/Card'
import TmdbApi from '../../services/TmdbApi'
import { getIdsGenres } from '../../utils/utils'

import classes from './TabContent.module.scss'

export default class TabContent extends React.Component {
  state = {
    movies: null,
    genres: null,
    curPage: 1,
    curSearch: '',
    totalPages: 0,
    tabNum: this.props.tabNum,
    isLoading: true,
    hasError: false,
  }

  componentDidMount() {
    this.setState({ tabNum: this.props.tabNum })
    this.updateTab()
  }

  componentDidUpdate(prevProps) {
    if (this.props.needUpdate !== prevProps.needUpdate) {
      if (this.props.tabNum === 1) {
        this.updateTab()
      } else if (this.props.tabNum === 2) {
        this.updateTab()
      }
    }
  }

  updateTab() {
    this.setState({ isLoading: true, movies: null })
    this.getDataMovies(this.state.curSearch, this.state.curPage) // was 1
  }

  getDataMovies(searchedTitle, page = 1) {
    const tmdbApi = new TmdbApi()
    if (this.state.tabNum === 1) {
      if (searchedTitle !== '') {
        tmdbApi
          .searchMovie(searchedTitle, page)
          .then((data) => this.setData(data))
          .catch(() => this.onError())
      } else {
        tmdbApi
          .getTopMovies(page)
          .then((data) => this.setData(data))
          .catch(() => this.onError())
      }
      localStorage.setItem('needUpdSearched', '0')
    } else if (this.state.tabNum === 2) {
      tmdbApi
        .getRatedMovies()
        .then((data) => {
          this.setData(data)
        })
        .catch(() => this.onError())
      localStorage.setItem('needUpdRated', '0')
    }
  }

  onError() {
    this.setState({ isLoading: false })
    this.setState({
      hasError: true,
    })
  }

  setData(data) {
    this.setState({ movies: data.results, totalPages: data.total_pages })
    this.setState({
      hasError: false,
    })
    this.setState({ isLoading: false })
  }
  // ==================================================================
  searchNewMovie = _debounce((title) => {
    this.setState({ curSearch: title, isLoading: true, movies: null })
    this.setState({ curPage: 1 })
    this.getDataMovies(title, 1)
  }, 1000)

  goToPagPage(numPage) {
    this.setState({ curPage: numPage, isLoading: true, movies: null })
    this.getDataMovies(this.state.curSearch, numPage)
  }

  setNeedUpdate() {
    this.state.tabNum === 1
      ? localStorage.setItem('needUpdRated', '1')
      : localStorage.setItem('needUpdSearched', '1')
  }

  render() {
    const { tabNum, movies, hasError, curPage, totalPages, isLoading } =
      this.state

    const errorData = {
      title: 'Something went wrong!',
      description: 'The movies are not available at the moment',
    }

    const hasData = !hasError && !isLoading && movies

    return (
      <div className={classes.tabContainer}>
        {tabNum === 1 && (
          // в один
          <Input
            onChange={(e) => this.searchNewMovie(e.target.value)}
            placeholder="Type to search"
          />
        )}
        {isLoading && <Spin size="large"></Spin>}
        {hasData && (
          <ul className={classes.moviesList}>
            {totalPages !== 0 &&
              movies.map((el) => {
                const {
                  title,
                  vote_average,
                  release_date,
                  overview,
                  genre_ids,
                  genres,
                  poster_path,
                  id,
                  rating,
                } = el
                return (
                  <Card
                    title={title}
                    vote_average={vote_average}
                    release_date={release_date}
                    overview={overview}
                    genres={genre_ids ? genre_ids : getIdsGenres(genres)}
                    imgPath={poster_path}
                    id={id}
                    key={id}
                    rating={rating}
                    onNeedUpdate={() => this.setNeedUpdate()}
                    onHasError={() => this.setState({ hasError: true })}
                  ></Card>
                )
              })}
          </ul>
        )}
        {hasError && (
          <Alert
            message={errorData.title}
            description={errorData.description}
            type="error"
          />
        )}
        {movies && totalPages === 0 && <Empty />}
        {Boolean(totalPages) && (
          <Pagination
            current={curPage}
            onChange={(e) => this.goToPagPage(e)}
            size="small"
            showSizeChanger={false}
            total={totalPages * 20}
            defaultPageSize={20}
          />
        )}
      </div>
    )
  }
}
