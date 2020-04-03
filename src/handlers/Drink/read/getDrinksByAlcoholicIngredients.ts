import { success } from '../../../../lib/drinkeeAPIGatewayProxyResult';
import { DrinkService } from '../../../services/DrinkService';
import {  buildResponseError } from '../../../../lib/drinkeeAPIGatewayProxyResult';
import { APIGatewayProxyHandler } from "aws-lambda";
import * as Logger from '../../../../lib/logger';

export const handler: APIGatewayProxyHandler = async (event) => {
    Logger.info(event);
    try {
        const baseSpirit = event.queryStringParameters.baseSpirit.replace("%20", " ");
        const liquor = event.queryStringParameters.liquor.replace("%20", " ");
        const wineVermouth = event.queryStringParameters.wineVermouth.replace("%20", " ");
        const mixers = event.queryStringParameters.mixers.replace("%20", " ");

        return success(await new DrinkService()
            .getDrinksByAlcoholicIngredients(baseSpirit, liquor, wineVermouth, mixers)
        );
  
    } catch (e) {
        Logger.error(e);
        return buildResponseError(e);
    }
};