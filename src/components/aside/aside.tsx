import { component$, useSignal, useStore, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import styles from './aside.css?inline';

let intersectionObserver: IntersectionObserver | undefined = undefined;

export const Aside = component$(() => {
    useStylesScoped$(styles);
    const store = useStore<AsideStore>({
        open:false,
        intersectionRatio:0,
    });
    const asideRef = useSignal<Element>();
    useVisibleTask$(() => {
        const element = asideRef.value as HTMLElement;
        if (element && element.parentElement) {
            element.parentElement.scrollLeft = 1000;
            intersectionObserverInit(element, store);
        }
        return () => {
           intersectionObserver?.disconnect();
          }
    });


    return (
        <div class="menu-wrapper" style={'--intersection-ratio:' + store.intersectionRatio}>
            <aside ref={asideRef} >
            aaa
            </aside>
            <div>
            </div>
        </div>
    );
});


const intersectionObserverInit = (element: HTMLElement, store: AsideStore) => {
    intersectionObserver = new IntersectionObserver(
        ($event) => { _intersectionCallback($event, store) },
        {
            root: element.parentElement,
            threshold: Array(1001)
                .fill(0)
                .map((x, i) => Math.round((i * 0.001 + Number.EPSILON) * 1000) / 1000),
        }
    );
    intersectionObserver.observe(element);
}

const _intersectionCallback = (entries: IntersectionObserverEntry[], store: AsideStore) => {
    entries.forEach((entry) => {
        store.open = entry.intersectionRatio === 1;
        store.intersectionRatio = Math.round(( entry.intersectionRatio + Number.EPSILON) * 100) / 100;
    });

};


export interface AsideStore  {
open:boolean;
intersectionRatio: number;
}