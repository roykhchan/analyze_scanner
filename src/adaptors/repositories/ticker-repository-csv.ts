import * as ExcelJS from 'exceljs'
import { TickerColumnMapper } from '../../core/ports/ticker-column-mapper';
import { TickerItem } from '../../core/ports/ticker-Item';
import { TickerRepository } from '../../core/ports/ticker-repository';

export class TickerRepositoryCsv implements TickerRepository {
    constructor(){}
    
    getData = async (path:string):Promise<TickerItem[]> => {
        let wb = new ExcelJS.Workbook();
        // // wb.xlsx.readFile('./data/america_2022-08-01_13792.xlsx').then(
        // //     (workObj: ExcelJS.Workbook) => {
        // //         console.log("read");
        // //         return;
        // //     }
        // // ).catch((reason) => console.log(reason));
        let ws = await wb.csv.readFile(path);
        if(!ws) return [];

        let ds:ExcelJS.Worksheet = ws;
        if(ds.rowCount <= 1) return [];

        let result:TickerItem[] = [];
        for(let i = 2; i < ds.rowCount; i++) {            
            let newTicker:TickerItem = {
                Ticker: this.getString(ds, `${TickerColumnMapper.Ticker}${i}`),
                Price: this.getFloat(ds, `${TickerColumnMapper.Price}${i}`),
                ChangePercent: this.getFloat(ds, `${TickerColumnMapper.ChangePercent}${i}`),
                WeeklyPerformance: this.getFloat(ds, `${TickerColumnMapper.WeeklyPerformance}${i}`),
                MonthlyPerformance: this.getFloat(ds, `${TickerColumnMapper.MonthlyPerformance}${i}`),
                ThreeMonthPerformance: this.getFloat(ds, `${TickerColumnMapper.ThreeMonthPerformance}${i}`),
                SixMonthPerformance: this.getFloat(ds, `${TickerColumnMapper.SixMonthPerformance}${i}`),
                YearlyPerformance: this.getFloat(ds, `${TickerColumnMapper.YearlyPerformance}${i}`),
                Industry: this.getString(ds, `${TickerColumnMapper.Industry}${i}`),
                RelativeVolume: this.getFloat(ds, `${TickerColumnMapper.RelativeVolume}${i}`),
                Volatility: this.getFloat(ds, `${TickerColumnMapper.Volatility}${i}`),
                VolatilityWeek: this.getFloat(ds, `${TickerColumnMapper.VolatilityWeek}${i}`),
                VolatilityMonth: this.getFloat(ds, `${TickerColumnMapper.VolatilityMonth}${i}`),
                Volume: this.getFloat(ds, `${TickerColumnMapper.Volume}${i}`),
                AverageVolume: this.getFloat(ds, `${TickerColumnMapper.AverageVolume}${i}`),
                SharesFloat: this.getFloat(ds, `${TickerColumnMapper.SharesFloat}${i}`),
                MarketCap: this.getFloat(ds, `${TickerColumnMapper.MarketCap}${i}`),
                UpcomingEarnings: this.getDate(ds, `${TickerColumnMapper.UpcomingEarnings}${i}`),
                FiveTwoWeekHigh:this.getFloat(ds, `${TickerColumnMapper.FiveTwoWeekHigh}${i}`),
                FiveTwoWeekLow:this.getFloat(ds, `${TickerColumnMapper.FiveTwoWeekLow}${i}`),
                SimpleMovingAverageFiveZero: this.getFloat(ds, `${TickerColumnMapper.SimpleMovingAverageFiveZero}${i}`),
            }
            result.push(newTicker);
        }
        return result;
    };

    /**
     * set input as '0' when it is empty string
     * @param ws 
     * @param cellName 
     * @returns 
     */
    getFloat(ws:ExcelJS.Worksheet, cellName:string):number {
        let result:number = 0;
        try {
            result = Number.parseFloat(ws.getCell(cellName).value?.toString()||'0');
        }
        catch {
            console.log(`cell error: ${cellName}`);
            result = 0;
        }
        return result;
    }
    getInt(ws:ExcelJS.Worksheet, cellName:string):number {
        return Number.parseInt(ws.getCell(cellName).value?.toString()||'0');
    }
    getString(ws:ExcelJS.Worksheet, cellName:string):string {
        return ws.getCell(cellName).value?.toString()??'';
    }
    getDate(ws:ExcelJS.Worksheet, cellName:string):Date {
        let result:Date;
        try{
            result = new Date(ws.getCell(cellName).value?.toString()??'2000-01-01');
        }
        catch(Ex){
            throw new Error(`cell:${cellName} has invalid date`);
        }
        return result;
    }
}