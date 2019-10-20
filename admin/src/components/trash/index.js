import React from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { getConfDragSourceName } from '../../services/utils'
import { delPerson } from '../../ducs/people'
import { delConf } from '../../ducs/conference'

const style = {
  display: 'inline-block',
  width: 100,
  height: 100,
  position: 'fixed', //absolute
  top: 0,
  left: 500
}

function Trash(props) {
  const { isOver, connectDropTarget } = props

  const dndStyle = {
    border: `${isOver ? 2 : 1}px solid ${isOver ? 'green' : 'black'}`
  }

  return connectDropTarget(<div style={{ ...style, ...dndStyle }}>Trash</div>)
}

const spec = {
  drop: (props, monitor, component) => {
    const record = {
      entityType: monitor.getItem().type,
      entityId: monitor.getItem().id
    }

    if (record.entityType === 'person') {
      props.delPerson(record.entityId)
    } else if (record.entityType === 'conference') {
      props.delConf(record.entityId)
    } else throw new Error(`unknown entity type: ${record.entityType}`)
  }
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

export default connect(
  null,
  { delPerson, delConf }
)(DropTarget(getConfDragSourceName, spec, collect)(Trash))
