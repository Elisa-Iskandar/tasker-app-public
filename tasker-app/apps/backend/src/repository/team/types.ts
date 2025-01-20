import { Team, User } from "@prisma/client"
interface updateTeamArgs {
  id: string
  members: User[]
}

export { updateTeamArgs, Team }
