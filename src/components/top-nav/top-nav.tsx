import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './top-nav.css?inline';

export const TopNav = component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="logo">
      </div>
      <ul>
        <li>
          <a
            href="https://qwik.builder.io/docs/components/overview/"
            target="_blank"
            rel="noopener"
          >
            Docs
          </a>
        </li>
        <li>
          <a
            href="https://qwik.builder.io/examples/introduction/hello-world/"
            target="_blank"
            rel="noopener"
          >
            Examples
          </a>
        </li>
        <li>
          <a
            href="https://qwik.builder.io/tutorial/welcome/overview/"
            target="_blank"
            rel="noopener"
          >
            Tutorials
          </a>
        </li>
      </ul>
    </header>
  );
});
