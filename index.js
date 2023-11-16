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

    $('.option').each((index, element) => {
        const teamName = $(element).find('.name').text().trim();
        const oddsValue = $(element).find('.value.option-value').text().trim();

        // If teamName and oddsValue are not empty, add them to the oddsData array
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
    // Format the data as CSV
    // Example: const csvData = data.map(item => `${item.teamName},${item.oddsValue}`).join('\n');

    // Ensure the directory exists
    const dir = path.resolve(__dirname, 'output');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // Write to file
    fs.writeFileSync(path.resolve(dir, filename), csvData, 'utf8');
}

// Main function to orchestrate the scraping
async function scrapeOdds() {
    const html = await fetchData(url);
    if (html) {
        const oddsData = parseHtml(html);
        const filename = 'odds.csv'; // You can add logic to create a dynamic filename
        saveToCsv(oddsData, filename);
    }
}

// Scrape every 2 minutes
setInterval(scrapeOdds, 120000); // 120000 milliseconds = 2 minutes

// Initial invocation
scrapeOdds();

