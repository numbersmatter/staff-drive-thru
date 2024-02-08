import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "react-router";
import { destroySession, getSession } from "~/server/auth/sessions";
import {Form, useSubmit} from "@remix-run/react"
import { useEffect, useRef } from "react";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};

export default function Logout() {
  let submit = useSubmit();
  let formRef = useRef(null);

  useEffect(() => {

    submit(formRef.current, { method: 'post' })
  }, []);


  return (
    <div>
      <h1>Logout</h1>
      <p>Press the button below to log out.</p>
      <Form ref={formRef} method="post">
        <button name="logout" type="submit">Logout</button>
      </Form>
    </div>
  );
}