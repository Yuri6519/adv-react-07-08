import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import SignInForm from '../auth/sign-in-form'
import SignUpForm from '../auth/sign-up-form'
import { signIn, signUp, errorLimit } from '../../ducs/auth'

const LINK_IN = '/auth/sign-in'
const LINK_UP = '/auth/sign-up'

class AuthPage extends Component {
  static propTypes = {}

  get ErrorLimitText() {
    const { errorLimit } = this.props
    return errorLimit ? (
      <section style={{ color: 'red' }}>
        Число попыток превысило максимально допустимое
        <section>Вы заблокированы на 5 сек</section>
      </section>
    ) : null
  }

  render() {
    return (
      <div>
        <h1>Auth Page {this.ErrorLimitText}</h1>
        <div>
          <NavLink to={LINK_IN} activeStyle={{ color: 'red' }}>
            sign in
          </NavLink>
        </div>
        <div>
          <NavLink to={LINK_UP} activeStyle={{ color: 'red' }}>
            sign up
          </NavLink>
        </div>
        <Route path={LINK_IN} render={this.doSignIn} />
        <Route path={LINK_UP} render={this.doSignUp} />
      </div>
    )
  }

  doSignIn = () => <SignInForm onSubmit={this.handleSignIn} />
  doSignUp = () => <SignUpForm onSubmit={this.handleSignUp} />

  handleSignIn = ({ email, password }) => this.props.signIn(email, password)
  handleSignUp = ({ email, password }) => this.props.signUp(email, password)
}

const mapStateToProps = (state) => ({
  errorLimit: errorLimit(state)
})

export default connect(
  mapStateToProps,
  { signIn, signUp }
)(AuthPage)
