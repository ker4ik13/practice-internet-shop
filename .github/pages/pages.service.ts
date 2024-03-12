import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page } from './pages.schema';

@Injectable()
export class PagesService {
  constructor(@InjectModel(Page.name) private model: Model<Page>) {}

  async getAllPages() {
    return await this.model.find();
  }
}
