import 'dotenv/config';


const config = {
  host: process.env.HOST || 'localhost',
  zuser: process.env.UzER || 'postgres',
  password: process.env.PASSWORD || 'postgres',
  portDatabase: Number(process.env.PORTDATABASE) || 5432,
  database: process.env.DATABASE || 'api-pig',
  port: process.env.PORT || 4000,
};

export default config;