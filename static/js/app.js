d3.json("samples.json").then(function(data) {
    function init() {
       
        /////////////////////// GAUGUE CHART //////////////////////
        
        // Enter a speed between 0 and 180
        var level = data.metada[0].wfreq * 20;

        // Trig to calc meter point
        var degrees = 180 - level,
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);
        var path1 = 'M -.0 -0.05 L .0 0.05 L ';
        // Path: may have to change to create a better triangle
        var mainPath = path1,
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);

        var data = [{ type: 'scatter',
        x: [0], y:[0],
            marker: {size: 14, color:'850000'},
            showlegend: false,
            name: 'speed',
            text: level,
            hoverinfo: 'text+name'},
        { values: [1,1,1,1,1,1,1,1,1,9],
        rotation: 90,
        text: ['8-9', '7-8', '6-7',  '5-6',  '4-5', '3-4',  '2,3', '1-2', '0-1'],
        textinfo: 'text',
        textposition:'inside',
        marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                                'rgba(249, 168, 37, .5)', 'rgba(183,28,28, .5)',
                                'rgba(0, 0, 0, 0.5)']},
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
        }];

        var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
            }],
        height: 400,
        width: 400,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
        };

        Plotly.newPlot('gauge', data, layout);



        //////////// BAR CHART //////////

        
        var bardefaulttrace = [{
            x: data.samples[0].sample_values.slice(0,10).reverse(),
            y: data.samples[0].otu_ids.slice(0,10).reverse().map( (x) => `OTU ${x}`),
            text : data.samples[0].otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }];

        var barlayout = {
            title : "Top 10 microbial species",
            xaxis : {title : "Sample Values"},
            yaxis : {title : "Operational Taxonomic Units (OTU)"},
        };

        Plotly.newPlot("bar", bardefaulttrace, barlayout)

        //////////// BUBBLE CHART //////////

        var bubbledefaultrace = [{
            x: data.samples[0].otu_ids,
            y: data.samples[0].sample_values,
            text : data.samples[0].otu_labels,
            mode: "markers",
            marker: {
                color: data.samples[0].otu_ids,
                colorscale: [
                    [0, 'rgb(3, 202, 252)'],
                    [0.3, 'rgb(115, 252, 3)'],  
                    [0.6,'rgb(250, 33, 200)'], 
                    [1.0,'rgb(252, 44, 3)']
                ],
                size: data.samples[0].sample_values
                }
            }
        ];

        var bubblelayout = {
            title : "All OTU presence",
            xaxis : {title : "OTU"},
            yaxis : {title : "Presence"},
        };

        Plotly.newPlot("bubble", bubbledefaultrace, bubblelayout)


        /////////// METADATA ////////////
          
          //get the entries from the object and print them in html
       var defaultmetadata = Object
                .entries(data.metadata[0])
                .forEach( (x) => 
                d3.select("#sample-metadata").append("p").text( `${x[0]} :  ${x[1]}`));

    };

   ///// ID SELECTOR /////
   // Here I create a drop down to all the possible datasets so we can use it to update charts
    var IDselector = d3.select("#selDataset").selectAll("option")
    .data(data.names)
    .enter()
    .append("option")
    .attr("value", (d) => d)
    .text((d) => d);


    ////////// EVENT ////////////

    d3.select("body").on("change", updatecharts);

    // UPDATE CHART HANDLER
    function updatecharts() {

        var datasetID = d3.select("#selDataset").node().value;
        var dataindex = data.names.indexOf(datasetID);

        //// BAR CHART UPDATE/////

        var equis = data.samples[dataindex].sample_values.slice(0,10).reverse();
        var ye = data.samples[dataindex].otu_ids.slice(0,10).reverse().map( (x) => `OTU ${x}`);
        var texto = data.samples[dataindex].otu_labels.slice(0,10).reverse();

        Plotly.restyle("bar", "x", [equis]);
        Plotly.restyle("bar", "y", [ye]);
        Plotly.restyle("bar", "text", [texto]);

        //////// BUBBLE CHART UPDATE ///////
        var x = data.samples[dataindex].otu_ids;
        var y = data.samples[dataindex].sample_values;
        var text = data.samples[dataindex].otu_labels;

        Plotly.restyle("bubble", "x", [x]);
        Plotly.restyle("bubble", "y", [y]);
        Plotly.restyle("bubble", "text", [text]);


        /// GAUGE UPDATE /////
        var newlevel = data.metada[dataindex].wfreq * 20
        Plotly.restyle('gauge', "text", [newlevel]);

        //// METADATA UPDATE ////

        d3.select("#sample-metadata").html("")

        var metadata = Object
                    .entries(data.metadata[dataindex])
                    .forEach( (x) => 
                    d3.select("#sample-metadata").append("p").text( `${x[0]} :  ${x[1]}`));

    
    };

    init();

});