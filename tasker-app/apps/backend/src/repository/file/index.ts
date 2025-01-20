import { PrismaClient } from "@prisma/client"
import dbClient from "../../client/prisma-mongodb"
import { File, UpdateFileArgs } from "./types"

class FileRepositoryDef {
  private db: PrismaClient
  constructor(dbClient: PrismaClient) {
    this.db = dbClient
  }

  async uploadFile(newFile: File): Promise<File | null> {
    try {
      const uploadedFile = await this.db.file.create({
        data: newFile,
      })

      if (!uploadedFile) {
        throw new Error("File not uploaded")
      }

      return uploadedFile
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async updateFile({ id, ...fileProps }: UpdateFileArgs): Promise<File | null> {
    try {
      const updatedFile = this.db.file.update({
        where: { id },
        data: fileProps,
      })

      if (!updatedFile) {
        throw new Error("File not updated")
      }

      return updatedFile
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async deleteFile({ id }: { id: string }): Promise<boolean> {
    try {
      await this.db.file.delete({
        where: { id },
      })

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getFile({ id }: { id: string }): Promise<File | null> {
    try {
      const file = await this.db.file.findUnique({
        where: { id },
      })
      if (!file) {
        throw new Error("File not found")
      }
      return file
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async getFiles(where: Partial<File>): Promise<File[] | null> {
    try {
      const files = await this.db.file.findMany({
        where,
      })
      if (!files) {
        throw new Error("Files not found")
      }

      return files
    } catch (error) {
      console.log(error)
      return null
    }
  }
}

const FileRepository = new FileRepositoryDef(dbClient)
export { FileRepositoryDef }
export default FileRepository
