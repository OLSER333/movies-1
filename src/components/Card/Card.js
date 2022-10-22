import React, { Component } from 'react'
import { Rate } from 'antd'
import { format } from 'date-fns'

import '../../assets/styles/global.css'
import posterDefault from '../../assets/images/no-poster.png'
import { GenresContext } from '../GenresContext/GenresContext'
import { getColor, getCroppedView } from '../../utils/utils'
import TmdbApi from '../../services/TmdbApi'

import classes from './Card.module.scss'

export default class Card extends Component {
  state = {
    rate: null,
  }

  tmdbApi = new TmdbApi()

  componentDidMount() {
    this.setState({
      rate:
        this.props.rating || Number(localStorage.getItem(this.props.id)) || 0,
    })
  }

  changeRate(id, rateNum) {
    // отменяем рейтинг
    if (rateNum === this.state.rate) {
      this.tmdbApi
        .deleteMovieRating(id)
        .then(() => {
          this.setState({ rate: null })
          localStorage.removeItem(id)
        })
        .catch((err) => {
          this.props.onHasError()
          console.log(err)
        })
    } else {
      this.tmdbApi
        .sendMovieRate(id, rateNum)
        .then(() => {
          this.setState({ rate: Number(rateNum) })
          localStorage.setItem(id, rateNum)
        })
        .catch((err) => {
          this.props.onHasError()
          console.log(err)
        })
    }
    this.props.onNeedUpdate()
  }

  render() {
    const { title, release_date, vote_average, overview, imgPath, id, genres } =
      this.props
    return (
      <GenresContext.Consumer>
        {(genresList) => (
          <div className={classes.card}>
            <div className={classes.cardImg}>
              <img
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
            </div>
            <div className={classes.content}>
              <header className={classes.contentTop}>
                <h2 className={classes.header}>{title}</h2>
                <p
                  className={classes.rateValue}
                  style={{ borderColor: `${getColor(vote_average)}` }}
                >
                  {vote_average.toFixed(1)}
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
                        {genresList[el]}
                      </li>
                    )
                  })}
              </ul>
              <div className={classes.description}>
                {overview && getCroppedView(overview)}
              </div>

              <Rate
                onChange={(rateNum) => this.changeRate(id, rateNum)}
                value={this.state.rate}
                count={10}
                allowClear={false}
              ></Rate>
            </div>
          </div>
        )}
      </GenresContext.Consumer>
    )
  }
}
