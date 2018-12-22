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


     function createDataWidget(){
        /**
        * Create window
        **/
        var mydiv = document.createElement('div');
        mydiv.style = 'color: white; background: #527a7a; padding: 14px; border-radius: 3px; line-height: 1.45em; font-size: 14px; font-family: arial; position: fixed; width: 300px;z-index:9999999999;right: 10px; top: 10px;border-radius: 5px; box-shadow: 0 0 10px 0 #888888;text-align: left;';
        document.body.appendChild(mydiv);
        $(mydiv).attr('id', 'myDiv');

        var span1 = document.createElement('span');
        span1.innerHTML = '<b>Select data and click input to fill.</b><br> ';
        mydiv.appendChild(span1);

        /**
        * Select list data
        * Strings provided by https://github.com/minimaxir/big-list-of-naughty-strings
        **/
        
        var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan vestibulum neque nullam.";

        //first option needs to be the long string
        var data = [
        {val : lorem, text: 'Long string'},
        {val : '1;DROP TABLE users', text: 'SQL Injection'},
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

        
        var selection = $('<select>').appendTo(mydiv);
        $(data).each(function() {
        	selection.append($('<option>').attr('value',this.val).text(this.text));
        });
        $(selection).attr('id', 'mySelectList');


        var $label1 = $("<label for='byte'>").text('Bytes: ');
        var $label2 = $("<label for='breaks'>").text(' Word Breaks: ');

        $(mydiv).append('<form id="myQAForm90u09u">');
        $("#myDiv form").append($label1);
        $("#myDiv form").append('<input type="text" value="100" name="Characters" id="byteSelect" style="width: 50px;"/>');
        $("#myDiv form").append($label2);
        $("#myDiv form").append('<input type="checkbox" id="breaks" name="Word breaks" checked />');


        $('#byteSelect, #breaks').change(function(){
            var num = $('#byteSelect').val();
            var spaces = $('#breaks').prop('checked');
            var newString = lorem;
            if (!spaces) {
                newString = lorem.replace(/[\s,\.]+/g, '');
            } 
            while (newString.length < num) {
                newString = newString + newString;
            }
            $('#mySelectList option:first-child').val(newString.substring(0,num));

        });

        $(mySelectList).change(function(event) {
            if (mySelectList.selectedOptions[0].text == 'Long string') {
                $('#myQAForm90u09u').show();
                    var value = mySelectList.value;
                    event.target.value=unescape(value);
            } else {
                $('#myQAForm90u09u').hide();
            }
        });

        $(document).click(function(event) {
        	if (event.target.tagName == 'INPUT' && event.target.parentElement.id != 'myQAForm90u09u') {
        		var value = mySelectList.value;
        		event.target.value=unescape(value);
        	}
        })

  }
});



