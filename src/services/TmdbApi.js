export default class TmdbApi {
  async getResource(url) {
    // eslint-disable-next-line no-undef
    const res = await fetch(`${process.env.REACT_APP_API_BASE_3}${url}`)
    if (!res.ok) {
      throw new Error()
    }
    return await res.json()
  }

  async getGenres() {
    const res = await this.getResource(
      // eslint-disable-next-line no-undef
      `/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
    )
    return res.genres.reduce((newObj, cur) => {
      newObj[cur.id] = cur.name
      return newObj
    }, {})
  }

  async getTopMovies(page) {
    // eslint-disable-next-line no-undef
    const url = `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    return await this.getResource(url)
  }

  async searchMovie(title, page) {
    const url = `/search/movie?api_key=59017ce86d5101576f32f47160168519&query=${title}&page=${page}`
    return await this.getResource(url)
  }
  //============================
  async getGuestSessionId() {
    // eslint-disable-next-line no-undef
    const url = `/authentication/guest_session/new?api_key=${process.env.REACT_APP_API_KEY}`
    return await this.getResource(url)
  }

  async getRatedMovies() {
    const guestSessionId = localStorage.getItem('tmdb_guest_session_id')
    // eslint-disable-next-line no-undef
    const url = `/guest_session/${guestSessionId}/rated/movies?api_key=${process.env.REACT_APP_API_KEY}`
    return await this.getResource(url)
  }

  async sendMovieRate(movieId, rate) {
    const guestSessionId = localStorage.getItem('tmdb_guest_session_id')
    // eslint-disable-next-line no-undef
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${process.env.REACT_APP_API_KEY}&guest_session_id=${guestSessionId}`
    //
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        value: rate,
      }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })

    if (!res.ok) {
      throw new Error('server error')
    }
    return res.json()
  }
  async deleteMovieRating(movieId) {
    const guestSessionId = localStorage.getItem('tmdb_guest_session_id')
    // eslint-disable-next-line no-undef
    const url = `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${process.env.REACT_APP_API_KEY}&guest_session_id=${guestSessionId}`

    const res = await fetch(url, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error('server error')
    }
    return res.json()
  }
}
