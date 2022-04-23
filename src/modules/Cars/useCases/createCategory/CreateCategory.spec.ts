import { AppError } from "../../../../shared/errors/AppError";
import { CategoryRepositoryInMemory } from "../../repositories/in-memory/CatogoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

//describe => serve para agrupar os testes
describe("Create Category", () => {
	let createCategoryUseCase: CreateCategoryUseCase;
	let categoriesRepositoryInMemory: CategoryRepositoryInMemory

	beforeEach(() => {
		categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
		createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
	})

	it("should be able to create a new category", async () => {
		const category = {
			name: "Category Teste",
			description: "Category Desscription Teste"
		}

		await createCategoryUseCase.execute({
			name: category.name,
			description: category.description
		});

		const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

		expect(categoryCreated).toHaveProperty("id");
	});

	it("should not be able to create a new category with same exists", async () => {
		expect(async ()=> {
			const category = {
				name: "Category Teste",
				description: "Category Desscription Teste"
			}
	
			await createCategoryUseCase.execute({
				name: category.name,
				description: category.description
			});
	
			await createCategoryUseCase.execute({
				name: category.name,
				description: category.description
			});
		}).rejects.toBeInstanceOf(AppError)


	});
})