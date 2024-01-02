import React from 'react'

type textProps = {
    text: string
}

const TitleSeciton = ({text}:textProps) => {
  return (
    <div className='border-bottom fs-4 fw-medium'>{text}</div>
  )
}

export default TitleSeciton