export function Tile(props: any) {
  return (
    <div class="flex flex-col items-center mt-8">
      <img src={props.src} alt="icon" class="rounded-full bg-OcastaNameText" />
      <div class="text-OcastaHeaderText text-2xl font-bold mt-4">
        {props.title}
      </div>
      <div class="text-OcastaPlainText text-lg max-w-xs m-auto text-center mt-2">
        {props.text}
      </div>
    </div>
  );
}
