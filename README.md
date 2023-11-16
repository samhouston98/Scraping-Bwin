# Football Match Odds Scraper

# 
Overview
This Node.js application scrapes football match odds from the Bwin website for Scotland vs Georgia on 16/11/23. The extracted data includes the odds for home win, draw, and away win, along with the respective team names. The data is saved in a CSV file named ScotlandVsGeorgia.csv.

# Prerequisites

Node.js 
npm 

# Installation

Clone the repository or download the source code.
Navigate to the project directory.
Run npm install to install the required dependencies.

# Usage
To run the application, execute the following command in the terminal within the project directory:

node index.js

The script will automatically scrape data every 2 minutes and save it in the output directory as a CSV file.

# Output
The output file ScotlandVsGeorgia.csv will be located in the output directory. This file contains the scraped match odds data in CSV format.

# Dependencies
axios: Used for making HTTP requests to fetch page content.
cheerio: A fast, flexible, and lean implementation of core jQuery designed specifically for the server to parse and manipulate HTML.
fs: Node.js file system module, used for handling file operations.

# Troubleshooting
If the script encounters a 403 Forbidden error, it might be due to the website's security measures blocking scraping attempts. The script uses a User-Agent header to mimic a web browser, which may help avoid this issue.
Ensure that your internet connection is stable and that the target URL is correct and accessible.

# Legal Disclaimer
This script is provided for educational purposes only. Web scraping can have legal and ethical implications. Always ensure that your scraping activities comply with the website’s terms of service and legal regulations.