import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme'
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
    const component = render(<ConferenceList list={list} />, {
      disableLifecycleMethods: true
    })

    expect(component.find('[data-id="test-row"]').length).toEqual(
      conferences.length
    )
  })

  it('should call getAll function', () => {
    const fn = jest.fn()

    shallow(<ConferenceList getAll={fn} />)

    expect(fn.mock.calls.length).toBe(1)
  })

  it('should proceed select event', () => {
    const fn = jest.fn()

    const component = mount(
      <ConferenceList list={list} getAll={jest.fn()} onSelect={fn} />
    )

    component
      .find('[data-id="test-row"]')
      .at(1)
      .simulate('click')

    expect(fn).toBeCalledWith(list[1].id)
  })
})
