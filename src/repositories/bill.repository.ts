import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Bill, BillDetail, BillRelations} from '../models';
import {BillDetailRepository} from './bill-detail.repository';

export class BillRepository extends DefaultCrudRepository<Bill, typeof Bill.prototype.bill_id, BillRelations> {
  public readonly billDetails: HasManyRepositoryFactory<BillDetail, typeof Bill.prototype.bill_id>;

  constructor(@inject('datasources.db') dataSource: DbDataSource, @repository.getter('BillDetailRepository') protected billDetailRepositoryGetter: Getter<BillDetailRepository>) {
    super(Bill, dataSource);
    this.billDetails = this.createHasManyRepositoryFactoryFor('billDetails', billDetailRepositoryGetter);
    this.registerInclusionResolver('billDetails', this.billDetails.inclusionResolver);
  }
}
