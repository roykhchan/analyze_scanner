import { TickerItem } from "../../ports/ticker-Item";
import { CompositeRule } from "./composite-rule";

export class PercentAboveWeek52LowRule extends CompositeRule {
    constructor(private targetAmount:number) {
        super();
    }
    isSatisfiedBy(ticker: TickerItem): boolean {
        if(!ticker.FiveTwoWeekLow) return true;
        let percentFromLow:number =  ticker.Price / ticker.FiveTwoWeekLow -1;
        return percentFromLow * 100 >= this.targetAmount;
    }
}