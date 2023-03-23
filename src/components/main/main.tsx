import { component$, Slot, useStore, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import styles from './main.css?inline';



export const Main = component$(() => {
    useStylesScoped$(styles);
    const location = useLocation();
    const pageAnimationStore = useStore<PageAnimationStore>({
        previousPage: { name: 'index', pathname: '/', active: false, x: 1, y: 1 },
        pageList: [
            { name: 'index', pathname: '/', active: false, x: 1, y: 1 },
            { name: 'flower', pathname: '/flower/', active: false, x: 2, y: 1 },
            { name: 'todolist', pathname: '/todolist/', active: false, x: 3, y: 1 }],
        pageStyleString: '--page-animation:var(--animation-page-slide-in-from-center-middle)',
    }, { recursive: true });

    useVisibleTask$(({ track }) => {
        track(() => [location.url.pathname]);
        pageAnimationStore.pageList.forEach((page) => {
            page.active = page.pathname === location.url.pathname;
            if (page.active) {
                const previousX = pageAnimationStore.previousPage.x;
                const previousY = pageAnimationStore.previousPage.y;
                const x: "left" | "middle" | "right" | undefined = page.x > previousX ? 'right' : (page.x === previousX ? 'middle' : 'left');
                const y: "top" | "center" | "bottom" | undefined = page.y > previousY ? 'bottom' : (page.y === previousY ? 'center' : 'top');
                pageAnimationStore.pageStyleString = `--page-animation:var(--animation-page-slide-in-from-${y}-${x})`;
                pageAnimationStore.previousPage = page;
            }

        });
    });


    return (
        <>
            <main style={pageAnimationStore.pageStyleString}>
                <Slot />
            </main>
        </>
    );
});


export interface PageAnimationStore {
    previousPage: PageItem;
    pageList: PageItem[];
    pageStyleString: string;
}
export interface PageItem {
    name: string;
    pathname: string;
    active: boolean;
    x: number;
    y: number;
}
