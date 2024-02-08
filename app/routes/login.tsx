import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import {
  Link,
  useActionData,
  useLoaderData,
  useSubmit
} from "@remix-run/react";
import {
  useCallback,
  useState,
} from "react";
import { redirect } from "react-router";
import LoginForm from "~/UI/components/login-screen";
import { checkSessionCookie, signIn, signInWithToken } from "~/server/auth/auth.server";
import { getRestConfig } from "~/server/auth/firebase.server";
import { commitSession, getSession } from "~/server/auth/sessions";
import * as firebaseRest from "~/server/auth/firebase-rest";
// import { UserAuthForm } from "~/components/auth/user-auth-form";
// import { buttonVariants } from "~/components/ui/button";
// import { cn } from "~/lib/utils";
// import sideImage from "~/images/food-pantry.png"
// import { useCallback, useState } from "react";
// import { commitSession, getSession } from "~/services/session.server";
// import { checkSessionCookie, signIn, signInWithToken } from "~/services/auth-firebase.server";
// import { getRestConfig } from "~/services/firebase/firebase.server";
// import * as firebaseRest from "~/services/firebase/firebase-rest";
// import { authenticator } from "~/services/auth.server";
// import { AuthStrategies } from "~/services/auth_strategies";

// import { checkSessionCookie, signIn, signInWithToken } from "~/server/auth/auth.server";
// import { getRestConfig } from "~/server/auth/firebase.server";
// import { commitSession, getSession } from "~/server/auth/sessions";


export async function action({ params, request }: ActionFunctionArgs) {
  const form = await request.formData();
  const idToken = form.get("idToken");
  let sessionCookie;
  try {
    if (typeof idToken === "string") {
      sessionCookie = await signInWithToken(idToken);
    } else {
      const email = form.get("email");
      const password = form.get("password");
      const formError = json(
        { error: "Please fill all fields!" },
        { status: 400 }
      );
      if (typeof email !== "string") return formError;
      if (typeof password !== "string") return formError;
      sessionCookie = await signIn(email, password);
    }
    const session = await getSession(request.headers.get("cookie"));
    session.set("session", sessionCookie);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    console.error(error);
    return json({ error: String(error) }, { status: 401 });
  }

}



export async function loader({ params, request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));
  const { uid } = await checkSessionCookie(session);
  const headers = {
    "Set-Cookie": await commitSession(session),
  };
  if (uid) {
    return redirect("/", { headers });
  }
  const { apiKey, domain } = getRestConfig();

  return json({ apiKey, domain }, { headers },);
}

type ActionData = {
  error?: string;
};


export default function LoginPage() {
  const [clientAction, setClientAction] = useState<ActionData>()
  const actionData = useActionData<ActionData>();
  const restConfig = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // To avoid rate limiting, we sign in client side if we can.
      const login = await firebaseRest.signInWithPassword(
        {
          email: event.currentTarget.email.value,
          password: event.currentTarget.password.value,
          returnSecureToken: true,
        },
        restConfig
      );
      if (firebaseRest.isError(login)) {
        setClientAction({ error: login.error.message });
        return;
      }
      submit({ idToken: login.idToken }, { method: "post" });
    },
    [submit, restConfig]
  );


  return (
    <form method="post" onSubmit={handleSubmit} className="mx-auto max-w-7xl sm:px-6 lg:px-8">
     <LoginForm />

    </form>
  )

}