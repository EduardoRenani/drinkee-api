import { Ingredient } from './../../../models/Ingredient';
import { IngredientService } from './../../../services/IngredientService';
import { validateClass } from '../../../../lib/drinkeeValidation';
import { created, buildResponseError } from '../../../../lib/drinkeeAPIGatewayProxyResult';
import { APIGatewayProxyHandler } from "aws-lambda";
import * as Logger from '../../../../lib/logger';

export const handler: APIGatewayProxyHandler = async (event) => {
  Logger.info(event);
  try {
    const ingredient: Ingredient = Object.assign(new Ingredient, JSON.parse(event.body));

    await validateClass(ingredient);

    return created(await new IngredientService().createIngredient(ingredient));

  } catch (e) {
    Logger.error(e);
    return buildResponseError(e);
  }
};