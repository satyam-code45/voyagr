export interface Trip {
  id: string
  destination: string
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: Date
  activities?: Activity[]
}

export interface Activity {
  id: string
  tripId: string
  day: number
  time: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateTripInput {
  destination: string
  startDate: string
  endDate: string
  activities: CreateActivityInput[]
}

export interface CreateActivityInput {
  day: number
  time: string
  description: string
}
