import { DrinkService } from './../../../services/DrinkService';
import { Drink } from './../../../models/Drink';
import { validateClass } from '../../../../lib/drinkeeValidation';
import { created, buildResponseError } from '../../../../lib/drinkeeAPIGatewayProxyResult';
import { APIGatewayProxyHandler } from "aws-lambda";
import * as Logger from '../../../../lib/logger';

export const handler: APIGatewayProxyHandler = async (event) => {
  Logger.info(event);
  try {
    
    const name = event.pathParameters.name.replace("%20", " ");
    const drink: Drink = Object.assign(new Drink, JSON.parse(event.body));

    await validateClass(drink);

    return created(await new DrinkService().updateDrink(name, drink));

  } catch (e) {
    Logger.error(e);
    return buildResponseError(e);
  }
};