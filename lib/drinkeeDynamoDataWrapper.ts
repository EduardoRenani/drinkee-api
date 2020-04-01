import { ResponseError } from './drinkeeAPIGatewayProxyResult';
import {
    DataMapper,
    GetOptions,
    ParallelScanWorkerOptions,
    PutOptions,
    QueryOptions,
    ScanOptions,
    StringToAnyObjectMap,
    UpdateOptions,
  } from '@aws/dynamodb-data-mapper';
  import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';
  import { ConditionExpression, ConditionExpressionPredicate } from '@aws/dynamodb-expressions';
  import { DeleteOptions } from '@google-cloud/common/build/src/service-object';
  import { DynamoDB } from 'aws-sdk';
  
  export class DrinkeeDynamodbDataMapper {
    private dynamoDataMapper: DataMapper;
  
    constructor() {
      this.dynamoDataMapper = new DataMapper({
        client: new DynamoDB(),
        tableNamePrefix: '',
      });
    }
  
    public put<T extends StringToAnyObjectMap = StringToAnyObjectMap>(item: T, options?: PutOptions): Promise<T> {
      return this.dynamoDataMapper.put(item, options);
    }
  
    public get<T extends StringToAnyObjectMap = StringToAnyObjectMap>(item: T, options?: GetOptions): Promise<T> {
      return this.dynamoDataMapper.get(item, options);
    }
  
    public update<T extends StringToAnyObjectMap = StringToAnyObjectMap>(item: T, options?: UpdateOptions): Promise<T> {
      return this.dynamoDataMapper.update(item, options);
    }
  
    public delete<T extends StringToAnyObjectMap = StringToAnyObjectMap>(
      item: T,
      options?: DeleteOptions,
    ): Promise<T | undefined> {
      return this.dynamoDataMapper.delete(item, options);
    }
  
    public async scan<T extends StringToAnyObjectMap>(
      valueConstructor: ZeroArgumentsConstructor<T>,
      options?: ScanOptions | ParallelScanWorkerOptions,
    ): Promise<T[]> {
      try {
        const iterator = this.dynamoDataMapper.scan(valueConstructor, options);
  
        const items = [];
        for await (const item of iterator) {
          items.push(item);
        }
  
        if (items.length === 0) {
          throw new ResponseError(404, `${valueConstructor.name} not found`);
        }
  
        return items;
      } catch (e) {
        throw e;
      }
    }
  
    public async query<T extends StringToAnyObjectMap = StringToAnyObjectMap>(
      valueConstructor: ZeroArgumentsConstructor<T>,
      keyCondition: ConditionExpression | { [propertyName: string]: ConditionExpressionPredicate | any },
      options?: QueryOptions,
    ): Promise<T[]> {
      try {
        const iterator = this.dynamoDataMapper.query(valueConstructor, keyCondition, options);
  
        const items = [];
        for await (const item of iterator) {
          items.push(item);
        }
  
        if (items.length === 0) {
          throw new ResponseError(404, `${valueConstructor.name} not found`);
        }
  
        return items;
      } catch (e) {
        throw e;
      }
    }
  }