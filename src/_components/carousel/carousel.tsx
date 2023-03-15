import { component$, useSignal, useStore, useStylesScoped$, useTask$ } from '@builder.io/qwik';
import { CarouselItem } from './carousel-item/carousel-item';
import styles from './carousel.css?inline';

export const Carousel = component$(() => {
    const carouselRef = useSignal<Element>();
    const store = useStore<CarouselStore>({
        defaultItemWidth:'400px',
        defaultItemHeight:'500px',
        'aria-label': 'Featured Items Carousel',
        'aria-roledescription': 'carousel',
        'item-aria-roledescription': 'Items',
        scrolledToStart: true,
        scrolledToEnd: false,
        carouselItemList: [
            {
                index: 0,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                'aria-label': 'item',
                'aria-roledescription': 'item',
            },
            {
                index: 1,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                'aria-label': 'item',
                'aria-roledescription': 'item',
            },
            {
                index: 2,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                'aria-label': 'item',
                'aria-roledescription': 'item',
            },
            {
                index: 3,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                'aria-label': 'item',
                'aria-roledescription': 'item',
            },
            {
                index: 4,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                'aria-label': 'item',
                'aria-roledescription': 'item',
            },
            {
                index: 5,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                'aria-label': 'item',
                'aria-roledescription': 'item',
            },
            {
                index: 6,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                'aria-label': 'item',
                'aria-roledescription': 'item',
            },
            {
                index: 7,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                'aria-label': 'item',
                'aria-roledescription': 'item',
            },
            {
                index: 8,
                intersectionRatio: 0,
                fullyVisible: false,
                firstFullyVisible: false,
                lastFullyVisible: false,
                partiallyVisible: false,
                notVisible: false,
                totalItems: 9,
                'aria-label': 'item',
                'aria-roledescription': 'item',
            }
        ]
    }, { recursive: true });
    useStylesScoped$(styles);
    useTask$(({ track }) => {

        track(() => store.carouselItemList.map(item => item.fullyVisible));
        if (carouselRef.value) {
            store.carouselItemList.forEach((item) => { item.firstFullyVisible = false; item.lastFullyVisible = false; });
            const fullyVisible = store.carouselItemList.filter((item) => item.fullyVisible);
            if (fullyVisible) {
                const lastVisibleItemIndex = fullyVisible.length - 1;
                if(fullyVisible[0]) {
                    fullyVisible[0].firstFullyVisible = true;
                }
                if( fullyVisible[lastVisibleItemIndex]) {
                    fullyVisible[lastVisibleItemIndex].lastFullyVisible = true;
                }

            }
            const lastItemIndex = store.carouselItemList.length - 1;
            store.scrolledToStart = store.carouselItemList[0].firstFullyVisible;
            store.scrolledToEnd = store.carouselItemList[lastItemIndex].lastFullyVisible;
        }

    });


    return (
        <div class="carousel" ref={carouselRef}
            aria-label={store['aria-label']}
            aria-roledescription={store['aria-roledescription']}

            style={'--default-item-width:' + store.defaultItemWidth + ';' + '--default-item-height:' + store.defaultItemHeight + ';'}
        >
            <button
                type="button"
                title="Previous Item"
                aria-controls="scroll-container"
                aria-label="Previous Item"
                disabled={store.scrolledToStart}
                class={store.scrolledToStart ? 'flipper hidden' : 'flipper visible'}
                onClick$={() => { navigateDirection('previous', carouselRef.value); }}>
                <i class="las la-angle-left">L</i>
            </button>
            <ul class="scroll-container"
                role="group"
                aria-label={store['item-aria-roledescription'] + ' scroll container'}
                aria-live="polite">
                {store.carouselItemList.map((carouselItem, i) =>
                    <CarouselItem key={i} store={carouselItem}></CarouselItem>

                )}
            </ul>
            <button
                type="button"
                title="Next Item"
                aria-controls="scroll-container"
                aria-label="Next Item"
                disabled={store.scrolledToEnd}
                class={store.scrolledToEnd ? 'flipper hidden' : 'flipper visible'}
                onClick$={() => { navigateDirection('next', carouselRef.value) }}>
                <i class="las la-angle-right">R</i>
            </button>

            <nav class="pagination">
                {store.carouselItemList.map((carouselItem, i) =>
                    <button
                        class="pagination-item"
                        type="button"
                        role="tab"
                        title={'Item ' + (carouselItem.index + 1) + ': ' + carouselItem['aria-label']}
                        aria-label={carouselItem['aria-label']}
                        aria-setsize={carouselItem.totalItems}
                        aria-posinset={carouselItem.index + 1}
                        aria-controls="carousel-item-1"
                        aria-selected={carouselItem.fullyVisible}
                        onClick$={() => { navigateToIndex(i, carouselRef.value) }}
                        /* @ts-ignore */
                        tabindex="-1"
                    ></button>

                )}

            </nav>

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


export interface CarouselStore {
    'aria-label': string;
    'aria-roledescription': string;
    'item-aria-roledescription': string;
    scrolledToStart: boolean;
    scrolledToEnd: boolean;
    carouselItemList: CarouselItemStore[];
    defaultItemWidth:string;
    defaultItemHeight:string;
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
}