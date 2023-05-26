export function LinkList() {
  return (
    <div className="my-8 flex flex-col items-center text-center">
      <ul className="flex w-full flex-col gap-4">
        <a href="https://github.com/mrfelipelima">
          <li className="flex h-14 w-full items-center justify-center rounded bg-secondaryShadow2 duration-300 hover:bg-secondaryShadow1 focus:outline-none focus-visible:ring focus-visible:ring-primaryColor focus-visible:ring-opacity-75">
            GitHub
          </li>
        </a>
        <a href="https://twitch.tv/mrfelipelima">
          <li className="flex h-14 w-full items-center justify-center rounded bg-secondaryShadow2 duration-300 hover:bg-secondaryShadow1 focus:outline-none focus-visible:ring focus-visible:ring-primaryColor focus-visible:ring-opacity-75">
            Twitch
          </li>
        </a>
        <a href="https://facebook.com/GGfelipelima">
          <li className="flex h-14 w-full items-center justify-center rounded bg-secondaryShadow2 duration-300 hover:bg-secondaryShadow1 focus:outline-none focus-visible:ring focus-visible:ring-primaryColor focus-visible:ring-opacity-75">
            Facebook Gaming
          </li>
        </a>
      </ul>
    </div>
  )
}
