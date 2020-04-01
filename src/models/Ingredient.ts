import { IsNotEmpty, IsNumber, IsPositive, Max } from 'class-validator';
import { attribute } from '@aws/dynamodb-data-mapper-annotations';

export class Ingredient {

    @IsNotEmpty()
    @attribute()
    public name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Max(1)
    @attribute()
    public strength: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @attribute()
    public measurement: number;

    @attribute()
    public measurementUnit: string;

}