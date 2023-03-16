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
          href="projects"
        >
          Our Projects
        </Link>
        <Link
          class="bg-SecondaryButton text-OcastaHeaderText text-center text-lg rounded p-4 w-48 font-bold m-2"
          href="mailto:contact@projectocasta.org"
        >
          Contact Us
        </Link>
      </span>
      <video
        controls
        class="m-auto"
        src={state.videoURL}
        style={{ width: "896px", height: "504px" }}
      />
      <div class="text-OcastaHeaderText text-5xl text-center font-bold mt-24">
        Making Tools for the Future
      </div>
      <div class="text-OcastaPlainText text-xl max-w-screen-sm m-auto text-center mt-5">
        Ocasta is here to make software that will change the world.
      </div>
      <div class="grid grid-cols-3 gap-4 mt-12 mb-28 max-w-6xl m-auto">
        <Tile
          src="/assets/feature-tile-icon-01.svg"
          title="Our Philosophy"
          text="All of our projects are made to acomplish a single goal. Nothing more. Nothing less. We believe that simplicity is the key to making the best software."
        />
        <Tile
          src="/assets/feature-tile-icon-02.svg"
          title="Web and Open Source"
          text="We believe that the web is the future and that open source is the best way to make it happen. All of our projects are open source to ensure user privacy and security and allow anyone to contribute."
        />
        <Tile
          src="/assets/feature-tile-icon-03.svg"
          title="Feedback"
          text="We are always looking for feedback from the community. If you have any ideas or suggestions for our projects, feel free to let us know using our email or social media."
        />
        <Tile
          src="/assets/feature-tile-icon-04.svg"
          title="Distribution and Collaboration"
          text="We believe that the best way to make our projects better is to make them open source and allow collaboration. We are always looking for new people to join us in our efforts."
        />
        <Tile
          src="/assets/feature-tile-icon-05.svg"
          title="Our Projects"
          text="You can find all of our projects on our GitHub. We are always looking for new ideas and suggestions for new projects. If you have any ideas, feel free to let us know!"
        />
        <Tile
          src="/assets/feature-tile-icon-06.svg"
          title="Our Team"
          text="Its just me, the creator of Ocasta, working on these projects. Contributions are always welcome. If you would like to help, open a pull request on our GitHub!"
        />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Project Ocasta",
};
