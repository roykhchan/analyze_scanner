import { TickerItem } from "./ticker-Item";

export interface ScannerRule {
    isSatisfiedBy(ticker:TickerItem):boolean;
    and(rule:ScannerRule):ScannerRule;
    or(rule:ScannerRule):ScannerRule;
}