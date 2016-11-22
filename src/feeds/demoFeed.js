/* Copy and paste CIQ.QuoteFeed.CopyAndPasteMe. Change "CopyAndPasteMe" to the name
of your quote service. Then implement the fetch() method based on the included comments */



CIQ.QuoteFeed.Demo = function() {

	console.log("start demo feed");
};

CIQ.QuoteFeed.Demo.ciqInheritsFrom(CIQ.QuoteFeed.Subscriptions);

/**
 * This is a demo version of fetch. You will need to create one for your own quote feed that behaves similarly.
 * @memberOf CIQ.QuoteFeed.Demo
 */
CIQ.QuoteFeed.Demo.prototype.fetchFromSource = function(params, cb) {

	if (params.startDate && params.endDate) {
		//date range
		if (params.interval == "minute" || params.interval == "second" || params.interval == "millisecond") {
			this.generateIntradayRange(params, cb);
		} else {
			this.generateDaily(params, cb);
		}
		return;
	} else if (params.startDate) {
		// new update
		if (params.interval == "minute" || params.interval == "second" || params.interval == "millisecond") {
			this.update(params, cb);
		} else {
			cb({
				error: "CIQ.QuoteFeed.Demo does not support updates for daily charts"
			});
		}
		return;
	} else if (params.endDate) {
		// pagination
		console.log("pagination");

		if (params.interval == "minute" || params.interval == "second" || params.interval == "millisecond") {
			this.loadMore(params, cb);
		} else {
			cb({
				error: "CIQ.QuoteFeed.Demo does not support loadMore for daily charts"
			});
		}
		return;
	} else {
		// initial load
		if (params.interval == "minute" || params.interval == "second" || params.interval == "millisecond") {
			this.generateIntraday(params, cb);
		} else {
			this.generateDaily(params, cb);
		}
		return;
	}
};


/**
 * Creates a random update. Note that updates are returned as an array. You should check params.startDate to decide
 * the starting point for an update.
 * @memberOf CIQ.QuoteFeed.Demo
 */
CIQ.QuoteFeed.Demo.prototype.update = function(params, cb) {
	console.log("params", params);
	// market closed return empty update.
	if (!this.market.isOpen()) {
		cb({
			quotes: [],
			attribution: {
				source: "demo",
				exchange: "RANDOM"
			}
		});
		return;
	}

	var masterData = params.stx.chart.masterData;
	var current = masterData[masterData.length - 1];
	var previous = masterData[masterData.length - 2];

	var ms = this.market.marketZoneNow().getTime();
	var divisor = 60 * 1000;
	if (params.interval == "second")
		divisor = 1000;
	if (params.interval == "millisecond")
		divisor = 1;
	ms = ms - ms % (params.period * divisor); // move to evenly divided bar
	var now = new Date(ms);

	var newQuote = {};
	newQuote.DT = now; // Or set newQuote.Date if you have a string form date
	var field = params.symbol;
	if (!current[field]) {
		if (previous[field])
			current = previous; // get series which might be lagging behind a bar
		else
			field = "Close";
	}
	newQuote.Close = Math.round((current[field] - (Math.random() - 0.5) * 0.8) * 100) / 100;

	if (ms == masterData[masterData.length - 1].DT.getTime()) {
		if (field == "Close") {
			newQuote.Open = current.Open;
			newQuote.High = Math.max(current.High, newQuote.Close);
			newQuote.Low = Math.min(current.Low, newQuote.Close);
		} else {
			newQuote.Open = Math.round((current[field] - (Math.random() - 0.5) * 0.8) * 100) / 100;
			newQuote.High = Math.max(newQuote.Open, newQuote.Close);
			newQuote.Low = Math.min(newQuote.Open, newQuote.Close);
		}
		newQuote.Volume = current.Volume + Math.round(Math.random() * 1000);
	} else {
		newQuote.Open = newQuote.High = newQuote.Low = newQuote.Close;
		newQuote.Volume = 1000;
	}
	cb({
		quotes: [newQuote],
		attribution: {
			source: "demo",
			exchange: "RANDOM"
		}
	});
};

CIQ.QuoteFeed.Demo.prototype.randomQuote = function(seed) {
	var Open = seed - (Math.random() - 0.5) * 2;
	var Close = seed - (Math.random() - 0.5) * 2;
	var High = Math.max(seed - (Math.random() - 0.5) * 2, Open, Close);
	var Low = Math.min(seed - (Math.random() - 0.5) * 2, Open, Close);
	var newQuote = {
		Open: Math.round(Open * 100) / 100,
		Close: Math.round(Close * 100) / 100,
		High: Math.round(High * 100) / 100,
		Low: Math.round(Low * 100) / 100
	};
	// Reasonable random volume generator. Higher volumes for red candles.
	if (newQuote.Close < newQuote.Open) {
		newQuote.Volume = 1000000 + Math.round(Math.random() * 1500000);
	} else {
		newQuote.Volume = 1000000 + Math.round(Math.random() * 300000);
	}
	return newQuote;
};


/**
 * Creates daily data for the chart
 * @memberOf CIQ.QuoteFeed.Demo
 */
CIQ.QuoteFeed.Demo.prototype.generateDaily = function(params, cb) {
	function setQuotes(response) {
		var varName = response.substr(0, response.indexOf("="));
		var valueToParse = response.substring(response.indexOf(varName + "=") + (varName + "=").length, response.length - 1);
		try {
			return JSON.parse(valueToParse.replace(/,0+/g, ",0").replace(/,[.]/g, ",0.").replace(/;/g, ""));
		} catch (e) {
			return [];
		}
	}

	var symbol = params.symbol.toUpperCase();
	if (symbol.charAt(0) != "^" && CIQ.Market.Symbology.isForexSymbol(symbol))
		symbol = "^" + symbol;
	var url = "https://demoquotes.chartiq.com/" + symbol.replace(/\//g, "-");
	CIQ.postAjax(url, null, function(status, response) {
		if (status != 200) {
			cb({
				error: status
			});
			return;
		}
		var quotes = setQuotes(response);
		var newQuotes = [];
		for (var i = 0; i < quotes.length; i++) {
			newQuotes[i] = {};
			newQuotes[i].Date = quotes[i][0]; // Or set newQuotes[i].DT if you have a JS Date
			newQuotes[i].Open = quotes[i][1];
			newQuotes[i].High = quotes[i][2];
			newQuotes[i].Low = quotes[i][3];
			newQuotes[i].Close = quotes[i][4];
			newQuotes[i].Volume = quotes[i][5];
			newQuotes[i].Adj_Close = quotes[i][6];
		}
		params.noUpdate = true; //Daily demo quotes do not support updates
		cb({
			quotes: newQuotes,
			moreAvailable: false,
			attribution: {
				source: "demo",
				exchange: "RANDOM"
			}
		}); // set moreAvailable to true so that the chart will request more when scrolling into the past. Set to false if at the end of data.
	});
};


/**
 * Creates a random intraday chart (uses CIQ.Market to be market hours aware)
 * @memberOf CIQ.QuoteFeed.Demo
 */
CIQ.QuoteFeed.Demo.prototype.generateIntraday = function(params, cb) {

	if (params.stx.marketFactory) {
		params.stx.setMarket(params.stx.marketFactory(params.symbolObject), params.stx.chart);
	}
	this.market = params.stx.chart.market;

	var seed = 155.43;
	var quotes = [];
	var ticksToLoad = params.ticks * 3; // load extra to fill up space before chart
	if (ticksToLoad > 2000)
		ticksToLoad = 2000; // demo data could be slow for very large data sets since it recursively calls iter.previous() wich is not inteded to be uses this way normally
	if (isNaN(ticksToLoad))
		ticksToLoad = params.stx.chart.dataSet.length;

	var ms = this.market.marketZoneNow().getTime();
	var divisor = 60 * 1000;
	if (params.interval == "second")
		divisor = 1000;
	if (params.interval == "millisecond")
		divisor = 1;
	ms = ms - ms % (params.period * divisor); // move to evenly divided bar
	var now = new Date(ms);

	var iter = this.market.newIterator({
		'begin': now,
		'interval': params.stx.layout.interval,
		'periodicity': 1, //params.stx.layout.periodicity, // allways do 1 since this is the raw data. The agregation will happen upon data returned.
		'timeUnit': params.stx.layout.timeUnit,
		'inZone': params.stx.dataZone,
		'outZone': params.stx.dataZone
	});

	if (!this.market.isOpen())
		now = iter.previous();
	// if we are only loading market hours, we may reach today's date before the number of max ticks.
	// So we go backwards based on ticks and not date, then reverse the array.
	for (var i = 0; i < ticksToLoad; i++) {
		var newQuote = this.randomQuote(seed);
		newQuote.DT = new Date(now);
		newQuote.Volume = Math.round(newQuote.Volume * params.period / 500);
		quotes.push(newQuote);
		now = iter.previous();
		//console.log(now);
		seed = newQuote.Close;
	}

	cb({
		quotes: quotes.reverse(),
		moreAvailable: true,
		attribution: {
			source: "demo",
			exchange: "RANDOM"
		}
	}); // set moreAvailable to true so that the chart will request more when scrolling into the past. Set to false if at the end of data.
};

/**
 * Creates a random intraday range of data for a chart
 * @memberOf CIQ.QuoteFeed.Demo
 */
CIQ.QuoteFeed.Demo.prototype.generateIntradayRange = function(params, cb) {

	var seed = 155.43;
	var quotes = [];

	var now = new Date(params.startDate);

	var iter = this.market.newIterator({
		'begin': now,
		'interval': params.stx.layout.interval,
		'periodicity': 1, //params.stx.layout.periodicity,
		'timeUnit': params.stx.layout.timeUnit,
		'inZone': params.stx.dataZone,
		'outZone': params.stx.dataZone
	});

	while (now <= params.endDate) {
		var newQuote = this.randomQuote(seed);
		newQuote.DT = new Date(now);
		newQuote.Volume = Math.round(newQuote.Volume * params.period / 500);
		quotes.push(newQuote);
		now = iter.next();
		seed = newQuote.Close;
	}

	cb({
		quotes: quotes,
		moreAvailable: true,
		attribution: {
			source: "demo",
			exchange: "RANDOM"
		}
	});
};

/**
 * Loads more random data when the user scrolls back.
 * @memberOf CIQ.QuoteFeed.Demo
 */
CIQ.QuoteFeed.Demo.prototype.loadMore = function(params, cb) {
	var firstQuote = params.chart.masterData[0];
	var i;
	for (i = 0; i < params.chart.masterData.length; i++) {
		if (params.chart.masterData[i].DT.getTime() >= params.endDate.getTime()) {
			firstQuote = params.chart.masterData[i];
			if (firstQuote[params.symbol] || firstQuote.Close) break;
		}
	}
	var field = params.symbol;
	if (!firstQuote[field])
		field = "Close";
	var seed = firstQuote[field];
	var quotes = [];

	var iter = this.market.newIterator({
		'begin': params.endDate,
		'interval': params.stx.layout.interval,
		'periodicity': 1, //params.stx.layout.periodicity,
		'timeUnit': params.stx.layout.timeUnit,
		'inZone': params.stx.dataZone,
		'outZone': params.stx.dataZone
	});

	var now = new Date(iter.previous());
	for (i = 0; i < params.ticks; i++) {
		var newQuote = this.randomQuote(seed);
		newQuote.DT = new Date(now);
		if (params.interval == "minute")
			newQuote.Volume = Math.round(newQuote.Volume * params.period / 500);
		quotes.push(newQuote);
		now = iter.previous();
		seed = newQuote.Close;
	}
	quotes.reverse();
	cb({
		quotes: quotes,
		moreAvailable: params.chart.masterData.length < 100000,
		attribution: {
			source: "demo",
			exchange: "RANDOM"
		}
	}); // set moreAvailable to true so that the chart will request more when scrolling into the past. Set to false if at the end of data.
};


CIQ.QuoteFeed.ChartIQEOD = function(urlQuick, urlFull) {
	this.urlQuick = urlQuick;
	this.urlFull = urlFull;
};

CIQ.QuoteFeed.ChartIQEOD.ciqInheritsFrom(CIQ.QuoteFeed);

/**
 * EOD quotes from ChartIQ. You'll need to get a valid url from ChartIQ to use this.
 * @memberOf CIQ.QuoteFeed.ChartIQEOD
 */
CIQ.QuoteFeed.ChartIQEOD.prototype.fetch = function(params, cb) {
	function setQuotes(response) {
		var varName = response.substr(0, response.indexOf("="));
		var valueToParse = response.substring(response.indexOf(varName + "=") + (varName + "=").length, response.length - 1);
		try {
			return JSON.parse(valueToParse.replace(/,0+/g, ",0").replace(/,[.]/g, ",0.").replace(/;/g, ""));
		} catch (e) {
			return [];
		}
	}

	if (params.startDate && !params.endDate) {
		cb({
			error: "CIQ.QuoteFeed.ChartIQEOD does not support updates for daily charts"
		});
		return;
	}
	if (params.endDate && !params.loadMoreReplace) {
		cb({
			error: "CIQ.QuoteFeed.ChartIQEOD does not support loadMore for daily charts"
		});
		return;
	}
	if (params.interval == "minute") {
		cb({
			error: "CIQ.QuoteFeed.ChartIQEOD does not support intraday charts"
		});
		return;
	}
	var symbol = params.symbol.toUpperCase();
	if (symbol.charAt(0) != "^" && CIQ.Market.Symbology.isForexSymbol(symbol))
		symbol = "^" + symbol;
	var url = this.urlQuick;
	var moreAvailable = true;
	if (params.endDate && params.loadMoreReplace)
		url = this.urlFull;
	else if ((new Date().getTime() - 1333238400000) / 86400000 < params.ticks)
		url = this.urlFull; // start predates quick cache
	if (url == this.urlFull) {
		delete params.endDate;
		moreAvailable = false;
	}
	if (!url)
		url = this.urlQuick + "/pts";
	var self = this;
	CIQ.postAjax(url + "/" + symbol.replace(/\//g, "-").toUpperCase(), null, function(status, response) {
		if (status != 200) {
			cb({
				error: status
			});
			return;
		}
		var quotes = setQuotes(response);
		var newQuotes = [];
		for (var i = 0; i < quotes.length; i++) {
			newQuotes[i] = {};
			newQuotes[i].Date = quotes[i][0]; // Or set newQuotes[i].DT if you have a JS Date
			newQuotes[i].Open = quotes[i][1];
			newQuotes[i].High = quotes[i][2];
			newQuotes[i].Low = quotes[i][3];
			newQuotes[i].Close = quotes[i][4];
			newQuotes[i].Volume = quotes[i][5];
			newQuotes[i].Adj_Close = quotes[i][6];
		}
		var result = {
			quotes: newQuotes,
			moreAvailable: moreAvailable,
			attribution: {
				source: "chartiq",
				exchange: "EOD"
			}
		};
		var now = new Date().getTime();
		if (!result.quotes.length || now - CIQ.strToDate(result.quotes[result.quotes.length - 1].Date).getTime() > 24 * 60 * 60 * 1000) {
			if (self.realTimeHook) return self.realTimeHook(params, result, cb);
		}
		cb(result);
	});
};

/** You can override this function to fetch a RT update from a different source
 * @memberOf CIQ.QuoteFeed.ChartIQEOD
 */
CIQ.QuoteFeed.ChartIQEOD.prototype.realTimeHook = function(params, result, cb) {
	cb(result);
};