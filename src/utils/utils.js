const getCroppedView = (txt) => {
  const limit = 120
  const re = new RegExp('(^.{' + (limit - 1) + '}([^ ]+|\\s))(.*)')
  return txt.replace(re, '$1') + '...'
}

const getColor = (color) => {
  if (color <= 3) return '#E90000'
  else if (color <= 5) return '#E97E00'
  else if (color <= 7) return '#E9D100'
  else return '#66E900'
}

const getIdsGenres = (genres) => {
  //for Rated - it's has another (id + word) I take only ids
  return genres.reduce((newArr, cur) => {
    newArr.push(cur.id)
    return newArr
  }, [])
}

export { getColor, getCroppedView, getIdsGenres }
