import { TickerItem } from "../../ports/ticker-Item";
import { CompositeRule } from "./composite-rule";

export class Week52HighGreaterThanRule extends CompositeRule {
    constructor(private targetValue:number) {
        super();
    }

    isSatisfiedBy(ticker: TickerItem): boolean {
        if(!ticker.FiveTwoWeekHigh) return false;
        return ticker.FiveTwoWeekHigh >= this.targetValue;
    }
}