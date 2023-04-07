import { MinHalfYearPerformanceRule } from '../../core/entities/rules/min-half-year-performance-rule';
import { MinMonthPerformanceRule } from '../../core/entities/rules/min-month-performance-rule';
import { TickerMockFactory } from '../test-doubles/ticker-mock-factory';

describe('CompositeRule', () => {
    test('when 1 month and 6 months are equal 30', () => {
        const sixMonthsService = new MinHalfYearPerformanceRule(30);
        const oneMonthservice = new MinMonthPerformanceRule(30);

        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_minHalfYearPerformance(30);
        tickerMockFactory.ticker_minMonthPerformance(30);
        const ticker = tickerMockFactory.build();

        expect(oneMonthservice.and(sixMonthsService).isSatisfiedBy(ticker)).toBe(true);
    })

    test('when 1 month and 6 months are above 30', () => {
        const sixMonthsService = new MinHalfYearPerformanceRule(30);
        const oneMonthservice = new MinMonthPerformanceRule(30);

        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_minHalfYearPerformance(31);
        tickerMockFactory.ticker_minMonthPerformance(31);
        const ticker = tickerMockFactory.build();

        expect(oneMonthservice.and(sixMonthsService).isSatisfiedBy(ticker)).toBe(true);
    })

    test('when 1 month is less than 30', () => {
        const sixMonthsService = new MinHalfYearPerformanceRule(30);
        const oneMonthservice = new MinMonthPerformanceRule(30);

        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_minHalfYearPerformance(30);
        tickerMockFactory.ticker_minMonthPerformance(29);
        const ticker = tickerMockFactory.build();

        expect(oneMonthservice.and(sixMonthsService).isSatisfiedBy(ticker)).toBe(false);
    })

    test('when 6 month is less than 30', () => {
        const sixMonthsService = new MinHalfYearPerformanceRule(30);
        const oneMonthservice = new MinMonthPerformanceRule(30);

        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_minHalfYearPerformance(29);
        tickerMockFactory.ticker_minMonthPerformance(30);
        const ticker = tickerMockFactory.build();

        expect(oneMonthservice.and(sixMonthsService).isSatisfiedBy(ticker)).toBe(false);
    })
});