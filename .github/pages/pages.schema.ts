import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Author, IPage, OGImage, Verification } from 'src/types/IPage';

export type PageDocument = HydratedDocument<Page>;

@Schema({
  collection: 'pages',
})
export class Page implements IPage {
  @Prop({
    required: true,
  })
  link: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop()
  keywords: string;

  @Prop({
    required: true,
  })
  createdAt: string;

  @Prop()
  updatedAt: string;

  @Prop()
  authors: null | Author | Array<Author>;

  @Prop()
  canonical: string;

  @Prop()
  openGraph: {
    type: string;
    title: string;
    description: string;
    images: OGImage | Array<OGImage>;
    siteName: string;
    url: string | URL;
  };

  @Prop()
  verification: Verification;
}

export const PageSchema = SchemaFactory.createForClass(Page);
