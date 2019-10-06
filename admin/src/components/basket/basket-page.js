import React, { Fragment } from 'react'
import ConferenceList from '../conferences/conference-list'
import PeoplePage from '../people/people-list'
import { setConfDragSourceName } from '../../services/utils'
import BasketList from '../basket/basket-list'
import CustomDragLayer from '../common/dragPreview/customDragLayer'

export default () => {
  setConfDragSourceName('basket')
  return (
    <Fragment>
      <BasketList />
      <p />
      <PeoplePage shouldDrag={true} />
      <CustomDragLayer dragType="person" />
      <p />
      <ConferenceList shouldDrag={true} />
      <CustomDragLayer dragType="conference" />
    </Fragment>
  )
}
