import React from 'react'

const EmptySection = (props) => {
  const { item } = props

  return (
    <div>
      <img
        src={"https://res.cloudinary.com/dwhznw5ny/image/upload/v1702842616/design-portfolio/ui-defaults/defaultAlbum_zxv3sr.png"}
        alt={"empty"}
      />
      <h3 className="text-center">No {item}</h3>
    </div>
  )
}

export default EmptySection