import { success, buildResponseError } from './../../../../lib/drinkeeAPIGatewayProxyResult';
import { DrinkService } from './../../../services/DrinkService';
import * as Logger from '../../../../lib/logger';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
    Logger.info(event);
    try {
        const name = event.pathParameters.name.replace("%20", " ");

        return success(await new DrinkService().deleteDrink(name));

    } catch (e) {
        Logger.error(e);
        return buildResponseError(e);
    }
};