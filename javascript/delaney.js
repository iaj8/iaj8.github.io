/* ######################################## GLOBAL VARIABLES ######################################## */
var numTopics = 75;
var numWordsPerTopic = 20;
var numAuthors = 67;
var numVolumes = 267;
var topics = {};
var authors = {};
var authorsAlphabetically = [];
var rows = [];
var allWords;
var allTopics;
var selectedWord = "";
var word = "city";
var topicLinesParsed = 0;
var authorLinesParsed = 0;
var authorTopicLinesParsed = 0;
var tooltip;

window.onload = function() {
    document.getElementById("numVolumes").innerHTML = numVolumes;
    tooltip = d3.select("#helper").attr("class", "tooltip hidden");
}

if (window.location.search.length > 0) {
    word = window.location.search.substring(3);
}
d3.select("#wordbox").attr("value", word);

/* ########################################### FUNCTIONS ########################################### */

function findTopicArrayFromTopicWord(topicWord){
    var currTopics = [];
    for (var topic in Object.keys(topics)) {
        for (var i = 0; i < topics[topic].length; i++){
            if (topics[topic][i] == topicWord){
                currTopics.push(topic);
            }
        }
    }
    return currTopics;
}

function parseAuthorLine(d) {
    var author = d.author.trim();
    if (authors[author] != undefined){
        authors[author].numTexts++;
    } else {
        authors[author] = {numTexts: 1, topicInfo : {}};
    }
    authorLinesParsed ++;
    if (authorLinesParsed >= numVolumes){
        createAuthorRows();
    }
}

function parseAuthorTopicLine(d) {
    if(authors[d.author] != undefined) {
        if (authors[d.author].topicInfo != undefined) {
            authors[d.author].topicInfo[d.topicID] = {
                numTokensOfTopic: d.numTokensOfTopic,
                topicInAuthor: d.topicInAuthor,
                authorInTopic: d.authorInTopic
            };
        } else {
            authors[d.author].topicInfo[d.topicID] = {
                numTokensOfTopic: d.numTokensOfTopic,
                topicInAuthor: d.topicInAuthor,
                authorInTopic: d.authorInTopic
            };
        }
    }
    authorTopicLinesParsed ++;
    if (authorTopicLinesParsed >= numAuthors*numTopics){
        populateTopicInfo();
    }

}

function parseTopicLine(d) {
    var t = '' + d.topicID;
    if (topics[t] != undefined){
        topics[t].push(d.word);
    } else {
        topics[t] = [d.word];
    }
    topicLinesParsed += 1;
    if (topicLinesParsed >= numTopics*numWordsPerTopic) {
        populateAuthorRowsWithTopic(word);
    }
}

function populateAuthorRowsWithTopic(topicWord){
    var topicArray = findTopicArrayFromTopicWord(topicWord);
    if (topicArray.length == 0) return;
    for (var i = 0; i < authorsAlphabetically.length; i++){
        var row = rows[i];
        row.append("td").attr("class", "target_word").append("a").attr("class", "wordlink").attr("href", "?q=").text(word);

        for (var t = 0; t < topicArray.length; t++){
            //console.log(authors[authorsAlphabetically[i]].topicInfo[t]);
            var topicInAuthor = authors[authorsAlphabetically[i]].topicInfo[topicArray[t]].topicInAuthor;
            var authorInTopic = authors[authorsAlphabetically[i]].topicInfo[topicArray[t]].authorInTopic;
            //var topicInAuthor = authors[authorsAlphabetically[i]][topics[t]].topicInAuthor;
            //var authorInTopic = authors[authorsAlphabetically[i]][topics[t]].authorInTopic;


            var topicInAuthorCircle = row.append("svg")
                .attr({
                    width: 40,
                    height: 40
                });
            topicInAuthorCircle.append("g").append("circle")
                .attr({
                    cx: 20,
                    cy: 20,
                    r: 20
                })
                .style("fill", "red");

            topicInAuthorCircle.append("text")
                .style("fill", "white")
                .attr("dy", 25)
                .attr("dx", 10)
                .text((topicInAuthor*100).toFixed(1));


            row.append("td").attr("class", "word").append("a").attr("class", "topicLink").style("color", "black").text(topicArray[t]);

            var authorInTopicCircle = row.append("svg")
                .attr({
                    width: 80,
                    height: 40
                });

            authorInTopicCircle.append("g").append("circle")
                .attr({
                    cx: 20,
                    cy: 20,
                    r: 20
                })
                .style("fill", "green");

            authorInTopicCircle.append("text")
                .style("fill", "white")
                .attr("dy", 25)
                .attr("dx", 10)
                .text((authorInTopic*100).toFixed(1));

        d3.selectAll(".topicLink")
            .on("mouseover", function() {
                tooltip.classed("hidden", false)
                .attr("style", "left:"+(d3.event.pageX)+"px;top:"+(d3.event.pageY)+"px;white-space: pre-wrap;")
                .html("<div style:\"text-align: center;\">Words in Topic: " + this.innerHTML +
                    "</div>");

                arrayToNumberedList(topics[this.innerHTML])
            })
            .on("mouseout", function() {
                tooltip.classed("hidden", true);
            });

        }

    }



}

function createAuthorRows() {
    //Make Template

    var topRow = d3.select("#sim").append("tr").attr("id", "top");
    topRow.append("td").attr("class", "heading").attr("class", "author").text("Author Name");
    topRow.append("td").attr("class", "heading").text("Number of Volumes by this Author");
    topRow.append("td").attr("class", "heading").append("a").text("Target Word");
    topRow.append("td").attr("class", "heading").append("a").style("color", "black").text("Topics Info");

    //Populate

    var i = 0;
    authorsAlphabetically = Object.keys(authors);
    authorsAlphabetically.sort();

    for(var j=0; j < authorsAlphabetically.length; j++) {
        var name = authorsAlphabetically[j];
        var row = d3.select("#sim").append("tr").attr("id", i++);
        row.append("td").attr("class", "author").text(i+". " + name);
        row.append("td").attr("class", "num_books").text(authors[authorsAlphabetically[j]].numTexts);
        rows.push(row);
    }

    d3.tsv("/data/author_topics.tsv", function(error, data) {
        if (error) throw error;

        data.forEach(function(d){
            parseAuthorTopicLine(d)
        });
    });
}

function arrayToString(array){
    var text = "";
    for (var i = 0; i < array.length; i++){
        text += array[i];
        text += "\t";
    }
    return text;
}

function arrayToNumberedList(array){
    var table = d3.select("#helper").append("table");
    for (var i = 0; i < array.length; i++){
        var w = array[i].trim() + "\t";
        table.append("td").text(w);
        if (i%4 == 3) table.append("tr");
    }
}


function ready(error, w) {
    if (error) { console.log(error); }

    allWords = d3.selectAll(".wordlink");
    allWords.data(allWords[0].map(function (d) { return d.innerText; }));

    allWords.on("click", function () {
        var queryWord = this.innerText;
        if (queryWord !== selectedWord) {
            d3.event.preventDefault();
            allWords.style("background-color", function (w) {
                if (w === queryWord) { return "#ddd"; }
                else if (w.substr(0,5) === queryWord.substr(0,5)) { return "#eee"; }
                else { return "#fff"; }
            });
            selectedWord = queryWord;
        }
    });

    allTopics = d3.selectAll(".topicLink");

    allWords.on("click", function () {
        var queryWord = this.innerText;
        if (queryWord !== selectedWord) {
            d3.event.preventDefault();
            allWords.style("background-color", function (w) {
                if (w === queryWord) { return "#ddd"; }
                else if (w.substr(0,5) === queryWord.substr(0,5)) { return "#eee"; }
                else { return "#fff"; }
            });
            selectedWord = queryWord;
        }
    });
}

function populateTopicInfo(){
    d3.tsv("/data/topic_words.tsv", function(error, data) {
        if (error) throw error;

        data.forEach(function(d){
            parseTopicLine(d);
        });
    });
}

/* ############################################ SCRIPT ############################################ */

d3.tsv("/data/authors.tsv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d){
        parseAuthorLine(d);
    });
});


d3.select("#wordbox").attr("value", word);
console.log(word);


// lay out all authors
// have a search bar which encodes for topic
// when a query is received, put all words in that topic alongside the author, and re-order + re-color by correlation


// for a given word, list the topics that this word is seen in this authors work, and color those topics by how much of the authors work these topics are.
//                                                                                    color those topics by how much of the topics are from this authors work.

//A colored cirlce denoting percentage
// A colored square denoting percentage

//same rep in the grid



