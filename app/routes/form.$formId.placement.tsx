import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { SingleStringRadioGroup } from "~/UI/base/radio-buttons";
import { QuestionDisplay } from "~/UI/components/question-display";
import { readFormData } from "~/server/drive-thru.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const formId = params.formId ?? "none";

  const cisFormData = await readFormData(formId);

  const language = cisFormData.language;

  const englishOptions = [
    {id: "trunk", label: "Trunk"},
    {id: "passenger", label: "Back Seat"}
  ];

  const spanishOptions = [
    {id: "trunk", label: "Cajuela"},
    {id: "passenger", label: "Asiento trasero"}
  ];

  const englishText = " Where would you like us to place the food?";
  const spanishText = " ¿Dónde le gustaría que coloquemos la comida?";
  
  const questionText = language === "english" ? englishText : spanishText;

  const options = language === "english" ? englishOptions : spanishOptions;
  
  return {
    formId,
    questionText,
    options,
    selectedId: "",
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return null;
};

export default function RouteComponent(){
  const data = useLoaderData<typeof loader>()
  const [selectedId, setSelected] = useState<string | null>(data.selectedId);
  return (
    <>
     <QuestionDisplay  questionText={data.questionText}/>
        <SingleStringRadioGroup 
          selectedId={selectedId}
          setSelected={setSelected}
          options={data.options}
        />
        <div className="mx-auto py-5">
          <Link to={`/form/${data.formId}/thank-you`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Next
            </button>
          </Link>
        </div>
    </>
  );
}