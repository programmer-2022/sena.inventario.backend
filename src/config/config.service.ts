import * as fs from 'fs'
import { parse } from 'dotenv'

export class ConfigService {

    private readonly envConfig : { [ key:string ] :string }
    
    constructor() {
        const isDevelopmentEnv = process.env.NODE_ENV !== "production"
        //Ambiente Desarrollo
        if(isDevelopmentEnv) {
            const envFilePath = __dirname + '/../../.env'
            const existPath = fs.existsSync(envFilePath)
            
            if(!existPath) {
                console.log(".env file doesn't exist")
                process.exit(0)
            }

            //Cargar las variables de entorno
            this.envConfig = parse(fs.readFileSync(envFilePath))            
        } else {
            //Ambiente producción
            this.envConfig = {
                PORT : process.env.PORT,
                MONGODB_URI : process.env.MONGODB_URI,
                MONGODB_NAME : process.env.MONGODB_NAME
            }
        }
    }

    get(key : string) : string {
        return this.envConfig[key]
    }
}