import {Entity, hasMany, model, property} from '@loopback/repository';
import {BillDetail} from './bill-detail.model';

@model()
export class Bill extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  bill_id?: number;

  @property({
    type: 'date',
    required: true,
  })
  bill_date: string;

  @property({
    type: 'string',
    default: 'Cash',
  })
  customer_name?: string;

  @property({
    type: 'string',
  })
  remark?: string;

  @hasMany(() => BillDetail, {keyTo: 'bill_id'})
  billDetails: BillDetail[];

  constructor(data?: Partial<Bill>) {
    super(data);
  }
}

export interface BillRelations {
  // describe navigational properties here
}

export type BillWithRelations = Bill & BillRelations;
