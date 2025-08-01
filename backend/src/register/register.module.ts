import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { RegisterGuard } from './register.guard';
@Module({
providers: [RegisterService, RegisterGuard],
  controllers: [RegisterController],
  exports: [RegisterService]
})

export class RegisterModule {}