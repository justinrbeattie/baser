import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './bottom-nav.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <aside bottom-nav>

    </aside>
  );
});
