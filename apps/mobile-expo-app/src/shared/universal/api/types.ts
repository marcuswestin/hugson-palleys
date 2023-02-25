export type AccountID = number & { __AccountID: true }
export const AccountID = (val: number) => val as AccountID

export type PhoneNumber = string & { __PhoneNumber: true }
export const PhoneNumber = (val: string) => val as PhoneNumber

export type DisplayName = string & { __DisplayName: true }
export const DisplayName = (val: string) => val as DisplayName

export type AvailabilityID = string & { __AvailabilityID: true }
export const AvailabilityID = (val: string) => val as AvailabilityID

export type Availability = {
  availabilityID: AvailabilityID
  time: Date
}
