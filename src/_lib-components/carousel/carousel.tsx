import { component$, Slot, useSignal, useStore, useStylesScoped$, useTask$ } from '@builder.io/qwik';
import { CarouselItem } from './carousel-item/carousel-item';
import styles from './carousel.css?inline';
import { InNavArrowLeft, InNavArrowRight } from "@qwikest/icons/iconoir";
import { Icon } from '../icon/icon';


export const Carousel = component$(() => {
    const carouselRef = useSignal<Element>();
    const store = useStore<CarouselStore>({
        'aria-label': 'Featured Items Carousel',
        'items-aria-label': 'Items',
        defaultItemWidth: '400px',
        defaultItemHeight: '500px',
        scrolledToStart: true,
        scrolledToEnd: false,
        scrollTimelineTracking: true,
        showTabNavigation: true,
        carouselItemList: [
            {
                'aria-label': 'item',
                'aria-roledescription': 'item',
                index: 0,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                scrollPercentage: 0,
            },
            {
                'aria-label': 'item',
                'aria-roledescription': 'item',
                index: 1,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                scrollPercentage: 0,
            },
            {
                'aria-label': 'item',
                'aria-roledescription': 'item',
                index: 2,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                scrollPercentage: 0,
            },
            {
                'aria-label': 'item',
                'aria-roledescription': 'item',
                index: 3,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                scrollPercentage: 0,
            },
            {
                'aria-label': 'item',
                'aria-roledescription': 'item',
                index: 4,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                scrollPercentage: 0,
            },
            {
                'aria-label': 'item',
                'aria-roledescription': 'item',
                index: 5,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                scrollPercentage: 0,
            },
            {
                'aria-label': 'item',
                'aria-roledescription': 'item',
                index: 6,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                scrollPercentage: 0,
            },
            {
                'aria-label': 'item',
                'aria-roledescription': 'item',
                index: 7,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                scrollPercentage: 0,
            },
            {
                'aria-label': 'item',
                'aria-roledescription': 'item',
                index: 8,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                scrollPercentage: 0,
            }
        ]
    }, { recursive: true });
    useStylesScoped$(styles);
    useTask$(({ track }) => {
        if (store.scrollTimelineTracking) {
            track(() => store.carouselItemList.map(item => item.intersectionRatio));
            trackVisible(store, carouselRef.value);
            scrollTimelineTracking(store, carouselRef.value);
        } else {
            track(() => store.carouselItemList.map(item => item.fullyVisible));
            trackVisible(store, carouselRef.value);
            scrollTimelineTracking(store, carouselRef.value);
        }

    });


    return (
        <div class="carousel" ref={carouselRef}
            aria-label={store['aria-label']}


            style={'--default-item-width:' + store.defaultItemWidth + ';' + '--default-item-height:' + store.defaultItemHeight + ';'}
        >
            <button
                type="button"
                title="Previous Item"
                aria-label="Previous Item"
                disabled={store.scrolledToStart}
                class={store.scrolledToStart ? 'flipper hidden' : 'flipper visible'}
                onClick$={() => { navigateDirection('previous', carouselRef.value); }}>
                          <Icon aria-hidden="true">
                    <InNavArrowLeft/>
                </Icon>
            </button>
            <ul class="scroll-container"
                /* @ts-ignore */
                tabIndex="0"
                aria-label={store['items-aria-label'] + ' scroll container'}
                aria-live="polite">
                {store.carouselItemList.map((carouselItem,i) =>
                    <CarouselItem key={i} store={carouselItem}>
                        <Slot name={'slide-' + i}></Slot>
                    </CarouselItem>

                )}
            </ul>
            <button
                type="button"
                title="Next Item"
                aria-label="Next Item"
                disabled={store.scrolledToEnd}
                class={store.scrolledToEnd ? 'flipper hidden' : 'flipper visible'}
                onClick$={() => { navigateDirection('next', carouselRef.value) }}>
                <Icon aria-hidden="true">
                    <InNavArrowRight/>
                </Icon>
            </button>

            {store.showTabNavigation ?
                <nav class="pagination" role="tablist" aria-multiselectable>
                    {store.carouselItemList.map((carouselItem) =>
                        <button
                            class="pagination-item"
                            type="button"
                            role="tab"
                            id={'tab-' + ((carouselItem?.index || 0) + 1)}
                            aria-controls={'tabpanel-' + ((carouselItem?.index || 0) + 1)}
                            title={'Item ' + ((carouselItem?.index || 0) + 1) + ': ' + carouselItem['aria-label']}
                            aria-label={carouselItem['aria-label']}
                            aria-setsize={carouselItem.totalItems}
                            aria-posinset={(carouselItem?.index || 0) + 1}
                            aria-expanded={carouselItem.fullyVisible}
                            onClick$={() => { navigateToIndex((carouselItem?.index || 0), carouselRef.value) }}
                            /* @ts-ignore */ 
                            tabindex="-1"
                        ></button>
                    )}

                </nav>
                : ''}


        </div>
    );
});


const navigateDirection = (direction: 'previous' | 'next', carousel: Element | undefined) => {
    if (carousel) {
        const ul = carousel.querySelector('ul');
        if (ul) {
            if (direction === 'previous') {
                ul.scrollTo({ left: ul.scrollLeft - (carousel.clientWidth / 2) })
            } else if (direction === 'next') {
                ul.scrollTo({ left: ul.scrollLeft + (carousel.clientWidth / 2) })
            }

        }
    }

}

const navigateToIndex = (index: number, carousel: Element | undefined) => {
    if (carousel) {
        const ul = carousel.querySelector('ul');
        if (ul) {
            const li = ul.children[index];
            li.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }

}


const trackVisible = (store: CarouselStore, carousel: Element | undefined) => {
    if (carousel) {
        store.carouselItemList.forEach((item) => { item.firstFullyVisible = false; item.lastFullyVisible = false; });
        const fullyVisible = store.carouselItemList.filter((item) => item.fullyVisible);
        if (fullyVisible) {
            const lastVisibleItemIndex = fullyVisible.length - 1;
            if (fullyVisible[0]) {
                fullyVisible[0].firstFullyVisible = true;
            }
            if (fullyVisible[lastVisibleItemIndex]) {
                fullyVisible[lastVisibleItemIndex].lastFullyVisible = true;
            }

        }
        const lastItemIndex = store.carouselItemList.length - 1;
        store.scrolledToStart = store.carouselItemList[0].firstFullyVisible || false;
        store.scrolledToEnd = store.carouselItemList[lastItemIndex].lastFullyVisible || false;
    }

}

const scrollTimelineTracking = (store: CarouselStore, carousel: Element | undefined) => {
    if (carousel) {
        store.carouselItemList.forEach((item, i) => {
            const element = carousel?.querySelector('ul')?.children[i];
            if (element && element.parentElement) {
                const rect = element.getBoundingClientRect();
                const parentRect = element.parentElement.getBoundingClientRect();
                const right = (rect.x - parentRect.x) + (rect.width);
                item.scrollPercentage = Math.round(((right / element.parentElement.offsetWidth) + Number.EPSILON) * 100) / 100;
            }

        });

    }

}


export interface CarouselStore {
    'aria-label': string;
    'items-aria-label': string;
    scrolledToStart: boolean;
    scrolledToEnd: boolean;
    carouselItemList: CarouselItemStore[];
    defaultItemWidth: string;
    defaultItemHeight: string;
    scrollTimelineTracking: boolean;
    showTabNavigation: boolean;
}

export interface CarouselItemStore {
    'aria-roledescription': 'item',
    'aria-label': string;
    index: number;
    intersectionRatio: number;
    fullyVisible: boolean;
    firstFullyVisible: boolean;
    lastFullyVisible: boolean;
    partiallyVisible: boolean;
    notVisible: boolean;
    totalItems: number;
    scrollPercentage: number;
}

