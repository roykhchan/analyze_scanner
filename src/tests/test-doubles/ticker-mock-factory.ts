import { TickerItem } from "../../core/ports/ticker-Item";
import { MockFactory } from "./mock-factory";

export class TickerMockFactory implements MockFactory<TickerItem> {
    private ticker!:TickerItem;
    constructor() {
        this.ticker_default();
    }
    public ticker_default() {
        this.ticker = {
            Ticker: "APPL",
            AverageVolume: 1000000,
            ChangePercent: 2,
            FiveTwoWeekHigh: 100,
            FiveTwoWeekLow: 20,
            Industry: "Software",
            MarketCap: 1000000000,
            WeeklyPerformance: 10,
            MonthlyPerformance: 30,
            ThreeMonthPerformance: 30,
            SixMonthPerformance: 40,
            YearlyPerformance: 50,
            RelativeVolume: 1.00,
            SharesFloat: 55000000,
            SimpleMovingAverageFiveZero: 40,
            Price: 20.00,
            UpcomingEarnings: new Date(),
            Volume:1000000,
            Volatility: 5,
            VolatilityWeek: 20,
            VolatilityMonth: 60,

        };
    }
    public ticker_minHalfYearPerformance(v:number) {
        this.ticker.SixMonthPerformance = v;
    }
    
    public build(): TickerItem {
        return this.ticker;
    }
}