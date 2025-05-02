import { SetMetadata } from '@nestjs/common';

export const LOG_ACTION_KEY = 'log_action';

export interface LogActionOptions {
  entity: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
}

export const LogAction = (options: LogActionOptions) =>
  SetMetadata(LOG_ACTION_KEY, options);
