import { success, buildResponseError } from './../../../../lib/drinkeeAPIGatewayProxyResult';
import * as Logger from '../../../../lib/logger';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { CategoryService } from '../../../services/CategoryService';

export const handler: APIGatewayProxyHandler = async (event) => {
    Logger.info(event);
    try {
        const category = event.pathParameters.uid;

        return success(await new CategoryService().deleteCategory(category));

    } catch (e) {
        Logger.error(e);
        return buildResponseError(e);
    }
};