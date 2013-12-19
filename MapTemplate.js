window.MapTemplate = (function () {
	var MapTemplate = {

		createMap: function(center, zoom, url, options){
			var map = L.map('map').setView(center, zoom);

			L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
	    		maxZoom: 18
			}).addTo(map);
			
			return map;
		},

		createSidePanel: function(widthPercentage, backgroundColor, title){
			$('#sidePanel').css("width", widthPercentage+"%");
			$('#sidePanel').css("margin-left", (100-widthPercentage)+"%");
			$('#map').css("width", (100-widthPercentage)+"%");
			$('#sidePanel').css("background-color", backgroundColor);

			$('#sidePanel').html("<center><h1>"+title+"</h1></center><div class='panel'>This is a test of a well</div>");

			return $('#sidePanel').html();
		}

	};

	return MapTemplate;
}());