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
    const genres = await this.getResource(
      // eslint-disable-next-line no-undef
      `/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
    )
    return genres
  }
  // async getPoster(url) {
  //   const res = await fetch(`${process.env.REACT_APP_API_BASE_3}${url}`)
  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status ${res.status}`)
  //   }
  //   return await res.json()
  // }
}
