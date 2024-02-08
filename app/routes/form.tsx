import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Outlet } from "@remix-run/react";
import { Link } from "react-router-dom";
import SlimShell from "~/UI/shell/slim-shell";

export default function FormPage() {
  return (
    <SlimShell>
      <Outlet />
    </SlimShell>
  );
}

export function ErrorBoundary(){
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div>
    <h1 className="text-4xl text-red-500">Route Error</h1>
    <p>Please try again later</p>
    <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-2xl" to="/">Go Home</Link>
  </div>
  }
  return <div>
    <h1 className="text-4xl text-red-500">Something went wrong</h1>
    <p>Please try again later</p>
    <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-2xl" to="/">Go Home</Link>
  </div>
}
