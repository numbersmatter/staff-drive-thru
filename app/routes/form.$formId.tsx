import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, isRouteErrorResponse, useRouteError, Outlet } from "@remix-run/react";
import { FormHeader } from "~/UI/components/form-header";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return {
    formTitle: "Drive-thru Form",
  
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};

export default function RouteComponent(){
  const data = useLoaderData<typeof loader>()
  return (
    <>
      <FormHeader title={data.formTitle} />
      <main className="flex-1 flex flex-col justify-between">
        <Outlet />
      </main>
    </>
  );
}


