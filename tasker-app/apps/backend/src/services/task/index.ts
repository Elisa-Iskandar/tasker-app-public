import { Task, TASK_STATUS, User } from "@prisma/client"
import TaskRepository, { TaskRepositoryDef } from "../../repository/task"

class TaskServiceDef {
  private taskRepo: TaskRepositoryDef
  constructor(taskRepo: TaskRepositoryDef) {
    this.taskRepo = taskRepo
  }

  async addTask(newTask: CreateTaskArgs): Promise<Task | null> {
    try {
      return await this.taskRepo.addTask(newTask)
    } catch (error) {
      return null
    }
  }

  async updateStatus({
    id,
    taskStatus,
  }: {
    id: string
    taskStatus: TASK_STATUS
  }): Promise<Task | null> {
    try {
      const newStatus = await this.taskRepo.updateTask({
        id,
        taskStatus,
      })
      return newStatus
    } catch (error) {
      return null
    }
  }

  async assignTask({
    id,
    assigneeId,
  }: {
    id: string
    assigneeId: string
  }): Promise<Task | null> {
    try {
      const newStatus = await this.taskRepo.updateTask({
        id,
        assigneeId,
      })
      return newStatus
    } catch (error) {
      return null
    }
  }

  async deleteTask(id: string) {
    try {
      await this.taskRepo.deleteTask(id)
      return true
    } catch (error) {
      return false
    }
  }
}

interface CreateTaskArgs {
  id: string
  taskName: string
  teamId: string
  creatorId: string
  description?: string
}
