import { success } from './../../../../lib/drinkeeAPIGatewayProxyResult';
import { DrinkService } from './../../../services/DrinkService';
import {  buildResponseError } from '../../../../lib/drinkeeAPIGatewayProxyResult';
import { APIGatewayProxyHandler } from "aws-lambda";
import * as Logger from '../../../../lib/logger';

export const handler: APIGatewayProxyHandler = async (event) => {
    Logger.info(event);
    try {
        const baseSpirit = event.pathParameters.baseSpirit.replace("%20", " ");

        Logger.warn(baseSpirit);

        return success(await new DrinkService().getDrinksByBaseSpirit(baseSpirit));
  
    } catch (e) {
        Logger.error(e);
        return buildResponseError(e);
    }
};