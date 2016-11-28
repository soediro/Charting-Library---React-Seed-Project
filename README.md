# Charting-Library---React-Seed-Project

This is a basic build of the ChartIQ library within the React framework. This provides an example of how to implement the most common elements in the library. This is not a comprehensive example, more like a good starting point for an React developer.

## Requirements

* A copy of the ChartIQ library. To get your copy, visit https://www.chartiq.com/products/html5-charting-library/ to see a demo and get in touch with us.

* NodeJS (https://nodejs.org/). We use NodeJS and Node Package Manager (NPM) to load the React components as well as the different libraries to transform JSX and ES6 to ES5.

## Getting started

To view the example, add a system link to your ChartIQ JS and CSS directories inside of the chartiq directory. Once you have that, you can then open up index.html and get a fully working example.

## Customizing 
All of the project source is in the ```src``` folder. The main ChartIQ React component is ```app.jsx```. There is also an ```index.js``` in this folder which loads RequireJs and all of our modules into it. This is basically a wrapper component that houses the charting engine in it's state. This wrapper function passes a reference of the engine to all of the UI components which allow each to manipulate the chart based on their functionality. 

The chart engine is created inside of the ```componentDidMount``` function of the wrapper component. This is done in the location beacause React uses a vritual DOM and the chart component is not injected into the actual DOM until after the render function.
``` 
componentDidMount() {
    var ciq = new CIQ.ChartEngine({
        container: $$$("#chartContainer")
    });
    this.setState({
        ciq: ciq
    }, function() {
        this.attachFeed(this.props.feed ? this.props.feed : 
                new CIQ.QuoteFeed[this.state.feed]());
        ciq.newChart(this.props.symbol ? this.props.symbol : "AAPL");
    })
}
```


## Buiding for use in the browser

This project is using Webpack to tranform JSX and ES6 to ES5. The configs for this are in the ```webpack.config.js```. Running the ```webpack``` command inside of your command line tool will create a file ```dist/chartIQ.js``` . This is a transformed and bundled version of everything in the src directory. ```src/index.js``` will automatically load this file.

