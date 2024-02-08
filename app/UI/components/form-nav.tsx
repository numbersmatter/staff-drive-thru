import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ButtonIcon } from "../base/button";
import { Form } from "@remix-run/react";


export function FormNav({children}: {children: React.ReactNode}) {
  return (
    <Form reloadDocument method="post" className=" w-full flex flex-row justify-between px-6 py-4">
      {children}

      <ButtonIcon
        className="px-8 py-3"
        name="intent"
        value="back"
      >
        <ChevronLeftIcon className="w-10"/>
      </ButtonIcon>
      <ButtonIcon
        className="px-8 py-3"
        name="intent"
        value="submit"
      > 
        <ChevronRightIcon className="w-10"/>
      </ButtonIcon>
    </Form>
  );
}