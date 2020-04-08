import { Drink } from './../../../models/Drink';
import { created, buildResponseError } from '../../../../lib/drinkeeAPIGatewayProxyResult';
import { APIGatewayProxyHandler } from "aws-lambda";
import * as Logger from '../../../../lib/logger';
import { CategoryService } from '../../../services/CategoryService';

export const handler: APIGatewayProxyHandler = async (event) => {
  Logger.info(event);
  try {
    
    const uid = event.pathParameters.uid;
    const drinks: Drink[] = Object.assign(new Array<Drink>(), JSON.parse(event.body));

    //await validateClass(drinks);

    return created(await new CategoryService().addDrinksToCategory(uid, drinks));

  } catch (e) {
    Logger.error(e);
    return buildResponseError(e);
  }
};