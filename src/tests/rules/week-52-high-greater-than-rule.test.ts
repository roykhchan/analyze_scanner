import { Week52HighGreaterThanRule } from "../../core/entities/rules/week-52-high-greater-than-rule";
import { TickerMockFactory } from "../test-doubles/ticker-mock-factory";

describe('Week52HighGreaterThanTenRule', () => {
    test('when 52 week high is undefined, it not be satisfied', () => {
        let rule = new Week52HighGreaterThanRule(10);
        const tickerFactory = new TickerMockFactory();
        tickerFactory.ticker_fiveTwoWeekHigh(undefined);
        let ticker = tickerFactory.build();

        expect(rule.isSatisfiedBy(ticker)).toBe(false);
    });

    test('when 52 week high is at 10, it should be satisfied', () => {
        let rule = new Week52HighGreaterThanRule(10);
        const tickerFactory = new TickerMockFactory();
        tickerFactory.ticker_fiveTwoWeekHigh(10);
        let ticker = tickerFactory.build();

        expect(rule.isSatisfiedBy(ticker)).toBe(true);
    });

    test('when 52 week high is greater than 10, it should be satisfied', () => {
        let rule = new Week52HighGreaterThanRule(10);
        const tickerFactory = new TickerMockFactory();
        tickerFactory.ticker_fiveTwoWeekHigh(11);
        let ticker = tickerFactory.build();

        expect(rule.isSatisfiedBy(ticker)).toBe(true);
    });

    test('when 52 week high is less than 10, it not be satisfied', () => {
        let rule = new Week52HighGreaterThanRule(10);
        const tickerFactory = new TickerMockFactory();
        tickerFactory.ticker_fiveTwoWeekHigh(9);
        let ticker = tickerFactory.build();

        expect(rule.isSatisfiedBy(ticker)).toBe(false);
    });
})