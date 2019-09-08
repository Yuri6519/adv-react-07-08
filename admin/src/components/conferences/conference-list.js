import React, { PureComponent } from 'react'
import { list } from '../../mocks/conferences'

class ConferenceList extends PureComponent {
  render() {
    return (
      // <table id="dynamic" width="650" border="1" cellSpacing="0" cellPadding="5">
      <table id="dynamic" border="1" cellSpacing="0" cellPadding="5">
        <tbody>
          <tr>
            <th>Title</th>
            <th>Url</th>
            <th>Where</th>
            <th>When</th>
            <th>Month</th>
            <th>SubmissionDeadline</th>
          </tr>
          <tr>
            <td>Agent Conf</td>
            <td>http://www.agent.sh/</td>
            <td>Dornbirn, Austria</td>
            <td>January 20-21, 2017</td>
            <td>January</td>
            <td></td>
          </tr>
          <tr>
            <td>O'Reilly Velocity Conference</td>
            <td>
              {' '}
              <a href="http://conferences.oreilly.com/velocity/vl-ca">
                http://conferences.oreilly.com/velocity/vl-ca
              </a>
            </td>
            <td>San Jose, CA</td>
            <td>January 19-22, 2017</td>
            <td>January</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default ConferenceList
