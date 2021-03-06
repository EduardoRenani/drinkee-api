import { success, buildResponseError } from './../../../../lib/drinkeeAPIGatewayProxyResult';
import * as Logger from '../../../../lib/logger';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { CategoryService } from '../../../services/CategoryService';

export const handler: APIGatewayProxyHandler = async (event) => {
    Logger.info(event);
    try {
        const uid = event.pathParameters.uid;

        return success(await new CategoryService().deleteCategory(uid));

    } catch (e) {
        Logger.error(e);
        return buildResponseError(e);
    }
};