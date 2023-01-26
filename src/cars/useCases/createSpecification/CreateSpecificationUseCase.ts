import { ISpecificationsRepository } from "src/cars/repositories/ISpecificationsRepository"
import { inject, injectable } from "tsyringe"

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository,
  ) {}

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists = this.specificationsRepository.findByName(name)

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists")
    }

    this.specificationsRepository.create({ name, description })
  }
}