import { ScannerRule } from "../../ports/scanner-rule";
import { TickerItem } from "../../ports/ticker-Item";
import { CompositeRule } from "./composite-rule";

export class VolatilityContractionRule extends CompositeRule {
    isSatisfiedBy(ticker: TickerItem): boolean {
        if(!ticker.VolatilityWeek || !ticker.VolatilityMonth) return true;
        return ticker.VolatilityWeek <= ticker.VolatilityMonth;
    }
}