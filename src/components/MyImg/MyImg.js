import React, { useEffect, useState } from 'react'

export default function App(props) {
  const imageUrl = props.path
  const [img, setImg] = useState()

  const fetchImage = async () => {
    try {
      const res = await fetch(imageUrl)
      if (res.ok) {
        const imageBlob = await res.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob)
        setImg(imageObjectURL)
      } else {
        setImg('../../assets/images/poster.png')
      }
    } catch (e) {
      console.log('err', e)
    }
  }

  useEffect(() => {
    fetchImage()
  }, [])

  return (
    <>
      <img src={img} alt="icons" />
    </>
  )
}
