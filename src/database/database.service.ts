import { ConfigModule } from 'src/config/config.module'
import { ConfigService } from 'src/config/config.service'
import { Configuration } from 'src/config/config.keys'
import { TypeOrmModule } from '@nestjs/typeorm'

export const databaseProviders = [

    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config : ConfigService) {
            return {
                type: 'mongodb',
                url: config.get(Configuration.MONGODB_URI),
                database: config.get(Configuration.MONGODB_NAME),
                entities: [
                    __dirname + '/**/*.entity{.ts,.js}',
                ],
                migrations: [__dirname + '/migrations/*{.ts,.js}'],
                ssl: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }
    })
]