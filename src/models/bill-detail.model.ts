import {Entity, hasOne, model, property} from '@loopback/repository';
import {Item} from './item.model';

@model()
export class BillDetail extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  bill_detail_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  bill_id: number;

  @property({
    type: 'number',
    required: true,
  })
  item_id: number;

  @property({
    type: 'number',
    required: true,
  })
  unit_price: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'string',
  })
  remark?: string;

  @hasOne(() => Item, {keyTo: 'id'})
  item: Item;

  constructor(data?: Partial<BillDetail>) {
    super(data);
  }
}

export interface BillDetailRelations {
  // describe navigational properties here
}

export type BillDetailWithRelations = BillDetail & BillDetailRelations;
