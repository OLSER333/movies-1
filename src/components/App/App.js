import React, { Component } from 'react'
import { Tabs, Input, Pagination, Button, Spin } from 'antd'
import '../../assets/styles/global.css'

import Card from '../Card/Card'
import TmdbApi from '../../services/TmdbApi'

import classes from './App.module.scss'

export default class App extends Component {
  state = {
    movies: null,
    genres: null,
  }

  // const getWordGenre = (genreIds) => {
  //   return genreIds.map(el => this.state.genres)
  // }

  componentDidMount() {
    const tmdbApi = new TmdbApi()
    tmdbApi.getAllMovies().then((data) => {
      this.setState({ movies: data.results })
      console.log('this state', this.state)
    })
    tmdbApi.getGenres().then((data) => {
      this.setState({ genres: data })
      console.log('this state', this.state.genres)
    })
  }

  render() {
    const items = [
      { label: 'Tab 1', key: 'item-1', children: 'Content 1' }, // remember to pass the key prop
      { label: 'Tab 2', key: 'item-2', children: 'Content 2' },
    ]

    // const films = ['first Movie', 'second Movie', 'third Movie']
    return (
      <>
        <Button onClick={() => console.log('state', this.state)}>Ghkdf</Button>
        <Tabs items={items} />
        <Input placeholder="Basic usage" />
        <ul className={classes.moviesList}>
          {this.state.movies ? (
            this.state.movies.map((el) => {
              const {
                title,
                vote_average,
                release_date,
                overview,
                genre_ids,
                poster_path,
                id,
              } = el
              return (
                <Card
                  title={title}
                  vote_average={vote_average}
                  release_date={release_date}
                  overview={overview}
                  genres={genre_ids}
                  imgPath={poster_path}
                  key={id}
                ></Card>
              )
            })
          ) : (
            <Spin></Spin>
          )}
        </ul>
        <Pagination size="small" total={50} />
      </>
    )
  }
}
