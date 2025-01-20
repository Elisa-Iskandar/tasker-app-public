import { File } from "@prisma/client"

interface UpdateFileArgs
  extends Partial<Omit<File, "id" | "createdAt" | "updatedAt" | "creatorId">> {
  id: string
}

export { File, UpdateFileArgs }
