import { clsx } from 'clsx'
import {
  type ChangeEventHandler,
  type CSSProperties,
  type FC,
  useCallback,
  useId,
} from 'react'

interface Props {
  value: string
  valid?: boolean
  onChange(value: string): void

  placeholder?: string
  disabled?: boolean
  readOnly?: boolean

  label?: string
  labelClassName?: string
  labelStyle?: CSSProperties

  description?: string
  descriptionClassName?: string
  descriptionStyle?: CSSProperties

  className?: string
  style?: CSSProperties
}

export const TextInput: FC<Props> = ({
  value,
  valid,
  onChange,
  label,
  labelClassName,
  labelStyle,
  description,
  descriptionClassName,
  descriptionStyle,
  className,
  ...props
}) => {
  const id = useId()
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ev => {
      if (typeof onChange === 'function') onChange(ev.target.value)
    },
    [onChange],
  )

  return (
    <div className='flex flex-col gap-1'>
      {label !== undefined && (
        <label
          className={clsx('text-lg', labelClassName)}
          htmlFor={id}
          style={labelStyle}
        >
          {label}
        </label>
      )}

      {description !== undefined && (
        <label
          className={clsx('text-sm opacity-70', descriptionClassName)}
          htmlFor={id}
          style={descriptionStyle}
        >
          {description}
        </label>
      )}

      <input
        className={clsx(
          'mt-2 block w-full rounded-md border-gray-300 shadow-sm',
          'focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50',
          valid === false &&
            '!border-red-500 ring !ring-red-500 !ring-opacity-50',
          className,
        )}
        id={id}
        onChange={handleChange}
        type='text'
        value={value}
        {...props}
      />
    </div>
  )
}
