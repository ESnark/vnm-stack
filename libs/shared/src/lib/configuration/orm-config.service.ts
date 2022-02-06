import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { loadOrmConfiguration } from './config.service'

class OrmConfigService {
  constructor(private env: { [k: string]: any }) { }

  private getValue(key: string, throwOnMissing = true): any {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing orm-config.${key}`);
    }

    return value;
  }

  ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true))
    return this
  }

  getPort() {
    return this.getValue('PORT', true)
  }

  isProduction(): boolean {
    const mode = this.getValue('MODE', true)
    return mode !== 'dev'
  }

  getTypeOrmConfig(): TypeOrmModuleAsyncOptions {
    const config: TypeOrmModuleOptions = {
      type: 'mysql',
      host: this.getValue('HOST'),
      port: parseInt(this.getValue('PORT')),
      username: this.getValue('USER'),
      password: this.getValue('PASSWORD', false),
      database: this.getValue('DATABASE'),
      entities: this.getValue('ENTITIES'),
      synchronize: this.getValue('SYNC')
    }

    return config
  }
}

// Singleton Config
const ormEnv: any = loadOrmConfiguration()
const ormConfigService = new OrmConfigService(ormEnv).ensureValues(['HOST', 'PORT', 'USER', 'DATABASE'])

export { ormConfigService }
