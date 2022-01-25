import { ConfigModule } from 'src/config/config.module'
import { ConfigService } from 'src/config/config.service'
import { Configuration } from 'src/config/config.keys'
import { MongooseModule } from '@nestjs/mongoose'

export const databaseProviders = [

    MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        connectionName: 'compensardb',
        useFactory: async(config : ConfigService) => {
            return {
                uri: config.get(Configuration.MONGODB_URI),
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }
    })
]