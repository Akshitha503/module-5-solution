$(function () {

	$("#navbarToggle").blur(function (event) {
       var screenWidth = window.innerWidth;
       if (screenWidth < 768) {
          $("#collapsable-nav").collapse('hide');
       }
		
	});
});

(function(global) {

	var c = {};

	var homeHtml = "snippets/home-snippets.html";

	var insertHtml = function (selector,html) {
		var targetElem = document.querySelector(selector);
		targetElem.innerHTML = html;
	};

	var showLoading = function (selector) {
		var html = "<div class='text-cente'>";
		html += "<img src='images/ajax-loader.gif'></div>";
		insertHtml(selector, html);
	}; 

	var insertProperty = function (string, propName, propValue) {
		var propToReplace = "{{" + propName +"}}";
		string = string.replace(new RegExp(propToReplace, "g"),propValue);
		return string;
	}


	var switchMenuToActive = function() {
		var classes = document.querySelector("#navHomeButton").className;
		classes = classes.replace(new RegExp("active","g"), "");
		document.querySelector("#navHomeButton").className = classes;

		classes = document.querySelector("#navMenuButton").className;
		if (classes.indexOf("active") == -1) {
			classes = "active";
			document.querySelector("#navMenuButton").className = classes;
		}
	};

	document.addEventListener("DOMContentLoaded",function(event) {
		showLoading("#main-content");
		$ajax.sendGetRequest(
			homeHtml,
			function (responseText) {
				document.querySelector("#main-content")
				.innerHTML = responseText;
			},
			true);
		});

	c.loadMenuCategories = function () {
		showLoading("#main-content");
		$ajax.sendGetRequest(allCategoriesUrl,buildAndShowCategoriesHTML);
	};

	function buildAndShowCategoriesHTML (categories) {
		$ajax.sendGetRequest(categoriesTitleHtml,
			function (categoriesTitleHtml){
				$ajax.sendGetRequest (categoryHtml,
					function (categoryHtml) {
						var categoriesViewHtml = 
						buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryHtml);
						insertHtml("#main-content", categoriesViewHtml);
					},
					false);
			},
			false) ;

	}


	function buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryHtml) {
		var finalHtml = categoriesTitleHtml;
		finalHtml += "<section class='row'>";

		for (var i =0; i<categories.length; i++) {
			var html = categoryHtml;
			var name = "" + categories[i].name;
			var short_name = categories[i].short_name;
			html =
			   insertProperty(html, "name", name);
			html = 
			   insertProperty(html, "short_name", short_name);
			   finalHtml += html;
		}
		finalHtml += "</section>";
		return finalHtml;
	}


	global.$c = c;
	
})(window);