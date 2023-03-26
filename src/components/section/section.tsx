import { component$, Slot, useSignal, useStore, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import styles from './section.css?inline';


let intersectionObserver: IntersectionObserver | undefined = undefined;
let scrollStopInterval: undefined | number;
export const Section = component$((props:{tag?:'header' | 'section' | 'footer'}) => {
    const Tag = props.tag || 'section' as any;
    useStylesScoped$(styles);
    const store = useStore<SectionStore>({
        intersectionRatio: 0,
        visible: false,
        progress: 0,
        id: '',
    });
    const sentinelRef = useSignal<HTMLElement>();
    useVisibleTask$(() => {
        const sentinelElement = sentinelRef.value as HTMLElement;
        if (sentinelElement) {
            intersectionObserverInit(sentinelElement, store);
        }
        return () => {
            intersectionObserver?.disconnect();
        }
    });
    return (
  
            <Tag 
                data-visible={String(store.visible) || String(false)}
                style={{ '--animation-progress': store.progress }}
                class={
                    'page-section ' +
                    (store.progress > 0 ? ' animation-progress-0 ' : '') +
                    (store.progress > 0.25 ? ' animation-progress-25 ' : '') +
                    (store.progress > 0.5 ? ' animation-progress-50 ' : '') +
                    (store.progress > 0.75 ? ' animation-progress-75 ' : '') +
                    (store.progress === 1 ? ' animation-progress-100 ' : '')
                  }
                >
                <div class="content">
                    <Slot />
                </div>
                <div class="sentinel-wrapper">
                    <div class="sentinel" ref={sentinelRef}>
                        {store.progress}
                    </div>
                </div>
            </Tag>
    );
});

export const Header = Section;
export const Footer = Section;


const intersectionObserverInit = (sentinelElement: HTMLElement, store: SectionStore) => {
    intersectionObserver = new IntersectionObserver(
        ($event) => { _intersectionCallback($event,sentinelElement, store) },
        {
            threshold: Array(1001)
                .fill(0)
                .map((x, i) => Math.round((i * 0.001 + Number.EPSILON) * 1000) / 1000),
        }
    );
    intersectionObserver.observe(sentinelElement);
}

const _intersectionCallback = (entries: IntersectionObserverEntry[], sentinelElement: HTMLElement, store: SectionStore) => {
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

        isFirstVisible(sentinelElement, store);

    });

};



const isFirstVisible = (sentinelElement: HTMLElement, store: SectionStore) => {

    const firstVisible = sentinelElement.closest('.page-section') === document.body.querySelector(".page-section[data-visible='true']");
    if (firstVisible) {
        hashChange(store);
        const previousScrollProgress: number = Number(document.documentElement.getAttribute('data-scroll-amount')) || 0;
        const scrollingDown = previousScrollProgress <= window.scrollY;
        const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)).toFixed(3);
        const scrollSpeed = calculateScrollSpeed(previousScrollProgress);
        document.documentElement.setAttribute('data-scroll-amount', String(window.scrollY));
        document.documentElement.setAttribute('data-scroll-direction', scrollingDown ? 'down' : 'up');
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