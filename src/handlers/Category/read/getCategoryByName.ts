import { success } from './../../../../lib/drinkeeAPIGatewayProxyResult';
import {  buildResponseError } from '../../../../lib/drinkeeAPIGatewayProxyResult';
import { APIGatewayProxyHandler } from "aws-lambda";
import * as Logger from '../../../../lib/logger';
import { CategoryService } from '../../../services/CategoryService';

export const handler: APIGatewayProxyHandler = async (event) => {
    Logger.info(event);
    try {
        const name =  event.queryStringParameters.name
            
        return success(await new CategoryService().getCategoryByName(name));
  
    } catch (e) {
        Logger.error(e);
        return buildResponseError(e);
    }
};