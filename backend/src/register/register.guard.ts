import { Injectable, ExecutionContext, CanActivate, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { RegisterService } from './register.service';

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(private registerService: RegisterService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const body = request.body;

    const userExists = await this.registerService.findByUsername(body.username);
    
    if (userExists) {
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'Username is already taken',
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    }
    
    return true;
  }
}
