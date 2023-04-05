import { TickerItem } from "./ticker-Item";

export interface TickerRepository {
    getData(path:string):Promise<TickerItem[]>;
}