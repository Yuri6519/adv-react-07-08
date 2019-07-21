import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthSelector } from '../../ducs/auth'

class AuthComponent extends Component {
  static propTypes = {}

  render() {
    const { isAuth, content } = this.props
    return isAuth ? (
      content
    ) : (
      <h1 style={{ color: 'red' }}>Вы не авторизованы</h1>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuth: isAuthSelector(state)
})

export default connect(mapStateToProps)(AuthComponent)
