import { useRemixForm, getValidatedFormData } from "remix-hook-form";
import { Form } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { z } from "zod";

const schema = z.object({
  // Add your schema here
});

type FormData = z.infer<typeof schema>;

const resolver = zodResolver(schema);

export const action = async ({ request }: ActionFunctionArgs) => {
  const { errors, data, receivedValues: defaultValues } =
    await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    return json({ errors, defaultValues });
  }
  // Do something with the data
  return json(data);
};

export default function FormRoute() {
  const {
    handleSubmit,
  } = useRemixForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
    },
    resolver,
  });

  return (
    <Form method="post" onSubmit={handleSubmit}>
      {/** Your form elements here */}
      <button type="submit">Submit</button>
    </Form>
  );
}