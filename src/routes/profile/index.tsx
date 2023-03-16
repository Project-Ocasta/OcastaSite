import {
  component$,
  useClientEffect$,
  useStore,
  $,
  useRef,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
  signOut,
  sendPasswordResetEmail,
  deleteUser,
  updateEmail,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth } from "~/firebase";
import { storage } from "~/firebase";

export default component$(() => {
  const state = useStore({
    displayName: "Loading...",
    email: "Loading...",
    photoURL: "/icon.svg",
  });

  const changeUsername = $(async () => {
    try {
      const newUsername = prompt("Enter new username");
      if (!newUsername) {
        throw new Error("No username entered");
      }
      await updateProfile(auth.currentUser, {
        displayName: newUsername,
      });
      alert("Username updated");
    } catch (error: any) {
      alert(error.message);
    }
  });

  const changeEmail = $(async () => {
    try {
      const newEmail = prompt("Enter new email");
      if (!newEmail) {
        throw new Error("No email entered");
      }
      await updateEmail(auth.currentUser, newEmail);
      await updateProfile(auth.currentUser, {
        displayName: newEmail.split("@")[0],
      });
      alert("Email updated");
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        alert("For security reasons, please login again!");
      } else {
        alert(error.message);
      }
    }
  });

  const changePassword = $(async () => {
    try {
      await sendPasswordResetEmail(auth, auth.currentUser.email);
      alert("Password reset email sent");
    } catch (error: any) {
      alert(error.message);
    }
  });

  const signOutUser = $(async () => {
    try {
      await signOut(auth);
      location.href = "/";
    } catch (error: any) {
      alert(error.message);
    }
  });

  const deleteAccount = $(async () => {
    try {
      if (
        auth.currentUser.email !==
        prompt("Enter your email to confirm account deletion")
      ) {
        throw new Error("Emails do not match");
      }
      await deleteUser(auth.currentUser);
      alert("Account deleted");
      location.href = "/";
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        alert("For security reasons, please login again!");
        await signOut(auth);
        location.href = "/authentication";
      } else {
        alert(error.message);
      }
    }
  });

  const inputFile = useRef<HTMLInputElement>() as any;
  const ProfileClick = $(async () => {
    inputFile.current.click();
  });
  const uploadProfilePicture = $(async () => {
    try {
      const file = inputFile.current.files[0];
      const storageRef = ref(
        storage,
        `pfps/${auth.currentUser.uid}/profile.png`
      );
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await updateProfile(auth.currentUser, {
        photoURL: url,
      });
      state.photoURL = auth.currentUser.photoURL;
    } catch (error: any) {
      alert(error.message);
    }
  });

  useClientEffect$(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        state.displayName = auth.currentUser.displayName;
        state.email = auth.currentUser.email;
        if (auth.currentUser.photoURL) {
          state.photoURL = auth.currentUser.photoURL;
        }
      }
    });
  });

  return (
    <>
      <br />
      <div class="text-center mt-14 text-5xl text-OcastaHeaderText font-bold">
        Welcome {state.displayName}!
      </div>
      <div class="w-full m-auto mt-10 h-96">
        <div class="w-1/2 float-left">
          <input
            type="file"
            ref={inputFile}
            onChange$={() => uploadProfilePicture()}
            class="hidden"
          />
          <img
            class="w-64 h-64 rounded-full m-auto cursor-pointer"
            src={state.photoURL}
            onClick$={() => ProfileClick()}
          />
          <div class="text-center mt-8 text-2xl text-OcastaHeaderText font-bold">
            {state.email}
          </div>
        </div>
        <div class="w-1/2 float-right">
          <div class="text-2xl text-OcastaHeaderText font-bold">
            Account Settings
          </div>
          <button
            class="bg-PrimaryButton text-OcastaHeaderText font-bold py-2 px-4 rounded-md mt-2 mr-2"
            onClick$={() => changeUsername()}
          >
            Change Username
          </button>
          <button
            class="bg-PrimaryButton text-OcastaHeaderText font-bold py-2 px-4 rounded-md mt-2 mr-2 ml-2"
            onClick$={() => changeEmail()}
          >
            Change Email
          </button>
          <button
            class="bg-PrimaryButton text-OcastaHeaderText font-bold py-2 px-4 rounded-md mt-2 ml-2"
            onClick$={() => changePassword()}
          >
            Change Password
          </button>
          <br />
          <div class="text-2xl text-OcastaHeaderText font-bold mt-4">
            Danger Zone
          </div>
          <button
            class="text-Alert font-bold py-2 px-4 rounded-md mt-2 outline border-1 border-Alert"
            onClick$={() => signOutUser()}
          >
            Sign Out
          </button>
          <br />
          <button
            class="bg-Alert text-OcastaHeaderText font-bold py-2 px-4 rounded-md mt-2"
            onClick$={() => deleteAccount()}
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Project Ocasta - Profile",
};
