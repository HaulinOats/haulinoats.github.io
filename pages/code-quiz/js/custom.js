$( document ).ready(function() {

	//closes modal when 'Next Question' button is clicked
	$('.modal-close').on('click',function(){
		$('.q-modal').css('z-index', '-10').css('display',"none");
	})

	//load XML based on language chosen
	$('.l-icon').on('click', function(){
		//find out which programming language the user is wanting to take quiz for
		var programming_language = $(this).attr('data-p-language');

		//check which language they clicked on
		if(programming_language=="html5"){
			mainDataPop('html', '#html5-page');	
		} else if(programming_language=="css3") {
			mainDataPop('css', '#css3-page');
		}else if(programming_language=="php") {
			mainDataPop('php', '#php-page');
		}else if(programming_language=="jquery") {
			mainDataPop('jquery', '#jquery-page');
		}
	})

	function mainDataPop(language,element) {
		//get JSON file containing all question information 
			// $.getJSON( url, function(data) {
        //shuffle JSON array so questions aren't always in same order
        var data = getJSON(language);
				var newData = shuffleArray(data.quiz.questionItem);
				var increment = 0;

				//populate data on page for question
				right_answer = populateQuestion(newData,increment,element);
				
				//Run function when an answer is chosen
				$(element+' .question-box').off().on('click', function(){
					//get the text of chosen answer
					var chosen_answer = $(this).children(':first').text();

					//check if it is the correct answer
					//populate modal with chosen and right answers
					if(chosen_answer == right_answer){
						$('.modal-msg').text('Correct!').css('color', "darkgreen");
						$('.modal-chosen').text(chosen_answer);
						$('.modal-correct').text(right_answer);
					}else{
						$('.modal-msg').text('Wrong!').css('color', "darkred");;
						$('.modal-chosen').text(chosen_answer);
						$('.modal-correct').text(right_answer);
					}

					//display modal
					$('.q-modal').css('z-index', '1').css('display', "block");

					//increment to display next question in array
					increment++;

					//if user has reached last question, reshuffle array and set increment back to 0
					if (increment>newData.length){
						newData = shuffleArray(data.quiz.questionItem);
						increment=0;
					}
					//populate new question data as well as return the right answer for validation
					right_answer = populateQuestion(newData,increment,element);
				})
			// });
	}
	
	function populateQuestion(newData,increment,element) {
		$(element+' .question-asked').text(newData[increment].question);
		$(element+' .qb-0 p').text(newData[increment].panswer[0]);
		$(element+' .qb-1 p').text(newData[increment].panswer[1]);
		$(element+' .qb-2 p').text(newData[increment].panswer[2]);
		$(element+' .qb-3 p').text(newData[increment].panswer[3]);
		var right_answer = newData[increment].aanswer;
		return right_answer;
	}

	/**
	 * Randomize array element order in-place.
	 * Using Fisher-Yates shuffle algorithm.
	 */
	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
  }
  
  function getJSON(language){
    switch(language){
      case "html":
        return {
          "quiz": {
            "questionItem": [
              {
                "question": "What is the previous version of HTML, prior to HTML5?",
                "panswer": [
                  "HTML 4.1",
                  "HTML 4",
                  "HTML 4.01",
                  "HTML 4.9"
                ],
                "aanswer": "HTML 4.01"
              },
              {
                "question": "Which doctype is correct for HTML5?",
                "panswer": [
                  "!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 5.0//EN' 'http://www.w3.org/TR/html5/strict.dtd'",
                  "!DOCTYPE HTML5",
                  "!DOCTYPE html",
                  "!DOCTYPE html5.0"
                ],
                "aanswer": "!DOCTYPE html"
              },
              {
                "question": "In HTML5, which element is used to group heading elements?",
                "panswer": [
                  "hgroup",
                  "group",
                  "headings",
                  "header"
                ],
                "aanswer": "header"
              },
              {
                "question": "Which of the following elements is no longer supported in HTML5?",
                "panswer": [
                  "q",
                  "menu",
                  "font",
                  "ins"
                ],
                "aanswer": "font"
              },
              {
                "question": "Which of the following elements is no longer supported in HTML5?",
                "panswer": [
                  "base",
                  "cite",
                  "acronym",
                  "abbr"
                ],
                "aanswer": "acronym"
              },
              {
                "question": "In HTML5, onblur and onfocus are:",
                "panswer": [
                  "Style attributes",
                  "HTML elements",
                  "Event attributes",
                  "Element attributes"
                ],
                "aanswer": "Event attributes"
              },
              {
                "question": "What is the correct HTML5 element for playing video files?",
                "panswer": [
                  "media",
                  "video",
                  "movie",
                  "mpeg4"
                ],
                "aanswer": "video"
              },
              {
                "question": "What is the correct HTML5 element for playing audio files?",
                "panswer": [
                  "mp3",
                  "sound",
                  "audio",
                  "wav"
                ],
                "aanswer": "audio"
              },
              {
                "question": "Which attribute for 'script' elements is no longer required in HTML5?",
                "panswer": [
                  "src",
                  "type",
                  "href",
                  "rel"
                ],
                "aanswer": "type"
              },
              {
                "question": "In HTML5, which method is used to get the current location of a user?",
                "panswer": [
                  "getPosition()",
                  "getCurrentPosition()",
                  "getUserPosition()",
                  "getCoordinates()"
                ],
                "aanswer": "getCurrentPosition()"
              },
              {
                "question": "The new HTML5 global attribute, 'contenteditable' is used to:",
                "panswer": [
                  "Update content from the server",
                  "Specifies a context menu for an element. The menu appears when a user right-clicks on the element",
                  "Return the position of the first found occurrence of content inside a string",
                  "Specify whether the content of an element should be editable or not"
                ],
                "aanswer": "Specify whether the content of an element should be editable or not"
              },
              {
                "question": "In HTML5, contextmenu and spellcheck are:",
                "panswer": [
                  "Event attributes",
                  "HTML elements",
                  "HTML attributes",
                  "Style attributes"
                ],
                "aanswer": "HTML attributes"
              },
              {
                "question": "Graphics defined by SVG is in which format?",
                "panswer": [
                  "HTML",
                  "CSS",
                  "XML",
                  "JSON"
                ],
                "aanswer": "CSS"
              },
              {
                "question": "The 'canvas' element in HTML5 is used to:",
                "panswer": [
                  "create draggable elements",
                  "draw graphics",
                  "manipulate data in MySQL",
                  "display database records"
                ],
                "aanswer": "draw graphics"
              },
              {
                "question": "Which built-in HTML5 object is used to draw on the canvas?",
                "panswer": [
                  "getContent",
                  "getCanvas",
                  "getContext",
                  "getGraphics"
                ],
                "aanswer": "getContext"
              },
              {
                "question": "In HTML5, which attribute is used to specify that an input field must be filled out?",
                "panswer": [
                  "required",
                  "formvalidate",
                  "validate",
                  "placeholder"
                ],
                "aanswer": "required"
              },
              {
                "question": "Which input type defines a slider control?",
                "panswer": [
                  "slider",
                  "controls",
                  "search",
                  "range"
                ],
                "aanswer": "range"
              },
              {
                "question": "Which input type defines a week and year control (no time zone)?",
                "panswer": [
                  "week",
                  "date",
                  "year",
                  "month"
                ],
                "aanswer": "week"
              },
              {
                "question": "Which HTML5 element is used to display a scalar measurement within a known range?",
                "panswer": [
                  "range",
                  "gauge",
                  "meter",
                  "measure"
                ],
                "aanswer": "meter"
              }
            ]
          }
        };
      case "css":
        return {
          "quiz": {
            "questionItem": [
              {
                "question": "What does 'CSS' stand for?",
                "panswer": [
                  "Creative Style Sheets",
                  "Computer Styling Syntax",
                  "Cascading Style Sheets",
                  "Colorful Style Sheets"
                ],
                "aanswer": "Cascading Style Sheets"
              },
              {
                "question": "What is the proper HTML for referring to an external style sheet?",
                "panswer": [
                  "<link rel='stylesheet' type='text/css' href='mystyle.css'>",
                  "<style src='mystyle.css'>",
                  "<stylesheet>mystyle.css</stylesheet>",
                  "<script src='mystyle.css'></script>"
                ],
                "aanswer": "<link rel='stylesheet' type='text/css' href='mystyle.css'>"
              },
              {
                "question": "Where in an HTML document is the correct place to refer to an external style sheet?",
                "panswer": [
                  "In the 'body' section",
                  "At the end of the document",
                  "In the 'head' section",
                  "At the top of the document"
                ],
                "aanswer": "In the 'head' section"
              },
              {
                "question": "Which HTML element is used to define an internal stylesheet?",
                "panswer": [
                  "<css>",
                  "<style>",
                  "<script>",
                  "<cascade>"
                ],
                "aanswer": "<style>"
              },
              {
                "question": "Which HTML attribute is used to define inline styles?",
                "panswer": [
                  "styles",
                  "class",
                  "font",
                  "style"
                ],
                "aanswer": "style"
              },
              {
                "question": "Which is the correct CSS syntax?",
                "panswer": [
                  "body:color=black;",
                  "{body:color=black;}",
                  "{body;color:black;}",
                  "body {color: black;}"
                ],
                "aanswer": "body {color: black;}"
              },
              {
                "question": "How do you insert a comment in a CSS file?",
                "panswer": [
                  "// this is a comment //",
                  "// this is a comment",
                  "/* this is a comment */",
                  "' this is a comment"
                ],
                "aanswer": "/* this is a comment */"
              },
              {
                "question": "Which property is used to change the background color?",
                "panswer": [
                  "color",
                  "background-color",
                  "bgcolor",
                  "bg-color"
                ],
                "aanswer": "background-color"
              },
              {
                "question": "How do you add a background color for all 'h1' elements?",
                "panswer": [
                  "all.h1 {background-color:#FFFFFF;}",
                  "h1.all {background-color:#FFFFFF;}",
                  "h1 {background-color:#FFFFFF;}",
                  "h1 {bg-color:#FFFFFF;}"
                ],
                "aanswer": "h1 {background-color:#FFFFFF;}"
              },
              {
                "question": "Which CSS property is used to change the text color of an element?",
                "panswer": [
                  "text-color",
                  "color",
                  "fgcolor",
                  "font-color"
                ],
                "aanswer": "color"
              },
              {
                "question": "Which CSS property controls the text size?",
                "panswer": [
                  "text-style",
                  "font-size",
                  "font-style",
                  "text-size"
                ],
                "aanswer": "font-size"
              },
              {
                "question": "What is the correct CSS syntax for making all the <p> elements bold?",
                "panswer": [
                  "<p style='font-size:bold;'>",
                  "<p style='text-size:bold;'>",
                  "p {text-size:bold;}",
                  "p {font-weight:bold;}"
                ],
                "aanswer": "p {font-weight:bold;}"
              },
              {
                "question": "How do you display hyperlinks without an underline?",
                "panswer": [
                  "a {text-decoration:no-underline;}",
                  "a {text-decoration:none;}",
                  "a {underline:none;}",
                  "a {decoration:no-underline;}"
                ],
                "aanswer": "a {text-decoration:none;}"
              },
              {
                "question": "How do you make each word in a text start with a capital letter?",
                "panswer": [
                  "You can't do that with CSS",
                  "text-transform:capitalize",
                  "text-transform:uppercase",
                  "font-style:uppercase"
                ],
                "aanswer": "text-transform:capitalize"
              },
              {
                "question": "Which property is used to change the font of an element?",
                "panswer": [
                  "Both font-family and font can be used",
                  "font",
                  "font-family",
                  "font-type"
                ],
                "aanswer": "Both font-family and font can be used"
              },
              {
                "question": "How do you make the text bold?",
                "panswer": [
                  "font-weight:bold;",
                  "font:bold;",
                  "style:bold;",
                  "font-bold:true"
                ],
                "aanswer": "font-weight:bold;"
              },
              {
                "question": "How do you display a border like this: The top border = 10 pixels, the bottom border = 5 pixels, the left border = 20 pixels, the right border = 1pixel?",
                "panswer": [
                  "border-width:10px 1px 5px 20px;",
                  "border-width:10px 5px 20px 1px;",
                  "border-width:5px 20px 10px 1px;",
                  "border-width:10px 20px 5px 1px;"
                ],
                "aanswer": "border-width:10px 1px 5px 20px;"
              },
              {
                "question": "Which property is used to change the left margin of an element?",
                "panswer": [
                  "margin-left",
                  "indent",
                  "padding-left",
                  "left-margin"
                ],
                "aanswer": "margin-left"
              },
              {
                "question": "How do you make a list that lists its items with squares?",
                "panswer": [
                  "list-style-type: square;",
                  "list-type: square;",
                  "list: square;",
                  "list: box"
                ],
                "aanswer": "list-style-type: square;"
              }
            ]
          }
        };
      case "php":
        return {
          "quiz": {
            "questionItem": [
              {
                "question": "How do you join strings together in PHP?",
                "panswer": [
                  "$var1 = 'a' + 'b';",
                  "$var1 = 'a'.'b';",
                  "$var1 = 'a' JOIN 'b';",
                  "$var1 = 'a'++'b';"
                ],
                "aanswer": "$var1 = 'a'.'b';"
              },
              {
                "question": "Which is NOT a valid assignement operator?",
                "panswer": [
                  "$a -= $a;",
                  "$a <= $a;",
                  "$a *= $a;",
                  "$a += $a;"
                ],
                "aanswer": "$a <= $a;"
              },
              {
                "question": "What is the difference between 'include' and 'require'?",
                "panswer": [
                  "Include only includes the HTML in the file, while require includes the PHP code too.",
                  "Require only includes the HTML in the file, while include imports the HTML and PHP code.",
                  "Require will stop executing as soon as an error is reached, and include will continue executing the code after the error.",
                  "Include will stop executing as soon as an error is reached, and require will continue executing the code after the error."
                ],
                "aanswer": "Require will stop executing as soon as an error is reached, and include will continue executing the code after the error."
              },
              {
                "question": "What keyword(s) can you use to add an alternative condition to an if statement that executes different code?",
                "panswer": [
                  "else if",
                  "and if",
                  "elif",
                  "or if"
                ],
                "aanswer": "else if"
              },
              {
                "question": "Which of these is not a valid statement?",
                "panswer": [
                  "if($a === '7') { }",
                  "if($a != 8) { }",
                  "if($a NEQ 8) { }",
                  "if(!$a) { }"
                ],
                "aanswer": "if($a NEQ 8) { }"
              },
              {
                "question": "Which is the correct way to start a function?",
                "panswer": [
                  "function testFunc()",
                  "function testFunc{}",
                  "function testFunc[]",
                  "def testFunc{}"
                ],
                "aanswer": "function testFunc()"
              },
              {
                "question": "Which of the following keywords is used to start a conditional in a PHP switch statement?",
                "panswer": [
                  "case",
                  "if",
                  "cond",
                  "condition"
                ],
                "aanswer": "case"
              },
              {
                "question": "Which of the following is a valid way to start a for loop in PHP that would print out the numbers 0 through 4?",
                "panswer": [
                  "for($i < 5; $i = 0;)",
                  "for($i = 0; $i < 5; $i++)",
                  "for($i < 5;)",
                  "for( $i < 5; $i = 0; $i++)"
                ],
                "aanswer": "for($i = 0; $i < 5; $i++)"
              },
              {
                "question": "How do you create an array?",
                "panswer": [
                  "$myArray = new array();",
                  "$myArray = Array.create();",
                  "$myArray = array();",
                  "$myArray = create(array);"
                ],
                "aanswer": "$myArray = array();"
              },
              {
                "question": "What keyword can you use to exit out of a loop and continue onto the next code after the loop?",
                "panswer": [
                  "exit();",
                  "continue",
                  "break",
                  "skip"
                ],
                "aanswer": "break"
              },
              {
                "question": "Which of the following variables can NOT be used to obtain the form data after a form is submitted?",
                "panswer": [
                  "$_FORMDATA",
                  "$_REQUEST",
                  "$_GET",
                  "$_POST"
                ],
                "aanswer": "$_FORMDATA"
              },
              {
                "question": "What function can you use to get the position of a string or character inside a string?",
                "panswer": [
                  "string_position",
                  "strrpos",
                  "len",
                  "length"
                ],
                "aanswer": "strrpos"
              },
              {
                "question": "What function can you use to break a string with a sentence into an array of words?",
                "panswer": [
                  "splice",
                  "array_split",
                  "break",
                  "explode"
                ],
                "aanswer": "explode"
              },
              {
                "question": "How would you open a file to read from it in PHP?",
                "panswer": [
                  "$myFile = fopen('r', 'sampleFile.txt');",
                  "$myFile = fopen('sampleFile.txt', 'r');",
                  "$myFile = open('sampleFile.txt', 'r');",
                  "$myFile = open('r', 'sampleFile.txt');"
                ],
                "aanswer": "$myFile = fopen('sampleFile.txt', 'r');"
              },
              {
                "question": "How would you read the first 20 characters of a file if the variable $a contains the link to the file?",
                "panswer": [
                  "$myFileContents = fread($a, 20);",
                  "$myFileContents = fread(20,$a);",
                  "$myFileContents = read(20,$a);",
                  "$myFileContents = read($a, 20);"
                ],
                "aanswer": "$myFileContents = fread($a, 20);"
              },
              {
                "question": "How do you write contents to a file?",
                "panswer": [
                  "output ('some content');",
                  "echo ('some content');",
                  "write('some content');",
                  "fwrite('some content');"
                ],
                "aanswer": "fwrite('some content');"
              },
              {
                "question": "What function do you use to delete a file in PHP?",
                "panswer": [
                  "delete()",
                  "fdelete()",
                  "unlink()",
                  "remove()"
                ],
                "aanswer": "unlink()"
              },
              {
                "question": "What function can you use to transfer an uploaded file to a new location?",
                "panswer": [
                  "transfer()",
                  "move_uploaded_file()",
                  "move_file()",
                  "transfer_file()"
                ],
                "aanswer": "move_uploaded_file()"
              },
              {
                "question": "PHP is an acronym for:",
                "panswer": [
                  "Pre Hypertext Processor",
                  "Post Hypertext Processor",
                  "PHP Hypertext Preprocessor",
                  "Post Hypertext Preprocessor"
                ],
                "aanswer": "PHP Hypertext Preprocessor"
              },
              {
                "question": "What type of language is PHP?",
                "panswer": [
                  "Client side",
                  "Server side",
                  "Windows side",
                  "Controller side"
                ],
                "aanswer": "Server side"
              },
              {
                "question": "Which of the following is a valid PHP script tag:",
                "panswer": [
                  "<PHP PHP>",
                  "<?php php?>",
                  "<php></php>",
                  "<?php ?>"
                ],
                "aanswer": "<?php ?>"
              },
              {
                "question": "Which of the following does NOT provide an output to the screen?",
                "panswer": [
                  "to_screen",
                  "echo",
                  "print_r",
                  "print"
                ],
                "aanswer": "to_screen"
              },
              {
                "question": "Which of the following is NOT a valid variable name in PHP?",
                "panswer": [
                  "$camelCase",
                  "$B_Y_E",
                  "$2cat",
                  "$something"
                ],
                "aanswer": "$2cat"
              },
              {
                "question": "Which of the following is NOT a PHP variable scope:",
                "panswer": [
                  "local",
                  "global",
                  "static",
                  "defined"
                ],
                "aanswer": "defined"
              },
              {
                "question": "Which is NOT true about integers in PHP?",
                "panswer": [
                  "An integer must have at least one digit (0-9)",
                  "An integer can contain comma or blanks",
                  "An integer must not have a decimal point",
                  "An integer can be either positive or negative"
                ],
                "aanswer": "An integer can contain comma or blanks"
              },
              {
                "question": "The strlen() function in PHP:",
                "panswer": [
                  "returns the length of a string, in characters",
                  "searchs for a specified character or text within a string",
                  "returns the number of words in a string",
                  "randomizes order of letters in a string"
                ],
                "aanswer": "returns the length of a string, in characters"
              },
              {
                "question": "The strpos() function in PHP:",
                "panswer": [
                  "returns the length of a string, in characters",
                  "returns the number of words in a string",
                  "randomizes order of letters in a string",
                  "searchs for a specified character or text within a string"
                ],
                "aanswer": "searchs for a specified character or text within a string"
              },
              {
                "question": "What function would you use to determine if a variable is empty?",
                "panswer": [
                  "is_null",
                  "check_value",
                  "empty",
                  "isset"
                ],
                "aanswer": "empty"
              },
              {
                "question": "What function counts the lenght of an array?",
                "panswer": [
                  "count",
                  "arr_sum",
                  "length",
                  "arr_length"
                ],
                "aanswer": "count"
              },
              {
                "question": "What would the following statement output to the screen: var str = \"Hello world!\"; var res = str.substr(1,4);",
                "panswer": [
                  "hello",
                  "rld!",
                  "o wor",
                  "ello"
                ],
                "aanswer": "ello"
              },
              {
                "question": "What function converts a string to all lowercase?",
                "panswer": [
                  "stringToLower",
                  "lowercase",
                  "lower",
                  "strtolower"
                ],
                "aanswer": "strtolower"
              },
              {
                "question": "What function prints human-readable information about a variable?",
                "panswer": [
                  "echo_r",
                  "print_r",
                  "arr_print",
                  "print_hr"
                ],
                "aanswer": "print_r"
              },
              {
                "question": "What would this output: echo(floor(-5.1)",
                "panswer": [
                  "6",
                  "-6",
                  "-5",
                  "5"
                ],
                "aanswer": "-6"
              },
              {
                "question": "What does the 'key' function do?",
                "panswer": [
                  "Computes the difference of arrays using keys for comparison",
                  "Pushes one or more elements onto the end of an array",
                  "Fetches the key of an array",
                  "Filters elements of an array using a callback function"
                ],
                "aanswer": "Fetches the key of an array"
              },
              {
                "question": "What function would rearrange an array backwards?",
                "panswer": [
                  "array_backward",
                  "array_reverse",
                  "array_rekey",
                  "array_diff"
                ],
                "aanswer": "array_reverse"
              },
              {
                "question": "Which function is used to return true if a given value exists in an array (and false if it doesn't)?",
                "panswer": [
                  "array_key_exists",
                  "has_value",
                  "array_value_exists",
                  "in_array"
                ],
                "aanswer": "has_value"
              }
            ]
          }
        };
      case "jquery":
        return {
          "quiz": {
            "questionItem": [
              {
                "question": "Which does jQuery use as a shortcut for jQuery?",
                "panswer": [
                  "the % sign",
                  "the ? Sign",
                  "the $ sign",
                  "the jQ sign"
                ],
                "aanswer": "the $ sign"
              },
              {
                "question": "With jQuery, look at the following selector: $('div'). What does it select?",
                "panswer": [
                  "All div elements",
                  "The first div element",
                  "The last div element",
                  "nothing"
                ],
                "aanswer": "All div elements"
              },
              {
                "question": "jQuery is a library for:",
                "panswer": [
                  "home scripting",
                  "server scripting",
                  "TPS scripting",
                  "client scripting"
                ],
                "aanswer": "client scripting"
              },
              {
                "question": "What code sets all 'p' elements background color to red?",
                "panswer": [
                  "$('p').css('background-color','red');",
                  "$('p').style('background-color','red');",
                  "$('p').layout('background-color','red');",
                  "$('p').manipulate('background-color','red');"
                ],
                "aanswer": "$('p').css('background-color','red');"
              },
              {
                "question": "With jQuery, look at the following selector: $('div.intro'). What does it select?",
                "panswer": [
                  "All div elements with class='intro'",
                  "The first div element with class='intro'",
                  "All div elements with id='intro'",
                  "The first div element with id='intro'"
                ],
                "aanswer": "All div elements with class='intro'"
              },
              {
                "question": "Which jQuery method is used to hide selected elements?",
                "panswer": [
                  "visible(false)",
                  "hidden()",
                  "hide()",
                  "display(none)"
                ],
                "aanswer": "hide()"
              },
              {
                "question": "Which jQuery method is used to set one or more style properties for selected elements?",
                "panswer": [
                  "html()",
                  "style()",
                  "css()",
                  "styles()"
                ],
                "aanswer": "css()"
              },
              {
                "question": "Which jQuery method is used to perform an asynchronous HTTP request?",
                "panswer": [
                  "jQuery.ajax()",
                  "jQuery.ajaxAsync()",
                  "jQuery.ajaxSetup()",
                  "jQuery.AJAX()"
                ],
                "aanswer": "jQuery.ajax()"
              },
              {
                "question": "What is the correct jQuery code for making all div elements 100 pixels high?",
                "panswer": [
                  "$('div').yPos(100)",
                  "$('div').height(100)",
                  "$('div').height='100'",
                  "$('div').xPos(100)"
                ],
                "aanswer": "$('div').height(100)"
              },
              {
                "question": "Which is true:",
                "panswer": [
                  "To use jQuery, you do not have to do anything. Most browsers (Internet Explorer, Chrome, Firefox and Opera) have the jQuery library built in the browser",
                  "To use jQuery, you can refer to a hosted jQuery library at Google",
                  "To use jQuery, you must buy the jQuery library at www.jquery.com",
                  "jQuery is built into core Javascript"
                ],
                "aanswer": "To use jQuery, you can refer to a hosted jQuery library at Google"
              },
              {
                "question": "What scripting language is jQuery written in?",
                "panswer": [
                  "Javascript",
                  "C#",
                  "C++",
                  "VBScript"
                ],
                "aanswer": "Javascript"
              },
              {
                "question": "Which jQuery function is used to prevent code from running, before the document is finished loading?",
                "panswer": [
                  "$(document).load()",
                  "$(document).ready()",
                  "$(body).onload()",
                  "$(body).ready()"
                ],
                "aanswer": "$(document).ready()"
              },
              {
                "question": "Which jQuery method should be used to deal with name conflicts?",
                "panswer": [
                  "conflict()",
                  "noConflict()",
                  "noNameConflict()",
                  "nameConflict()"
                ],
                "aanswer": "noConflict()"
              },
              {
                "question": "Which jQuery method is used to switch between adding/removing one or more classes (for CSS) from selected elements?",
                "panswer": [
                  "switch()",
                  "switchClass()",
                  "toggleClass()",
                  "altClass()"
                ],
                "aanswer": "toggleClass()"
              },
              {
                "question": "Look at the following jQuery selector: $('div#intro .head'). What does it select?",
                "panswer": [
                  "All div elements with id='intro' or class='head'",
                  "All elements with class='head' inside the first div element with id='intro'",
                  "The first element with id='head' inside any div element with class='intro'",
                  "All div elements with a parent of 'head'"
                ],
                "aanswer": "All elements with class='head' inside the first div element with id='intro'"
              }
            ]
          }
        }
    }
  }
});