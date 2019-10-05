import React, { Fragment } from 'react'
import ConferenceList from '../conferences/conference-list'
import PeoplePage from '../people/people-list'
import { setConfDragSourceName } from '../../services/utils'

export default () => {
  setConfDragSourceName('conference')
  return (
    <Fragment>
      <PeoplePage shouldDrop={true} />
      <p />
      <ConferenceList shouldDrag={true} />
    </Fragment>
  )
}
