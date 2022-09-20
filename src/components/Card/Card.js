import React, { Component } from 'react'
import { Rate } from 'antd'
import { format } from 'date-fns'
import '../../assets/styles/global.css'

import classes from './Card.module.scss'

export default class Card extends Component {
  componentDidMount() {
    // const tmdbApi = new TmdbApi()
    // tmdbApi.getPoster().then((data) => {
    //   this.setState({ movies: data.results })
    //   console.log('this state', this.state)
    // })
  }

  render() {
    const { title, release_date, vote_average, overview, genres, imgPath } =
      this.props
    return (
      <div className={classes.card}>
        <div className={classes.cardImg}>
          <img src={`https://image.tmdb.org/t/p/w500/${imgPath}`} alt={title} />
        </div>
        <div className={classes.content}>
          <header className={classes.contentTop}>
            <h2 className={classes.header}>{title}</h2>
            <p className={classes.rateValue}>{vote_average.toFixed(1)}</p>
          </header>
          <div className={classes.date}>
            {format(new Date(release_date.split('-')), 'MMMM q, yyyy')}
          </div>
          <ul className={classes.genresList}>
            {genres.map((el) => {
              return (
                <li className={classes.genresItem} key={el}>
                  {el}
                </li>
              )
            })}
          </ul>
          <div className={classes.description}>{overview}</div>
          <Rate allowHalf></Rate>
        </div>
      </div>
    )
  }
}
