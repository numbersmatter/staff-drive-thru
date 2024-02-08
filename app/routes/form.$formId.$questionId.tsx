import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import {
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
  redirect,
  json,
} from "@remix-run/react";
import { useState } from "react";
import { SingleStringRadioGroup } from "~/UI/base/radio-buttons";
import { FormHeader } from "~/UI/components/form-header";
import { FormNav } from "~/UI/components/form-nav";
import { NumberDisplay } from "~/UI/components/number-display";
import { QuestionDisplay } from "~/UI/components/question-display";
import { requireAuth } from "~/server/auth/auth.server";
import {
  getQuestionData,
  handleBackRequest,
  handleNextRequest,
  handleSaveInputNumber,
  readFormData,
} from "~/server/drive-thru.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  // add authentication here
  await requireAuth(request);

  const formId = params.formId ?? "";
  const questionId = params.questionId ?? "1";

  const cisFormData = await readFormData(formId);

  if (!cisFormData) {
    throw new Error("Form not found");
  }

  const { questionText, questionResponse } = await getQuestionData(
    cisFormData,
    questionId
  );

  return json(
    {
      questionText,
      questionResponse,
      questionId,
    }
  ) 
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  await requireAuth(request);
  const formId = params.formId ?? "none";
  const questionId = params.questionId ?? "none";

  console.log(formId, "formId", questionId, "questionId");
  // if(formId || questionId === "none"){
  //   return redirect("/");
  // }

  const formData = await request.clone().formData();
  const intent = formData.get("intent") as string;
  const count = formData.get("count") as string;

  const cisFormData = await readFormData(formId);

  if (!cisFormData) {
    throw new Error("Form not found");
  }

  if (intent === "back") {
    console.log(questionId, "questionId", cisFormData, "cisFormData");
    return handleBackRequest(cisFormData, questionId);
  }

  if (intent === "submit") {
    await handleSaveInputNumber(cisFormData, questionId, Number(count));

    return handleNextRequest(cisFormData, questionId);
  }

  return json({ success: true });
};

export default function RouteComponent() {
  const data = useLoaderData<typeof loader>();
  const [number, setNumber] = useState<number>(data.questionResponse);

  const increment = () => setNumber((c) => c + 1);
  const decrement = () => setNumber((c) => c - 1);

  console.log(data, "data", number, "number")

  return (
    <>
      <main className=" mx-auto flex-1 flex flex-col justify-between max-w-lg pt-2">
        <QuestionDisplay questionText={data.questionText} />
        <NumberDisplay
          questionId={data.questionId}
          count={number}
          increment={increment}
          decrement={decrement}
        />

        <FormNav>
          <input hidden readOnly name="count" value={number} />
        </FormNav>
      </main>
    </>
  );
}
