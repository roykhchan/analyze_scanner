export interface BaseQuery<P,T> {
    run(param:P):T;
}