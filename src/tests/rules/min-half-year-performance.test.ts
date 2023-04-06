import { MinHalfYearPerformanceRule } from '../../core/entities/rules/min-half-year-performance-rule';
import { TickerMockFactory } from '../test-doubles/ticker-mock-factory';

describe('Min Half Year Performance Rule', () => {
    test('when ticker is 30% half year performance, it should be satisfied', () => {
        const service = new MinHalfYearPerformanceRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_minHalfYearPerformance(30);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    });

    test('when ticker is above 30% half year performance, it should be satisfied', () => {
        const service = new MinHalfYearPerformanceRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_minHalfYearPerformance(31);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    });

    test('when ticker is below 30% half year performance, it should not be satisfied', () => {
        const service = new MinHalfYearPerformanceRule(30);
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_minHalfYearPerformance(29);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(false);
    });

});