import { FileRepositoryDef } from "../../repository/file"
import { UpdateFileArgs, File } from "../../repository/file/types"

class FileServiceDef {
  private fileRepo: FileRepositoryDef
  constructor(fileRepo: FileRepositoryDef) {
    this.fileRepo = fileRepo
  }
  async updateFileName({
    id,
    fileName,
  }: {
    id: string
    fileName: string
  }): Promise<File | null> {
    try {
      const updatedFile = this.fileRepo.updateFile({
        id,
        fileName,
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

  async deleteFile({ id }: { id: string }) {
    try {
      await this.fileRepo.deleteFile({
        id,
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async viewFile({ id }: { id: string }) {
    try {
      const file = await this.fileRepo.getFile({ id })
      return file
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
