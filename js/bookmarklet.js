/* Final project */

$(document).ready(function(){

	/**
    * Add JQuery if bookmarklet
    **/
    if (window.jQuery === undefined) {
    	scriptElement=document.createElement('script');
    	scriptElement.src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
    	document.body.appendChild(scriptElement);
    }

    /**
    * Wait until JQuery is loaded before setup
    **/
    function waitForJQuery() {
    	if (window.jQuery !== undefined) {
    		createDataWidget();
    	} else {
    		setTimeout(function() {  waitForJQuery() }, 300);
    	}
    }
    waitForJQuery();
    
     /**
     * Make Canvas for highlighting fields
     **/
     var canvas = document.createElement('canvas'); 
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
     canvas.style.position='fixed';
     canvas.style.left=0;
     canvas.style.top=0;
     canvas.style.zIndex=9999999998;
     canvas.style.pointerEvents='none';
     document.body.appendChild(canvas); 
     var context = canvas.getContext('2d');

     function drawHighlight(element){
     	context.strokeStyle = 'yellow';
     	context.lineWidth = 5;
     	var elementDomRect = element.getBoundingClientRect();
     	var x = elementDomRect['left'];
     	var y = elementDomRect['top'];
     	var width = elementDomRect['width'];
     	var height = elementDomRect['height'];
     	context.strokeRect(x, y, width, height);
     	context.stroke();
     	setTimeout(function() { context.clearRect(0, 0, canvas.width, canvas.height); }, 600);
     }


     function createDataWidget(){
        /**
        * Create window
        **/
        var mydiv = document.createElement('div');
        mydiv.style = 'color: white; background: #cdd2d8; padding: 14px; border-radius: 3px; line-height: 1.45em; font-size: 14px; font-family: arial; position: fixed; width: 300px;z-index:9999999999;right: 10px; top: 10px;border-radius: 5px; box-shadow: 0 0 10px 0 #888888;text-align: left;';
        document.body.appendChild(mydiv);

        var span1 = document.createElement('span');
        span1.innerHTML = '<b>Select Data:</b> ';
        mydiv.appendChild(span1);

        /**
        * Select list data
        **/
        var data = [
        {val : '1;DROP TABLE users', text: 'SQL Injection'},
        {val : 'ThisisareallylongstringwithnobreaksThisisareallylongstringwithnobreaksThisisareallylongstringwithnobreaksThisisareallylongstringwithnobreaksThisisareallylongstringwithnobreaksThisisareallylongstringwithnobreaksThisisareallylongstringwithnobreaksThisisareallylongstringwithnobreaksThisisareallylongstringwithnobreaksThisisareallylongstringwithnobreaksThisisareallylongstringwithnobreaksThisisareallylongstringwithnobreaksThisisareallylongstringwithnobreaksThisisareallylongstringwithnobreaksThisisareallylongstringwithnobreaks', text: 'Long string no breaks (525 chars)'},
        {val : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Collatio igitur ista te nihil iuvat. Si est nihil nisi corpus, summa erunt illa: valitudo, vacuitas doloris, pulchritudo, cetera Lorem ipsum dolor sit amet, consectetur adipiscing elit. Collatio igitur ista te nihil iuvat. Si est nihil nisi corpus, summa erunt illa: valitudo, vacuitas doloris, pulchritudo, cetre', text: 'Long string with breaks (370 chars)'},
        {val : '<b>this is bolded text</b>', text: 'HTML Injection'}, 
        {val : '%uD83D%uDE03', text: 'Emoji'},
        {val : '%3E%3Cscript%3Ealert%28123%29%3C/script%3E', text: 'JS Injection'},
        {val : '%28%uFF61%u25D5%20%u2200%20%u25D5%uFF61%29', text: 'Unicode'},
        {val : 'NULL', text: 'Null'},
        {val : 'NaN', text: 'NaN'},
        {val : '999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999', text: 'Huge Number'},
        {val : '-9223372036854775808/-1', text: 'Negative number'},
        {val : '%21@%23%24%25%5E%26*%28%29%60%7E', text: 'Symbols'},

        ];

        /**
        * Create select list
        **/
        var selection = $('<select>').appendTo(mydiv);
        $(data).each(function() {
        	selection.append($('<option>').attr('value',this.val).text(this.text));
        });
        $(selection).attr('id', 'mySelectList');
        
        /**
        * Help text
        **/
        var span2 = document.createElement('span');
        span2.innerHTML = '<br><b>Click input to fill.</b> ';
        mydiv.appendChild(span2);

        /**
        * On click, highlight and set value if element is input type
        **/
        $(document).click(function(event) {

        	if (event.target.tagName == 'INPUT') {
        		drawHighlight(event.target);
        		var value = mySelectList.value;
        		event.target.value=unescape(value);
        		var fieldName = '';
        		if (event.target.title) {
        			fieldName = event.target.title;
        		} else if (event.target.name) {
        			fieldName = event.target.name;
        		} else {
        			fieldName = event.target.className;
        		}
        		span2.innerHTML = '<br><b>Selected Element:</b> ' + fieldName;
        		span2.style = 'color: green';

        	} else {
        		span2.innerHTML = '<br>Selected element is not an input field';
        		span2.style = 'color: orange';
        	}
        })

      /**
      ** Form Validation
      **/
      $('#testForm').submit(function (e) {
      	var pattern = /\W/g; 
      	var elements = document.getElementById('testForm').elements;
      	for (var i=0; i< elements.length; i++){
      		if (elements[i].value) {
      			if (elements[i].value.length > 30) {
      				alert(elements[i].name + ' is too long');
      				e.preventDefault(); 
      			} 
      			if (elements[i].value.match(pattern)) {
      				alert(elements[i].name + ' contains invalid characters');
      				e.preventDefault(); 
      			}
      		}    
      	}    
      });

  }
});



