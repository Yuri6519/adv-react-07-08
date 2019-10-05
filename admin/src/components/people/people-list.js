import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { listSelector, getAllPeople, loadingSelector } from '../../ducs/people'
import Loader from '../loader'
import PeopleRecord from './people-record'
import PeopleDropRecord from './people-drop-record'
import PeopleDragRecord from './people-drag-record'

class PeopleList extends PureComponent {
  componentDidMount() {
    const { getList, peopleList: list = [] } = this.props
    if (list.length === 0) getList()
  }

  doList = (list) => {
    if (!list || list.length === 0) return null

    return (
      <table id="dynamic" border="1" cellSpacing="0" cellPadding="5">
        <tbody>
          <tr>
            <th width="5%">№ п/п</th>
            <th width="10%">Ид</th>
            <th width="10%">Фамилия</th>
            <th width="10%">Имя</th>
            <th width="15%">Отчество</th>
            <th width="10%">e-Mail</th>
          </tr>
          {this.getTable(list)}
        </tbody>
      </table>
    )
  }

  getTable = (list) => {
    const { shouldDrop, shouldDrag } = this.props
    const res = []

    for (const key in list) {
      const record = list[key]
      const index = parseInt(key) + 1
      res.push(this.getRecord(index, record, shouldDrop, shouldDrag))
    }

    return res
  }

  getRecord = (index, record, shouldDrop, shouldDrag) => {
    if (shouldDrop) {
      return <PeopleDropRecord index={index} data={record} key={record.id} />
    } else if (shouldDrag) {
      if (!record.choosen) {
        return <PeopleDragRecord index={index} data={record} key={record.id} />
      } else return null
    } else {
      return <PeopleRecord index={index} data={record} key={record.id} />
    }
  }

  render() {
    const { peopleList, loading } = this.props
    return loading ? <Loader /> : this.doList(peopleList)
  }
}

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  peopleList: listSelector(state)
})

const mapDispatchToProps = {
  getList: getAllPeople
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleList)
