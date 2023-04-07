import { MinMonthPerformanceRule } from '../../core/entities/rules/min-month-performance-rule';
import { TickerMockFactory } from '../test-doubles/ticker-mock-factory';

describe('MinMonthPerformanceRule', () => {
    test('when ticker is 30% month performance, it should be satisfied', () => {
        const service = new MinMonthPerformanceRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_minMonthPerformance(30);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    });

    test('when ticker is above 30% month performance, it should be satisfied', () => {
        const service = new MinMonthPerformanceRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_minMonthPerformance(31);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    });

    test('when ticker is below 30% month performance, it should not be satisfied', () => {
        const service = new MinMonthPerformanceRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_minMonthPerformance(29);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(false);
    });
});