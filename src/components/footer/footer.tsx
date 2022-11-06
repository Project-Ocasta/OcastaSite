import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <footer>
      <Link href="/">
        <img src="/icon.svg" alt="logo" class="w-8 ml-6 cursor-pointer" />
      </Link>
      <div class="m-6 text-OcastaPlainText float-left">
        <span class="text-OcastaHeaderText">
          <Link href="/">Project Ocasta</Link>
        </span>
        . All right reserved
      </div>
      <div class="m-6 text-OcastaPlainText float-right">
        <Link class="m-4" href="mailto:contact@projectocasta.org">
          Contact
        </Link>
        <Link class="m-4" href="/about">
          About
        </Link>
        <Link class="m-4" href="/faq">
          FAQ's
        </Link>
      </div>
    </footer>
  );
});
