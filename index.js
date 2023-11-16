// Import necessary libraries
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// URL of the bookmaker's site
const url = 'https://sports.bwin.com/en/sports/events/georgia-scotland-2:6358784?tab=score';

// Function to fetch data from the URL
async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
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

// Main function to orchestrate the scraping
async function scrapeOdds() {
    const html = await fetchData(url);
    if (html) {
        const oddsData = parseHtml(html);
        const filename = 'ScotlandVsGeorgia.csv'; // Dynamic filename
        saveToCsv(oddsData, filename);
    }
}

// Scrape every 2 minutes
setInterval(scrapeOdds, 120000); // 120000 milliseconds = 2 minutes

// Initial invocation
scrapeOdds();
