import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ConferenceList } from './conference-list'
import conferences from '../../mocks/conferences'
import Loader from '../loader'

const list = conferences.map((itr, id) => ({ id, ...itr }))

Enzyme.configure({ adapter: new Adapter() })

describe('conference-list', () => {
  it('should render a loader', () => {
    const component = shallow(<ConferenceList loading />, {
      disableLifecycleMethods: true
    })

    expect(component.contains(<Loader />)).toBe(true)
  })

  it('should render a conference list', () => {
    const component = shallow(<ConferenceList list={list} />, {
      disableLifecycleMethods: true
    })

    expect(component.find('[data-id="test-row"]').length).toEqual(
      conferences.length
    )
  })
})
