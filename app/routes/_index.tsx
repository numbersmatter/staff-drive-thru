import type { MetaFunction } from "@remix-run/node";
import Header from "~/UI/shell/header";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
     <Header/>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8" >
        <div className="mt-6 mx-auto w-32 bg-slate-500 flex flex-col justify-center">
          
          <button className="bg-white max-w-52 text-slate-500 font-bold py-2 px-4 rounded">
            Start Drive Thru
          </button>
        </div>
      
      </div>
    </>
  );
}
