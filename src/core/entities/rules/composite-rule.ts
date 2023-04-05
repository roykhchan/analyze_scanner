import { ScannerRule } from "../../ports/scanner-rule";
import { TickerItem } from "../../ports/ticker-Item";
//import { AndRule } from "./and-rule";
//import { OrRule } from "./or-rule";

export abstract class CompositeRule implements ScannerRule {
    
    abstract isSatisfiedBy(ticker: TickerItem): boolean;

    and(rule: ScannerRule): ScannerRule {
        return new AndRule(this, rule);
    }
    or(rule: ScannerRule): ScannerRule {
        return new OrRule(this, rule);
    }
}

export class AndRule extends CompositeRule {
    constructor(private lCondition:ScannerRule, private rCondition: ScannerRule) {
        super();
    }
    override isSatisfiedBy(ticker: TickerItem): boolean {
        return this.lCondition.isSatisfiedBy(ticker) && this.rCondition.isSatisfiedBy(ticker);
    }
}

export class OrRule extends CompositeRule {
    constructor(private lCondition:ScannerRule, private rCondition: ScannerRule) {
        super();
    }
    override isSatisfiedBy(ticker: TickerItem): boolean {
        return this.lCondition.isSatisfiedBy(ticker) || this.rCondition.isSatisfiedBy(ticker);
    }
}