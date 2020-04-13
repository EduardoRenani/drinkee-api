import { ConditionExpression } from '@aws/dynamodb-expressions';
import { Ingredient } from './../models/Ingredient';
import { DrinkeeDynamodbDataMapper } from './../../lib/drinkeeDynamoDataWrapper';

export class IngredientService {
    private dataMapper: DrinkeeDynamodbDataMapper;
  
    constructor() {
        this.dataMapper = new DrinkeeDynamodbDataMapper();
    }

    /**
    * Create a new Ingredient
    * @param ingredient object that represents a ingredient
    */
    public async createIngredient(ingredient: Ingredient) {
        return await this.dataMapper.put(Object.assign(new Ingredient(), ingredient));
    }

    /**
    * Get a ingredient by it's name
    * @param name ingredient's name
    */
    public async getIngredientByName(name: string) {
        return await this.dataMapper.get(Object.assign(new Ingredient, { name }));
    }

    /**
    * Get all ingredients from database
    */
    public async getAllIngredients() {
        return await this.dataMapper.scan(Ingredient) 
    }

    /**
    * Get all ingredients with greater-than-zero strength (alcoholic ones)
    */
    public async getAllAlcoholicIngredients() {
        const conditionExpression: ConditionExpression = {
            conditions: [
              {
                object: 0.01,
                subject: 'strength',
                type: 'GreaterThanOrEqualTo',  
              },
            ],
            type: 'And'
        };  
        return await this.dataMapper.scan(Ingredient, { filter: conditionExpression }) 
    }

    /**
    * Delete a ingredient by it's name
    * @param name ingredient's name
    */
    public async deleteIngredient(name: string) {
        return await this.dataMapper.delete(Object.assign(new Ingredient, { name }));
    }

}