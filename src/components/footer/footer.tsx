import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './footer.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <footer>
      <a href="https://www.builder.io/" target="_blank">
        Made with ♡ by Builder.io
      </a>
    </footer>
  );
});
