import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { ButtonIcon } from "../base/button";

export function NumberDisplay( props: {count: number, increment: () => void, decrement: () => void}) {

  const disableDecrement = props.count < 1;

  return (
    <div className="mx-auto w-3/5 flex flex-row  justify-around items-center ">
      <div className="px-2">
      <ButtonIcon
        type="button"
        onClick={props.decrement}
        disabled={disableDecrement}
        className="bg-red-600  hover:bg-red-500"
      >
        <MinusIcon className="w-12"/>
      </ButtonIcon>
      </div>
      <div className="px-3 py-2 bg-slate-400 rounded-md">
        <span className="text-8xl">{props.count}</span>
      </div>
      <div>
      <ButtonIcon
        type="button"
        className="bg-green-600 hover:bg-green-500"
        onClick={props.increment}
      >
          <PlusIcon className=" w-12"/>
        </ButtonIcon>
      </div>
    </div>
  );
}