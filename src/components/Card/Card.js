import React from 'react'
import { Rate } from 'antd'

import poster from '../../assets/images/poster.png'
import '../../assets/styles/global.css'

import classes from './Card.module.scss'

const Card = (props) => {
  const { title } = props
  return (
    <div className={classes.card}>
      <div className={classes.cardImg}>
        <img src={poster} alt="poster" />
      </div>
      <div className={classes.content}>
        <header className={classes.contentTop}>
          <h2 className={classes.header}>{title}</h2>
          <p className={classes.rateValue}>6.6</p>
        </header>
        <div className={classes.date}>March 5, 2020</div>
        <ul className={classes.genresList}>
          <li className={classes.genresItem}>Action</li>
          <li className={classes.genresItem}>Drama</li>
        </ul>
        <div className={classes.description}></div>
        <Rate allowHalf></Rate>
      </div>
    </div>
  )
}

export default Card
