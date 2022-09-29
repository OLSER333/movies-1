import React, { Component } from 'react'
import { Rate } from 'antd'
import { format } from 'date-fns'

import '../../assets/styles/global.css'
import posterDefault from '../../assets/images/no-poster.png'
// import MyImg from '../MyImg/MyImg'

import classes from './Card.module.scss'

export default class Card extends Component {
  componentDidMount() {
    // const tmdbApi = new TmdbApi()
    // tmdbApi.getPoster().then((data) => {
    //   this.setState({ movies: data.results })
    //   console.log('this state', this.state)
    // })
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

  render() {
    const { title, release_date, vote_average, overview, genres, imgPath } =
      this.props
    return (
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
        <div className={classes.content}>
          <header className={classes.contentTop}>
            <h2 className={classes.header}>{title}</h2>
            <p className={classes.rateValue}>{vote_average.toFixed(1)}</p>
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
                    {el}
                  </li>
                )
              })}
          </ul>
          <div className={classes.description}>
            {overview && this.getCroppedView(overview)}
          </div>
          <Rate count={10} allowHalf></Rate>
        </div>
      </div>
    )
  }
}
