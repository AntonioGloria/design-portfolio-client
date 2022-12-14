import React from 'react'

const Gallery = (props) => {
  const { albums } = props;
  return (
    <div className='text-center'>
      {albums.map(album => <p>{album.title}</p>)}
    </div>
  )
}

export default Gallery;