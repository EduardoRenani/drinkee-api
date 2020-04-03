import { success } from '../../../../lib/drinkeeAPIGatewayProxyResult';
import { DrinkService } from '../../../services/DrinkService';
import {  buildResponseError } from '../../../../lib/drinkeeAPIGatewayProxyResult';
import { APIGatewayProxyHandler } from "aws-lambda";
import * as Logger from '../../../../lib/logger';
import { isNotEmpty } from 'class-validator';

export const handler: APIGatewayProxyHandler = async (event) => {
    Logger.info(event);
    try {

        const baseSpirit = 
            isNotEmpty(event.queryStringParameters.baseSpirit) ? 
            event.queryStringParameters.baseSpirit.replace("%20", " ") : 
            null
        const liquor = 
            isNotEmpty(event.queryStringParameters.liquor) ?
            event.queryStringParameters.liquor.replace("%20", " ") :
            null
        const wineVermouth = 
            isNotEmpty(event.queryStringParameters.wineVermouth) ?
            event.queryStringParameters.wineVermouth.replace("%20", " ") :
            null
        const mixers =
            isNotEmpty(event.queryStringParameters.mixers) ?
            event.queryStringParameters.mixers.replace("%20", " ") :
            null

        return success(await new DrinkService()
            .getDrinksByAlcoholicIngredients(baseSpirit, liquor, wineVermouth, mixers)
        );
  
    } catch (e) {
        Logger.error(e);
        return buildResponseError(e);
    }
};