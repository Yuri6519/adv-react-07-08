import { DragSource } from 'react-dnd'
import record from './people-record'
import { getConfDragSourceName } from '../../services/utils'

const PeopleDragRecord = ({ index, data, connectDragSource, isDragging }) => {
  const dndStyle = {
    opacity: isDragging ? 0.3 : 1
  }

  const props = {
    index,
    data,
    connect: connectDragSource,
    dndStyle
  }

  return record(props)
}

const spec = {
  beginDrag(props, monitor, component) {
    return {
      type: 'person',
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

export default DragSource(getConfDragSourceName, spec, collect)(
  PeopleDragRecord
)
