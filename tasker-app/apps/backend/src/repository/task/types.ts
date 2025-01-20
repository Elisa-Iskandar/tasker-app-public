import { Task } from "@prisma/client"

interface CreateTaskArgs
  extends Partial<
    Omit<Task, "assignee" | "assigneeId" | "updatedBy" | "updaterId">
  > {
  creatorId: string
  taskName: string
  teamId: string
}

export { Task, CreateTaskArgs }
