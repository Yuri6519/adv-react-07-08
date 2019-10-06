import React from 'react'

const styles = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem'
}
export default ({ type, id, title }) => {
  const backgroundColor = 'yellow'
  return (
    <div
      style={{ ...styles, backgroundColor }}
    >{`${type} => ${id} : ${title}`}</div>
  )
}
