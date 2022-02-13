export interface Paginate<T>{
    items: T[],
    index : number,
    size : number,
    count : number,
    pages : number,
    hasPrevious : boolean,
    hasNext : boolean
}