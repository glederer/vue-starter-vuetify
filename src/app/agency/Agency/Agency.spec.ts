import { createLocalVue, mount } from '@vue/test-utils';
import Vuex                      from 'vuex';
import { i18n }                  from '../../shared/plugins/i18n/i18n';
import Agency                   from './Agency.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Agency.vue', () => {

  test('renders component', () => {
    const store = new Vuex.Store({
                                   modules: {
                                     agency: {
                                       namespaced: true,
                                       getters:    {
                                         count: () => 0,
                                         incrementPending: () => false,
                                         decrementPending: () => false,
                                       },
                                       actions:    {
                                         increment: jest.fn(),
                                         decrement: jest.fn(),
                                       },
                                     },
                                   },
                                 });
    const wrapper = mount(Agency, {
      store,
      localVue,
      i18n,
    });

    expect(wrapper.find('h1').text()).toBe('Agency');
  });

  test('should increment and decrement', () => {
    const actions = {
      increment: jest.fn(),
      decrement: jest.fn(),
    };
    const store = new Vuex.Store({
                                   modules: {
                                     agency: {
                                       namespaced: true,
                                       getters:    {
                                         count: () => 0,
                                         incrementPending: () => false,
                                         decrementPending: () => false,
                                       },
                                       actions,
                                     },
                                   },
                                 });
    const wrapper: any = mount(Agency, {
      store,
      localVue,
      i18n,
    });

    wrapper.vm.increment();
    expect(actions.increment).toHaveBeenCalled();

    wrapper.vm.decrement();
    expect(actions.decrement).toHaveBeenCalled();
  });

  test('dispatches action on the server', () => {
    const store = {
      dispatch: jest.fn(),
    };

    Agency.prefetch({ store });

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(`agency/increment`);
  });

});
