setTimeout(function(){

var users = $("[name=notifiedUserIds]").eq(0).find("option"),
	handler="<p class='label'><a href='#' style='font-weight:normal' data-js-toggle>AddUser+</a></p>",
	html="<ul data-js-toggleTarget style='display:none;max-height:200px;overflow:scroll'>";

users.each(function(){
	html+="<li class='search-choice' style='width:33%;float:left;'><label><input type='checkbox' data-js-setUser='"+$(this).text()+"'><img src='"+$(this).attr("icon")+"' class='chosen-icon'>"+$(this).text()+"</label></li>";
});

html+="</ul>"

$(document).on("change","[data-js-setUser]",function(){
	setSelect($(this).attr("data-js-setUser"),$(this).prop('checked'));
}).on("click","[data-js-toggle]",function(){
	$("[data-js-toggleTarget]").slideToggle();
	return false;
}).on("change","[name=notifiedUserIds]:eq(0)",function(){
	console.log("changeUSer");
	setRadio();
});

$("#editArea").before(handler);
$("#notifiedUsersLeft").prepend(html)

var setRadioTimer;
function setRadio(user,state){
	if(setRadioTimer)clearTimeout(setRadioTimer);
	setRadioTimer = setTimeout(function(){
		users.each(function(){
			$("[data-js-setUser='"+$(this).text()+"']").prop('checked',$(this).prop('selected'));
		});
	},1000);
}
function setSelect(user,state){
	console.log("setSelect",user,state)
	var userList =[];
	users.each(function(){
		if($(this).text() === user){
			$(this).prop('selected',state).change();
		}
		if($(this).prop('selected')){
			userList.push($(this).text());
		}
	});
	localStorage.setItem("userList",JSON.stringify(userList));
}
function init(){
	var userList = JSON.parse(localStorage.getItem("userList"));
	for(var i=0;i<userList.length;i++){
		setSelect(userList[i],true);
	}
}
if($("#leftCommentContent").val()==""){
	init();
}
},3000);
