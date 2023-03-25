import { component$, Slot, useSignal, useStore, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import styles from './section.css?inline';

let intersectionObserver: IntersectionObserver | undefined = undefined;
let scrollStopInterval: undefined | number;
export const Section = component$(() => {
    useStylesScoped$(styles);
    const store = useStore<SectionStore>({
        intersectionRatio: 0,
        visible: false,
        progress: 0,
        id: '',
    });
    const sentinelRef = useSignal<HTMLElement>();
    useVisibleTask$(() => {
        const element = sentinelRef.value as HTMLElement;
        if (element && element.parentElement) {
            intersectionObserverInit(element, store);
        }
        return () => {
            intersectionObserver?.disconnect();
        }
    });
    return (
        <>
            <section data-visible={String(store.visible) || String(false)}
                style={{ '--animation-progress': store.progress }}>
                <div class="content">
                    <Slot />
                </div>
                <div ref={sentinelRef} class="sentinel">

                    {store.progress}

                </div>
            </section>
        </>
    );
});



const intersectionObserverInit = (element: HTMLElement, store: SectionStore) => {
    intersectionObserver = new IntersectionObserver(
        ($event) => { _intersectionCallback($event, element, store) },
        {
            threshold: Array(1001)
                .fill(0)
                .map((x, i) => Math.round((i * 0.001 + Number.EPSILON) * 1000) / 1000),
        }
    );
    intersectionObserver.observe(element);
}

const _intersectionCallback = (entries: IntersectionObserverEntry[], element: HTMLElement, store: SectionStore) => {
    entries.forEach((entry) => {
        store.intersectionRatio = Math.round((entry.intersectionRatio + Number.EPSILON) * 100) / 100;
        let ratio = 100;
        if (entry.boundingClientRect.top > 0) {
            ratio = 100 - (100 - entry.intersectionRatio * 50);
        } else {
            ratio = 100 - entry.intersectionRatio * 50;
        }
        store.progress = Math.round((ratio / 100) * 10000) / 10000;
        store.visible = (store.progress !== 0 && store.progress !== 1);

        isFirstVisible(element, store);

    });

};



const isFirstVisible = (element: HTMLElement, store: SectionStore) => {

    const firstVisible = element.parentElement === document.body.querySelector("section[data-visible='true']");
    if (firstVisible) {
        hashChange(store);
        const previousScrollProgress: number = Number(document.body.getAttribute('data-scroll-amount')) || 0;
        const scrollingDown = previousScrollProgress <= window.scrollY;
        const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)).toFixed(3);
        const scrollSpeed = calculateScrollSpeed(previousScrollProgress);
        document.documentElement.setAttribute('data-scroll-amount', String(window.scrollY));
        document.documentElement.setAttribute('data-scroll-direction', scrollingDown ? 'down' : 'up');
        document.documentElement.setAttribute('data-scroll-progress', scrollProgress);
        document.documentElement.setAttribute('data-scroll-speed', scrollSpeed);
        document.documentElement.style.setProperty("--scroll-progress", scrollProgress);
        document.documentElement.style.setProperty("--scroll-amount", String(window.scrollY));
        document.documentElement.style.setProperty("--scroll-speed", scrollSpeed);
        detectIfScrollingHasStopped();
    }
}

const hashChange = (store: SectionStore) => {
    if (store.id) {
        if ('#' + store.id !== window.location.hash) {
            history.pushState(null, '', '#' + store.id);
        }
    }
}

const calculateScrollSpeed = (previousScrollProgress: number): string => {
    const scrollSpeed = Math.abs(window.scrollY - previousScrollProgress);
    if (scrollSpeed > 5) {
        return String(scrollSpeed / 100);
    }
    return String(0);
}

const detectIfScrollingHasStopped = (): void => {
    const position = window.scrollY;
    if (scrollStopInterval) {
        window.cancelAnimationFrame(scrollStopInterval);
    }
    scrollStopInterval = window.requestAnimationFrame(() => {
        if (position === window.scrollY) {
            document.documentElement.setAttribute('data-scrolling', 'false');
            document.documentElement.setAttribute('data-scroll-speed', '0');
            document.documentElement.style.setProperty("--scroll-speed", '0');
        } else {
            document.documentElement.setAttribute('data-scrolling', 'true');
        }


    });
}


export interface SectionStore {
    intersectionRatio: number;
    visible: boolean;
    progress: number;
    id: string;
}