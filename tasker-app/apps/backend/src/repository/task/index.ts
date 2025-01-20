import { PrismaClient } from "@prisma/client"
import dbClient from "../../client/prisma-mongodb"
import { CreateTaskArgs, Task } from "./types"

class TaskRepositoryDef {
  private db: PrismaClient
  constructor(dbClient: PrismaClient) {
    this.db = dbClient
  }
  //: Promise<Task | null>
  async addTask({
    creatorId,
    teamId,
    ...newTask
  }: CreateTaskArgs): Promise<Task | null> {
    try {
      return await this.db.task.create({
        data: {
          ...newTask,
          createdBy: {
            connect: {
              id: creatorId,
            },
          },
          team: {
            connect: {
              id: teamId,
            },
          },
        },
      })
    } catch (error) {
      return null
    }
  }

  async deleteTask(id: string): Promise<boolean> {
    try {
      await this.db.task.delete({
        where: {
          id: id,
        },
      })
      return true
    } catch (error) {
      return false
    }
  }

  async updateTask({ id, ...task }: Partial<Task>): Promise<Task | null> {
    try {
      const updatedTask = await this.db.task.update({
        where: {
          id: id,
        },
        data: task,
      })
      return updatedTask
    } catch (error) {
      return null
    }
  }

  async getAllTasks(teamId: string): Promise<Task[] | null> {
    try {
      const tasks = await this.db.task.findMany({
        where: {
          teamId: teamId,
        },
      })
      return tasks
    } catch (error) {
      return null
    }
  }
}

const TaskRepository = new TaskRepositoryDef(dbClient)
export { TaskRepositoryDef }
export default TaskRepository
