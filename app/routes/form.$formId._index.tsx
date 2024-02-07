import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { useState } from "react";
import { SingleStringRadioGroup } from "~/UI/base/radio-buttons";
import { FormHeader } from "~/UI/components/form-header";
import { FormNav } from "~/UI/components/form-nav";
import { QuestionDisplay } from "~/UI/components/question-display";

export const loader = async ({ request }: LoaderFunctionArgs) => {

  const options = [
    { id: "english", label: "English" },
    { id: "spanish", label: "Spanish" },
  ];
  return {
    questionText: "English / Spanish",
    options
  
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {


  

  return null;
};

export default function RouteComponent(){
  const data = useLoaderData<typeof loader>()
  const [selectedId, setSelected] = useState<string | null>(null);

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


