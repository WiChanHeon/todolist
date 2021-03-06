(function (window) {
    'use strict';

	// todo count
	function calTodoCount() {
	   	var todoCountStrong = $(".todo-list").children().length;
	   	todoCountStrong = todoCountStrong - $(".completed").length;
	    	
	   	$(".todo-count-strong").text(todoCountStrong);
	}

	//todo list get / count
	$.ajax({
	    url : "/api/todos",
	    type: "get",
	    success : function(todoList) {
	    	var todoListItem = $(".todo-list").first();
	    	var todoCount = todoList.length;
			//alert(todoCount);
	    	for(var i=0; i<todoList.length; i++) {
	    		var li = "<li id='notCompleted'>";
	    		if(todoList[i].completed=='1') {
	    			li = "<li id='completed' class='completed'>";
	    			todoCount = todoCount - 1;
	    		}
		    	todoListItem.prepend(
		    			li +
		    				"<div class='view' id='" + todoList[i].id + "'>" +
		    					"<input class='toggle' type='checkbox'>" +
		    					"<label>" + todoList[i].todo + "</label>" +
		    					"<button class='destroy'></button>" +
		    				"</div>" +
		    				"<input class='edit' value='Rule the web'>" +
		    			"</li>");	
	    	}
	    	$(".todo-count-strong").text(todoCount);
			
	    }
	});
    
	// todo insert
   $(".new-todo").on("keypress", function (e) {
	   var value = $(".new-todo").val();
        var data = {
            'id': '',
            'todo': '',
            'completed': '',
            'date': ''
        };
        if (e.keyCode == 13 && value != null && value != "") {

            data.todo = $(this).val();
            if (data.todo === '')
                return;
            data.completed = 0;
            data.date = new Date();
            $.ajax({
                type: 'POST',
                url: '/api/todos',
                contentType: "application/json",
                data: JSON.stringify(data),
                dataType: 'JSON',
                error: function (xhr, status, error) {
                    alert(error);
                },
                success: function (ndata) {
                    $(".todo-list").prepend(
						"<li id='notCompleted'>" + 
						'<div class="view">' + 
						'<input class="toggle" type="checkbox">' + 
						'<label>' + ndata.todo + '</label>' + 
						'<button class="destroy">' + '</button>' + 
						'</div>' + 
						'<input class="edit" value=' + ndata.id + '>' + 
						'</li>');
                }
            });
        }
		calTodoCount();
    });
	
	//toggle checkbox
    $(document).on('click', '.toggle', function (e) {
        var curr = $(this);
        if ($(this).is(':checked')) {
            $.ajax({
                type: 'put',
                url: '/api/todos/' + $(this).parent().attr("id"),
                contentType: "application/json",
                data: JSON.stringify({
                    'completed': 1
                }),
                success: function () {
                    curr.parents('li').addClass('completed');
                }
            });
        } else {
            $.ajax({
                type: 'put',
                url: '/api/todos/' + $(this).parent().attr("id"),
                contentType: "application/json",
                data: JSON.stringify({
                    'completed': 0
                }),
                success: function () {
                    curr.parents('li').removeClass();
                }
            });

        }
    });
    
	//todo delete
	$(".todo-list").on("click", ".destroy", function(){
		$.ajax({
		    url : "/api/todos/"+$(this).parent().attr("id"),
		    type: "delete",
		    success : function() {
		    }
		});
    	$(this).parent().parent().remove();
    	calTodoCount();
	});

	// All filter
	$("#all-todo").on("click", function(){
		$("[id=completed]").show();
		$("[id=notCompleted]").show();
		
		$(".selected").removeClass("selected");
		$("#all-todo").addClass("selected");
	});

	// Active filter
	$("#active-todo").on("click", function(){
		$("[id=completed]").hide();
		$("[id=notCompleted]").show();
		
		$(".selected").removeClass("selected");
		$("#active-todo").addClass("selected");
	});
	
	// Completed filter
	$("#completed-todo").on("click", function(){
		var urlValue = "completed/";
		var lenChkToggle = $(".toggle:checked").length;
		if (lenChkToggle > 0) {
			$(".toggle:checked").each(function(){
				urlValue = urlValue + "$" + $(this).parent().attr("id");
				$(this).parent().parent().addClass("completed");
				$(this).parent().parent().attr("id", "completed");
				$(this).prop("checked", false);
			});
			$.ajax({
				url : urlValue,
	      	    type: "put"
			});
		}
		else {
			$("[id=completed]").show();
			$("[id=notCompleted]").hide();
	    	  
			$(".selected").removeClass("selected");
			$("#completed-todo").addClass("selected");
		}
	});

	// Completed delete
    $('.footer').on('click', '.clear-completed', function() {
        deleteCompleted();
    });	
	
    function deleteCompleted() {
        $.ajax({
            method: 'DELETE',
            url: '/api/todos/completed/',
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                var completedList = $('.todo-list').children('li.completed')

                completedList.remove();
            },
            error: function() {
                alert('failed clear-completed');
            }
        });
    }

})(window);