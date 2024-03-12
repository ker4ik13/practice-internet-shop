import { Context as TelegrafContext } from 'telegraf';

export interface Context extends TelegrafContext {
  session: {
    telegramId: number;
    type: 'write-email' | 'default';
    email?: string;
    roles: string[];
  };
}
