import { Request, Response } from "express";
import { Task } from "../../../models/task.model";
import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";

export const index  = async(req : Request, res : Response) => {
    //Ham tim kiem
    interface IFind {
        deleted: boolean,
        status?: string,
        title?: RegExp
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
    //Pagination
    let initPagination = {
        limitItem: 2,
        currentPage: 1
    }
    const countTasks = await Task.countDocuments(find);
    const objectPagination = paginationHelper(initPagination, req.query, countTasks)
    //End Pagination
    //Search
    const objectSearch = searchHelper(req.query);

    if (req.query.keyword) {
        find.title = objectSearch.regex
    }
    //End Search
    const tasks = await Task.find(find)
            .sort(sort)
            .skip(objectPagination.skip)
            .limit(objectPagination.limitItem);
 
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