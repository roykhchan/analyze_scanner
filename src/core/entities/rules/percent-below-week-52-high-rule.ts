import { TickerItem } from "../../ports/ticker-Item";
import { CompositeRule } from "./composite-rule";

export class PercentBelowWeek52HighRule extends CompositeRule {
    constructor(private targetAmount:number){
        super();
    }

    isSatisfiedBy(ticker: TickerItem): boolean {
        if(!ticker.FiveTwoWeekHigh) return true;

        let percentFromHigh:number =  ticker.Price / ticker.FiveTwoWeekHigh -1;

        return Math.abs(percentFromHigh * 100) <= this.targetAmount;
    };
}