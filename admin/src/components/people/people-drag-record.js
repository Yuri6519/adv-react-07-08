import { PureComponent } from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { DragSource } from 'react-dnd'
import record from './people-record'
import { getConfDragSourceName } from '../../services/utils'

class PeopleDragRecord extends PureComponent {
  componentDidMount() {
    const { connectDragPreview } = this.props
    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true
      })
    }
  }

  render() {
    const { index, data, connectDragSource, isDragging } = this.props
    const dndStyle = {
      opacity: isDragging ? 0.3 : 1,
      cursor: 'move'
    }

    const props = {
      index,
      data,
      connect: connectDragSource,
      dndStyle
    }

    return record(props)
  }
}

const spec = {
  beginDrag(props, monitor, component) {
    return {
      type: 'person',
      id: props.data.id,
      title: props.data.lastName
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

export default DragSource(getConfDragSourceName, spec, collect)(
  PeopleDragRecord
)
