export interface PagedListResponseModel<T>{
    items: T[],
    index : number,
    size : number,
    count : number,
    pages : number,
    hasPrevious : boolean,
    hasNext : boolean
}