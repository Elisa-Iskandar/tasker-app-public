import { PrismaClient } from "@prisma/client"
import { Team } from "./types"
import { User } from "../user/types"
import dbClient from "../../client/prisma-mongodb"

class TeamRepositoryDef {
  private db: PrismaClient
  constructor(dbClient: PrismaClient) {
    this.db = dbClient
  }

  async getTeam(id: string): Promise<Team | null> {
    try {
      const team = await this.db.team.findUnique({
        where: {
          id: id,
        },
      })
      return team
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getTeamMembers(teamId: string): Promise<User[] | null> {
    try {
      const teamMembers = await this.db.user.findMany({
        where: {
          teamId: teamId,
        },
      })
      return teamMembers
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async createTeam(name: string): Promise<Team | null> {
    try {
      const newTeam = this.db.team.create({
        data: {
          teamName: name,
        },
      })
      return newTeam
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async updateTeam({ id, ...teamProps }: Partial<Team>): Promise<Team | null> {
    try {
      const updatedTeam = this.db.team.update({
        where: {
          id: id,
        },
        data: teamProps,
      })
      return updatedTeam
    } catch (error) {
      console.log(error)
      return null
    }
  }
  async updateTeamMembers({
    id,
    teamMembers,
  }: {
    id: string
    teamMembers: User[]
  }): Promise<Team | null> {
    try {
      const updatedTeam = this.db.team.update({
        where: {
          id: id,
        },
        data: teamMembers,
      })
      return updatedTeam
    } catch (error) {
      console.log(error)
      return null
    }
  }
  async deleteTeam(teamId: string): Promise<boolean> {
    try {
      await this.db.team.delete({
        where: {
          id: teamId,
        },
      })

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

const TeamRepository = new TeamRepositoryDef(dbClient)
export { TeamRepositoryDef }
export default TeamRepository
