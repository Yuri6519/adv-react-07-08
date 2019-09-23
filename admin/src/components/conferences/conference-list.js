import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Loader from '../loader'
import {
  getAll,
  listSelector,
  loadingSelector
} from '../../ducs/conference-list'

class ConferenceList extends PureComponent {
  componentDidMount() {
    const { list = [] } = this.props
    if (list.length === 0) this.props.getAll()
  }

  getRecord = (index, data) => (
    <tr key={data.id}>
      <td style={{ textAlign: 'right' }}>{index}</td>
      <td>{data.title}</td>
      <td>{data.url}</td>
      <td>{data.where}</td>
      <td>{data.when}</td>
      <td>{data.month}</td>
      <td>{data.submissionDeadline}</td>
    </tr>
  )

  getTable = (data) => {
    if (!data || !(data instanceof Array)) return null

    const res = []

    for (const key in data) {
      const record = data[key]
      const index = parseInt(key) + 1
      res.push(this.getRecord(index, record))
    }

    return res
  }

  render() {
    const { list = [], loading } = this.props

    console.log('ConferenceList::loading::', loading)
    console.log('ConferenceList::list::', list)
    console.log('ConferenceList::list.length::', list.length)

    if (loading) return <Loader />
    if (!list || list.length === 0) return <div>Список конференций пуст</div>

    return (
      <table id="dynamic" border="1" cellSpacing="0" cellPadding="5">
        <tbody>
          <tr>
            <th>Num</th>
            <th>Title</th>
            <th>Url</th>
            <th>Where</th>
            <th>When</th>
            <th>Month</th>
            <th>SubmissionDeadline</th>
          </tr>
          {this.getTable(list)}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: loadingSelector(state),
  list: listSelector(state)
})

export default connect(
  mapStateToProps,
  { getAll }
)(ConferenceList)
