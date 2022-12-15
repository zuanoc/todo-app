// eslint-disable-next-line @typescript-eslint/no-var-requires, unicorn/prefer-module
require('dotenv').config();

export interface AppConfig {
  port: number;
}

export const config: AppConfig = {
  port: Number.parseInt(process.env.PORT || '3000'),
};
