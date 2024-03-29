import type { Signal} from '@builder.io/qwik';
import { useVisibleTask$} from '@builder.io/qwik';
import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import type { RouteLevelStore } from '~/routes/layout';
import styles from './drawer.css?inline';
let intersectionObserver: IntersectionObserver | undefined = undefined;
export const Drawer = component$((props: { store: RouteLevelStore }) => {
  useStylesScoped$(styles);
  const dialogRef = useSignal<Element>();
  const iframeRef = useSignal<Element>();
  useVisibleTask$(() => {
    return () => {
       intersectionObserver?.disconnect();
      }
});

  if (props.store?.l1.url) {
    return (
      <div class="drawer-wrapper"  style={'--intersection-ratio:' + props.store.l1.intersectionRatio}>
      <div class="drawer-inner" >
        <dialog ref={dialogRef}>
          <header>
            Title
          </header>
          <iframe ref={iframeRef} onLoad$={() => {
            iframeLoad(props.store, dialogRef, iframeRef);
          }} src={props.store?.l1.url} ></iframe>
        </dialog>
      </div>
      </div>
    );
  } else {
    return (
      <></>
    );
  }


});


const iframeLoad = (store: RouteLevelStore, dialogRef: Signal<Element | undefined>, iframeRef: Signal<Element | undefined>) => {
  const dialog = dialogRef.value as HTMLDialogElement;
  const iframe = iframeRef.value as HTMLIFrameElement;
  if (dialog && iframe) {
    console.log(store);
    dialog.show();
    setTimeout(() => { dialog.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" }) }, 0);
    intersectionObserverInit(store, iframe);
  }
}



const intersectionObserverInit = (store: RouteLevelStore, element: HTMLElement) => {
  intersectionObserver = new IntersectionObserver(
    (entries) => { intersectionObserverCallback(store, entries) },
    {
      root: this,
      threshold: Array(10)
        .fill(1)
        .map((x, i) => Math.round((i * 0.1 + Number.EPSILON) * 10) / 10),
    }
  );
  intersectionObserver.observe(element);
}

const intersectionObserverCallback = (store: RouteLevelStore, entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    store.l1.intersectionRatio = Math.round(( entry.intersectionRatio + Number.EPSILON) * 100) / 100;
  });
};

