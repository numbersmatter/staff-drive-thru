import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
  Link,
  json,
} from "@remix-run/react";
import type { 
  ActionFunctionArgs, 
  LoaderFunctionArgs,
  MetaFunction
} from "@remix-run/node";
import Header from "~/UI/shell/header";
import { requireAuth } from "~/server/auth/auth.server";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await requireAuth(request);

  return json({ result: "nothing happened." });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireAuth(request);
  

  return json({ user });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mt-6 mx-auto w-32 flex flex-col justify-center">
          <Link
            to="/start-form"
            className="bg-white text-slate-700 font-bold py-2 px-4 rounded hover:bg-slate-700 hover:text-white"
          >
            Create Drive Thru Form
          </Link>
        </div>
      </div>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div>{error.data}</div>;
  }
  return (
    <div>
      <h1>Something went wrong</h1>
    </div>
  );
}
