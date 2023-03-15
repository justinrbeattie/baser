import { component$, Slot, useStore, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';

import Header from '../components/header/header';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});



export default component$(() => {
  const serverTime = useServerTimeLoader();
  const location = useLocation();
  const store = useStore<RouteLevelStore>({
    iframe: false,
    base: { url: '', intersectionRatio: 0, },
    l1: { url: '', intersectionRatio: 0, },
    l2: { url: '', intersectionRatio: 0, },
    l3: { url: '', intersectionRatio: 0, },
  }, { recursive: true });


  useTask$(({ track }) => {
    track(() => location.url.searchParams);
    if (location.url.searchParams.get('l1')) {
      store.l1.url = location.url.origin + location.url.searchParams.get('l1');
    } else {
      store.l1.url = '';
    }
  })

  useVisibleTask$(() => {
    if (window) {
      store.iframe = window.self !== window.top;
    }
  });

  return (
    <>
      {store.iframe ? '' : <Header />}
      <main>
        <Slot />
      </main>

      {store.iframe ? '' :

        <footer>
          <a href="https://www.builder.io/" target="_blank">
            Made with ♡ by Builder.io
            <div>{serverTime.value.date}</div>
          </a>
        </footer>

      }

     {/*  <Drawer store={store} ></Drawer> */}

    </>
  );
});

export interface RouteLevelStore {
  iframe: boolean,
  base: RouteLevel;
  l1: RouteLevel;
  l2: RouteLevel;
  l3: RouteLevel;
  [key: string]: RouteLevel | boolean;
}

export interface RouteLevel {
  url: string;
  intersectionRatio: number;
}
