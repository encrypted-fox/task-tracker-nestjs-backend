import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsersService } from '../users/users.service';
import { LogsService } from './logs.service';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { extractTokenFromHeader } from '../../helpers/extractTokenFromHeader';
import { LOG_ACTION_KEY } from './logs.decorator';

@Injectable()
export class LogsInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private logsService: LogsService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const options = this.reflector.get<{
      entity: string;
      action: 'CREATE' | 'UPDATE' | 'DELETE';
    }>(LOG_ACTION_KEY, context.getHandler());

    return next.handle().pipe(
      tap(async (result) => {
        if (!options) return;

        const request = context.switchToHttp().getRequest();
        const path = request.route?.path;

        const token = extractTokenFromHeader(request);

        const creatorRaw = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        });

        const creator = await this.usersService.findOne({ id: creatorRaw.id });

        await this.logsService.create({
          path,
          action: options.action,
          entity: options.entity,
          object: {
            id: result?.id || request.params?.id,
            body: request.body,
            params: request.params,
          },
          creator,
        });
      }),
    );
  }
}
