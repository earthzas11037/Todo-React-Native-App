import { format as dateFnsFormat, isValid, Locale, parseISO } from 'date-fns'
import { differenceInMinutes, differenceInHours } from 'date-fns'

const format = (date: Date, formatString: string, options?: { locale?: Locale }) => {
  if (!date || !isValid(date)) {
    return ''
  }
  // Convert the date to Buddhist calendar format
  const buddhistYear = date?.getFullYear() + 543
  // Replace 'yyyy' with the Buddhist year in the format string
  formatString = formatString.replace('yyyy', buddhistYear.toString())
  // Use date-fns to format the date
  return dateFnsFormat(date, formatString, options)
}

/**
 * Utility function to format DateTime as 'yyyy-MM-dd'
 * @param date - The Date object or ISO string to format
 * @returns Formatted date in 'yyyy-MM-dd' or an error message if the date is invalid
 */
export const formatToISODate = (date: Date | string): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  if (!isValid(parsedDate)) {
    return ''
  }
  return format(parsedDate, 'yyyy-MM-dd')
}

/**
 * Utility function to format DateTime as 'dd/MM/yyyy'
 * @param date - The Date object or ISO string to format
 * @returns Formatted date in 'dd/MM/yyyy' or an error message if the date is invalid
 */
export const formatToSlashDate = (date: Date | string): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  if (!isValid(parsedDate)) {
    return ''
  }
  return format(parsedDate, 'dd/MM/yyyy')
}

/**
 * Utility function to format DateTime as 'MMMM dd, yyyy'
 * @param date - The Date object or ISO string to format
 * @returns Formatted date in 'MMMM dd, yyyy' or an error message if the date is invalid
 */
export const formatToLongDate = (date: Date | string): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  if (!isValid(parsedDate)) {
    return ''
  }

  return format(parsedDate, 'MMMM dd, yyyy')
}

/**
 * Utility function to format DateTime as 'yyyy-MM-dd HH:mm:ss'
 * @param date - The Date object or ISO string to format
 * @returns Formatted date in 'yyyy-MM-dd HH:mm:ss' or an error message if the date is invalid
 */
export const formatToDateTime = (date: Date | string): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  if (!isValid(parsedDate)) {
    return ''
  }
  return format(parsedDate, 'yyyy-MM-dd HH:mm:ss')
}

/**
 * Utility function to format DateTime as 'HH:mm:ss'
 * @param date - The Date object or ISO string to format
 * @returns Formatted time in 'HH:mm:ss' or an error message if the date is invalid
 */
export const formatToTime = (date: Date | string): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  if (!isValid(parsedDate)) {
    return ''
  }
  return format(parsedDate, 'HH:mm:ss')
}

/**
 * Utility function to format DateTime as 'E, MMM dd yyyy'
 * @param date - The Date object or ISO string to format
 * @returns Formatted date as 'E, MMM dd yyyy' (e.g., 'Mon, Oct 06 2024') or an error message if the date is invalid
 */
export const formatToShortDateWithDay = (date: Date | string): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  if (!isValid(parsedDate)) {
    return ''
  }
  return format(parsedDate, 'E, MMM dd yyyy')
}

/**
 * Utility function to format DateTime as custom format
 * @param date - The Date object or ISO string to format
 * @param customFormat - The custom format string
 * @returns Formatted date in the provided custom format or an error message if the date is invalid
 */
export const formatCustom = (date: Date | string | number, customFormat: string): string => {
  const parsedDate: Date = typeof date === 'string' ? new Date(date) : typeof date === 'number' ? new Date(date) : date
  if (!isValid(parsedDate)) {
    return ''
  }
  return format(parsedDate, customFormat)
}

// Helper function to convert ISO string to local Date object
export const convertISOToLocalDate = (isoString: string) => {
  if (!isoString) return null
  return parseISO(isoString) // Parse ISO string to local Date
}

// Helper function to convert local Date to ISO string (UTC)
export const convertLocalDateToISOString = (date: Date | null) => {
  if (!date) return ''
  return date.toISOString() // Convert local Date to ISO string (UTC)
}

/**
 * Function to get relative time string based on the given ISO date string
 * @param isoString - The ISO date string to evaluate
 * @returns Relative time string in Thai
 */
export const getRelativeTimeString = (isoString: string): string => {
  const date = parseISO(isoString)
  if (!isValid(date)) {
    return ''
  }

  const now = new Date()
  const minutesDifference = differenceInMinutes(now, date)
  const hoursDifference = differenceInHours(now, date)

  if (minutesDifference <= 10) {
    return 'เมื่อสักครู่'
  } else if (minutesDifference <= 59) {
    return `${minutesDifference} นาทีที่แล้ว`
  } else if (hoursDifference < 24) {
    return `${hoursDifference} ชั่วโมงที่แล้ว`
  } else {
    return format(date, 'd MMM yyyy, HH:mm น.')
  }
}
