import { component$, useClientEffect$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { Tile } from "~/components/elements/tiles";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "~/firebase";

export default component$(() => {
  const state = useStore({
    videoURL: "",
  });
  useClientEffect$(() => {
    getDownloadURL(ref(storage, "video.mp4"))
      .then((url) => {
        state.videoURL = url;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <br />
      <div class="text-OcastaHeaderText text-6xl text-center font-extrabold mt-28">
        Welcome to Project <span class="text-OcastaNameText">Ocasta</span>
      </div>
      <div class="text-OcastaPlainText text-xl max-w-screen-sm m-auto text-center mt-5">
        Here for people like you hoping to grow your knowledge and skills while
        changing the world.
      </div>
      <span class="flex justify-center mb-12">
        <Link
          class="bg-PrimaryButton text-OcastaHeaderText text-center text-lg rounded p-4 w-48 font-bold m-2"
          href="getstarted"
        >
          Get Started
        </Link>
        <Link
          class="bg-SecondaryButton text-OcastaHeaderText text-center text-lg rounded p-4 w-48 font-bold m-2"
          href="/locations"
        >
          Our Locations
        </Link>
      </span>
      <video
        controls
        class="m-auto"
        src={state.videoURL}
        style={{ width: "896px", height: "504px" }}
      />
      <div class="text-OcastaHeaderText text-5xl text-center font-bold mt-24">
        Find people like you!
      </div>
      <div class="text-OcastaPlainText text-xl max-w-screen-sm m-auto text-center mt-5">
        Each person is placed in a different group based on their skills and
        interests. You will be able to work on large team projects while
        contributing what you are best at.
      </div>
      <div class="grid grid-cols-3 gap-4 mt-12 mb-28 max-w-6xl m-auto">
        <Tile
          src="/feature-tile-icon-01.svg"
          title="Work in Production"
          text="Learning to do things in production is important for any future career. You will be able to work with other members to build a production ready project."
        />
        <Tile
          src="/feature-tile-icon-02.svg"
          title="Web and Open Source"
          text="Everything we do is done on the web. All our work is open source and accessible to everyone. Open source is a great way to learn new technologies and share your work with the world."
        />
        <Tile
          src="/feature-tile-icon-03.svg"
          title="Feedback"
          text="Getting feedback is a great way to improve your skills as you will learn about new things that you didn't think about before! Using open-sourcing we can connect you to users all over the world!"
        />
        <Tile
          src="/feature-tile-icon-04.svg"
          title="Distribution and Collaboration"
          text="Distributing work among other members and collaborating with people of different skill sets will give you the opportunity to create your vision."
        />
        <Tile
          src="/feature-tile-icon-05.svg"
          title="Work at your Pace"
          text="There will always be need for easy solutions and you can work up the ranks at your own speed."
        />
        <Tile
          src="/feature-tile-icon-06.svg"
          title="Find your Future"
          text="If you aren't sure what you are best at still feel free to join us! We can try to find somthing for you! The more people the better!"
        />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Project Ocasta",
};
