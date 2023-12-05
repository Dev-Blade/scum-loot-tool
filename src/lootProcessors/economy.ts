import path from 'path';
import fs from 'fs/promises';

interface TraderItem {
  'tradeable-code': string;
  'base-purchase-price': string;
  'base-sell-price': string;
  'delta-price': string;
  'can-be-purchased': string;
  'required-famepoints': string;
  keepSellingPrice?: boolean;
  keepPurchasePrice?: boolean;
  keepRequiredFamePoints?: boolean;
}
type TraderCollection = Array<TraderItem>;

interface Economy {
  'economy-override': {
    traders: {
      [key: string]: TraderCollection;
    };
  };
}

const keepSellingPriceItems: string[] = ['Depleted_Uranium', 'Depleted_Uranium_Container', 'Graphite'];
const keepPurchasePriceItems: string[] = [];

export const processEconomy = async (
  sourceFile: string = 'data/EconomyOverride_src.json',
  destinationFile: string = 'data/EconomyOverride.json',
  htmlFile: string = 'data/index.html',
) => {
  const templateBody = await fs.readFile('templates/economyBody.html', 'utf-8');

  const sourceContent = await fs.readFile(sourceFile, 'utf-8');
  const json = JSON.parse(sourceContent) as Economy;

  const traders = json['economy-override'].traders;

  const keys = Object.keys(traders);
  const values = Object.values(traders);

  console.log('*** Processing ' + keys.length + ' traders');

  const rows: Array<string> = [];
  for (const key of keys) {
    //console.log(key);
    const value = values[keys.indexOf(key)] as TraderCollection;

    rows.push('<tr class="header"><td style="text-align:center;font-size:1.2em;line-height:1.5em;font-weight:bold;" colspan="5">' + key + '</td></tr>');

    const outpostAbbr = key.substring(0, 4);
    const keySrc = 'A_0_' + key.replace(outpostAbbr, '');

    if (!['A_0_', 'C_2_'].includes(outpostAbbr)) {
      traders[key] = traders[keySrc];
    }

    if (key.includes('C_2_')) {
      value.forEach((item, index) => {
        const itemKey = item['tradeable-code'];

        const srcItem = values[keys.indexOf(keySrc)].find(sourceItem => itemKey === sourceItem['tradeable-code']) as TraderItem;

        if (!srcItem) console.log(keySrc, 'srcItem not found');

        if (srcItem) {
          const srcItemBuyable = srcItem['can-be-purchased'] === 'true';

          // FAME
          const fp = parseInt(srcItem['required-famepoints']);
          if (!isNaN(fp)) {
            const c2fp = Math.round(fp * 0.75);
            item['required-famepoints'] = c2fp.toString();
          }

          if (srcItemBuyable) {
            item['can-be-purchased'] = 'true';
            if (keepPurchasePriceItems.includes(itemKey)) {
              //console.log('skipped modifying purchase price for ' + itemKey);
            } else {
              const srcBuyingPrice = parseInt(srcItem['base-purchase-price']);
              if (!isNaN(srcBuyingPrice) && srcBuyingPrice > 0) {
                const c2BuyingPrice = Math.round(srcBuyingPrice * 0.8);
                item['base-purchase-price'] = c2BuyingPrice.toString();
              }
            }
          }

          if (keepSellingPriceItems.includes(itemKey)) {
            //console.log('skipped modifying selling price for ' + itemKey);
          } else {
            const srcSellingPrice = parseInt(srcItem['base-sell-price']);
            if (!isNaN(srcSellingPrice) && srcSellingPrice > 0) {
              const c2SellingPrice = Math.round(srcSellingPrice * 1.5);
              item['base-sell-price'] = c2SellingPrice.toString();
            }
          }
        }
      });
    }

    const v1 = Object.values(traders);
    const v2 = v1[keys.indexOf(key)] as TraderCollection;
    v2.forEach((item, index) => {
      const columns = [
        '<td>' + item['tradeable-code'] + '</td>',
        '<td>' + (item['can-be-purchased'] === 'true' ? item['base-purchase-price'] : 'n/a') + '</td>',
        '<td>' + item['base-sell-price'] + '</td>',
        '<td>' + item['can-be-purchased'] + '</td>',
        '<td>' + item['required-famepoints'] + '</td>',
      ];
      rows.push('<tr>' + columns.join('\n  ') + '</tr>');
    });
  }
  const allRows = rows.join('\n');
  const body = templateBody.replace('<!--ROWS-->', allRows);
  await fs.writeFile(htmlFile, body, 'utf-8');

  const jsonString = JSON.stringify(json, null, 2);
  //console.log(jsonString);
  await fs.writeFile(destinationFile, jsonString, 'utf-8');
};
