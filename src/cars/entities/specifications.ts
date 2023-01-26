import { CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuidV4 } from "uuid"

@Entity("specifications")
export class Specification {
  @PrimaryColumn()
  id?: string

  @PrimaryColumn()
  name: string

  @PrimaryColumn()
  description: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}