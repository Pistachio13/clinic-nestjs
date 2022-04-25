import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql', // mysql
      host: 'localhost', // localhost
      port: 3306, // 3306
      username: 'root', // root
      password: '', // ลบ
      database: 'clinic',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
      logging: true
    }),
  },
];