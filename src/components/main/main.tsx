import { component$, Slot, useStore, useStylesScoped$, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import styles from './main.css?inline';


export const Main = component$(() => {
    useStylesScoped$(styles);
    const location = useLocation();
    const store = useStore<any>({
        pathname: '/',
    });
    useTask$(({ track }) => {
        track(() => location.url.pathname);
        store.pathname = location.url.pathname;
    })
    return (
        <main>
            <div class="index">
                {store.pathname === '/' ? <Slot /> : ''}
            </div>

            <div class="flower">
                {store.pathname === '/flower/' ? <Slot /> : ''}
            </div>
            <div class="todolist">
                {store.pathname === '/todolist/' ? <Slot /> : ''}
            </div>
        </main>
    );
});
