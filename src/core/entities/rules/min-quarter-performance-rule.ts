import { ScannerRule } from "../../ports/scanner-rule";
import { TickerItem } from "../../ports/ticker-Item";
import { CompositeRule } from "./composite-rule";

export class MinQuarterPerformanceRule extends CompositeRule {
    constructor(private targetAmount: number) {
        super();
    }
    isSatisfiedBy(ticker: TickerItem): boolean {
        return ticker.ThreeMonthPerformance >= this.targetAmount;
    }
}