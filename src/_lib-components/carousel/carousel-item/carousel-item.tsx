import { component$, useVisibleTask$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import type { CarouselItemStore } from '../carousel';
import styles from './carousel-item.css?inline';

let intersectionObserver: IntersectionObserver | undefined = undefined;

export const CarouselItem = component$((props: { store: CarouselItemStore }) => {
    useStylesScoped$(styles);
    const carouselItemRef = useSignal<Element>();
    useVisibleTask$(() => {
        const element = carouselItemRef.value as HTMLElement;
        if (element) {
            intersectionObserverInit(element, props.store);
        }
    });

    return (
        /* @ts-ignore */
        <li ref={carouselItemRef} inert={props.store.notVisible}
            aria-label={(props.store.index + 1) + ' of ' + props.store.totalItems}
            aria-roledescription={props.store['aria-roledescription']}
            /* @ts-ignore */
            tabIndex="0"
            style={'--scroll-percentage:' + props.store.scrollPercentage + ';'}
        >
            <div id={'tabpanel-' + (props.store.index + 1)} role="tabpanel" aria-labelledby={'tab-' + (props.store.index + 1)} >SLIDE {props.store.index}


            </div>
        </li>

    );
});

const intersectionObserverInit = (element: HTMLElement, store: CarouselItemStore) => {
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

const _intersectionCallback = (entries: IntersectionObserverEntry[], store: CarouselItemStore) => {
    entries.forEach((entry) => {
        store.intersectionRatio = Math.round((entry.intersectionRatio + Number.EPSILON) * 100) / 100;
        store.fullyVisible = entry.intersectionRatio >= .95;
        store.partiallyVisible = entry.intersectionRatio < .95 && entry.intersectionRatio > 0;
        store.notVisible = entry.intersectionRatio === 0;
    });

};
