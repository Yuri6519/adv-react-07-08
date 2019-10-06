import React from 'react'

export default ({ index, data, connect, dndStyle }) => {
  if (connect && typeof connect === 'function') {
    return connect(getRecord(index, data, dndStyle))
  } else {
    return getRecord(index, data, dndStyle)
  }
}

const getRecord = (index, data, dndStyle, connect) => (
  <tr key={data.id} style={dndStyle}>
    <td style={{ textAlign: 'right' }}>{index}</td>
    <td>{data.id}</td>
    <td>{data.lastName}</td>
    <td>{data.userName}</td>
    <td>{data.surName}</td>
    <td>{data.email}</td>
  </tr>
)
