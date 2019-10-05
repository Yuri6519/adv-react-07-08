import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addConfToPerson } from '../../ducs/people'
import record from './people-record'

const PeopleDropRecord = ({
  index,
  data,
  connectDropTarget,
  isOver,
  canDrop
}) => {
  const borderColor = canDrop ? (isOver ? 'green' : 'white') : 'black'

  const backColor = canDrop && isOver ? 'lightGray' : null
  const font = canDrop && isOver ? 'bold' : null

  const dndStyle = {
    border: `1px solid ${borderColor}`,
    backgroundColor: backColor,
    fontWeight: font
  }

  const props = {
    index,
    data,
    connect: connectDropTarget,
    dndStyle
  }

  return record(props)
}

const spec = {
  // canDrop: (props, monitor) => {
  //   const { id } = monitor.getItem()
  //   const { id: prsnId} = props.data
  //   const res = id === '1f6Bqc0X3RLBdLcqNeXs' && prsnId === '1568556961052'
  //   console.log('DnD::canDrop::id=', id, ', prsnId=', prsnId, ', res=', res)
  //   return res
  // }

  drop: (props, monitor, component) => {
    console.log(
      'DnD::drop::sourceItem=',
      monitor.getItem(),
      ', prsnId=',
      props.data.id
    )

    props.addConfToPerson(props.data.id, monitor.getItem().id)
  }
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
}

export default connect(
  null,
  { addConfToPerson }
)(DropTarget('conference', spec, collect)(PeopleDropRecord))
