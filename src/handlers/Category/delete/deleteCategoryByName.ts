import { success, buildResponseError } from './../../../../lib/drinkeeAPIGatewayProxyResult';
import * as Logger from '../../../../lib/logger';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { CategoryService } from '../../../services/CategoryService';

export const handler: APIGatewayProxyHandler = async (event) => {
    Logger.info(event);
    try {
        const name = event.queryStringParameters.name.replace("%20", " ")

        return success(await new CategoryService().deleteCategoryByName(name));

    } catch (e) {
        Logger.error(e);
        return buildResponseError(e);
    }
};