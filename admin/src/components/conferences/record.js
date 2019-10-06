import React, { PureComponent } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { getConfDragSourceName } from '../../services/utils'

class ConfREcord extends PureComponent {
  componentDidMount() {
    const { connectDragPreview } = this.props
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true
      })
    }
  }

  get record() {
    const {
      index,
      data,
      handleSelectEvent,
      connectDragSource,
      isDragging,
      shouldDrag
    } = this.props

    const dndStyle = {
      opacity: isDragging ? 0.3 : 1,
      cursor: 'move'
    }

    return shouldDrag
      ? !data.choosen
        ? connectDragSource(
            this.getRecord(index, data, handleSelectEvent, dndStyle)
          )
        : null
      : this.getRecord(index, data, handleSelectEvent, null)
  }

  getRecord = (index, data, handleSelectEvent, dndStyle) => (
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

  render = () => this.record
}

const spec = {
  beginDrag(props, monitor, component) {
    return {
      type: 'conference',
      id: props.data.id,
      title: props.data.title
    }
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

export default DragSource(getConfDragSourceName, spec, collect)(ConfREcord)
