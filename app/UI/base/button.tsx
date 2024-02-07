import { cn } from "../util";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}


export function ButtonIcon(buttonProps:ButtonProps) {
  const {className, ...rest} = buttonProps;

  return (
    <button
      className={cn(
        "rounded-md bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 ", className
        )
      }
      {...rest}
    >
      {buttonProps.children}
    </button>
  )

}