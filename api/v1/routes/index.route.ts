import {Express} from 'express';
import {taskRoutes} from './task.route';
import {UserRoutes} from './user.route';


const mainV1Routes = (app : Express) : void => {
    const version = "/api/v1";
    app.use(version + '/tasks',  taskRoutes);
    app.use(version + '/users', UserRoutes);
}

export default mainV1Routes;