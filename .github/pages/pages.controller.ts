import { JwtAuthGuard, RolesGuard } from '@auth/guards';
import { Roles } from '@common/decorators';
import { Controller, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRoles } from 'src/types/UserRoles';
import { PagesService } from './pages.service';

@ApiTags('Пользователи')
@UseGuards(JwtAuthGuard)
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @ApiOperation({
    summary: `Получить все страницы. Доступен с ролями: ${UserRoles.Creator}, ${UserRoles.Admin}`,
  })
  @ApiResponse({ status: HttpStatus.OK })
  @UseGuards(RolesGuard)
  @Roles(UserRoles.Creator, UserRoles.Admin)
  @Get('pages')
  async getAllPages() {
    return await this.pagesService.getAllPages();
  }
}
