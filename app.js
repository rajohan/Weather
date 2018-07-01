/*
 * MIT License
 *
 * Copyright (c) 2018. Raymond Johannessen
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Raymond Johannessen Webutvikling
 * https://rajohan.no
 */
const yargs = require("yargs");
const fs = require("fs");

const weather = require("./weather.js");

const argv = yargs
    .command("weather", "Get weather for an location.", {
        address: {
            describe: "Address to fetch weather for",
            alias: "a",
            string: true,
            demand: false
        }
    })
    .command("weather-default", "Set default address to fetch weather for", {
        address: {
            describe: "Address to set as default",
            alias: "a",
            string: true,
            demand: true
        }
    })
    .command("google-key", "Set your Google API key", {
        key: {
            describe: "Your Google API key",
            alias: "k",
            string: true,
            demand: true
        }
    })
    .command("darksky-key", "Set your Dark sky API key", {
        key: {
            describe: "Your Google API key",
            alias: "k",
            string: true,
            demand: true
        }
    })
    .help()
    .alias("help", "h")
    .scriptName("")
    .argv;

let fetchConfig = () => {
    try {
        let notesString = fs.readFileSync("config.json");
        return JSON.parse(notesString);
    } catch (e) {
        return {defaultLocation: "", googleKey: "", darkSkyKey: ""};
    }
};

let saveConfig = (config) => {
    fs.writeFileSync('config.json', JSON.stringify(config));
};

let config = fetchConfig();
let command = argv._[0];

switch (command) {
    case "weather":
        if(!config.googleKey) {
            console.log(`\nGoogle API key is required.`);
            console.log(`Set the API key with: google-key -k "your key"`);
            console.log(`To get an API key register at: https://cloud.google.com/maps-platform/#get-started\n`);
        } else if(!config.darkSkyKey) {
            console.log(`\nDark sky API key is required.`);
            console.log(`Set the API key with: darksky-key -k "your key"`);
            console.log(`To get an API key register at: https://darksky.net/dev\n`);
        } else {
            if (argv.address) {
                weather.getWeather(argv.address, config.googleKey, config.darkSkyKey);
            } else {
                if (!config.defaultLocation) {
                    console.log(`\nNo default location is set`);
                    console.log(`Use: weather -a "address" OR set a default address with: weather-default -a "address"\n`);
                } else {
                    weather.getWeather(config.defaultLocation, config.googleKey, config.darkSkyKey);
                }
            }
        }
        break;
    case "weather-default":
        config.defaultLocation = argv.address;
        saveConfig(config);
        console.log("\nDefault address saved\n");
        break;
    case "google-key":
        config.googleKey = argv.key;
        saveConfig(config);
        console.log("\nGoogle API key saved\n");
        break;
    case "darksky-key":
        config.darkSkyKey = argv.key;
        saveConfig(config);
        console.log("\nDark Sky API key saved\n");
        break;
    default:
        console.log("Command not recognized");
        break;
}