import { success } from './../../../../lib/drinkeeAPIGatewayProxyResult';
import {  buildResponseError } from '../../../../lib/drinkeeAPIGatewayProxyResult';
import { APIGatewayProxyHandler } from "aws-lambda";
import * as Logger from '../../../../lib/logger';
import { CategoryService } from '../../../services/CategoryService';

export const handler: APIGatewayProxyHandler = async (event) => {
    Logger.info(event);
    try {

        return success(await new CategoryService().getAllCategories());
  
    } catch (e) {
        Logger.error(e);
        return buildResponseError(e);
    }
};