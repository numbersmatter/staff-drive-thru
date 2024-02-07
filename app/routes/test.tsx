import SlimShell from "~/UI/shell/slim-shell";
import { ChevronLeftIcon, ChevronRightIcon, MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import {ButtonIcon} from "~/UI/base/button";

export default function TestPage() {
  const [count, setCount] = useState(3);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);

  const questionText = "Number of people are in your household?";

  return (
    <SlimShell>
      <Header />
      <main className="flex-1 flex flex-col justify-between">
        <div className="mx-auto max-w-7xl py-6 sm:px-6  lg:px-8">
          <QuestionDisplay  questionText={questionText}/>
        </div>
        <div className="w-full">
        
            <NumberDisplay 
              count={count} 
              increment = {increment}
              decrement = {decrement}
            />
        </div>

        <FormNav />
      </main>
    </SlimShell>
  );
}

function Header() {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Dashboard
        </h1>
      </div>
    </header>
  );
}

function FormNav() {
  return (
    <div className=" w-full flex flex-row justify-between px-6 py-4">
      <ButtonIcon
        className="px-8 py-3"
      >
        <ChevronLeftIcon className="w-10"/>
      </ButtonIcon>
      <ButtonIcon
       className="px-8 py-3"
      > 
        <ChevronRightIcon className="w-10"/>
      </ButtonIcon>
    </div>
  );
}

function NumberDisplay( props: {count: number, increment: () => void, decrement: () => void}) {

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



function QuestionDisplay({questionText}:{questionText: string}) {
  return (
    <div className=" overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 sm:py-4">
        {/* Content goes here */}
        <h1 className="text-4xl font-medium">
          {questionText}
        </h1>
      </div>
    </div>
  );
}
