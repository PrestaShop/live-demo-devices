import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Shop from '@/components/Shop.vue';
import store from '@/store';
import i18n from '@/i18n';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('Shop.vue', () => {
  it('renders the ready spinner by default', () => {
    const wrapper = shallowMount(Shop, {
      store: new Vuex.Store(Object.assign({}, store, {
        actions: {
          requestMachine: () => {},
        },
        mutations: {
          setBaseEndpoint: () => {},
        },
      })),
      localVue,
      i18n,
    });

    expect(wrapper.find('#loadingMessage').isVisible()).toBe(true);
  });

  it('removes the spinner when ready', () => {
    const wrapper = shallowMount(Shop, {
      store: new Vuex.Store({
        state: {
          ready: true,
          links: {
            front: '',
            back: '',
          },
          factory: {},
        },
        actions: {
          requestMachine: () => {},
        },
        mutations: {
          setBaseEndpoint: () => {},
        },
      }),
      localVue,
      i18n,
    });

    expect(wrapper.find('#loadingMessage').isVisible()).toBe(false);
  });

  it('displays the message at page load', () => {
    const wrapper = shallowMount(Shop, {
      store: new Vuex.Store(Object.assign({}, store, {
        actions: {
          requestMachine: () => {},
        },
        mutations: {
          setBaseEndpoint: () => {},
        },
      })),
      localVue,
      i18n,
    });

    expect(wrapper.find('#loadingMessage p').isVisible()).toBe(true);
  });

  it('only displays the spinner (not the message) when switching interfaces', () => {
    const wrapper = shallowMount(Shop, {
      store: new Vuex.Store({
        state: {
          ready: false,
          links: {
            front: 'http://yo.doge',
            back: 'http://yo.doge',
          },
          factory: {},
        },
        actions: {
          requestMachine: () => {},
        },
        mutations: {
          setBaseEndpoint: () => {},
        },
      }),
      localVue,
      i18n,
    });

    expect(wrapper.find('#loadingMessage').isVisible()).toBe(true);
    expect(wrapper.find('#loadingMessage p').isVisible()).toBe(false);
  });
});
