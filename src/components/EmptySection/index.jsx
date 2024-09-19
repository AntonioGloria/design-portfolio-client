import React from 'react'

const EmptySection = (props) => {
  const { item } = props

  return (
    <div
      className="border border-dark border-opacity-50 rounded-3 m-auto text-center"
      style={{width: "25vw"}}
    >
      <img
        src="https://res.cloudinary.com/dwhznw5ny/image/upload/v1702842616/design-portfolio/ui-defaults/defaultAlbum_zxv3sr.png"
        alt="empty"
      />
      <p className="display-5 text-muted bold">No {item} Yet</p>
    </div>
  )
}

export default EmptySection