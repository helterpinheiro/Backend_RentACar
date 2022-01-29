import { parse } from "csv-parse";
import fs from "fs";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository){}


  loadCategories(file: Express.Multer.File):Promise<IImportCategory[]>{
    return new Promise((resolve, reject) => {
      // permite ler o arquivo em partes
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();

      stream.pipe(parseFile)

      parseFile
      .on("data", async (line) => {
        // ["name","description"]
        const [name, description] = line
        categories.push({
          name,
          description,
        });
      })
      .on("end", () => {
        // unlink remove o arquivo depois de upload de arquivo na pasta tmp
        fs.promises.unlink(file.path)
        resolve(categories);
      })
      .on("error", (err) => {
        reject(err)
      })
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    
    categories.map(async(categories) => {
      const {name, description} = categories;

      const existCategory = this.categoriesRepository.findByName(name);

      if(!existCategory) {
        this.categoriesRepository.create({
          name,
          description
        });
      }
    })

  }
}

export { ImportCategoryUseCase }