import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, isRouteErrorResponse, useRouteError, redirect } from "@remix-run/react";
import { useState } from "react";
import { SingleStringRadioGroup } from "~/UI/base/radio-buttons";
import { FormHeader } from "~/UI/components/form-header";
import { FormNav } from "~/UI/components/form-nav";
import { QuestionDisplay } from "~/UI/components/question-display";
import { getQuestionData, readFormData } from "~/server/drive-thru.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {

  const formId = params.formId ?? "";

  const questionText=" English or Spanish?";
  const options = [
    {id: "english", label: "English"},
    {id: "spanish", label: "Spanish"}
  ];

  const cisFormData = await readFormData(formId);

  const selectedLanguage = cisFormData.language;

  return {
    questionText,
    options,
    selectedId: selectedLanguage,
  };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {

  const formId = params.formId ?? "none";



  return redirect(`/form/${formId}/1`);
};

export default function RouteComponent(){
  const data = useLoaderData<typeof loader>()
  const [selectedId, setSelected] = useState<string | null>(data.selectedId);

  return (
    <>
      <main className=" mx-auto flex-1 flex flex-col justify-between max-w-lg pt-2">
        <QuestionDisplay  questionText={data.questionText}/>
        <SingleStringRadioGroup 
          selectedId={selectedId}
          setSelected={setSelected}
          options={data.options}
        />

      <FormNav >
        <input hidden  readOnly name="language" value={selectedId || ""} />
      </FormNav>
      </main>
    </>
  );
}


