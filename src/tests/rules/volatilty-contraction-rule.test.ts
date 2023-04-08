import { VolatilityContractionRule } from "../../core/entities/rules/volatilty-contraction-rule";
import { TickerMockFactory } from "../test-doubles/ticker-mock-factory";


describe('VolatilityContractionRule', () => {
    test('when weekly is less than monthly volatility, it should be satisfied', () => {
        const service = new VolatilityContractionRule();
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_volatility(1, 3, 4);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    })

    test('when weekly is equal to monthly volatility, it should be satisfied', () => {
        const service = new VolatilityContractionRule();
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_volatility(1, 3, 3);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    })

    test('when weekly volatility is undefined, it should be satisfied', () => {
        const service = new VolatilityContractionRule();
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_volatility(1, undefined, 3);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    })

    test('when monthly volatility is undefined, it should be satisfied', () => {
        const service = new VolatilityContractionRule();
        let tickerMockFactory = new TickerMockFactory();
        tickerMockFactory.ticker_volatility(1, 3, undefined);
        const ticker = tickerMockFactory.build();
        expect(service.isSatisfiedBy(ticker)).toBe(true);
    })
})