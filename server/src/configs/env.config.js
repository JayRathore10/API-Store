import dotenv from "dotenv";

dotenv.config({path : `.env.${process.env.NODE_ENV || 'development'}.local`});

export const {  
  MONGODB_URI , 
  NODE_ENV, 
  JWT_SECRET , 
  JWT_EXPI ,  
  PORT , 
  GITHUB_CLIENT_ID   , 
  GITHUB_CLIENT_SECRET ,
  GITHUB_REDIRECT_URI , 
  CLIENT_URL 
} = process.env;
