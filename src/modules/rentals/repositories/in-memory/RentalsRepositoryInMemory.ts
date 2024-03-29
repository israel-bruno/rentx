import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    return this.rentals.find((rental) => {
      return rental.car_id === car_id && !rental.end_date;
    });
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    return this.rentals.find((rental) => {
      return rental.user_id === user_id && !rental.end_date;
    });
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental | undefined> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental | undefined> {
    return this.rentals.find((rental) => rental.id == id);
  }

  async findByUser(user_id: string): Promise<Rental[] | undefined> {
    return this.rentals.filter((rental) => rental.user_id == user_id);
  }
}
export { RentalsRepositoryInMemory };
