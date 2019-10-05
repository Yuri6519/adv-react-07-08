import React, { Fragment } from 'react'
import ConferenceList from '../conferences/conference-list'
import PeoplePage from '../people/people-list'
import { setConfDragSourceName } from '../../services/utils'
import BasketList from '../basket/basket-list'

export default () => {
  setConfDragSourceName('basket')
  return (
    <Fragment>
      <BasketList />
      <p />
      <PeoplePage shouldDrag={true} />
      <p />
      <ConferenceList shouldDrag={true} />
    </Fragment>
  )
}
