import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import {
  listSelector,
  getBasket,
  addToBasket,
  delFromBasket
} from '../../ducs/basket'
import { getConfDragSourceName } from '../../services/utils'
import {
  addToBasket as personAddToBasket,
  delFromBasket as personDelFromBasket
} from '../../ducs/people'
import {
  addToBasket as confAddToBasket,
  delFromBasket as confDelFromBasket
} from '../../ducs/conference'

class BasketList extends PureComponent {
  componentDidMount() {
    const { getBasket, list = [] } = this.props
    if (list.length === 0) getBasket()
  }

  doList = (list) => {
    const { isOver, canDrop } = this.props
    const borderColor = canDrop ? (isOver ? 'green' : 'red') : 'black'

    const backColor = canDrop && isOver ? 'lightGray' : null
    //const font = canDrop && isOver ? 'bold' : null

    const dndStyle = {
      border: `1px solid ${borderColor}`,
      backgroundColor: backColor
      //fontWeight: font,
    }

    const { connectDropTarget } = this.props
    return (
      <table id="dynamic" border="1" cellSpacing="0" cellPadding="5">
        <tbody>
          {connectDropTarget(
            <tr style={dndStyle}>
              <th>№ п/п</th>
              <th>Ид</th>
              <th>Тип</th>
              <th>Идентификатор</th>
              <th>Удалить</th>
            </tr>
          )}
          {this.getTable(list)}
        </tbody>
      </table>
    )
  }

  getTable = (list) => {
    const res = []

    for (const key in list) {
      const record = list[key]
      const index = parseInt(key) + 1
      res.push(
        <tr key={index}>
          <td style={{ textAlign: 'right' }}>{index}</td>
          <td>{record.id}</td>
          <td>{record.entityType}</td>
          <td>{record.entityId}</td>
          <td>
            <button
              onClick={() =>
                this.onClick(record.id, record.entityType, record.entityId)
              }
            >
              Delete
            </button>
          </td>
        </tr>
      )
    }

    return res
  }

  onClick = (recId, type, id) => {
    this.props.delFromBasket(recId)
    if (type === 'person') {
      this.props.personDelFromBasket(id)
    } else if (type === 'conference') {
      this.props.confDelFromBasket(id)
    } else throw new Error(`unknown entity type: ${type}`)
  }

  render() {
    const { list } = this.props
    return (
      <Fragment>
        <div>Корзина</div>
        {this.doList(list)}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  list: listSelector(state)
})

const mapDispatchToProps = {
  getBasket,
  addToBasket,
  delFromBasket,
  personAddToBasket,
  personDelFromBasket,
  confAddToBasket,
  confDelFromBasket
}

const spec = {
  drop: (props, monitor, component) => {
    const record = {
      entityType: monitor.getItem().type,
      entityId: monitor.getItem().id
    }
    props.addToBasket(record)

    if (record.entityType === 'person') {
      props.personAddToBasket(record.entityId)
    } else if (record.entityType === 'conference') {
      props.confAddToBasket(record.entityId)
    } else throw new Error(`unknown entity type: ${record.entityType}`)
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
  mapStateToProps,
  mapDispatchToProps
)(DropTarget(getConfDragSourceName, spec, collect)(BasketList))
