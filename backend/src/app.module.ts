import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RegisterModule } from './register/register.module';
import { UserModule } from './user/user.module';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [AuthModule, RegisterModule, UserModule, QuotesModule]
})
export class AppModule {}
