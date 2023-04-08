import { PercentAboveWeek52LowRule } from "../../core/entities/rules/percent-above-week-52-low-rule";
import { TickerMockFactory } from "../test-doubles/ticker-mock-factory";

describe('PercentAboveWeek52LowRule', () => {
    test('when price is 30% above 52 week low, it should be satisfied', () => {
        const service = new PercentAboveWeek52LowRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_fiveTwoWeekLow(10);
        tickerMockFactory.ticker_price(14);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    });

    test('when price is 30% above 52 week low, it should be satisfied', () => {
        const service = new PercentAboveWeek52LowRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_fiveTwoWeekLow(10);
        tickerMockFactory.ticker_price(13);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    });

    test('when price is less than 30% above 52 week low, it not be satisfied', () => {
        const service = new PercentAboveWeek52LowRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_fiveTwoWeekLow(10);
        tickerMockFactory.ticker_price(12);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(false);
    });

    test('when 52 week low is falsy, it should be satisfied', () => {
        const service = new PercentAboveWeek52LowRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_fiveTwoWeekLow(undefined);
        tickerMockFactory.ticker_price(9);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    })
});