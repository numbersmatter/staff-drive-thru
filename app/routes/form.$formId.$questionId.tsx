import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, isRouteErrorResponse, useRouteError, redirect } from "@remix-run/react";
import { useState } from "react";
import { SingleStringRadioGroup } from "~/UI/base/radio-buttons";
import { FormHeader } from "~/UI/components/form-header";
import { FormNav } from "~/UI/components/form-nav";
import { NumberDisplay } from "~/UI/components/number-display";
import { QuestionDisplay } from "~/UI/components/question-display";
import { getQuestionData, handleBackRequest, handleNextRequest, handleSaveInputNumber, readFormData } from "~/server/drive-thru.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {

  // add authentication here

  const formId = params.formId ?? "";
  const questionId = params.questionId ?? "1";

  const { questionText, questionResponse} = await getQuestionData( formId, questionId )

  return {
    questionText,
    questionResponse,
  };
};


export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formId = params.formId ?? "none";
  const questionId = params.questionId ?? "none";

  if(formId === "none"){
    return redirect("/");
  }

  const formData = await request.clone().formData();
  const intent = formData.get("intent") as string;
  const count = formData.get("count") as string;

  const cisFormData = await readFormData(formId);

  if(intent === "back"){
    console.log(questionId, "questionId", cisFormData, "cisFormData")
    return handleBackRequest(cisFormData, questionId );
  }

  await handleSaveInputNumber(formId, questionId, 2)
 
  return handleNextRequest(cisFormData, questionId);
};

export default function RouteComponent(){
  const data = useLoaderData<typeof loader>()
  const [number, setNumber] = useState<number>(data.questionResponse);

  const increment= () => setNumber((c) => c + 1);
  const decrement = () => setNumber((c) => c - 1);


  
  return (
    <>
      <main className=" mx-auto flex-1 flex flex-col justify-between max-w-lg pt-2">
        <QuestionDisplay  questionText={data.questionText}/>
       <NumberDisplay 
          count={number} 
          increment = {increment}
          decrement = {decrement}
        />

      <FormNav >
        <input hidden  readOnly name="count" value={number} />
        
      </FormNav>
      </main>
    </>
  );
}
