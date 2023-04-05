import { TickerItem } from './core/ports/ticker-Item';
import { VcpScanTable } from './core/ports/vcp-scan-table';
import { TickerRepositoryCsv } from './adaptors/repositories/ticker-repository-csv'
import { VcpQuery } from './core/use-cases/queries/vcp-query';
import promptSync from 'prompt-sync';
import path from 'path';
import fs from 'fs';

async function main (tickerRepo:TickerRepositoryCsv, selectedFilePath:string){
    const prompt = promptSync({ sigint: true });
    let dataPath = path.join(__dirname, '..');
    dataPath = path.join(dataPath, 'data');
    try {
        let files:string[] = await listFiles(dataPath, 50);
        let fileIndex = prompt('Choose files: ');
        if(Number.isNaN(fileIndex)) return;
        
        selectedFilePath = path.join(dataPath, files[Number(fileIndex)]);

        console.time('runtime');
        let tickers = await tickerRepo.getData(selectedFilePath);
        if(!tickers || tickers.length <= 0) throw new Error('no tickers');

        let query = new VcpQuery(tickers);
        let result = query.run();
        displaySummary(result);
        displayTable(result);
        console.timeEnd('runtime');
    }
    catch(err) {
        console.error('Error: ', JSON.stringify(err));
    }
}

async function listFiles(dataPath:string, resultCount: number): Promise<string[]>{
    let files:string[] = [];
    try{
        files = await fs.promises.readdir(dataPath);
        files = files.sort((a,b) => (a > b ? -1 : 1)).slice(0, resultCount);
        console.table(files);
    }
    catch(err) {
        throw Error(`Open data file: ${err}`);
    }
    return files;
}

function displaySummary(result: TickerItem[]) {
    if(!result || result.length <= 0) {
        console.log('No Result');
        return [];
    }
    console.log(`${result.length} tickers:`);
    let tickerCollection:string[] = [];
    for(let i = 0; i < result.length; i++) {
        tickerCollection.push(result[i].Ticker);
    }
    console.log(`${tickerCollection.toString()}`);
}

function displayTable(result: TickerItem[]):VcpScanTable[] {
    let table:VcpScanTable[] = 
        result.map((item) => {
            return {
                Ticker: item.Ticker,
                Industry: item.Industry,
                Volatility: item.Volatility,
                VolatilityW: item.VolatilityWeek,
                VolatilityM: item.VolatilityMonth
            } as VcpScanTable;
        }).sort((a,b) => a.Industry.localeCompare(b.Industry));
    console.table(table);
    return table;
}

main(
    new TickerRepositoryCsv(),
    './data/america_2023-03-05_efb75.csv'
);
