export default function deepEqual(obj1, obj2) {
  if (obj1 === null && obj2 === null) return true
  else if (
    (typeof obj1 === 'object' && obj2 === null) ||
    (obj1 === null && obj2 === 'object')
  )
    return false
  else if (
    (typeof obj1 === 'object' && typeof obj2 !== 'object') ||
    (typeof obj1 !== 'object' && typeof obj2 === 'object')
  )
    return false
  else if (typeof obj1 !== 'object' && typeof obj2 !== 'object')
    return obj1 === obj2
  else if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    if (Object.keys(obj1).length === Object.keys(obj2).length) {
      for (let i in obj1) {
        if (!deepEqual(obj1[i], obj2[i])) return false
      }
    } else return false // если разная длина
  }
  return true
}
