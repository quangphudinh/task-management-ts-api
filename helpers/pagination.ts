interface IObjectPagination {
    limitItem: number,
    currentPage: number,
    skip?: number,
    totalPage?: number
}
const paginationHelper =  (objectPagination : IObjectPagination, query : Record<string, any> , countProducts : number) : 
IObjectPagination => {
    if(query.page){
        objectPagination.currentPage = parseInt(query.page);
    }
    if(query.limit){
        objectPagination.limitItem = parseInt(query.limit);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem
    
    
    const totalPage = Math.ceil(countProducts / objectPagination.limitItem)
    objectPagination.totalPage = totalPage;

    return objectPagination;
}
export default paginationHelper