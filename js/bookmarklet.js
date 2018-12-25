/* Final project */

$(document).ready(function() { 

    if (window.jQuery === undefined) {
        var done = false;
        var script = document.createElement("script");
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                done = true;
                createBookmarklet();
            }
        };
        document.getElementsByTagName('head')[0].appendChild(script);
    } else {
        createBookmarklet();
    }

    function createBookmarklet(){
       
        var mydiv = document.createElement('div');
        mydiv.style = 'color: white; background: #527a7a; padding: 14px; border-radius: 3px; line-height: 1.45em; font-size: 14px; font-family: arial; position: fixed; width: 300px;z-index:9999999999;right: 10px; top: 10px;border-radius: 5px; box-shadow: 0 0 10px 0 #888888;text-align: left;';
        document.body.appendChild(mydiv);
        $(mydiv).attr('id', 'myDiv');

        var span1 = document.createElement('span');
        span1.innerHTML = '<b>Select data and click input to fill.</b><br> ';
        mydiv.appendChild(span1);


        var lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan vestibulum neque nullam.';

        var data = [
        {val : lorem, text: 'Long string'},
        {val : '%uD83D%uDE03%uD83D%uDE03%uD83D%uDE03%uD83D%uDE03%uD83D%uDE03', text: 'Emoji'},
        {val : '%3E%3Cscript%3Ealert%28123%29%3C/script%3E', text: 'JS Injection'},
        {val : '1;DROP TABLE users', text: 'SQL Injection'},
        {val : '<b>this is bolded text</b>', text: 'HTML Injection'}, 
        {val : '%28%uFF61%u25D5%20%u2200%20%u25D5%uFF61%29%AF_%28%u30C4%29_/%AF***%28%uFF89%u0CA5%u76CA%u0CA5%uFF09%uFF89%uFEFF%20%u253B%u2501%u253B', 
         text: 'Unicode'},
        {val : 'NULL', text: 'Null'},
        {val : 'NaN', text: 'NaN'},
        {val : '999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999', text: 'Big Number'},
        {val : '-9223372036854775808/-1', text: 'Negative number'},
        {val : '%21@%23%24%25%5E%26*%28%29%60%7E', text: 'Symbols'},
        {val : '%u0645%u064F%u0646%u064E%u0627%u0642%u064E%u0634%u064E%u0629%u064F%20%u0633%u064F%u0628%u064F%u0644%u0650%20%u0627%u0650%u0633%u0652%u062A%u0650%u062E%u0652%u062F%u064E%u0627%u0645%u0650%20%u0627%u0644%u0644%u0651%u064F%u063A%u064E%u0629%u0650%20%u0641%u0650%u064A%20%u0627%u0644%u0646%u0651%u064F%u0638%u064F%u0645%u0650%20%u0627%u0644%u0652%u0642%u064E%u0627%u0626%u0650%u0645%u064E%u0629%u0650%20%u0648%u064E%u0641%u0650%u064A%u0645%20%u064A%u064E%u062E%u064F%u0635%u0651%u064E%20%u0627%u0644%u062A%u0651%u064E%u0637%u0652%u0628%u0650%u064A%u0642%u064E%u0627%u062A%u064F%20%u0627%u0644%u0652%u062D%u0627%u0633%u064F%u0648%u0628%u0650%u064A%u0651%u064E%u0629%u064F%u060C%20',
         text: 'Arabic/Hebrew'},
        {val : '%uD835%uDD4B%uD835%uDD59%uD835%uDD56%20%uD835%uDD62%uD835%uDD66%uD835%uDD5A%uD835%uDD54%uD835%uDD5C%20%uD835%uDD53%uD835%uDD63%uD835%uDD60%uD835%uDD68%uD835%uDD5F%20%uD835%uDD57%uD835%uDD60%uD835%uDD69%20%uD835%uDD5B%uD835%uDD66%uD835%uDD5E%uD835%uDD61%uD835%uDD64%20%uD835%uDD60%uD835%uDD67%uD835%uDD56%uD835%uDD63%20%uD835%uDD65%uD835%uDD59%uD835%uDD56%20%uD835%uDD5D%uD835%uDD52%uD835%uDD6B%uD835%uDD6A%20%uD835%uDD55%uD835%uDD60%uD835%uDD58',
          text: 'Unicode font'},
        {val : "%u0401%u0402%u0403%u0404%u0405%u0406%u0407%u0408%u0409%u040A%u040B%u040C%u040D%u040E%u040F%u0410%u0411%u0412%u0413%u0414%u0415%u0416%u0417%u0418%u0419%u041A%u041B%u041C%u041D%u041E%u041F%u0420%u0421%u0422%u0423%u0424%u0425%u0426%u0427%u0428%u0429%u042A%u042B%u042C%u042D%u042E%u042F%u0430%u0431%u0432%u0433%u0434%u0435%u0436%u0437%u0438%u0439%u043A%u043B%u043C%u043D%u043E%u043F%u0440%u0441%u0442%u0443%u0444%u0445%u0446%u0447%u0448%u0449%u044A%u044B%u044C%u044D%u044E%u044F",
          text: "More unicode!"
        }  
        ];

        var selection = $('<select>').appendTo(mydiv);
        $(data).each(function() {
        	selection.append($('<option>').attr('value',this.val).text(this.text));
        });
        $(selection).attr('id', 'mySelectList');

        var $label1 = $('<label for="byte">').text('Bytes: ');
        var $label2 = $('<label for="breaks">').text(' Word Breaks: ');

        $(mydiv).append('<form id="myQAForm90u09u">');
        $('#myDiv form').append($label1);
        $('#myDiv form').append('<input type="text" value="100" name="bytes" id="byteSelect" style="width: 50px;"/>');
        $('#myDiv form').append($label2);
        $('#myDiv form').append('<input type="checkbox" id="breaks" name="Word breaks" checked />');


        $('#byteSelect, #breaks').change(function(){
            var num = $('#byteSelect').val();
            var limit = $.isNumeric(num) ? num : 100;
            var newString = lorem;
            if (!$('#breaks').prop('checked')) {
                newString = lorem.replace(/[\s,\.]+/g, '');
            }
            while (newString.length < limit) {
                newString = newString + newString;
            }
            $('#mySelectList option:first-child').val(newString.substring(0,limit));
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



