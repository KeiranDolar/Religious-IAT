define(['questAPI'], function(Quest){
	var API = new Quest();
	
/**
	Settings
	**/
	API.addSettings('logger', 
	{
		url: '/implicit/PiQuest'
	});

    API.addQuestionsSet('basicQ',{
		autoSubmit:true,
		decline: true, 
		required: true,
		help: '<%= pagesMeta.number < 3 %>'
	});
	
	API.addQuestionsSet('basicSelect', 
	{
		inherit:'basicQ',
		type:'text'
	});

	// ### Questions-pp list 3 likes
	API.addQuestionsSet({
		enter1 : [{
		    inherit: 'basicSelect',
			stem: 'Please indicate the name of an object you particularly <b><%=questionsData.feel%></b>',
			required: true
		}],
		enter2 : [{
		    inherit: 'basicSelect',
			stem: 'Please indicate the name of another object you particularly <b><%=questionsData.feel%></b>',
			required: true
		}],
		enter3 : [{
		    inherit: 'basicSelect',
			stem: 'Please indicate the name of a third object you particularly <b><%=questionsData.feel%></b>',
			required: true
		}],
		enter12 : [{
			inherit: 'basicSelect',
			name:'like12',
			stem: 'Please write the name of the same object one more time, to avoid any typos ',
			required: true
		}]
	});

	API.addQuestionsSet({
		like1 : [{
		    inherit: 'enter1',
			name:'like1',
			data: {feel:'like'}
		}],
		like12 : [{
		    inherit: 'enter12',
			name:'like12'
		}],
		like2 : [{
		    inherit: 'enter2',
			name:'like2',
			data: {feel:'like'}
		}],
		like22 : [{
		    inherit: 'enter12',
			name:'like22'
		}],
		like3 : [{
		    inherit: 'enter3',
			name:'like3',
			data: {feel:'like'}
		}],
		like32 : [{
		    inherit: 'enter12',
			name:'like32'
		}]
	});
	// ### Questions-pp list 3 dislikes
	API.addQuestionsSet({
		dislike1 : [{
		    inherit: 'enter1',
			name:'dislike1',
			data: {feel:'dislike'}
		}],
		dislike12 : [{
		    inherit: 'enter12',
			name:'dislike12'
		}],
		dislike2 : [{
		    inherit: 'enter2',
			name:'dislike2',
			data: {feel:'dislike'}
		}],
		dislike22 : [{
		    inherit: 'enter12',
			name:'dislike22'
		}],
		dislike3 : [{
		    inherit: 'enter3',
			name:'dislike3',
			data: {feel:'dislike'}
		}],
		dislike32 : [{
		    inherit: 'enter12',
			name:'dislike32'
		}]
	});

	
    /**
	    Pages
	**/
	API.addPagesSet('basicPage',{
		noSubmit:false, 
		v1style: 2,
		decline: false,
		progressBar: 'Page <%= pagesMeta.number %> out of 6',
        pageValidationText:'Typo: the item should be typed exactly the same in both times.'
	});
	
	
	// ### Sequence
	API.addSequence(
	[
	    {
	        mixer: 'random',//randomize likes and dislikes
	        data:
    	    [
    	        { 
    	            mixer:'wrapper',
    	            data: 
    	            [
    	                {
    	                    inherit:'basicPage', 
    	                    questions: [
    	                        {inherit:'like1'}, 
    	                        {inherit:'like12'}
    	                    ],
                            pageValidation: function(){
                                var questions = API.getCurrent().questions;
                                return questions.like1.response==questions.like12.response;
                            }
                        },
    	                {
    	                    inherit:'basicPage', 
    	                    questions: [
    	                        {inherit:'like2'}, 
    	                        {inherit:'like22'}
    	                    ],
                            pageValidation: function(){
                                var questions = API.getCurrent().questions;
                                return questions.like2.response==questions.like22.response;
                            }
                        },
    	                {
    	                    inherit:'basicPage', 
    	                    questions: [
    	                        {inherit:'like3'}, 
    	                        {inherit:'like32'}
    	                    ],
                            pageValidation: function(){
                                var questions = API.getCurrent().questions;
                                return questions.like3.response==questions.like32.response;
                            }
                        }
            	   ]
    	        },
    	        { 
    	            mixer:'wrapper',
    	            data: 
    	            [
    	                {
    	                    inherit:'basicPage', 
    	                    questions: [
    	                        {inherit:'dislike1'}, 
    	                        {inherit:'dislike12'}
    	                    ],
                            pageValidation: function(){
                                var questions = API.getCurrent().questions;
                                return questions.dislike1.response==questions.dislike12.response;
                            }
                        },
    	                {
    	                    inherit:'basicPage', 
    	                    questions: [
    	                        {inherit:'dislike2'}, 
    	                        {inherit:'dislike22'}
    	                    ],
                            pageValidation: function(){
                                var questions = API.getCurrent().questions;
                                return questions.dislike2.response==questions.dislike22.response;
                            }
                        },
    	                {
    	                    inherit:'basicPage', 
    	                    questions: [
    	                        {inherit:'dislike3'}, 
    	                        {inherit:'dislike32'}
    	                    ],
                            pageValidation: function(){
                                var questions = API.getCurrent().questions;
                                return questions.dislike3.response==questions.dislike32.response;
                            }
                        }
            	   ]
    	        }
    	   ]
	    }
    ]);
	/**
	Return the script to piquest's god, or something of that sort.
	**/
	return API.script;
});


