import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {BillDetail, BillDetailRelations, Item} from '../models';
import {ItemRepository} from './item.repository';

export class BillDetailRepository extends DefaultCrudRepository<BillDetail, typeof BillDetail.prototype.bill_detail_id, BillDetailRelations> {
  public readonly item: HasOneRepositoryFactory<Item, typeof BillDetail.prototype.bill_detail_id>;

  constructor(@inject('datasources.db') dataSource: DbDataSource, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>) {
    super(BillDetail, dataSource);
    this.item = this.createHasOneRepositoryFactoryFor('item', itemRepositoryGetter);
    this.registerInclusionResolver('item', this.item.inclusionResolver);
  }
}
