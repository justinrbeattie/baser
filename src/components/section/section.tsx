import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import styles from './section.css?inline';



export const Section = component$(() => {
    useStylesScoped$(styles);


    return (
        <>
            <section>
                <div class="content">
                    <Slot />
                </div>
            </section>
        </>
    );
});


