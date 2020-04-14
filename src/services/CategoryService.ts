import { Drink } from './../models/Drink';
import { Category } from './../models/Category';
import { DrinkeeDynamodbDataMapper } from './../../lib/drinkeeDynamoDataWrapper';

export class CategoryService {
    private dataMapper: DrinkeeDynamodbDataMapper;
  
    constructor() {
        this.dataMapper = new DrinkeeDynamodbDataMapper();
    }

    /**
    * Create a new Category
    * @param category object that represents a category
    */
    public async createCategory(category: Category) {
        return await this.dataMapper.put(Object.assign(new Category(), category));
    }

    /**
    * Get a category by its unique id
    * @param uid category's unique id
    */
    public async getCategoryById(uid: string) {
        return await this.dataMapper.get(Object.assign(new Category, { uid }));
    }

    /**
    * Get a category by its name
    * @param name category's name
    */
    public async getCategoryByName(name: string) {
        return await this.dataMapper.query(Category, { name }, { indexName: 'name-index' });
    }

    /**
    * Get a category by its name
    * @param name category's name
    */
    public async getAllDrinksByCategoryId(uid: string) {
        const category = await this.getCategoryById(uid)
        return await Promise.all(
            category.drinkReferences.map((name) => {
                return this.dataMapper.get(Object.assign(new Drink, { name })); 
            })
        )
    }


    /**
    * Get all category from database
    */
    public async getAllCategories() {
        const categories = await this.dataMapper.scan(Category)
        return categories.map((category) => {
            return { "name": category.name, "uid": category.uid }
        })
    }

    /**
    * Add a list of drinks to a given category
    * @param uid category's unique id
    * @param drinks list of Drink objects
    */
    public async addDrinksToCategory(uid: string, drinks: Drink[]) {
        const category = await this.dataMapper.get(Object.assign(new Category, { uid }));
        const allDrinkReferences = [...category.drinkReferences, ...(drinks.map((drink) => { return drink.name }))];
        category.drinkReferences = allDrinkReferences;
        return await this.dataMapper.put(Object.assign(new Category(), category));
    }

    /**
    * Delete a category by its unique id
    * @param uid category's unique id
    */
    public async deleteCategory(uid: string) {
        return await this.dataMapper.delete(Object.assign(new Category, { uid }));
    }

}