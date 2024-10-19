import { Request, Response } from "express";
import { Task } from "../../../models/task.model";

export const index  = async(req : Request, res : Response) => {
    //Ham tim kiem
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
    // End tim kiem
    // Ham sap xep sort
    const sort = {};
    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey.toString()] = req.query.sortValue.toString();
        
    }
    // End sap xep
    const tasks = await Task.find(find).sort(sort);
 
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