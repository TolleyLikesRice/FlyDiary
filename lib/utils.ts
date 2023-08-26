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

  let blockTime = 0
  if (brakesOffHours > brakesOnHours) {
    // If the brakes off time is greater than the brakes on time, we know the flight was overnight
    // So we need to add 24 hours to the brakes on time
    blockTime = (brakesOnHours + 24 - brakesOffHours) * 60 + brakesOnMinutes - brakesOffMinutes
  } else {
    blockTime = (brakesOnHours - brakesOffHours) * 60 + brakesOnMinutes - brakesOffMinutes
  }
  return blockTime
}