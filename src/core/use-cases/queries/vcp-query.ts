import { MinHalfYearPerformanceRule } from "../../entities/rules/min-half-year-performance-rule";
import { MinMonthPerformanceRule } from "../../entities/rules/min-month-performance-rule";
import { MinQuarterPerformanceRule } from "../../entities/rules/min-quarter-performance-rule";
import { PercentAboveWeek52LowRule } from "../../entities/rules/percent-above-week-52-low-rule";
import { PercentBelowWeek52HighRule } from "../../entities/rules/percent-below-week-52-high-rule";
import { VolatilityContractionRule } from "../../entities/rules/volatilty-contraction-rule";
import { Week52HighGreaterThanRule } from "../../entities/rules/week-52-high-greater-than-rule";
import { BaseQuery } from "../../ports/base-query";
import { TickerItem } from "../../ports/ticker-Item";

export class VcpQuery implements BaseQuery<void, TickerItem[]> {
    constructor(private tickerList:TickerItem[]) {}
    run(param: void): TickerItem[] {
        let result:TickerItem[] = [];
        let min30PercentMonthlyPerformance =  new MinMonthPerformanceRule(30);
        let min30PercentQuarterlyPerformance = new MinQuarterPerformanceRule(30);
        let min30Percent6MonthsPerformance = new MinHalfYearPerformanceRule(30);
        let vcpSpec = new VolatilityContractionRule();
        let week52HighGreaterThanTenSpec = new Week52HighGreaterThanRule(10);
        let priceIs30PercentAboveWeek52LowSpec = new PercentAboveWeek52LowRule(30);
        let priceIsWithin35PercentFromWeek52HighSpec = new PercentBelowWeek52HighRule(35);

        for(let i = 0; i < this.tickerList.length; i++) {
            try{
            if(min30PercentMonthlyPerformance
                .or(min30PercentQuarterlyPerformance)
                .or(min30Percent6MonthsPerformance)
                .and(vcpSpec)
                .and(week52HighGreaterThanTenSpec)
                .and(priceIs30PercentAboveWeek52LowSpec)
                .and(priceIsWithin35PercentFromWeek52HighSpec)
                .isSatisfiedBy(this.tickerList[i])) {
                result.push({...this.tickerList[i]});
            }
            }catch(reason) {
                throw new Error(`${this.tickerList[i].Ticker}`);
            }
        }
        return result;
    }

}