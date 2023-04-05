import { TickerItem } from "../../ports/ticker-Item";
import { CompositeRule } from "./composite-rule";

export class Week52HighGreaterThanTenRule extends CompositeRule {
    isSatisfiedBy(ticker: TickerItem): boolean {
        if(!ticker.FiveTwoWeekHigh) return true;
        return ticker.FiveTwoWeekHigh > 10;
    }
}