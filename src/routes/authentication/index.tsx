import { component$, useStore, useRef, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "~/firebase";

export default component$(() => {
  const signupEmailRef = useRef<HTMLInputElement>() as any;
  const signupPasswordRef = useRef<HTMLInputElement>() as any;
  const signupConfirmPasswordRef = useRef<HTMLInputElement>() as any;
  const loginEmailRef = useRef<HTMLInputElement>() as any;
  const loginPasswordRef = useRef<HTMLInputElement>() as any;

  const state = useStore({
    loading: false,
  });

  const handleSignup = $(async () => {
    state.loading = true;
    try {
      if (
        signupPasswordRef.current.value !==
        signupConfirmPasswordRef.current.value
      ) {
        throw new Error("Passwords do not match");
      }
      await createUserWithEmailAndPassword(
        auth,
        signupEmailRef.current.value,
        signupPasswordRef.current.value
      );
      await sendEmailVerification(auth.currentUser);
      await updateProfile(auth.currentUser, {
        displayName: signupEmailRef.current.value.split("@")[0],
      });
      location.href = "/";
    } catch (error: any) {
      alert(error.message);
    } finally {
      state.loading = false;
    }
  });

  const handleLogin = $(async () => {
    state.loading = true;
    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmailRef.current.value,
        loginPasswordRef.current.value
      );
      location.href = "/";
    } catch (error: any) {
      alert(error.message);
    } finally {
      state.loading = false;
    }
  });

  const handleGoogleAuth = $(async () => {
    state.loading = true;
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      location.href = "/";
    } catch (error: any) {
      alert(error.message);
    } finally {
      state.loading = false;
    }
  });

  return (
    <>
      <br />
      <div class="w-full justify-center flex mt-20">
        <div class="w-1/2 float-left">
          <div class="text-OcastaHeaderText text-6xl text-center w-full font-extrabold">
            Create Account
          </div>
          <form
            class="w-full mt-10"
            onSubmit$={() => handleSignup()}
            preventDefault:submit
          >
            <label class="text-OcastaHeaderText text-sm font-bold mb-1 justify-center flex">
              Email
            </label>
            <input
              class="border border-OcastaHeaderText w-1/3 rounded py-2 px-3 text-OcastaHeaderText m-auto justify-center flex bg-OcastaBG"
              placeholder="example@projectocasta.org"
              name="email"
              ref={signupEmailRef}
            />
            <br />
            <label class="text-OcastaHeaderText text-sm font-bold mb-2 justify-center flex">
              Password
            </label>
            <input
              class="border border-OcastaHeaderText w-1/3 rounded py-2 px-3 text-OcastaHeaderText m-auto justify-center flex bg-OcastaBG"
              placeholder="Type Password Here"
              name="password"
              type="password"
              ref={signupPasswordRef}
            />
            <br />
            <label class="text-OcastaHeaderText text-sm font-bold mb-2 justify-center flex">
              Confirm Password
            </label>
            <input
              class="border border-OcastaHeaderText w-1/3 rounded py-2 px-3 text-OcastaHeaderText m-auto justify-center flex bg-OcastaBG"
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              ref={signupConfirmPasswordRef}
            />
            <br />
            <button
              class="bg-PrimaryButton w-1/4 rounded py-2 px-3 text-OcastaHeaderText m-auto justify-center flex"
              type="submit"
              disabled={state.loading}
            >
              Create Account
            </button>
          </form>
        </div>

        <div class="w-1/2 float-right">
          <div class="text-OcastaHeaderText text-6xl text-center w-full font-extrabold">
            Login
          </div>
          <form
            class="w-full mt-10"
            onSubmit$={() => handleLogin()}
            preventDefault:submit
          >
            <label class="text-OcastaHeaderText text-sm font-bold mb-1 justify-center flex">
              Email
            </label>
            <input
              class="border border-OcastaHeaderText w-1/3 rounded py-2 px-3 text-OcastaHeaderText m-auto justify-center flex bg-OcastaBG"
              placeholder="example@projectocasta.org"
              name="email"
              ref={loginEmailRef}
            />
            <br />
            <label class="text-OcastaHeaderText text-sm font-bold mb-2 justify-center flex">
              Password
            </label>
            <input
              class="border border-OcastaHeaderText w-1/3 rounded py-2 px-3 text-OcastaHeaderText m-auto justify-center flex bg-OcastaBG"
              placeholder="Type Password Here"
              name="password"
              type="password"
              ref={loginPasswordRef}
            />
            <br />
            <button
              class="bg-PrimaryButton w-1/4 rounded py-2 px-3 text-OcastaHeaderText m-auto justify-center flex"
              type="submit"
              disabled={state.loading}
            >
              Login
            </button>
          </form>
          <br />
          <button
            class="rounded mt-6 py-2 px-3 text-OcastaHeaderText m-auto justify-center flex outline border border-OcastaHeaderText"
            onClick$={() => handleGoogleAuth()}
          >
            <img src="/Google_Logo.svg" class="w-6 h-6" />
            <p class="ml-2"> Authenticate with Google </p>
          </button>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Project Ocasta - Authentication",
};
