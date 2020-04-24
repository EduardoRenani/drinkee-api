import { isNotEmpty } from 'class-validator';
import { success } from './../../../../lib/drinkeeAPIGatewayProxyResult';
import { DrinkService } from './../../../services/DrinkService';
import {  buildResponseError } from '../../../../lib/drinkeeAPIGatewayProxyResult';
import { APIGatewayProxyHandler } from "aws-lambda";
import * as Logger from '../../../../lib/logger';

export const handler: APIGatewayProxyHandler = async (event) => {
    Logger.info(event);
    try {
        const numberOfDrinks = Number(event.queryStringParameters.numberOfDrinks);
        const language =
        isNotEmpty(event.queryStringParameters) ?
        event.queryStringParameters.language :
        ""
        return success(await new DrinkService().getTopNDrinks(numberOfDrinks, language));
  
    } catch (e) {
        Logger.error(e);
        return buildResponseError(e);
    }
};