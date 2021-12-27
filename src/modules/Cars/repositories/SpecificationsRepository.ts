import { Specification } from "../model/Specification";
import { 
  ISpecificationsRepository, 
  ICreateSpecificationDTO 
} from "./ISpecificationsRepository";

class SpecificationRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = []
  }

  create({ description, name }: ICreateSpecificationDTO): void {
    throw new Error("Method not implemented")
  }
}

export { SpecificationRepository }