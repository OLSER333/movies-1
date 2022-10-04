import React, { Component } from 'react'
import { Rate } from 'antd'
import { format } from 'date-fns'

import '../../assets/styles/global.css'

import posterDefault from '../../assets/images/no-poster.png'
// import MyImg from '../MyImg/MyImg'
import { GenresContext } from '../GenresContext/GenresContext'

import classes from './Card.module.scss'

export default class Card extends Component {
  state = {
    rate: null,
  }

  componentDidMount() {
    // const tmdbApi = new TmdbApi()
    // tmdbApi.getPoster().then((data) => {
    //   this.setState({ movies: data.results })
    //   console.log('this state', this.state)
    // })
    this.setState({ rate: Number(localStorage.getItem(this.props.id)) })
    console.log('Card DID mount')
  }

  componentDidUpdate(prevProps) {
    console.log('Card ENTER did update')
    if (prevProps.userRate !== this.props.userRate) {
      console.log('Card TRY did update')
      this.setState({ rate: Number(this.props.userRate) })
    }
  }

  getCroppedView(txt) {
    const limit = 120
    const re = new RegExp('(^.{' + (limit - 1) + '}([^ ]+|\\s))(.*)')
    return txt.replace(re, '$1') + '...'
  }

  // getPosterPath(path) {
  //   return fetch(path).then((res) => {
  //     console.log('res', res)
  //     return
  //   })
  // }
  getColor(e = this.props.vote_average) {
    if (e <= 3) return '#E90000'
    else if (e <= 5) return '#E97E00'
    else if (e <= 7) return '#E9D100'
    else return '#66E900'
  }

  changeRate(id, rateNum) {
    //отменяем рейтинг
    if (rateNum === this.state.rate) {
      localStorage.removeItem(`${id}`)
      this.setState({ rate: 0 })
    } else {
      localStorage.setItem(id, `${rateNum}`)
      this.setState({ rate: Number(localStorage.getItem(id)) })
    }
  }

  getGenreWord(arr, id) {
    return arr[id]
  }

  render() {
    //
    const { title, release_date, vote_average, overview, imgPath, id, genres } =
      this.props
    return (
      <GenresContext.Consumer>
        {/* eslint-disable-next-line no-unused-vars */}
        {(val) => (
          <div className={classes.card}>
            <div className={classes.cardImg}>
              <img
                onClick={() => console.log('Card state now', this.state)}
                // src={this.getPosterPath}
                src={
                  imgPath
                    ? `https://image.tmdb.org/t/p/w500${imgPath}`
                    : posterDefault
                }
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null // prevents looping
                  currentTarget.src = posterDefault
                }}
                alt={title}
              />
              {/*<MyImg path={`https://image.tmdb.org/t/p/w500${imgPath}`}></MyImg>*/}
            </div>
            {/*<h1>{value}</h1>*/}
            <div className={classes.content}>
              <header className={classes.contentTop}>
                <h2 className={classes.header}>{title}</h2>
                <p
                  className={classes.rateValue}
                  style={{ borderColor: `${this.getColor()}` }}
                >
                  {vote_average.toFixed(1)}
                  {/*{vote_average}*/}
                </p>
              </header>
              <div className={classes.date}>
                {release_date &&
                  format(new Date(release_date.split('-')), 'MMMM q, yyyy')}
              </div>
              <ul className={classes.genresList}>
                {genres &&
                  genres.map((el) => {
                    return (
                      <li className={classes.genresItem} key={el}>
                        {/*{this.getGenreWord(val, el)}*/}
                        {val[el]}
                      </li>
                    )
                  })}
              </ul>
              <div className={classes.description}>
                {overview && this.getCroppedView(overview)}
              </div>

              {this.state.visible && <div> {val[0]} </div>}
              <Rate
                onChange={(rateNum) => this.changeRate(id, rateNum)}
                value={this.state.rate}
                count={10}
                allowClear={false} // мешало right work
              ></Rate>
            </div>
          </div>
        )}
      </GenresContext.Consumer>
    )
  }
}
