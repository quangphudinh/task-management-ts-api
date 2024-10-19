import { Request, Response } from "express";
import { Task } from "../../../models/task.model";

export const index  = async(req : Request, res : Response) => {
    interface IFind {
        deleted: boolean,
        status?: string
    }
    const find : IFind = {
        deleted: false
    }
    if(req.query.status) {
        find.status = req.query.status.toString();
    }
    const tasks = await Task.find(find);
 
    res.json(tasks);
}

export const detail = async(req : Request, res : Response) => {
    const id : string = req.params.id;
    const tasks = await Task.findOne({
        _id: id,
        deleted: false
    });
   
    res.json(tasks);
}