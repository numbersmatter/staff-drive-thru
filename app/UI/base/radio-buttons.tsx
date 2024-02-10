import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";

interface RadioGroupOption {
  label: string;
  id: string;
}

const options: RadioGroupOption[] = [
  { label: "English", id: "english" },
  { label: "Espanol", id: "espanol" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function SingleStringRadioGroup({
  options,
  selectedId,
  setSelected,
}: {
  options: RadioGroupOption[];
  selectedId: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const optionIds = options.map((option) => option.id);
  console.log("optionIds", optionIds);

  return (
    <RadioGroup value={selectedId} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">Choose Language</RadioGroup.Label>
      <div className="space-y-4">
        {optionIds.map((optionId) => {
          const isChecked = selectedId === optionId;
          return (
            <RadioGroup.Option
              key={optionId}
              value={optionId}
              className={({checked}) =>
                classNames(
                  checked
                    ? "border-indigo-600 ring-2 ring-indigo-600 bg-green-500"
                    : "border-gray-300 bg-white",
                  "relative block cursor-pointer rounded-lg border px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-center"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span className="flex mx-auto justify-center ">
                    <RadioGroup.Label
                      as="span"
                      className="font-medium text-gray-900 "
                    >
                      {options.find((option) => option.id === optionId)?.label}
                    </RadioGroup.Label>
                  </span>
                  <span
                    className={classNames(
                      active ? "border" : "border-2",
                      checked ? "border-indigo-600" : "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-lg"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          );
        })}
      </div>
    </RadioGroup>
  );
}
export function SingleStringRadioGroupUncontrolled({
  options, name, defaultValue
}: {
  options: RadioGroupOption[]; name: string; defaultValue: string;
}) {
  const optionIds = options.map((option) => option.id);
  console.log("optionIds", optionIds);

  return (
    <RadioGroup defaultValue={defaultValue} name={name}>
      <RadioGroup.Label className="sr-only">Choose Language</RadioGroup.Label>
      <div className="space-y-4">
        {options.map((option) => {
          return (
            <RadioGroup.Option
              key={option.id}
              value={option.id}
              className={({checked}) =>
                classNames(
                  checked
                    ? "border-indigo-600 ring-2 ring-indigo-600 bg-green-500"
                    : "border-gray-300 bg-white",
                  "relative block cursor-pointer rounded-lg border px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-center"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span className="flex mx-auto justify-center ">
                    <RadioGroup.Label
                      as="span"
                      className={
                        classNames(
                          checked ? " text-gray-100 text-2xl " 
                          : " text-gray-900 ",
                          "font-medium"
                          )}
                    >
                      {option.label}
                    </RadioGroup.Label>
                    {
                      checked && <CheckBadgeIcon className="text-white w-6" />
                    }
                  </span>
                  <span
                    className={classNames(
                      active ? "border" : "border-2",
                      checked ? "border-indigo-600" : "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-lg"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          );
        })}
      </div>
    </RadioGroup>
  );
}
