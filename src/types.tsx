export interface Win {
  id: number,
  content: string
}

export interface Goal {
  id: number,
  content: string,
  wins: Win[]
}

export interface Position {
  id: number,
  title: string
  company: string,
  goals: Goal[]
}

export interface User {
  id?: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  profilePic: string,
  positions: Position[]
}
