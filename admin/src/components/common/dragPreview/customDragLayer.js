import React from 'react'
import { DragLayer } from 'react-dnd'
import BoxDragPreview from './dragBox'
import { getConfDragSourceName } from '../../../services/utils'
import { getLayerStyle, getItemStyles } from './utils'

const PeopleDragLayer = (props) => {
  const { dragType, item, itemType, isDragging } = props
  function renderItem() {
    switch (itemType) {
      case getConfDragSourceName():
        if (item.type === dragType)
          return (
            <BoxDragPreview type={item.type} id={item.id} title={item.title} />
          )
        return null
      default:
        return null
    }
  }
  if (!isDragging) {
    return null
  }
  return (
    <div style={getLayerStyle(props)}>
      <div style={getItemStyles(props)}>{renderItem()}</div>
    </div>
  )
}
export default DragLayer((monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  initialClientOffset: monitor.getInitialClientOffset(),
  isDragging: monitor.isDragging()
}))(PeopleDragLayer)
