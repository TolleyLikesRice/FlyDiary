import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Not stuff from shadcn/ui
export function calculateBlockTime(brakesOff: string, brakesOn: string) {
  const brakesOffSplit = brakesOff.split(':')
  const brakesOnSplit = brakesOn.split(':')

  const brakesOffHours = parseInt(brakesOffSplit[0])
  const brakesOffMinutes = parseInt(brakesOffSplit[1])

  const brakesOnHours = parseInt(brakesOnSplit[0])
  const brakesOnMinutes = parseInt(brakesOnSplit[1])

  let blockTimeInMinutes = 0
  if (brakesOffHours > brakesOnHours) {
    // If the brakes off time is greater than the brakes on time, we know the flight was overnight
    // So we need to add 24 hours to the brakes on time
    blockTimeInMinutes = (brakesOnHours + 24 - brakesOffHours) * 60 + brakesOnMinutes - brakesOffMinutes
  } else {
    blockTimeInMinutes = (brakesOnHours - brakesOffHours) * 60 + brakesOnMinutes - brakesOffMinutes
  }
  // Convert to HH:MM
  const blockHours = Math.floor(blockTimeInMinutes / 60)
  const blockMinutes = blockTimeInMinutes % 60

  // add leading zero for hours and minutes
  const blockHoursString = blockHours < 10 ? `0${blockHours}` : `${blockHours}`
  const blockMinutesString = blockMinutes < 10 ? `0${blockMinutes}` : `${blockMinutes}`
  
  return `${blockHoursString}:${blockMinutesString}`
}