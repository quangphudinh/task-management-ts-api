import { Request, Response } from "express";
import { Task } from "../../../models/task.model";
import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";
import { console } from "inspector";

// [GET] /api/v1/tasks
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
// [GET] /api/v1/tasks/detail
export const detail = async(req : Request, res : Response) => {
    const id : string = req.params.id;
    const tasks = await Task.findOne({
        _id: id,
        deleted: false
    });
   
    res.json(tasks);
}
// [PATCH] /api/v1/tasks/change-status/:id
export const changeStatus = async(req : Request, res : Response) => {
    try {
        const id : string = req.params.id;
        const status : string = req.body.status;

        await Task.updateOne({
            _id: id
        }, {
            status: status
        });

        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!"
        })
    }
}
//[PATCH] /api/v1/tasks/change-multi
export const changeMulti = async (req, res) => {
    try {
        const ids : string[] = req.body.ids;
        const key : string = req.body.key;
        const value : string = req.body.value;

        console.log(ids , key , value);
        // ap dung enum de truyen vao ?
        switch (key) {
            case "status":
                await Task.updateMany({
                    _id: { $in: ids }
                }, {
                    status: value
                });
                res.json({
                    code: 200,
                    message: "Cập nhật trạng thái thành công"
                })
                break;
            case "delete":
                await Task.updateMany({
                    _id: { $in: ids }
                },{
                    deleted: true,
                    deletedAt: new Date()
                })
                res.json({
                    code: 200,
                    message: "Xóa thành công"
                })
                break;
            default:
                res.json({
                    code: 400,
                    message: "Không tồn tại!"
                })
                break;
        }
        
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại!"
        })
    }
}
