//dotenv configuration

require('dotenv').config();

//Libraries

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';

//User Libraries
import RouteConfig from './API';
import dbconnect from './database/connection';
import passportauth from './passport';

const tdList= express();
tdList.use(express.json());
tdList.use(express.urlencoded({extended: false}));
tdList.use(helmet());
tdList.use(cors());
tdList.use(passport.initialize());

//passport configuration
passportauth(passport);

//microservice route setup
RouteConfig(tdList);

tdList.get("/",(req,res)=>{
    res.json({"server":"running"});
});

tdList.listen(process.env.PORT,()=>dbconnect()
.then(()=>console.log("database connected and server running on port "+process.env.PORT))
.catch((error)=>console.log("server running database connection failed"+error.message)));