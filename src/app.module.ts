import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

// const config = new ConfigModule()
@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://c3r4st3s2021:BQTBTewDzONGdZ89@questionsanswersdb.ljfaz.mongodb.net/compensardb"),
    ConfigModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  static port : number | string;

  constructor(private readonly _configService : ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT)
  }

}
