import { container } from "tsyringe";

// Category Repository
import { ICategoriesRepository } from 
"@modules/Cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from 
"@modules/Cars/infra/repositories/CategoriesRepository"

// Specification Repository
import { ISpecificationsRepository } from 
"@modules/Cars/repositories/ISpecificationsRepository";
import { SpecificationsRepository } from
"@modules/Cars/infra/repositories/SpecificationsRepository"

// User Repository
import { IUserRepository } from
"@modules/Accounts/repositories/IUserRepository";
import { UsersRepository } from
"@modules/Accounts/infra/repositories/UsersRepository";


// CategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
)
//SpecificationRepository
container.registerSingleton<ISpecificationsRepository>(
  "SpecificationRepository",
  SpecificationsRepository
)
//UsersRepository
container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository
)