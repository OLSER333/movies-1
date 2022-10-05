import React, { Component } from 'react'
import { Rate } from 'antd'
import { format } from 'date-fns'

import '../../assets/styles/global.css'
import posterDefault from '../../assets/images/no-poster.png'
import { GenresContext } from '../GenresContext/GenresContext'
import { getColor, getCroppedView } from '../../utils/utils'

import classes from './Card.module.scss'

export default class Card extends Component {
  state = {
    rate: null,
  }

  componentDidMount() {
    this.setState({ rate: Number(localStorage.getItem(this.props.id)) })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userRate !== this.props.userRate) {
      this.setState({ rate: Number(this.props.userRate) })
    }
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
    const { title, release_date, vote_average, overview, imgPath, id, genres } =
      this.props
    return (
      <GenresContext.Consumer>
        {/* eslint-disable-next-line no-unused-vars */}
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
