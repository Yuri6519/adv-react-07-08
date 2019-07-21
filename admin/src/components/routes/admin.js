import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'
import Auth from '../common/checkAuth'
import PeopleForm from '../../components/people/add_new_form'

const PEOPLE = '/admin/people'

class AdminPage extends Component {
  static propTypes = {}

  get content() {
    return (
      <Fragment>
        <h1>Admin</h1>
        <div>
          <NavLink to={PEOPLE} activeStyle={{ color: 'red' }}>
            people
          </NavLink>
        </div>
        <p />
        <Route path={PEOPLE} component={PeopleForm} />
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
