import { PercentBelowWeek52HighRule } from "../../core/entities/rules/percent-below-week-52-high-rule";
import { TickerMockFactory } from "../test-doubles/ticker-mock-factory";

describe('PercentBelowWeek52HighRule', () => {
    test('when price is 30% below 52 week high, it should be satisfied', () => {
        const service = new PercentBelowWeek52HighRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_fiveTwoWeekHigh(10);
        tickerMockFactory.ticker_price(7.7);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    });

    test('when price within 30% below 52 week high, it should be satisfied', () => {
        const service = new PercentBelowWeek52HighRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_fiveTwoWeekHigh(10);
        tickerMockFactory.ticker_price(9);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    });

    test('when price is more than 30% below 52 week high, it not be satisfied', () => {
        const service = new PercentBelowWeek52HighRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_fiveTwoWeekHigh(10);
        tickerMockFactory.ticker_price(6);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(false);
    });

    test('when 52 week high is falsy, it should be satisfied', () => {
        const service = new PercentBelowWeek52HighRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_fiveTwoWeekHigh(undefined);
        tickerMockFactory.ticker_price(9);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    })
});