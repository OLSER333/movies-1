import React, { Component } from 'react'
import { Rate } from 'antd'
import { format } from 'date-fns'

import '../../assets/styles/global.css'

import posterDefault from '../../assets/images/no-poster.png'
// import MyImg from '../MyImg/MyImg'
import { RateContext } from '../../index'

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
    console.log('component did mount')
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

  render() {
    // genres,
    const { title, release_date, vote_average, overview, imgPath, id } =
      this.props

    return (
      <RateContext.Consumer>
        {(value) => (
          <div className={classes.card}>
            <div className={classes.cardImg}>
              <img
                // src={this.getPosterPath}
                src={
                  imgPath
                    ? `https://image.tmdb.org/t/p/w500${imgPath}`
                    : posterDefault
                }
                alt={title}
              />
              {/*<MyImg path={`https://image.tmdb.org/t/p/w500${imgPath}`}></MyImg>*/}
            </div>
            <h1>{value}</h1>
            <div className={classes.content}>
              <header className={classes.contentTop}>
                <h2 className={classes.header}>{title}</h2>
                <p
                  className={classes.rateValue}
                  style={{ borderColor: `${this.getColor()}` }}
                >
                  {/*{vote_average.toFixed(1)}*/}
                  {vote_average}
                </p>
              </header>
              <div className={classes.date}>
                {release_date &&
                  format(new Date(release_date.split('-')), 'MMMM q, yyyy')}
              </div>
              {/*<ul className={classes.genresList}>*/}
              {/*  {genres &&*/}
              {/*    genres.map((el) => {*/}
              {/*      return (*/}
              {/*        <li className={classes.genresItem} key={el}>*/}
              {/*          {el}*/}
              {/*        </li>*/}
              {/*      )*/}
              {/*    })}*/}
              {/*</ul>*/}
              <div className={classes.description}>
                {overview && this.getCroppedView(overview)}
              </div>
              <Rate
                onChange={(rateNum) => this.changeRate(id, rateNum)}
                value={this.state.rate}
                count={10}
                allowClear={false} // мешало right work
              ></Rate>
            </div>
          </div>
        )}
      </RateContext.Consumer>
    )
  }
}
