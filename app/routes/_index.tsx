import { isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import Header from "~/UI/shell/header";
import { requireAuth } from "~/server/auth/auth.server";
import { Form, Link, json, redirect } from "@remix-run/react";
import { createNewDriveThruForm } from "~/server/drive-thru.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await requireAuth(request);
  const formData = await request.clone().formData();
  const intent = formData.get("intent");

  if (intent === "createNewDriveThruForm") {
    const { id } = await createNewDriveThruForm();
    return redirect(`/form/${id}`);
  }

  // const { id } = await createNewDriveThruForm();

  // return redirect(`/form/${id}`);

  return json({result: "nothing happened."});
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user =await requireAuth(request);
  console.log(user);

  return json({user});
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mt-6 mx-auto w-32 bg-slate-500 flex flex-col justify-center">
          <div>
            <h4 className="text-white text-center">Welcome, {data.user?.uid}</h4>
          </div>
          <div >
            <Link to="/start-form"  className="bg-white max-w-52 text-slate-500 font-bold py-2 px-4 rounded">
              Start Drive Thru
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export function ErrorBoundary(){
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div>{error.data}</div>
  }
  return <div>
    <h1>Something went wrong</h1>
  </div>
}

