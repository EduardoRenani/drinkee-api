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

}