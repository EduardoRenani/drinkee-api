import { success, buildResponseError } from './../../../../lib/drinkeeAPIGatewayProxyResult';
import { DrinkService } from './../../../services/DrinkService';
import { APIGatewayProxyHandler } from 'aws-lambda';
import * as Logger from '../../../../lib/logger';

export const handler: APIGatewayProxyHandler = async (event) => {
    Logger.info(event);
    try {

        const name = event.pathParameters.name.replace("%20", " ");
        const rating = JSON.parse(event.body).rating;
        
        return success(await new DrinkService().updateDrinkRatingScore(name, rating));
  
    } catch (e) {
        Logger.error(e);
        return buildResponseError(e);
    }
};