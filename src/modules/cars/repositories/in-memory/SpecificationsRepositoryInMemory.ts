import { AppError } from "@errors/AppError";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.specifications.find((spec) => spec.name == name);
  }

  async findByIds(ids: string[]): Promise<Specification[] | undefined> {
    return this.specifications.filter((spec) => {
      if (spec.id) {
        return ids.includes(spec.id);
      }
    });
  }
}

export { SpecificationsRepositoryInMemory };
