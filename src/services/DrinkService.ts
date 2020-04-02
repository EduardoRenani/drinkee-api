import { Drink } from './../models/Drink';
import { DrinkeeDynamodbDataMapper } from './../../lib/drinkeeDynamoDataWrapper';

export class DrinkService {
    private dataMapper: DrinkeeDynamodbDataMapper;
  
    constructor() {
        this.dataMapper = new DrinkeeDynamodbDataMapper();
    }

    /**
    * Create a new drink
    * @param drink object that represents a drink
    */
    public async createDrink(drink: Drink) {
        return await this.dataMapper.put(Object.assign(new Drink(), drink));
    }

    /**
    * Get a drink by its name
    * @param name drink's name
    */
    public async getDrinkByName(name: string) {
        return await this.dataMapper.get(Object.assign(new Drink, { name }));
    }

    /**
    * Get a drink by its name
    * @param name drink's name
    */
    public async getDrinksByBaseSpirit(baseSpirit: string) {
        return await this.dataMapper.query(Drink, { baseSpirit }, { indexName: 'baseSpirit-rating-index' }); 
    }

}