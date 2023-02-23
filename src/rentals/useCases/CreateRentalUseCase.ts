import { AppError } from "../../shared/errors/AppError"
import { Rental } from "../infra/typeorm/entities/rental"
import { IRentalsRepository } from "../repositories/IRentalsRepository"

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

export class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({ car_id, expected_return_date, user_id }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

    if (carUnavailable) {
      throw new AppError("Car is unavailable")
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!")
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    })

    return rental
  }
}