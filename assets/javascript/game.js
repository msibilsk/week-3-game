//initializes number of wins
var wins = 0;

var displayWins = function() {
    var htmlWins = "<p>Wins: " + wins + "</p>";
    document.querySelector("#winning").innerHTML = htmlWins;
};

displayWins();

//initializes number of losses
var losses = 0;

var displayLosses = function() {
    var htmlLosses = "<p>Losses: " + losses + "</p>";
    document.querySelector("#losing").innerHTML = htmlLosses;
};

displayLosses();

//array of words to select from
var christmasWords = ["meow", "purrfect", "paws", "treats", "yarnball", "kitten", "whiskers", "angel", "bells", "birth", "blizzard", "blustery", "boots", "bough", "bow", "box", "candle", "candy", "cane", "cap", "card", "carolers", "caroling", "carols", "celebrate", "celebration", "ceremony", "charity", "chestnuts", "chill", "chilly", "chimney", "Christmas", "Christmastide", "cider", "coal", "cold", "cookie", "December", "decorate", "decorations", "display", "eggnog", "elf", "elves", "eve", "evergreen", "exchange", "family", "Father", "feast", "Feliz", "Navidad", "festival", "festive", "fir", "fireplace", "firewood", "frankincense", "frosty", "Snowman", "fruitcake", "garland", "gift", "giving", "gingerbread", "give", "gold", "goodwill", "goose", "green", "greetings", "guest", "happy", "holiday", "holly", "hope", "chocolate", "cider", "hug", "skates", "icicle", "icy", "ivy", "Jesus", "jingle", "jolly", "joy", "joyful", "Noel", "kings", "Krampus", "Kringle", "lights", "list", "log", "love", "manger", "merry", "mistletoe", "mittens", "myrrh", "nativity", "naughty", "nice", "nippy", "Noel", "North", "nutcracker", "occasion", "ornaments", "package", "pageant", "parade", "partridge", "party", "pie", "tree", "pinecone", "pudding", "poinsettia", "popcorn", "presents", "receive", "red", "reindeer", "rejoice", "reunion", "ribbon", "ritual", "Rudolph", "Nicholas", "sales", "Santa", "scarf", "Scrooge", "season", "shopping", "skate", "sled", "sleigh", "bells", "snow", "snowball", "snowbound", "snowfall", "snowflake", "snowman", "snowy", "socks", "spirit", "star", "Saint", "stocking", "sugarplum", "sweater", "tidings", "tinsel", "toboggan", "togetherness", "toy", "tradition", "tree", "trimming", "trips", "turkey", "unwrap", "vacation", "visit", "wassail", "winter", "wintertime", "wintry", "wish", "wonder", "workshop", "wrap", "wreath", "Xmas", "yule", "log", "yuletide"];

var guessWord;

var blankSpaces;

//displays blanks with current guesses filled in
var displayCurrentWord = function() {
    var htmlCurrentWord = "<p id='blankSpaces'>" + blankSpaces + "</p>";
    document.querySelector("#guessWord").innerHTML = htmlCurrentWord;
};

var remainingGuesses;

var displayRemainingGuesses = function() {
    var htmlGuesses = "<p>Remaining Guesses: " + remainingGuesses + "</p>";
    document.querySelector("#remaining").innerHTML = htmlGuesses;
};

var wrongLetters;

var displayWrongLetters = function() {
	var htmlWrongLetters = "<p>Incorrect Letters Guessed: " + wrongLetters + "</p>";
    document.querySelector("#wrong").innerHTML = htmlWrongLetters;
};

var lastWin;

var reset = function() {
    //randomly selects a word
    guessWord = christmasWords[Math.floor(Math.random() * christmasWords.length)];

    //makes sure the random word is upper case
    guessWord = guessWord.toUpperCase();

    //creates a string of blank spaces to be display
    blankSpaces = "";
    for (var i = 0; i < guessWord.length; i++) {
        blankSpaces += "_";
    }

    displayCurrentWord();

    remainingGuesses = guessWord.length + 5;
    displayRemainingGuesses();

    //initialize array for the wrong letters guessed
    wrongLetters = [];
    displayWrongLetters();

};

reset();

//interaction begins when the user presses a key
document.onkeyup = function(event) {

    //formats the users key press into a uppercase string
    var userGuess = String.fromCharCode(event.keyCode).toUpperCase();

    //declare bool vairable that will be used to determine if user guess goes in the blanks or wrong letters array
    var userGuessCorrect = false;

    //loops through the guessword to see if the user's guess is in it
    for (var i = 0; i < guessWord.length; i++) {
        if (userGuess === guessWord[i]) {
            //tells us not to put the user guess in the wrongLetters array
            userGuessCorrect = true;
            //checks if the letter has already been filled in and takes away a turn if not
            if (blankSpaces.indexOf(userGuess) === -1) {
                --remainingGuesses
                displayRemainingGuesses();
            }
            //inserts the user's guess into the blank spaces
            blankSpaces = blankSpaces.substr(0, i) + userGuess + blankSpaces.substr(i + 1);
            displayCurrentWord();
        }
    }

    if (guessWord.indexOf(blankSpaces) === 0) {
        wins++;
        var song = new Audio("assets/sound/jinglebells.wav");
        song.play();
        lastWin = "<p>Last Win: " + guessWord + "</p>";
        document.querySelector("#lastWin").innerHTML = lastWin;
        displayWins();
        reset();
    }

    if (userGuessCorrect === false) {
        if (wrongLetters.indexOf(userGuess) === -1) {
            wrongLetters.push(userGuess);
            displayWrongLetters();
            --remainingGuesses
            displayRemainingGuesses();
        }
    }

    if (remainingGuesses < 1) {
        losses++;
        displayLosses();
        reset();
    }
};
