export type Launches = {
  flightNumber: number,
  mission: string,
  rocket: string,
  launchDate: Date,
  target: string,
  customers: string[],
  upcoming: boolean,
  success: boolean
}[]
