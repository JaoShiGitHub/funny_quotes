import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
providers: [RegisterService],
  controllers: [RegisterController],
  exports: [RegisterService]
})

export class RegisterModule {}