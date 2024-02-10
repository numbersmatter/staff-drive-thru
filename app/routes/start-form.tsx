import type { LoaderFunctionArgs } from "@remix-run/node";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { requireAuth } from "~/server/auth/auth.server";
import { createNewDriveThruForm } from "~/server/drive-thru.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  await requireAuth(request);
  const formData = await request.clone().formData();
  const intent = formData.get("intent");

  if (intent === "createNewDriveThruForm") {
    const { id } = await createNewDriveThruForm();
    return redirect(`/form/${id}`);
  }

  return json({ result: "nothing happened." });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireAuth(request);

  const { id } = await createNewDriveThruForm();
  return redirect(`/form/${id}`);
};

export default function Index() {
  return (
    <div>
      <h1>Index</h1>
    </div>
  );
}
