import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthPage from './components/routes/auth'
import AdminPage from './components/routes/admin'
import { isAuthSelector, currentMail } from '../src/ducs/auth'

class App extends Component {
  static propTypes = {}

  render() {
    const { isAuth, mail } = this.props

    return (
      <div>
        {isAuth ? <h2>Авторизован: {mail}</h2> : null}
        <nav>
          <ul>
            <li>
              <NavLink to="/auth" activeStyle={{ color: 'red' }}>
                auth
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeStyle={{ color: 'red' }}>
                admin
              </NavLink>
            </li>
          </ul>
        </nav>
        <section>
          <Route path="/auth" component={AuthPage} />
          <Route path="/admin" component={AdminPage} />
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuth: isAuthSelector(state),
  mail: currentMail(state)
})

export default connect(mapStateToProps)(App)
