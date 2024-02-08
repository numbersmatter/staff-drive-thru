import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'

interface RadioGroupOption {
  label: string
  id: string
}

const options: RadioGroupOption[] = [
  { label: 'English', id: 'english' },
  { label: 'Espanol', id: 'espanol' },

]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function SingleStringRadioGroup({
  options,
  selectedId,
  setSelected
}:{
  options: RadioGroupOption[],
  selectedId: string | null,
  setSelected: React.Dispatch<React.SetStateAction<string | null>>
}) {
  

  const optionIds = options.map((option) => option.id)

  console.log(optionIds);

  return (
    <RadioGroup value={selectedId} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">Choose Language</RadioGroup.Label>
      <div className="space-y-4">
        {optionIds.map((optionId) => (
          <RadioGroup.Option
            key={optionId}
            value={optionId}
            className={(active) =>
              classNames(
                selectedId == optionId  ? 'border-indigo-600 ring-2 ring-indigo-600 bg-green-500' : 'border-gray-300',
                'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-center'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span className="flex mx-auto justify-center ">
                    <RadioGroup.Label as="span" className="font-medium text-gray-900 ">
                      {options.find((option) => option.id === optionId)?.label}
                    </RadioGroup.Label>
                </span>
                <span
                  className={classNames(
                    active ? 'border' : 'border-2',
                    checked ? 'border-indigo-600' : 'border-transparent',
                    'pointer-events-none absolute -inset-px rounded-lg'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
