import { ROLE } from "@prisma/client"
import { User } from "@prisma/client"

interface UpdateUserArgs extends Partial<User> {
  id: string
}

export { User, ROLE, UpdateUserArgs }
