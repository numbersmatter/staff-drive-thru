import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { QuestionDisplay } from "~/UI/components/question-display";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const formId = params.formId ?? "none";

  return {
    formId,
    text1: "Thank you for completing the form.",
    text2: "Please open trunk or back seat"
  
  };
};

export default function RouteComponent(){
  const data = useLoaderData<typeof loader>()
  return (
    <>
      <QuestionDisplay questionText={data.text1}/>
      <QuestionDisplay questionText={data.text2}/>
      <div className="mx-auto py-5">
          <Link to={`/form/${data.formId}/staff`}>
            <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Staff Only
            </button>
          </Link>
        </div>
    </>
  );
}