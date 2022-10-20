import React from 'react'

const Popup = ({text, status}) => {
  return (
    <div className={status === 'failed' ? 'w-full p-5 lg:px-24 absolute top-0 bg-red-600' : 'w-full p-5 lg:px-24 absolute top-0 bg-green-600' }>
        {text}
    </div>
  )
}

export default Popup