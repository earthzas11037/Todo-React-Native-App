import { Text } from '@/components/base/text'
import * as React from 'react'
import { addDays, differenceInDays, endOfDay, parseISO, startOfDay } from 'date-fns'
import { Input, NInputProps } from '@/components/base/input'
import { formatCustom } from '@/utils/datetime'

interface DateInputProps extends NInputProps {
  daysPlaceholder?: string
}

export const DateInput: React.FC<DateInputProps> = ({
  label,
  placeholder = 'Enter number of days',
  value = '',
  onChangeText,
  error = false,
  helperText,
  disabled = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const [isoDate, setIsoDate] = React.useState<string>(value)

  React.useEffect(() => {
    if (value) {
      const parsedDate = parseISO(value)
      if (!isNaN(parsedDate.getTime())) {
        setInputValue(formatCustom(parsedDate, 'd MMM yyyy'))
        setIsoDate(value)
      }
    }
  }, [value])

  const handleFocus = () => {
    setIsFocused(true)
    if (isoDate) {
      const parsedDate = parseISO(isoDate)
      const today = startOfDay(new Date())
      const futureDate = startOfDay(parsedDate)
      const daysDiff = differenceInDays(futureDate, today)
      if (!isNaN(daysDiff)) {
        setInputValue(daysDiff.toString())
      }
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    const days = parseInt(inputValue, 10)
    if (!isNaN(days)) {
      const futureDate = endOfDay(addDays(new Date(), days))
      const isoString = futureDate.toISOString()
      const formattedDate = formatCustom(futureDate, 'd MMM yyyy')
      setIsoDate(isoString)
      setInputValue(formattedDate)
      onChangeText?.(isoString)
    }
  }

  const handleChangeText = (text: string) => setInputValue(text)

  return (
    <Input
      label={label}
      placeholder={placeholder}
      value={inputValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChangeText={handleChangeText}
      error={error}
      helperText={helperText}
      disabled={disabled}
      keyboardType='numeric'
      endAdornment={isFocused && <Text>วัน</Text>}
      {...props}
    />
  )
}
