import { success } from './../../../../lib/drinkeeAPIGatewayProxyResult';
import { DrinkService } from './../../../services/DrinkService';
import {  buildResponseError } from '../../../../lib/drinkeeAPIGatewayProxyResult';
import { APIGatewayProxyHandler } from "aws-lambda";
import * as Logger from '../../../../lib/logger';

export const handler: APIGatewayProxyHandler = async (event) => {
    Logger.info(event);
    try {
        const name = event.pathParameters.name.replace("%20", " ");

        Logger.warn(name);

        return success(await new DrinkService().getDrinkByName(name));
  
    } catch (e) {
        Logger.error(e);
        return buildResponseError(e);
    }
  };