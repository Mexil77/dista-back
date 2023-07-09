import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  // private readonly envConfig: { [key: string]: string };
  private readonly envConfig: dotenv.DotenvConfigOutput;

  constructor(filePath: string) {
    // this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = dotenv.config();
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
