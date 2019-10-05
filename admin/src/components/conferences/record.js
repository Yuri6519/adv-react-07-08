import React from 'react'
import { DragSource } from 'react-dnd'
import { getConfDragSourceName } from '../../services/utils'

const Record = ({
  index,
  data,
  handleSelectEvent,
  connectDragSource,
  isDragging,
  shouldDrag
}) => {
  const dndStyle = {
    opacity: isDragging ? 0.3 : 1
  }

  return shouldDrag
    ? !data.choosen
      ? connectDragSource(getRecord(index, data, handleSelectEvent, dndStyle))
      : null
    : getRecord(index, data, handleSelectEvent, dndStyle)
}

const getRecord = (index, data, handleSelectEvent, dndStyle) => (
  <tr
    key={data.id}
    data-id="test-row"
    onClick={handleSelectEvent(data.id)}
    style={dndStyle}
  >
    <td style={{ textAlign: 'right' }}>{index}</td>
    <td>{data.title}</td>
    <td>{data.url}</td>
    <td>{data.where}</td>
    <td>{data.when}</td>
    <td>{data.month}</td>
    <td>{data.submissionDeadline}</td>
  </tr>
)

const spec = {
  beginDrag(props, monitor, component) {
    return {
      type: 'conference',
      id: props.data.id
    }
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource(getConfDragSourceName, spec, collect)(Record)
