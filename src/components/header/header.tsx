import { component$, useStore, useClientEffect$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "~/firebase";

export default component$(() => {
  const state = useStore({
    isLoggedIn: false,
  });
  useClientEffect$(() => {
    onAuthStateChanged(auth, (user) => {
      state.isLoggedIn = !!user;
    });
  });
  return (
    <header>
      <Link href="/">
        <img
          src="/icon.svg"
          alt="logo"
          class="w-10 mt-6 ml-6 float-left cursor-pointer"
        />
      </Link>

      <span>
        <Link
          class="bg-PrimaryButton text-OcastaHeaderText text-lg text-center rounded p-2 w-32 font-bold float-right mr-24 mt-6"
          href={state.isLoggedIn ? "profile" : "authentication"}
        >
          {state.isLoggedIn ? "Profile" : "Sign Up"}
        </Link>
        <Link
          class="text-OcastaPlainText text-lg rounded p-2 w-32 font-bold float-right mr-12 mt-6"
          href="/teams"
        >
          Teams
        </Link>
      </span>
    </header>
  );
});
