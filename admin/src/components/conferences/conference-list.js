import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Loader from '../loader'
import ConferenceRecord from './record'
import { getAll, listSelector, loadingSelector } from '../../ducs/conference'

export class ConferenceList extends PureComponent {
  static defaultProps = {
    onSelect: () => {}
  }

  componentDidMount() {
    const { list = [] } = this.props
    if (list.length === 0) this.props.getAll()
  }

  getRecord = (data, index) => {
    const { onSelect, shouldDrag } = this.props
    return (
      <ConferenceRecord
        index={index}
        data={data}
        key={data.id}
        handleSelectEvent={onSelect}
        shouldDrag={shouldDrag}
      />
    )
  }

  getTable = (data) =>
    !data || !(data instanceof Array) ? null : data.map(this.getRecord)

  render() {
    const { list = [], loading } = this.props

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
