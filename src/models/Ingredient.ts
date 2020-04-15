import { IsNotEmpty, IsNumber, IsPositive, Max } from 'class-validator';
import { attribute, hashKey, table } from '@aws/dynamodb-data-mapper-annotations';

@table('alcoholicIngredients')
export class Ingredient {

    @hashKey()
    public name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Max(1)
    @attribute()
    public strength: number;

    @attribute()
    public measurement?: number;

    @attribute()
    public measurementUnit?: string;
    
    @IsNotEmpty()
    @attribute()
    public color: string;

    @attribute()
    public alcoholicType?: string;
    
    @attribute()
    public photoUrlLarge?: string;

    @attribute()
    public photoUrlMedium?: string;

    @attribute()
    public photoUrlSmall?: string;
}