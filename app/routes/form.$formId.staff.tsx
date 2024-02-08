import { useRemixForm, getValidatedFormData } from "remix-hook-form";
import { Form } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { SingleStringRadioGroup } from "~/UI/base/radio-buttons";
import { useState } from "react";
import { QuestionDisplay } from "~/UI/components/question-display";
import { saveStaffComments } from "~/server/drive-thru.server";
import { requireAuth } from "~/server/auth/auth.server";

const schema = z.object({
  // Add your schema here
  comments: z.string(),
  receivedBox: z.enum(["yes", "no"])
});

type FormData = z.infer<typeof schema>;

const resolver = zodResolver(schema);

export const action = async ({ request, params }: ActionFunctionArgs) => {
  await requireAuth(request);

  const formId = params.formId ?? "none";

  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    return json({ errors, defaultValues });
  }
  // Do something with the data

  await saveStaffComments(data, formId )


  return redirect('/');
};

export default function FormRoute() {
  const [selectedId, setSelectedId] = useState<string | null>("yes");
  // const { handleSubmit } = useRemixForm({
  //   mode: "onSubmit",
  //   defaultValues: {
  //     comments: "",
  //     receivedBox: "",
  //   },
  //   resolver,
  // });

  return (
    <div className=" mx-auto w-4/5 py-4">

    <Form method="post" >
      {/** Your form elements here */}
      <div className="py-2">

      <QuestionDisplay questionText="Received Box?" />
      </div>
      <SingleStringRadioGroup
        selectedId={selectedId}
        setSelected={setSelectedId}
        options={[
          { label: "Yes", id: "yes" },
          { label: "No", id: "no" },
        ]}
      />
      <input hidden readOnly name="receivedBox" value={selectedId as string} />
      <div className="pt-6">
        <label
          htmlFor="comments"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Add your comments
        </label>
        <div className="mt-2">
          <textarea
            rows={4}
            name="comments"
            id="comments"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={""}
          />
        </div>
      </div>
      <div className="pt-6">
      <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
      </div>
    </Form>
    </div>

  );
}
