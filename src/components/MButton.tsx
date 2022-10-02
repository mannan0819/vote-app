import { ReactElement } from "react";

type MButtonProps = {
  handleClick: () => void;
}

export function MButton(props: MButtonProps): ReactElement {
  return <div className="flex p-2">
    <a
      className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 font-large rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center 
            dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
      onClick={props.handleClick}
      href="#"
    >
      Submit Vote
    </a>
  </div>
}


