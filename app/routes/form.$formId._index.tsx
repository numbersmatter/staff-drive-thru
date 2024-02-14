import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, isRouteErrorResponse, useRouteError, redirect, json, Form } from "@remix-run/react";
import { useState } from "react";
import {  SingleStringRadioGroupUncontrolled } from "~/UI/base/radio-buttons";
import {  NavButtons } from "~/UI/components/form-nav";
import { QuestionDisplay } from "~/UI/components/question-display";
import { requireAuth } from "~/server/auth/auth.server";
import {  readFormData, updateForm } from "~/server/drive-thru.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {

  const formId = params.formId ?? "";

  const questionText=" English or Spanish?";
  const options = [
    {id: "english", label: "English"},
    {id: "spanish", label: "Spanish"}
  ];

  const cisFormData = await readFormData(formId);

  if(!cisFormData){
    throw new Error("Form not found");
  }

  const selectedLanguage = cisFormData.language;

  return json(
    {
      questionText,
      options,
      selectedId: selectedLanguage,
    }
  ) 
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  await requireAuth(request)
  const formId = params.formId ?? "none";

  const formData = await request.clone().formData();
  const language = formData.get("language") as string;

  const valid = ["english", "spanish"].includes(language);

  if(valid){
    const updatedFormData = {
      language,
    };

    await updateForm(formId, updatedFormData);

    return redirect(`/form/${formId}/1`);
  }

  return json({result: "nothing happened.", formData, formId, valid});
};

export default function RouteComponent(){
  const data = useLoaderData<typeof loader>()
  console.log(data);
  
  return (
    <>
      <Form method="post" className=" mx-auto flex-1 flex flex-col justify-between max-w-lg pt-2">
        <QuestionDisplay  questionText={data.questionText}/>
        <SingleStringRadioGroupUncontrolled 
          options={data.options}
          defaultValue={data.selectedId}
          name="language"
        />

        <NavButtons />
      </Form>
    </>
  );
}


