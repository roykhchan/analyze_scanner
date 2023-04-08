import { MinQuarterPerformanceRule } from "../../core/entities/rules/min-quarter-performance-rule";
import { TickerMockFactory } from "../test-doubles/ticker-mock-factory";

describe('MinQuarterPerformanceRule', () => {
    test('when ticker is 30% quarter performance, it should be satisfied', () => {
        const service = new MinQuarterPerformanceRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_minQuarterPerformance(30);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    });

    test('when ticker is above 30% quarter performance, it should be satisfied', () => {
        const service = new MinQuarterPerformanceRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_minQuarterPerformance(31);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    });

    test('when ticker is below 30% quarter performance, it should not be satisfied', () => {
        const service = new MinQuarterPerformanceRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_minQuarterPerformance(29);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(false);
    });
});