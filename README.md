# election-data
Pulls data from results.enr.clarityelections.com into a Google Spreadsheet

The [Bloomington Election Commission](http://becvote.org/) uses Clarity Elections to publish election results online. This script runs in Google Apps Script to pull the results from specific races into a Google Spreadsheet.

To use this script with other elections in the future, you'll have to:
1. Create a Google Spreadsheet. Set up one tab in that spreadsheet to be used for result ingestion.
2. Find the JSON API for the election on the election authority's website. This can be done once the election authority publishes their "Zero Results" page on their website. Go into Chrome's Developer Tools to find JSON URLs that end with `/json/details.json` and `/json/sum.json`.
3. Pull up `/json/sum.json` to find the Race IDs and the order of candidate names in each race. Create columns in the results tab of the spreadsheet for each candidate in each race. Be sure that the candidate names appear in your spreadsheet in the same order that they appear in `/json/sum.json`.
4. Copy-paste `Code.gs` into Google Apps Script. Edit the `races` variable to match Race IDs with spreadsheet columns. Edit the `json` variable to reflect the URL of `/json/details.json`.
5. Debug until it works for you. (Sorry this is so open-ended...)
6. Assuming it's working by election night, set up a trigger to call the `grabBECData()` function once a minute. Except for testing purposes, don't do this too far in advance of election night, since it'll just pull in zero results every minute and waste resources.
