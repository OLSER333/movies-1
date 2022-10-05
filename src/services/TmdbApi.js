export default class TmdbApi {
  // _apiBase = 'https://api.themoviedb.org/3'
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
    // `/movie/556694?api_key=${process.env.REACT_APP_API_KEY}`
    //     `/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`
    return await this.getResource(url)
  }

  async searchMovie(title, page) {
    // eslint-disable-next-line no-undef
    const url = `/search/movie?api_key=59017ce86d5101576f32f47160168519&query=${title}&page=${page}`
    // `/movie/556694?api_key=${process.env.REACT_APP_API_KEY}`
    return await this.getResource(url)
  }

  async searchMovieById(id) {
    // eslint-disable-next-line no-undef
    const url = `/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    return await this.getResource(url)
  }
}
