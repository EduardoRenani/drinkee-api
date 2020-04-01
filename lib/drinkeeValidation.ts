import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { ResponseError } from './drinkeeAPIGatewayProxyResult';

export const validateClass = async (object: any, validatorOptions?: ValidatorOptions): Promise<boolean> => {
  const errors: ValidationError[] = await validate(object, validatorOptions);

  if (errors.length > 0) {
    throw new ResponseError(400, JSON.stringify(errors));
  }

  return true;
};