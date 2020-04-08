import { CategoryService } from './../../../services/CategoryService';
import { validateClass } from '../../../../lib/drinkeeValidation';
import { created, buildResponseError } from '../../../../lib/drinkeeAPIGatewayProxyResult';
import { APIGatewayProxyHandler } from "aws-lambda";
import * as Logger from '../../../../lib/logger';
import { Category } from '../../../models/Category';

export const handler: APIGatewayProxyHandler = async (event) => {
  Logger.info(event);
  try {
    const category: Category = Object.assign(new Category, JSON.parse(event.body));

    await validateClass(category);

    return created(await new CategoryService().createCategory(category));

  } catch (e) {
    Logger.error(e);
    return buildResponseError(e);
  }
};