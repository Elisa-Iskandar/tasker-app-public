import { User, Team, PrismaClient } from "@prisma/client"
import TeamRepository from "../../repository/team"
import { TeamRepositoryDef } from "../../repository/team"
class TeamServiceDef {
  private teamRepo: TeamRepositoryDef
  constructor(teamRepo: TeamRepositoryDef) {
    this.teamRepo = teamRepo
  }

  async updateTeamName(teamId: string, name: string): Promise<Team | null> {
    try {
      const updatedTeam = await this.teamRepo.updateTeam({
        id: teamId,
        teamName: name,
      })
      return updatedTeam
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async addTeamMembers(teamId: string, newMember: User): Promise<Team | null> {
    try {
      const currentTeamMembers = await this.teamRepo.getTeamMembers(teamId)
      if (!currentTeamMembers) {
        throw new Error("Team not found")
      }
      const newTeamMembers = [...currentTeamMembers, newMember]

      const updatedTeamMembers = await this.teamRepo.updateTeamMembers({
        id: teamId,
        teamMembers: newTeamMembers,
      })

      return updatedTeamMembers
    } catch (error) {
      console.log(error)
      return null
    }
  }
  async removeTeamMembers(
    teamId: string,
    removedMember: User,
  ): Promise<Team | null> {
    try {
      const currentTeamMembers = await this.teamRepo.getTeamMembers(teamId)
      if (!currentTeamMembers) {
        throw new Error("Team not found")
      } else if (currentTeamMembers.length <= 1) {
        throw new Error("Cannot remove only team member")
      }

      const updatedTeam = await this.teamRepo.updateTeamMembers({
        id: teamId,
        teamMembers: currentTeamMembers.filter(
          ({ id }) => id === removedMember.id,
        ),
      })

      return updatedTeam
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

export { TeamServiceDef }
const TeamService = new TeamServiceDef(TeamRepository)
export default TeamService
