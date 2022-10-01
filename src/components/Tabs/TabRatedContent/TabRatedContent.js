import React from 'react'
// import { Empty, Input, Pagination, Spin } from 'antd'
// import Card from '../Card/Card'
//==================================================================
import { Pagination, Spin, Empty, Button } from 'antd'
import '../../../assets/styles/global.css'
import '../../../assets/styles/null.scss'
import '../../../assets/styles/vars.scss'

import Card from '../../Card/Card'
import TmdbApi from '../../../services/TmdbApi'

import classes from './TabRatedContent.module.scss'

export default class TabRatedContent extends React.Component {
  state = {
    movies: null,
    genres: null,
    curPage: 1,
    totalPages: 0,
  }

  // const getWordGenre = (genreIds) => {
  //   return genreIds.map(el => this.state.genres)
  // }

  componentDidMount() {
    // this.setState({ tabNum: this.props.tabNum })
    this.getRatedMovies(1).then(() => {
      const tmdbApi = new TmdbApi()

      tmdbApi.getGenres().then((data) => {
        this.setState({ genres: data })
        console.log('this state', this.state.genres)
      })
    })
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
      this.setState({
        movies: data,
        totalPages: Math.ceil(localStorage.length / 20),
      })
    })
  }

  // getDataMovies(searchedTitle, page = 1) {
  //   const tmdbApi = new TmdbApi()
  //
  //   console.log('!!! search title now :', searchedTitle)
  //
  //   if (searchedTitle !== '') {
  //     tmdbApi.searchMovie(searchedTitle, page).then((data) => {
  //       this.setState({ movies: data.results, totalPages: data.total_pages })
  //     })
  //   } else {
  //     tmdbApi.getTopMovies(page).then((data) => {
  //       this.setState({ movies: data.results, totalPages: data.total_pages })
  //       console.log('this TOP state', this.state)
  //     })
  //   }
  // }

  // ==================================================================

  goToPagPage(numPage) {
    console.log('onChange here', numPage)
    this.setState({ curPage: numPage })
    this.getRatedMovies(numPage)
    // this.getDataMovies(this.state.curSearch, numPage)
  }

  usualFn() {
    // const tmdbApi = new TmdbApi()
    console.log('state for NOOOOW', this.state)
    // tmdbApi.freeFetch()
  }

  getIdsGenres(genres) {
    return genres.reduce((newArr, cur) => {
      newArr.push(cur.id)
      return newArr
    }, [])
  }
  /*
0:{id: 14, name: 'Fantasy'}
1:{id: 12, name: 'Adventure'}
2:{id: 10751, name: 'Family'}

   */

  render() {
    return (
      <div className={classes.tabContainer}>
        <Button onClick={() => this.usualFn()}>Ghkdf</Button>

        {!this.state.movies && <Spin size="large"></Spin>}
        <ul className={classes.moviesList}>
          {this.state.totalPages !== 0 &&
            this.state.movies.map((el) => {
              const {
                title,
                vote_average,
                release_date,
                overview,
                genres,
                poster_path,
                id,
              } = el
              return (
                <Card
                  title={title}
                  vote_average={vote_average}
                  release_date={release_date}
                  overview={overview}
                  genres={this.getIdsGenres(genres)}
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
