export function formatNumberWithCommas(value: number, hasDecimal: boolean = false): string | number {
  if (typeof value !== 'number' || isNaN(value)) {
    // Return the input value when it's invalid
    return value
  }

  if (hasDecimal) {
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    return Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

export function revertFormattedNumber(formattedValue: string): number | string {
  // Remove commas and parse the number
  const cleanValue = formattedValue.replace(/,/g, '')

  // Check if the result is a valid number
  const parsedValue = parseFloat(cleanValue)

  if (isNaN(parsedValue)) {
    // Return the input value when it's invalid
    return formattedValue
  }

  return parsedValue
}
