


d3.json("samples.json").then(function(data) {

    console.log("All functioning")

    //Task how to?
//console.log(data.samples[0].otu_ids.slice(0,10).forEach((x) => `oto ${x}`))
    function init() {
    //////////// BAR CHART //////////
        var bardefaulttrace = [{
            x: data.samples[0].sample_values.slice(0,10).reverse(),
            y: data.samples[0].otu_ids.slice(0,10).reverse().map( (x) => `OTU ${x}`),
            text : data.samples[0].otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }];

        var barlayout = {
            title : "OTU Top 10",
            xaxis : {title : "Sample Values"},
            yaxis : {title : "OTU"},
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


          ////// METADATA //////
          
          
       var metadata = Object.entries(data.metadata[0]).map( (x) => `${x[0]} :  ${x[1]}`)

        
       var metadatatext = d3.select("sample-metadata").text(`${metadata}`)

    };


  

    init();


});



//    //////////  GAUGE CHART /////////

//    var gaugedefaulttrace = [
//     {
//         domain: { x: [0, 1], y: [0, 1] },
//         value: data.metadata[0].wfreq,
//         title: { text: "Navel Wash frequency" },
//         type: "indicator",
//         mode: "gauge",
//         gauge: {
//             bar: {thickness: 0.5 }
//         }               
       
//         // ids: ["0-1", "1-2", "2-3", "3-4"],
//         // steps: [
//         //     {range: [0,1], color: "royalblue" },
//         //     {range: [1,2], color: "royalblue" },
//         //     {range: [2,3], color: "royalblue" },
//         //     {range: [3,4], color: "royalblue" },
//         //     {range: [4,5], color: "royalblue" },
//         //     {range: [5,6], color: "royalblue" },
//         //     {range: [6,7], color: "royalblue" },
//         //     {range: [7,8], color: "royalblue" },
//         //     {range: [8,9], color: "royalblue" },
//         // ]
    
//     }
// ];

// var gaugelayout = {
//     annotations : {text : "scrubs per week"}
    
// }

// Plotly.newPlot("gauge", gaugedefaulttrace, gaugelayout)






// var data = [
//     {
//       type: "indicator",
//       mode: "gauge+number+delta",
//       value: 420,
//       title: { text: "Speed", font: { size: 24 } },
//       delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
//       gauge: {
//         axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
//         bar: { color: "darkblue" },
//         bgcolor: "white",
//         borderwidth: 2,
//         bordercolor: "gray",
//         steps: [
//           { range: [0, 250], color: "cyan" },
//           { range: [250, 400], color: "royalblue" }
//         ],
//         threshold: {
//           line: { color: "red", width: 4 },
//           thickness: 0.75,
//           value: 490
//         }
//       }
//     }
//   ];