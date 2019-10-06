import React from 'react'
import Box from './box'

const styles = {
  display: 'inline-block',
  transform: 'rotate(-7deg)',
  WebkitTransform: 'rotate(-7deg)'
}
const BoxDragPreview = ({ type, id, title }) => {
  return (
    <div style={styles}>
      <Box type={type} id={id} title={title} />
    </div>
  )
}
export default BoxDragPreview
