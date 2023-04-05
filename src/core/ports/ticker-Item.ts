export interface TickerItem {
    Ticker:string,
    Price: number,
    ChangePercent: number,
    WeeklyPerformance: number,
    MonthlyPerformance: number,
    ThreeMonthPerformance: number,
    SixMonthPerformance: number,
    YearlyPerformance:number,
    Industry: string,
    RelativeVolume: number,
    Volatility: number,
    VolatilityWeek: number,
    VolatilityMonth: number,
    Volume: number,
    AverageVolume: number,
    SharesFloat: number,
    MarketCap: number,
    UpcomingEarnings: Date,
    FiveTwoWeekHigh:number,
    FiveTwoWeekLow:number,
    SimpleMovingAverageFiveZero: number,
}