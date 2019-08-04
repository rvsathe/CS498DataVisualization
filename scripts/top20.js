dataset = {
    "children": [{"Name":"Cafe","Count":11294},
        {"Name":"Tea","Count":5522},
        {"Name":"Celeri","Count":5513},
        {"Name":"Olives","Count":4799},
        {"Name":"Demi Tasse","Count":4014},
        {"Name":"Mashed Potatoes","Count":3468},
        {"Name":"Radishes","Count":3465},
        {"Name":"Boiled Potatoes","Count":3043},
        {"Name":"Vanilla Ice Cream","Count":2639},
        {"Name":"Orange Juice","Count":2502},
        {"Name":"Chicken Salad","Count":2498},
        {"Name":"Milk","Count":2432},
        {"Name":"Cocoa","Count":2429},
        {"Name":"Lettuce Salad","Count":2308},
        {"Name":"Assorted Cakes","Count":2254},
        {"Name":"Fruit","Count":2238},
        {"Name":"French Fried Potatoes","Count":2231},
        {"Name":"Green Peas","Count":2204},
        {"Name":"Cheese","Count":2094},
        {"Name":"Stewed Tomatoes","Count":2089}]
};

var diameter = 550;
var color = d3.scaleOrdinal(d3.schemeCategory20);

var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);
var svg = d3.select("#chartTop20")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var nodes = d3.hierarchy(dataset)
    .sum(function(d) { return d.Count; });

var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d){
        return  !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node.append("title")
    .text(function(d) {
        return d.Name + ": " + d.Count;
    });

node.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("fill", function(d,i) {
        return color(i);
    });

node.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Name.substring(0, d.r / 3);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d){
        return d.r/5;
    })
    .attr("fill", "white");

node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Count;
    })
    .attr("font-family",  "Gill Sans", "Gill Sans MT")
    .attr("font-size", function(d){
        return d.r/5;
    })
    .attr("fill", "white");

d3.select(self.frameElement)
    .style("height", diameter + "px");