import React from "react"
import clsx from "clsx"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function Input({
  label,
  id,
  className,
  ...inputProps
}: InputProps) {
  return (
    <>
      <label htmlFor="email">{label}</label>
      <input
        id={id}
        {...inputProps}
        className={clsx(
          `border rounded border-blue-500 outline-blue-700`,
          className,
        )}
      />
    </>
  )
}
