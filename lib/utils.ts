import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Not stuff from shadcn/ui
export function calculateBlockTime(brakesOff: string, brakesOn: string) {
  const brakesOffTime = new Date(brakesOff).getTime()
  const brakesOnTime = new Date(brakesOn).getTime()
  const blockTime = brakesOnTime - brakesOffTime
  return blockTime
}