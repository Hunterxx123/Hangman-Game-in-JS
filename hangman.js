// Prompts user for name
console.log("==========================\nWelcome to the hangman game!\n===========================")
var name = prompt("Please key in your name");
console.log("Welcome " + name + "!");

// Call classes and methods here
let wordcollect1 = new WordCollection();
wordcollect1.guessinggame(wordcollect1.setwordobj(wordcollect1.getrandomwordIndices()));
// wordcollect1.printcollection();

// Declare Classes

//Word Class

// This is a class for each randomly selected word.
// randomword argument: the word chosen. wordef argument: the definition of the chosen word
function Word(randomword, wordef) {
	//Instance variables
	word = "";
	worddefinition = "";
	// Change all to uppercase so the game will be easier
	this.word = randomword.toUpperCase();
	this.worddefinition = wordef;
	// returns the word itself
	this.wordreturn = function() {
		return this.word;
	}
	// returns the word definition
	this.defreturn = function() {
		return this.worddefinition;
	}
	// returns the length of each word to generate the number of blankspace
	this.wordlengthreturn = function() {
		return this.word.length;
	}
	// This function will return a set
	// A set contains uniuue keys, meaning that no two same keys can exist in the set per one time.
	// Able to prevent any forms of repetition. Eg. WORD: HELLO LETTER: L BLANKSPACE: _ _ _ _ _. OUTPUT=> _ _ L L _
	this.worduniquecharreturn = function() {
		let wordset = new Set();
		for (let i = 0; i < this.word.length; i++)
			wordset.add(this.word.charAt(i).toString());
		return wordset;
	}
	// When a letter has be entered by the user and the letter does exists in the word
	 // the locateindices function will search through the entire word itself to get the indexes of that
	// letter which was guessed. Eg WORD: INDENTATION. GUESS: I. INDEXES OF I: 0, 8
	// the function returns an array of the indices
	// Why is this used? This is so that we know which exact index of the blankspace we must replace with the letter itself
	this.locateindices = function(searchletter, wordchosen) {
		indices = [], j = -1;
		while ((j = wordchosen.indexOf(searchletter, j+1)) >= 0) 
			indices.push(j);
		return indices;
	}
}

//Alphabet Class
function Alphabet() {
	alphabet = [];
	//Generates alphabets from A-Z
	this.load = function() {
		for (let i  = 65; i < 91; i++) 
			alphabet.push(String.fromCharCode(i));	
		return alphabet;
	}
	//This method is the method that removes the alphabet from the list of alphabets whenever a letter is guessed correctly/wrongly.
	//See the pic in your assigment
	this.splicealphabetarr = function(spliceletter) {
		indexletter = alphabet.indexOf(spliceletter);
		alphabet.splice(indexletter, 1, " ");
		return alphabet;
	}
	//Below two methods prints the alphabet list.
	this.printalphabet = function(alphabets) {
		let s = "";
		for (let i = 0; i < alphabets.length; i++) { 
				s += " " + alphabets[i];
				if (i == 12) {
					console.log(s);
					s="";
				}
				if (i == alphabets.length-1) 
					console.log(s);
		}
	}
	//This print method will print the letters again if the user guess the same letter twice. As there are no changes to the letters at all
	this.printalphabetitself = function() {
		let s = "";
		for (let i = 0; i < alphabet.length; i++) { 
				s += " " + alphabet[i];
				if (i == 12) {
					console.log(s);
					s="";
				}
				if (i == alphabet.length-1) 
					console.log(s);
		}
	}
}
// Blankspace class 
function blankSpace(word) {
	blankspace = [];
	//This function will generate the list of blak spaces you see in your asssignment, which is in accordance to the length of the word you're guessing
	this.generateblankspace = function() {
		for (let i = 0; i < word.length; i++)
			blankspace.push("_");
		return blankspace;
	}
	// When a letter is guessed, it will replace the balnkspace with the letter Eg. Word: HELLO, Blankspace: _ _ _ _ _, Letter: E. Output: _ E _ _ _
	this.replaceBlank = function(letterindice, letter) {
		for (let i = 0; i < letterindice.length; i++)
			blankspace.splice(letterindice[i], 1, letter);
		return blankspace;
	}
	// Beow two methods are to print the blankspace
	// bsprint() takes in arguments, which means that it can take in the newly replaced Blankspace values as fromm function replaceBlank
	this.bsprint = function(bs) {
		console.log(bs.toString().replaceAll(",", " "));
	} 
	// bsprintitself() is the function which will print the outstanding blankspace, if a user guesses the same etter twice, as there are no changes to 
	//both the alphabet and balnkspace display.
	this.bsprintitself = function() {
		console.log(blankspace.toString().replaceAll(",", " "));
	}
}

//Word Collection Class
//This is the class where the logic of the program taes place
function WordCollection() {
	// wordcollect object is the list of words together with their definition
	let wordcollect = {
		word : ["accessibility", "altitude", "batholith", "bedrock", "canal", "cape", "caprock", "defile", "earthquake", "elevation", "fallow", "hamlet", "headland", "headwall", "inlet", "jungle", "karst", "lake", "landmass", "lava", "map", "mesa", "outwash", "overburden", "permafrost", "physiography", "quarry", "ria", "ridge", "settlement", "shield", "tephra", "territory", "underpopulation", "vale", "valley", "volcano", "watercourse", "watershed", "zoning"],
		definition: ["A locational characteristic that permits a place to be reached by the efforts of those at other places.", 
		"The height of an object in the atmosphere above sea level. Compare elevation.", 
		"A very large body of igneous rock, usually granite, which has been exposed by erosion of the overlying rock.", 
		"The solid rock in the Earth's crust that underlies all soil and other loose material; the rock material that breaks down eventually to form soil.", 
		"A navigable artificial water channel, usually built as a conduit for human activity.", 
		"A large headland or promontory extending into a body of water, usually a sea or ocean.", 
		"A stratum of erosion-resistant sedimentary rock (usually limestone) found in arid areas. Caprock forms the top layer of most mesas and buttes.", 
		"A narrow pass or gorge between mountains or hills.", "The sudden and intense shaking of the ground due to tectonic activity.", "The height of a point on the Earth's surface with respect to sea level.", 
		"Agricultural land that is plowed or tilled but left unseeded during a growing season. Fallowing is usually done to conserve moisture and soil nutrients.", 
		"A small human settlement, variably defined as one the size of a town, village, or parish or as a smaller subdivision of or satellite entity to a larger settlement.", 
		"A high coastal promontory that extends out into a body of water, often surrounded by steep cliffs. A very large headland is often called a cape.", 
		"A steep slope or sheer cliff face at the upper end of a valley (e.g. at the back of a cirque), or at the active face of a mine, pit, or quarry.", 
		"An indentation of a shoreline, usually long and narrow, which often leads to an enclosed body of salt water, such as a sound, bay, lagoon, or marsh.", 
		"An area covered with dense vegetation dominated by large trees, often tropical.", 
		"An area possessing surface topography resulting from the underground solution of subsurface limestone or dolomite", "A body of water localized in a basin and surrounded entirely by land. Lakes are often defined as separate from any river or stream that serves to feed or drain them.",
		 "Any large contiguous area of land typically surrounded by an ocean or sea.", "The term used for magma once it has erupted onto the Earth's surface.", "A picture of a place that is usually drawn to scale on a flat surface.", 
		 "An isolated, relatively flat-topped natural elevation, usually more extensive than a butte and less extensive than a plateau.", "Rocky and sandy surface material deposited by melted water that flows from a glacier.", "Material covering a mineral seam or bed that must be removed before the mineral can be removed in strip mining.", 
		 "A permanently frozen layer of soil; permanently frozen ground at high latitude and high elevation.", "Another name for physical geography", "A place from which stone, rock, sand, gravel, slate, or aggregate is excavated from the ground. Also sometimes called an open-pit mine.", "The seaward end of a river valley which has been flooded as a result of a rise in sea level.", "An elongated raised landform which forms a continuous elevated crest for some distance, such as a chain of hills or mountains. The line formed by the highest points, with only lower terrain immediately to either side, is called the ridgeline.", 
		 "Also called a locality or populated place. Any place where people live and form communities.", "A broad area of very old rocks above sea level that is usually characterized by thin, poor soils and low population densities", 
		 "Solid material of all sizes explosively ejected from a volcano into the atmosphere.", "A specific area or portion of the Earth's surface; similar to though distinct from a region", 
		 "Economically, a situation in which an increase in the size of the labor force will result in an increase in per-worker productivity.", "Another name for a valley.", "A low area between hills or mountains, often with a river running through it. A depression that is longer than it is wide.", "A vent (opening) in the Earth's surface through which magma erupts, or the landform that is constructed by eruptive material.", "Any channel followed by a flowing body of water such as a river or stream, potentially including channels that are dry for part or all of the year.", "Another name for a drainage divide or drainage basin.", "The public regulation of land and building use to control the character of a place"]
	}
	// getrandomIndices functions generates an array of random integers which will serve to randomly index words out of wordcollect object
	// the integers are within the size of the wordcollect obj
	this.getrandomwordIndices = function() {
		randomIndice = [];
		for (let i  = 0; i < 10; i++) 
			randomIndice.push(Math.floor(Math.random()*wordcollect["word"].length));
		return randomIndice;
	}

	// This function will return an array of the Word object (see above). What it does is that from the randomIndice function, we get an array of random integers
	// Then we index the wordcollectobject to get the random word and their definitions
	// We collate them into an array (of size 10 because the question said 10 random words out of 40)
	// And we store them in this array to be indexed on for the later part of the game, when you're guessing Word 1/10, word 2/10 etc...
	this.setwordobj = function(rdindice) {
		let word1 = [];
		for (let i = 0; i < rdindice.length; i++)
			word1.push(new Word(wordcollect["word"][rdindice[i]], wordcollect["definition"][rdindice[i]]));
		return word1;
	}
	//This is where the main logic of the game happens
	this.guessinggame = function(word1) {
		// Declaration
		// We will start off with explaining the variables and their usages
		// wrongcount variable: In this entire game of GUESSING 10 WORDS by GUESSING THEIR LETTERS, you're only allowed to guess the letters of all 10 words wrongly 3 TIMES
		// lifelinecount variable: This is the hints/ assistance that will be provide in the gameplay itself, again ou're only limited to 3 chances. After using all your help out, you 
		// cannot use the hints again
		// score variable: This variable will be the variable that keeps track of the player's score, each word guessed = 1 point
		// These variables are declared and initialized outside the loop because if we were to place them in the loop (every iteration of the loop is a a new word)
		// Then the variables wrongcount, lifelinecount and score will always be resetted and we will losetrack of the game.
        let wrongcount = 0,  lifelinecount = 0; score = 0;
        let lifeline = new Hints();
		for (let i = 0; i < word1.length; i++) {
			// This prints the stage of the game
			// Eg. Word 1/10, Word 2/10
			// Used word1.length because we can then alter how many words we want to guess
			// Eg. Word 1/3 , word 2/3
			console.log("WORD " + (i+1) + " / " + (word1.length) + "\nSCORE " + score);
			// Because word1 is an array of the instances of the Word class
			//We will need to index the array to retrieve the instance of the Word class!
			let word = word1[i];
			// word is an object (which is an instance of a Class) so please do not think that word is the selected word itself
			// gameword variable is then the actual word itself
			gameword = word.wordreturn();
			// gameworddef is deifintion of gameword
			gameworddef = word.defreturn();
			// gameword set is the unique characters in gameword
			// Eg. gameowrd = HELLO, gameowrdset will be H E L O
			gamewordset = word.worduniquecharreturn(); 
			// checkletterset, you may be wondering what this variable is and why did we declare a set here
			// this is because we need something that we can check back on when we already guessed the letter and we guess the letter again
			// we do not want the program to continue adding to rightcount variable (see below) when we guess the same letter twice
			// This will result in the game ending early
			let checkedletterset = new Set();	
			// We initialize the blankspaces and alphabet object for that particular word
			let bs1 = new blankSpace(gameword);
		    let alphabet1 = new Alphabet();
		    let lifeline = new Hints();
		    // We print them out to show their initial values/ state
			alphabet1.printalphabet(alphabet1.load());
		    bs1.bsprint(bs1.generateblankspace());
		    // haswon variable is the boolean that will act as the control flow of the guessing of the word, it will break the loop when the word has been guess correctly
		    // rightcount variable is the variable that will keep track of the letters guessed correctly
		    // And do you remember in the Word class above, I defined a function called 'this.worduniquecharreturn'?:)
		    // So let me explain.. Eg. WORD: HELLO, so for eg. if you guess the letter 'L', then the word will show all letters of L right? Eg. _ _ L L _
		    // This is where sets come in handy, we make sure that by using sets, we only have 4 unique characters of the word 'HELLO', and that is H E L O
		    // Once the value of rightcount is equal to the size of the set (which in our function now it is gamewordset), we would have won this stage of the game already.
		    let haswon = false; rightcount = 0;
			while (!haswon) {
				// guessletter variable is basically the letter that the user guesses
				// uppercase to standardize
				let guessletter = prompt("Key in your letter").toUpperCase();
				// 'if (gamewordset.has(guessletter))' checks if the letter exist in the game
					if (gamewordset.has(guessletter)) {
						// 'if (!checkedletterset.has(guessletter))' Checks if the leter has not been already guessed
						if (!checkedletterset.has(guessletter)) {
						console.log("Letter " + guessletter + " is a part of the word!");
						// We proceed on to modify the blankspace and alphabet display
						// 1. blankspace wil show the letter of the word guessed
						// 2. Alphabet will remove the letter that was guessed
						bs1.bsprint(bs1.replaceBlank(word.locateindices(guessletter, gameword), guessletter));
						alphabet1.printalphabet(alphabet1.splicealphabetarr(guessletter));
						// We will add this letter to the checkletter set so that we can keep track of our guessed letter and not guess the same letter twice
						checkedletterset.add(guessletter);
						// Finally we increment our rightcount variable value by 1 as we guessed one letter correctly
						rightcount++;
						}
					// This is the case where we re-guess the same letter 
					else {
					console.log("Letter " + guessletter + " has already been guessed. Please try again!");
					// No changes made to alphabet and balnkspace
					bs1.bsprintitself();
					alphabet1.printalphabetitself();
					}
					}
					// else if (!gamewordset.has(guessletter))' This is when the user guessed the letter wrongly
					// I think maybe we can use a switch statement here, will try later
					else if (!gamewordset.has(guessletter)) {
						// 9 is the key you need to key in to be able to use your hint, however 9 is not part of theword so i decided to put in under this condition
						if (guessletter == 9) {
							// We increase lifeline count by 1 as we are using one hint (rmb that the max number of hints we can use is 3)
				    		lifelinecount++;
				    		// shows the vowels of the word
				   			if (lifelinecount == 1) {
					 			rightcount += lifeline.vowelprint(gameword, bs1, alphabet1, checkedletterset);
					 			console.log("YOU HAVE USED ONE CLUE. YOU NOW HAVE " + (3-lifelinecount) + " LEFT");
				   			}
				   			// shows the definition of the word
				   			else if (lifelinecount == 2)
					 			console.log(gameworddef);
					 		// We will escape this iteration and move on to the next loop  (next word in the for loop)
					 		// But because we are still stuck in the while loop, we must first break free from the while loop in order to move into the net iteration of the for loop
				   			else if (lifelinecount == 3)
				   				break;
				   			// We must aso include a condition where the user spams number 9 thinking he can get the hints agai and again
				   			// We do not let him use the hints after 3 times
				   			else if (lifelinecount > 3)
					 			console.log("USED ALL YOUR LIFELINES");
			   			}
			   			// isNaN returns true if the inputted value is not a number. Hence '!isNan(guessletter)' will return false if guessletter is not a number and true if
			   			// guessletter is a number
			   			// this condition also applies if guessletter is any form of special characters
						else if (!isNaN(guessletter) || guessletter.charCodeAt(0) < 65 || guessletter.charCodeAt(0) > 90) {
							// Increment the number of times player guessed wrongly by 1
							wrongcount++;
							console.log("Sorry " + guessletter + " not a part of the word. Please try again.");
							// Display the stage of the person hangman.
							this.hangdisplay(wrongcount);
							// No changes to the blankspace and alphabet display, so print itself, as the value of guessletter is a number, we need not remove any letters from alphabet
							bs1.bsprintitself();
							alphabet1.printalphabetitself();
							// Termination of game upon gessing wrongly thrice
							if (wrongcount == 3) {
								console.log("SCORE " + score + "\nGAME OVER.\nYOU DID NOT MANAGED TO GUESS ALL THE WORDS.\nWOULD YOU LIKE TO TRY AGAIN?");
								// Ask if user wants to replay
				    		    if (this.replay(prompt("Key in R to replay. Key in aNy other key to exit")))
								return;						
							}					
						}
						// This is if guessletter is a letter (not a number)
						else {
							wrongcount++;
							console.log("Sorry " + guessletter + " not a part of the word. Please try again.");
							this.hangdisplay(wrongcount);
							//No changes to blankspace, as no letter guessed correctly
							bs1.bsprintitself();
							// but we take out the letter that is guessed wrongly from alphabet list
							alphabet1.printalphabet(alphabet1.splicealphabetarr(guessletter));
							// if letter guessed wrongly thrice
							if (wrongcount == 3) {
								console.log("SCORE " + score + "\nGAME OVER.\nYOU DID NOT MANAGED TO GUESS ALL THE WORDS.\nWOULD YOU LIKE TO TRY AGAIN?");
								// Ask if user wants to replay
				    			this.replay(prompt("Key in R to replay. Key in aNy other key to exit"));
				    			return;
							}		
						}
					}
				//  if we guess all letter correctly
				if (rightcount == gamewordset.size) {
					console.log("You have guess the word correctly!");
					score++;
					// if we are at the last word in the list of words we have to guess.
					// Eg. we are at word number 10
					if (i == word1.length - 1)
						console.log("END GAME!\nYOU HAVE GOTTEN A SCORE OF " + score);
					break;
				}
				// If we use hint number 3, which is jump to the next iteration (next word), we use the next() method to jump ahead
				if (lifelinecount == 3)
					next();
			}
		}
	}
	// This function is just for replaying the game
	this.replay = function (key) {
		// if player chooses r/ R
		if (key == "r" || key == "R") {
			// recursively calls the guessing game method again
			console.log("WELCOME BACK!")
			let wordcollect1 = new WordCollection();
            wordcollect1.guessinggame(wordcollect1.setwordobj(wordcollect1.getrandomwordIndices()));
		}
		else {
			// if not end the game
			console.log(name + " has left the game.")
			return true;
		}
	}
	// When person guess wrongly, the value of wrongcount will increment to track his number of wrongcounts
	// The hangdisplay function will display which stage of the hangman the person is add depending on the value of wrongcount
	this.hangdisplay = function(wrongcount) {
		let hm1 = new Hangman();
		if (wrongcount == 1)
			hm1.stepboard();
		else if (wrongcount == 2)
			hm1.hanger();
		else if (wrongcount == 3)
			hm1.endgame();
	} 
}

//Hangman Class

 function Hangman() {
 	// Stage 1 of the hangman display
 	this.stepboard = function() {
 		stepboard = "________|________\n|\t\t|_______________\n|\t\t\t\t|\n|_______________________________|"
 		console.log(stepboard);
 	}
 	// stage 2 of hangman display
 	this.hanger = function() {
 		hanger = "\t_________________\n\t|\t\t|\n\t|\n\t|\n\t|\n\t|\n\t|\n\t|\n\t|\n";
 		console.log(hanger + stepboard);
 	}
 	// stage 3 of hangman display
 	this.endgame = function() {
 		head = "\t___________________\n\t|\t\t___|___\n\t|\t\t|      |\n\t|\t\t|______|\n\t|\t\t  /|\\\n\t|\t\t  / \\\n"
 		remaininganchor = "\t|\n\t|\n\t|\n\t|\n\t|\n"
 		console.log(head + remaininganchor + stepboard);
 	}
 }
 
 // This is the Hints classs
 function Hints() {
 	this.vowelprint = function(wordsofvowel, blankspace, alphabet, checkedset) {
 		// We will be toUTCString() REGULAR EXPRESSION here
 		let vowels = /[A|E|I|O|U]/g;
 		// This set stores the vowels that are present in the word (in this function the word is argument wordsofvoewel)
 		let matchedletterset = new Set();
 		let wordobj = new Word(wordsofvowel, "");
 		for (let i = 0; i < wordsofvowel.length; i++)
 			//  in each letter of the word, we check if it is a voewel and if it has already been guessed by the user
 			if (wordsofvowel[i].match(vowels) && !checkedset.has(wordsofvowel[i]))
 				// if it is a vowel and has yet to be guessed we add it to our 'matchedletterset'
 				matchedletterset.add(wordsofvowel[i]);
 		// Then from each of the unique values in the set we get their index in the word itself
 		for (let key of matchedletterset.keys()) {
 			vowelindices = wordobj.locateindices(key, wordsofvowel);
 			//do all the replacement of blanks and alphabets
 			blankspace.replaceBlank(vowelindices, key);
 			alphabet.splicealphabetarr(key);
 		}
 		// then we print the finalized output where all vowels are shown
 		blankspace.bsprintitself();
 		alphabet.printalphabetitself();
 		return matchedletterset.size;
 	}
 }

// _______________________________