import React from 'react'

const Gallery = (props) => {
  const { items } = props;
  return (
    <div className='text-center'>
      {items?.map(item => <p key={item._id}>{item.title}</p>)}
    </div>
  );
}

export default Gallery;