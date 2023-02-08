import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {BillDetail} from '../models';
import {BillDetailRepository} from '../repositories';

@authenticate('jwt')
export class BillDetailController {
  constructor(
    @repository(BillDetailRepository)
    public billDetailRepository: BillDetailRepository,
  ) {}

  @post('/bill-details')
  @response(200, {
    description: 'BillDetail model instance',
    content: {'application/json': {schema: getModelSchemaRef(BillDetail)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillDetail, {
            title: 'NewBillDetail',
            exclude: ['bill_detail_id'],
          }),
        },
      },
    })
    billDetail: Omit<BillDetail, 'bill_detail_id'>,
  ): Promise<BillDetail> {
    return this.billDetailRepository.create(billDetail);
  }

  @get('/bill-details/count')
  @response(200, {
    description: 'BillDetail model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(BillDetail) where?: Where<BillDetail>): Promise<Count> {
    return this.billDetailRepository.count(where);
  }

  @get('/bill-details')
  @response(200, {
    description: 'Array of BillDetail model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BillDetail, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(BillDetail) filter?: Filter<BillDetail>): Promise<BillDetail[]> {
    return this.billDetailRepository.find(filter);
  }

  @patch('/bill-details')
  @response(200, {
    description: 'BillDetail PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillDetail, {partial: true}),
        },
      },
    })
    billDetail: BillDetail,
    @param.where(BillDetail) where?: Where<BillDetail>,
  ): Promise<Count> {
    return this.billDetailRepository.updateAll(billDetail, where);
  }

  @get('/bill-details/{id}')
  @response(200, {
    description: 'BillDetail model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BillDetail, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.number('id') id: number, @param.filter(BillDetail, {exclude: 'where'}) filter?: FilterExcludingWhere<BillDetail>): Promise<BillDetail> {
    return this.billDetailRepository.findById(id, filter);
  }

  @patch('/bill-details/{id}')
  @response(204, {
    description: 'BillDetail PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BillDetail, {partial: true}),
        },
      },
    })
    billDetail: BillDetail,
  ): Promise<void> {
    await this.billDetailRepository.updateById(id, billDetail);
  }

  @put('/bill-details/{id}')
  @response(204, {
    description: 'BillDetail PUT success',
  })
  async replaceById(@param.path.number('id') id: number, @requestBody() billDetail: BillDetail): Promise<void> {
    await this.billDetailRepository.replaceById(id, billDetail);
  }

  @del('/bill-details/{id}')
  @response(204, {
    description: 'BillDetail DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.billDetailRepository.deleteById(id);
  }
}
