// Import necessary libraries
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// URL of the bookmaker's site
const url = 'https://sports.bwin.com/en/sports/events/georgia-scotland-2:6358784?tab=score';

// Set the participants and match date
const participant1 = 'Georgia';
const participant2 = 'Scotland';
const matchDate = '2023-11-16'; // Replace with actual match date

// Function to fetch data from the URL
async function fetchData(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                'DNT': '1', // Do Not Track Request Header
                'Connection': 'keep-alive',
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
                "cookie": "tdpehcd=; btagcd=; tdpehcd=; btagcd=; isLanguageChanged=false; lang=en; trackerId=4442326; seoLandingUrl=http%3A%2F%2Fsports.bwin.com%2Fen%2Fsports; dark-mode=1; vnSession=6e61dc1c-0332-4175-a5e6-9aae21d42613; usersettings=cid%3Den-US%26vc%3D1%26sst%3D2023-11-14T15%3A13%3A41.6315011Z%26psst%3D0001-01-01T00%3A00%3A00.0000000Z; trc.cid=80381bad978d4206b3e24ec6d812e485; AMCV_6B47D0245A26653C0A495CDC%40AdobeOrg=MCMID|50076769488544870662735290037495999873; tq=%5B%5D; _gcl_au=1.1.75158685.1699974828; setSessionFired=true; _rdt_uuid=1699974829234.1d1f818f-085a-49b8-8a39-dd9b0f4e8a51; OptanonAlertBoxClosed=2023-11-14T15:33:24.328Z; _fbp=fb.1.1699976703226.354386811; defaultStake=5; kndctr_6B47D0245A26653C0A495CDC_AdobeOrg_identity=CiY1MDA3Njc2OTQ4ODU0NDg3MDY2MjczNTI5MDAzNzQ5NTk5OTg3M1IRCIr6lPO8MRgBKgRJUkwxMAGgAZD6lPO8MfABp_vPu70x; _gid=GA1.2.1055238243.1700126789; lastKnownProduct=%7B%22url%22%3A%22http%3A%2F%2Fsports.bwin.com%2Fen%22%2C%22name%22%3A%22sports%22%2C%22previous%22%3A%22unknown%22%2C%22platformProductId%22%3A%22SPORTSBOOK%22%7D; kndctr_6B47D0245A26653C0A495CDC_AdobeOrg_cluster=irl1; _sp_ses.cc76=*; DAPROPS=\"sjs.webGlRenderer:ANGLE (Intel Inc., Intel(R) Iris(TM) Graphics 6100, OpenGL 4.1)|sdeviceAspectRatio:589/515|sscreenWidthHeight:589/515|sdevicePixelRatio:2|bjs.deviceOrientation:0|srendererRef:03285363321|saudioRef:647510521|sversion:1.9.1|sversion:1.9.1|bE:0\"; __cf_bm=n8EDlBqkh49CkkkePxJ5c1Rzsaeq8ugsvaul.CNzvOk-1700151862-0-AUKAVaCuHObt6Ua4q7T0U6kj3sIbTceXKTujE0/rV7LQ1UCly7YoeOAVMSPn7lzhV/ig8f5W9PyaxAxSQrVsSJpDuXu2seNUI/s62CKsMXF5; RT=\"z=1&dm=bwin.com&si=e8a34122-45e6-4b07-ae10-5711c4cc632a&ss=lp1cz23r&sl=4&tt=bzb&bcn=%2F%2F0217991a.akstat.io%2F&ld=1k04k\"; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Nov+16+2023+16%3A24%3A34+GMT%2B0000+(Greenwich+Mean+Time)&version=6.19.0&isIABGlobal=false&hosts=&consentId=09b76f76-2b53-4fc5-af6e-ffb99a5ed78e&interactionCount=2&landingPath=NotLandingPage&groups=C0001%3A1%2CC0004%3A1%2CC0002%3A1%2CC0003%3A1%2CC0005%3A1&geolocation=GB%3BSCT&AwaitingReconsent=false; BIGipServerEXT.cds-api.itsfogo.com=126192650.20480.0000; _sp_id.cc76=a561f926-4146-4d04-86ae-1c618bf2b7c7.1699974829.5.1700151877.1700135571.28e0b62c-b5d4-4569-a23e-1e46b942311e; _uetsid=38809b90846211eea757d7fbd7d46d74; _uetvid=69c29c50830011eea5424fbbc2887ca5; _ga_2VLF40G9CH=GS1.1.1700148367.6.1.1700151877.43.0.0; _ga=GA1.1.1881377950.1699974829; hq=%5B%7B%22name%22%3A%22homescreen%22%2C%22shouldShow%22%3Afalse%7D%5D"
            }
        });
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

    $('.option-indicator').each((index, element) => {
        const teamName = $(element).find('.name').text().trim();
        const oddsValue = $(element).find('.value.option-value').text().trim();

        if (teamName && oddsValue) {
            oddsData.push({
                teamName,
                oddsValue
            });
        }
    });

    return oddsData;
}

// Function to save data to CSV
function saveToCsv(data, filename) {
    const headers = 'Team Name,Odds Value\n';
    const csvData = headers + data.map(item => `${item.teamName},${item.oddsValue}`).join('\n');

    const dir = path.resolve(__dirname, 'output');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    fs.writeFileSync(path.resolve(dir, filename), csvData, 'utf8');
    console.log(`Data saved to ${filename}`);
}

// Delay function
const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

// Main function to orchestrate the scraping with a delay
async function scrapeOdds() {
    try {
        const html = await fetchData(url);
        if (html) {
            const oddsData = parseHtml(html);
            const filename = `${participant1}_vs_${participant2}_${matchDate}.csv`;
            saveToCsv(oddsData, filename);
        }

        // Wait for 2 minutes before the next request
        await delay(120000);
        scrapeOdds();
    } catch (error) {
        console.error('Scraping failed:', error.message);
        // Retry after 2 minutes
        await delay(120000);
        scrapeOdds();
    }
}

// Initial invocation
scrapeOdds();

