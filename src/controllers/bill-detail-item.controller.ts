import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {BillDetail, Item} from '../models';
import {BillDetailRepository} from '../repositories';

@authenticate('jwt')
export class BillDetailItemController {
  constructor(@repository(BillDetailRepository) protected billDetailRepository: BillDetailRepository) {}

  @get('/bill-details/{id}/item', {
    responses: {
      '200': {
        description: 'BillDetail has one Item',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Item),
          },
        },
      },
    },
  })
  async get(@param.path.number('id') id: number, @param.query.object('filter') filter?: Filter<Item>): Promise<Item> {
    return this.billDetailRepository.item(id).get(filter);
  }

  @post('/bill-details/{id}/item', {
    responses: {
      '200': {
        description: 'BillDetail model instance',
        content: {'application/json': {schema: getModelSchemaRef(Item)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof BillDetail.prototype.bill_detail_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {
            title: 'NewItemInBillDetail',
            exclude: ['id'],
            optional: ['id'],
          }),
        },
      },
    })
    item: Omit<Item, 'id'>,
  ): Promise<Item> {
    return this.billDetailRepository.item(id).create(item);
  }

  @patch('/bill-details/{id}/item', {
    responses: {
      '200': {
        description: 'BillDetail.Item PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {partial: true}),
        },
      },
    })
    item: Partial<Item>,
    @param.query.object('where', getWhereSchemaFor(Item)) where?: Where<Item>,
  ): Promise<Count> {
    return this.billDetailRepository.item(id).patch(item, where);
  }

  @del('/bill-details/{id}/item', {
    responses: {
      '200': {
        description: 'BillDetail.Item DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(@param.path.number('id') id: number, @param.query.object('where', getWhereSchemaFor(Item)) where?: Where<Item>): Promise<Count> {
    return this.billDetailRepository.item(id).delete(where);
  }
}
