import React, { Component, Fragment } from 'react'
import { NavLink, Route } from 'react-router-dom'
//import Auth from '../common/checkAuth'
import PeopleForm from '../../components/people/add_new_form'
import ConferenceList from '../conferences/conference-list'
import AllPage from '../all/all-list'
import BasketPage from '../basket/basket-page'

const PEOPLE = '/admin/people'
const CONFERENCES = '/admin/conferences'
const ALLPAGE = '/admin/all'
const BASKET = '/admin/basket'

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
        <div>
          <NavLink to={ALLPAGE} activeStyle={{ color: 'red' }}>
            all
          </NavLink>
        </div>
        <div>
          <NavLink to={BASKET} activeStyle={{ color: 'red' }}>
            basket
          </NavLink>
        </div>
        <p />
        <Route path={PEOPLE} component={PeopleForm} />
        <Route path={CONFERENCES} component={ConferenceList} />
        <Route path={ALLPAGE} component={AllPage} />
        <Route path={BASKET} component={BasketPage} />
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
