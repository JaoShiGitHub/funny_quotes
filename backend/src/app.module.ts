import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RegisterModule } from './register/register.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, RegisterModule, UserModule]
})
export class AppModule {}
