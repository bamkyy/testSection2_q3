const Nightmare = require('nightmare');
const cheerio = require('cheerio');
const nightmare = Nightmare({
    show: true
})
const url = 'https://codequiz.azurewebsites.net/'

const getNavByFundCode = (fundcode) => {
    nightmare.goto(url).wait('body').click("body > input[type=button]").evaluate(() => document.querySelector('body').innerHTML)
        .end()
        .then(response => {
            let arr = getData(response);
            arr.forEach(i => {
                if (i.fundName == fundcode) {
                        console.log(i.nav)
                }
            })
        });

    let getData = html => {
        const data = [];
        const $ = cheerio.load(html)
        $('body > table > tbody').each((row, raw_element) => {
            $(raw_element).find('tr').each((i, elem) => {
                let nav = $(elem).find('td:nth-child(2)').text();
                let fundName = $(elem).find('td:nth-child(1)').text().trim();
                data.push({
                    fundName,
                    nav
                })

            })
        })
        return data;
    }

}

const fundcode = process.argv[2] || ''

getNavByFundCode(fundcode)