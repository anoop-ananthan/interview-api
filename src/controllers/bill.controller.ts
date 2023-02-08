import {authenticate} from '@loopback/authentication';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, put, requestBody, response} from '@loopback/rest';
import {Bill} from '../models';
import {BillRepository} from '../repositories';

@authenticate('jwt')
export class BillController {
  constructor(
    @repository(BillRepository)
    public billRepository: BillRepository,
  ) {}

  @post('/bills')
  @response(200, {
    description: 'Bill model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bill)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bill, {
            title: 'NewBill',
            exclude: ['bill_id'],
          }),
        },
      },
    })
    bill: Omit<Bill, 'bill_id'>,
  ): Promise<Bill> {
    return this.billRepository.create(bill);
  }

  @get('/bills/count')
  @response(200, {
    description: 'Bill model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Bill) where?: Where<Bill>): Promise<Count> {
    return this.billRepository.count(where);
  }

  @get('/bills')
  @response(200, {
    description: 'Array of Bill model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bill, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Bill) filter?: Filter<Bill>): Promise<Bill[]> {
    return this.billRepository.find(filter);
  }

  @patch('/bills')
  @response(200, {
    description: 'Bill PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bill, {partial: true}),
        },
      },
    })
    bill: Bill,
    @param.where(Bill) where?: Where<Bill>,
  ): Promise<Count> {
    return this.billRepository.updateAll(bill, where);
  }

  @get('/bills/{id}')
  @response(200, {
    description: 'Bill model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bill, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.number('id') id: number, @param.filter(Bill, {exclude: 'where'}) filter?: FilterExcludingWhere<Bill>): Promise<Bill> {
    return this.billRepository.findById(id, filter);
  }

  @patch('/bills/{id}')
  @response(204, {
    description: 'Bill PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bill, {partial: true}),
        },
      },
    })
    bill: Bill,
  ): Promise<void> {
    await this.billRepository.updateById(id, bill);
  }

  @put('/bills/{id}')
  @response(204, {
    description: 'Bill PUT success',
  })
  async replaceById(@param.path.number('id') id: number, @requestBody() bill: Bill): Promise<void> {
    await this.billRepository.replaceById(id, bill);
  }

  @del('/bills/{id}')
  @response(204, {
    description: 'Bill DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.billRepository.deleteById(id);
  }
}
