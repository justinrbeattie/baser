import { component$, Slot, useSignal, useVisibleTask$} from '@builder.io/qwik';

export const CarouselSlide = component$((props: CarouselSlide) => {
    const carouselItemRef = useSignal<HTMLElement>();
    const ariaRoleDescription = props['aria-roledescription'];
    useVisibleTask$(() => {
        const element = carouselItemRef.value as HTMLElement;
        if (element?.parentElement) {
            element.parentElement.setAttribute('aria-roledescription', ariaRoleDescription);
        }
    });
    return (
        <div class="carousel-slide"  role="tabpanel">
          <Slot></Slot>
        </div>
    );
});


export interface CarouselSlide {
    'q:slot': string,
    'aria-roledescription': string,
}
