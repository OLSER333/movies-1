export default class TmdbApi {
  // _apiBase = 'https://api.themoviedb.org/3'
  async getResource(url) {
    // eslint-disable-next-line no-undef
    const res = await fetch(`${process.env.REACT_APP_API_BASE_3}${url}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`)
    }
    return await res.json()
  }
  async getAllMovies() {
    const movies = await this.getResource(
      // eslint-disable-next-line no-undef
      `/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`
    )
    console.log(movies)
    return movies
  }
  async getGenres() {
    return await this.getResource(
      // eslint-disable-next-line no-undef
      `/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
    )
  }

  async getTopMovies(page) {
    // eslint-disable-next-line no-undef
    const url = `/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`
    // `/movie/556694?api_key=${process.env.REACT_APP_API_KEY}`
    const res = await this.getResource(url)

    console.log('movies', res)
    // console.log('res.json', res.json())
    return res
  }

  async searchMovie(title, page) {
    // eslint-disable-next-line no-undef
    const url = `/search/movie?api_key=59017ce86d5101576f32f47160168519&query=${title}&page=${page}`
    // `/movie/556694?api_key=${process.env.REACT_APP_API_KEY}`
    const res = await this.getResource(url)

    console.log('res', res)
    // console.log('res.json', res.json())
    return res
  }

  async searchMovieById(id) {
    // eslint-disable-next-line no-undef
    const url = `/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    // `/movie/556694?api_key=${process.env.REACT_APP_API_KEY}`
    const res = await this.getResource(url)

    console.log('res', res)
    // console.log('res.json', res.json())
    return res
  }

  async freeFetch() {
    // eslint-disable-next-line no-undef
    const url =
      '/search/movie?api_key=59017ce86d5101576f32f47160168519&query=Thor'
    // `/movie/556694?api_key=${process.env.REACT_APP_API_KEY}`
    const res = await this.getResource(url)

    console.log('res', res)
    console.log('res.json', res.json())
    return res
  }

  async getPoster(posterPath) {
    const res = await fetch(posterPath)
    if (!res.ok) {
      // throw new Error(`Could not fetch ${url}, status ${res.status}`)
      return ''
    }
    return await res.json()
  }
  // async getPoster(url) {
  //   const res = await fetch(`${process.env.REACT_APP_API_BASE_3}${url}`)
  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status ${res.status}`)
  //   }
  //   return await res.json()
  // }
}
