import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'
//import Auth from '../common/checkAuth'
import PeopleForm from '../../components/people/add_new_form'
import ConferenceList from '../conferences/conference-list'

const PEOPLE = '/admin/people'
const CONFERENCES = '/admin/conferences'

class AdminPage extends Component {
  static propTypes = {}

  get content() {
    return (
      <Fragment>
        <h1>Admin page</h1>
        <div>
          <NavLink to={PEOPLE} activeStyle={{ color: 'red' }}>
            people
          </NavLink>
        </div>
        <div>
          <NavLink to={CONFERENCES} activeStyle={{ color: 'red' }}>
            conferences
          </NavLink>
        </div>
        <p />
        <Route path={PEOPLE} component={PeopleForm} />
        <Route path={CONFERENCES} component={ConferenceList} />
      </Fragment>
    )
  }

  render() {
    console.log('AdminPage::render::state::', this.state)

    return (
      <div>
        {/* <Auth content={this.content}/> */}
        {this.content}
      </div>
    )
  }
}

export default AdminPage
