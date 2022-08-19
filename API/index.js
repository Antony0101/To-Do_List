import auth from './auth';
import task from './task';

const RouteConfig=(express)=>{
    express.use("/auth",auth);
    express.use("/task",task);
};

export default RouteConfig;