import { Ingredient } from './Ingredient';
import { attribute, table, hashKey } from '@aws/dynamodb-data-mapper-annotations';
import { IsNotEmpty, IsNumber, IsPositive, Max, ValidateNested } from 'class-validator';

@table('drinks')
export class Drink {

    @hashKey()
    public name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Max(1)
    @attribute()
    public strength: number;

    @attribute()
    public style?: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Max(5)
    @attribute()
    public rating: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @attribute()
    public numberOfRatingVotes: number;

    @attribute()
    public author?: string;

    @attribute()
    public baseSpirit?: string;

    @attribute()
    public liquor?: string;

    @attribute()
    public wineVermouth?: string;

    @attribute()
    public mixer?: string;

    @attribute()
    public photoUrl?: string;

    @IsNotEmpty()
    @ValidateNested()
    @attribute()
    public ingredients: Ingredient[];

    constructor() {
        this.numberOfRatingVotes = 0;
    }

}