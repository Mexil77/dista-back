import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthConstants } from 'src/common/constants/auth.constatns';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStratedy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: AuthConstants.cert.privateKey,
    }),
    DatabaseModule,
    PassportModule,
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStratedy],
  exports: [AuthService],
})
export class AuthModule {}
