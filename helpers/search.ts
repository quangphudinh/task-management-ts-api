interface IObjectSearch {
    keyword : string,
    regex? : RegExp
}
const searchHelper = (query : Record<string, any>) : IObjectSearch =>{
    let objectSearch : IObjectSearch = {
        keyword : "",
        
    }
   
    if(query.keyword){
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword , 'i'); //tim kiem k phan biet chu hoa chu thuong sd thu vien regular expression
        objectSearch.regex = regex
    }
    return objectSearch;
}

export default searchHelper;