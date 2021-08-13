import Home from '../src/views/homes/Home/index.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { shallowMount } from '@vue/test-utils'

describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Home is here'
    const wrapper = shallowMount(Home)
    expect(wrapper.text()).toMatch(msg)
  })

  it('fail test', () => {
    // const msg = 'Home is here - 120'
    const msg = 'Home is here! -100'
    const wrapper = shallowMount(Home)
    expect(wrapper.text()).toMatch(msg)
  })
})
