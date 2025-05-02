import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

export function ApiQueryDecorator(summary: string, description: string) {
  return applyDecorators(
    ApiOperation({
      summary,
      description,
    }),
    ApiQuery({
      name: 'skip',
      type: Number,
      example: 0,
      description: 'Pagination offset',
      required: false,
    }),
    ApiQuery({
      name: 'take',
      type: Number,
      example: 20,
      description: 'Pagination limit',
      required: false,
    }),
    ApiQuery({
      name: 'order',
      type: String,
      example: '{"id": "DESC"}',
      description: 'Sorting order (JSON string)',
      required: false,
    }),
    ApiQuery({
      name: 'filters',
      type: String,
      example: '{"visibility": 1}',
      description: 'Filter conditions (JSON string)',
      required: false,
    }),
    ApiQuery({
      name: 'query',
      type: String,
      example: '123',
      description: 'Search query',
      required: false,
    }),
  );
}
