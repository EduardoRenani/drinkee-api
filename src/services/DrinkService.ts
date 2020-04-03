import { ConditionExpression } from '@aws/dynamodb-expressions';
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
    * Get all drinks you can make with given alcoholic ingredients
    * @param baseSpirit drinks with this base spirit
    * @param liquor drinks with this liquor
    * @param wineVermouth drinks with this wine or vermouth
    * @param mixers drinks with this mixer
    */
    public async getDrinksByAlcoholicIngredients(baseSpirit: string, liquor: string, wineVermouth: string, mixers: string) {
        const conditionExpression: ConditionExpression = {
          conditions: [
            {
              object: baseSpirit,
              subject: 'baseSpirit',
              type: 'Equals',  
            },
            {
              object: liquor,
              subject: 'liquor',
              type: 'Equals',  
            },
            {
              object: wineVermouth,
              subject: 'wineVermouth',
              type: 'Equals',  
            },
            {
              object: mixers,
              subject: 'mixers',
              type: 'Equals',  
            }
          ],
          type: 'Or'
        };  

        return await this.dataMapper.scan(Drink, { filter: conditionExpression }) 

    }

    /**
    * update drink's rating score
    * @param name drink's name
    */
    public async updateDrinkRatingScore(name: string, newRatingVote: number) {
        const drink = await this.dataMapper.get(Object.assign(new Drink, { name }));
        
        const currentRatingValue = drink.rating
        const currentDrinkNumberOfVotes = drink.numberOfRatingVotes
        
        drink.numberOfRatingVotes = currentDrinkNumberOfVotes + 1
        drink.rating = ((currentRatingValue * currentDrinkNumberOfVotes) + newRatingVote) /
                        drink.numberOfRatingVotes
    
        return await this.dataMapper.update(Object.assign(new Drink(), drink));
    }

}