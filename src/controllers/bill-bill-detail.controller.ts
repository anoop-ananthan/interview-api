import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {Bill, BillDetail} from '../models';
import {BillRepository} from '../repositories';

@authenticate('jwt')
export class BillBillDetailController {
  constructor(@repository(BillRepository) protected billRepository: BillRepository) {}

  @get('/bills/{id}/bill-details', {
    responses: {
      '200': {
        description: 'Array of Bill has many BillDetail',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BillDetail)},
          },
        },
      },
    },
  })
  async find(@param.path.number('id') id: number, @param.query.object('filter') filter?: Filter<BillDetail>): Promise<BillDetail[]> {
    return this.billRepository.billDetails(id).find(filter);
  }

  @post('/bills/{id}/bill-details', {
    responses: {
      '200': {
        description: 'Bill model instance',
        content: {'application/json': {schema: getModelSchemaRef(BillDetail)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Bill.prototype.bill_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillDetail, {
            title: 'NewBillDetailInBill',
            exclude: ['bill_detail_id'],
            optional: ['bill_id'],
          }),
        },
      },
    })
    billDetail: Omit<BillDetail, 'bill_detail_id'>,
  ): Promise<BillDetail> {
    return this.billRepository.billDetails(id).create(billDetail);
  }

  @patch('/bills/{id}/bill-details', {
    responses: {
      '200': {
        description: 'Bill.BillDetail PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillDetail, {partial: true}),
        },
      },
    })
    billDetail: Partial<BillDetail>,
    @param.query.object('where', getWhereSchemaFor(BillDetail)) where?: Where<BillDetail>,
  ): Promise<Count> {
    return this.billRepository.billDetails(id).patch(billDetail, where);
  }

  @del('/bills/{id}/bill-details', {
    responses: {
      '200': {
        description: 'Bill.BillDetail DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(@param.path.number('id') id: number, @param.query.object('where', getWhereSchemaFor(BillDetail)) where?: Where<BillDetail>): Promise<Count> {
    return this.billRepository.billDetails(id).delete(where);
  }
}
