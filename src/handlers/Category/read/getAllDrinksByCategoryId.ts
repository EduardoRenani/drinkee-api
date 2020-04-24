import { isNotEmpty } from 'class-validator';
import { success } from './../../../../lib/drinkeeAPIGatewayProxyResult';
import {  buildResponseError } from '../../../../lib/drinkeeAPIGatewayProxyResult';
import { APIGatewayProxyHandler } from "aws-lambda";
import * as Logger from '../../../../lib/logger';
import { CategoryService } from '../../../services/CategoryService';

export const handler: APIGatewayProxyHandler = async (event) => {
    Logger.info(event);
    try {
        const uid = event.pathParameters.uid;
        const language =
            isNotEmpty(event.queryStringParameters) ?
            event.queryStringParameters.language :
            null
        return success(await new CategoryService().getAllDrinksByCategoryId(uid, language));
  
    } catch (e) {
        Logger.error(e);
        return buildResponseError(e);
    }
};