import { ScannerRule } from "../../ports/scanner-rule";
import { TickerItem } from "../../ports/ticker-Item";
import { CompositeRule } from "./composite-rule";

export class VolatilityContractionRuleDaily extends CompositeRule {
    isSatisfiedBy(ticker: TickerItem): boolean {
        if(!ticker.Volatility || !ticker.VolatilityWeek) return true;
        return ticker.Volatility <= ticker.VolatilityWeek;
    }
}