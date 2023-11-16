const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// URL of the bookmaker's site
let url = 'https://sports.bwin.com/en/sports/events/england-malta-2:6359469?tab=score';

// Headers
const headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "cache-control": "max-age=0",
    "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "tdpehcd=; btagcd=; tdpehcd=; btagcd=; isLanguageChanged=false; lang=en; trackerId=4442326; seoLandingUrl=http%3A%2F%2Fsports.bwin.com%2Fen%2Fsports; dark-mode=1; vnSession=6e61dc1c-0332-4175-a5e6-9aae21d42613; usersettings=cid%3Den-US%26vc%3D1%26sst%3D2023-11-14T15%3A13%3A41.6315011Z%26psst%3D0001-01-01T00%3A00%3A00.0000000Z; trc.cid=80381bad978d4206b3e24ec6d812e485; AMCV_6B47D0245A26653C0A495CDC%40AdobeOrg=MCMID|50076769488544870662735290037495999873; tq=%5B%5D; _gcl_au=1.1.75158685.1699974828; setSessionFired=true; _rdt_uuid=1699974829234.1d1f818f-085a-49b8-8a39-dd9b0f4e8a51; OptanonAlertBoxClosed=2023-11-14T15:33:24.328Z; _fbp=fb.1.1699976703226.354386811; defaultStake=5; kndctr_6B47D0245A26653C0A495CDC_AdobeOrg_identity=CiY1MDA3Njc2OTQ4ODU0NDg3MDY2MjczNTI5MDAzNzQ5NTk5OTg3M1IRCIr6lPO8MRgBKgRJUkwxMAGgAZD6lPO8MfABp_vPu70x; _gid=GA1.2.1055238243.1700126789; lastKnownProduct=%7B%22url%22%3A%22https%3A%2F%2Fsports.bwin.com%2Fen%22%2C%22name%22%3A%22sports%22%2C%22previous%22%3A%22unknown%22%2C%22platformProductId%22%3A%22SPORTSBOOK%22%7D; kndctr_6B47D0245A26653C0A495CDC_AdobeOrg_cluster=irl1; _sp_ses.cc76=*; DAPROPS=\"sjs.webGlRenderer:ANGLE (Intel Inc., Intel(R) Iris(TM) Graphics 6100, OpenGL 4.1)|sdeviceAspectRatio:589/515|sscreenWidthHeight:589/515|sdevicePixelRatio:2|bjs.deviceOrientation:0|srendererRef:03285363321|saudioRef:647510521|sversion:1.9.1|sversion:1.9.1|bE:0\"; __cf_bm=dQjgZ5MmS_GCGzQmFLFhH59kKhYDjlpTiDlX4Etp_Nc-1700158310-0-AZZzRF0jEyOZASq8xvrPR/yqddxnPfm1aTT4K5ZI14alFkINoep+x9KqHivxreYcJCFz4d4tKbv61i0omkHjQVgmaXfUDaKnporc/EhzfpMc; _sp_id.cc76=a561f926-4146-4d04-86ae-1c618bf2b7c7.1699974829.6.1700158319.1700152204.dd3d528e-ab72-4944-b471-982edccd62ba; _ga=GA1.1.1881377950.1699974829; _ga_2VLF40G9CH=GS1.1.1700158021.7.1.1700158319.49.0.0; _uetsid=38809b90846211eea757d7fbd7d46d74; _uetvid=69c29c50830011eea5424fbbc2887ca5; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Nov+16+2023+18%3A11%3A59+GMT%2B0000+(Greenwich+Mean+Time)&version=6.19.0&isIABGlobal=false&hosts=&consentId=09b76f76-2b53-4fc5-af6e-ffb99a5ed78e&interactionCount=2&landingPath=NotLandingPage&groups=C0001%3A1%2CC0004%3A1%2CC0002%3A1%2CC0003%3A1%2CC0005%3A1&geolocation=GB%3BSCT&AwaitingReconsent=false; hq=%5B%7B%22name%22%3A%22homescreen%22%2C%22shouldShow%22%3Afalse%7D%5D; RT=\"z=1&dm=bwin.com&si=e8a34122-45e6-4b07-ae10-5711c4cc632a&ss=lp1epx7e&sl=0&tt=0&bcn=%2F%2F02179919.akstat.io%2F\"; BIGipServerEXT.cds-api.itsfogo.com=612729354.20480.0000",
    "Referer": "https://www.google.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
};

// Function to fetch data from the URL
async function fetchData(url) {
    try {
        const response = await axios.get(url, { headers: headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}

// Function to parse HTML and extract match odds
function parseHtml(html) {
    const $ = cheerio.load(html);
    let oddsData = [];
    const timestamp = new Date().toISOString();

    $('.option-indicator').each((index, element) => {
        const teamName = $(element).find('.name').text().trim();
        let oddsValue = $(element).find('.value.option-value').text().trim();
        oddsValue = convertToDecimalOdds(oddsValue); // Convert to decimal odds

        if (teamName && oddsValue) {
            oddsData.push({ timestamp, teamName, oddsValue });
        }
    });

    return oddsData;
}

// Function to convert fractional odds to decimal odds
function convertToDecimalOdds(fractionalOdds) {
    const [numerator, denominator] = fractionalOdds.split('/');
    return (parseInt(numerator) / parseInt(denominator) + 1).toFixed(2);
}

// Function to save data to CSV
function saveToCsv(data, filename) {
    const headers = 'Timestamp,Team Name,Odds Value\n';
    const existingData = fs.existsSync(filename) ? fs.readFileSync(filename, 'utf8') : headers;
    const csvData = data.map(item => `${item.timestamp},${item.teamName},${item.oddsValue}`).join('\n');

    fs.writeFileSync(filename, existingData + '\n' + csvData, 'utf8');
    console.log(`Data saved to ${filename}`);
}

// Main function to orchestrate the scraping
async function scrapeOdds() {
    const html = await fetchData(url);
    if (html) {
        const oddsData = parseHtml(html);
        if (oddsData.length > 0) {
            const matchDate = '2023-11-16'; // Adjust as needed
            const participant1 = 'England'; // Adjust as needed
            const participant2 = 'Malta'; // Adjust as needed
            const filename = `${participant1}_vs_${participant2}_${matchDate}.csv`;
            saveToCsv(oddsData, filename);
        } else {
            console.log("No odds data found on the page.");
        }
    }
    setTimeout(scrapeOdds, 120000); // Wait 2 minutes before next scrape
}


scrapeOdds();
