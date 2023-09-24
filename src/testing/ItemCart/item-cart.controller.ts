import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('item-cart')
@ApiTags('item-cart')
export class ItemCartController {}
