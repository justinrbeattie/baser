import { component$, Slot, useSignal, useVisibleTask$ } from '@builder.io/qwik';



export const Icon = component$((props: IconProps) => {
    const iconRef = useSignal<Element>();
    useVisibleTask$(() => {
        if (iconRef.value) {
            const svg: SVGElement = iconRef.value.firstElementChild as SVGElement;
            if (props['title'] !== undefined) {
                const title = document.createElement("title");
                title.innerText = props['title'];
                svg.prepend(title);
            }
            svg.setAttribute('aria-hidden', props['aria-hidden']);
            svg.setAttribute('role', props['role'] || 'img');

        }
    });

    return (
        <span ref={iconRef}>
            <Slot />
        </span>
    );
});


interface IconProps {
    'aria-hidden': 'true' | 'false',
    title?: string,
    role?: string,
}