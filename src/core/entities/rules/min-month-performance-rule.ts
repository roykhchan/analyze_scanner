import { ScannerRule } from "../../ports/scanner-rule";
import { TickerItem } from "../../ports/ticker-Item";
import { CompositeRule } from "./composite-rule";

export class MinMonthPerformanceRule extends CompositeRule {
    constructor(private targetAmount: number) {
        super();
    }
    isSatisfiedBy(ticker: TickerItem): boolean {
        return ticker.MonthlyPerformance >= this.targetAmount;
    }
}