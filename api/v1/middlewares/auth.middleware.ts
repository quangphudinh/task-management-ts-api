import User from "../../../models/user.model";
import { Request, Response , NextFunction } from "express";

export const requireAuth = async (req : Request, res: Response, next: NextFunction) : Promise<void> => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        
        const user = await User.findOne({
            token: token,
            deleted: false
        }).select('-password -token');

        if(!user) {
            res.json({
                code: 400,
                message: 'Token không hợp lệ !'
            })
            return;
        }
        req['user'] = user;
        next();
    } else {
        res.json({
            code: 400,
            message: 'Vui lòng gửi kèm token'
        })
    }
}