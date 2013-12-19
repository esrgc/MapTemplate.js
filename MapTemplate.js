window.MapTemplate = (function () {
	function MT(){
		this.map;
		this.sidePanel;
		this.panel = new Array();
		componentIDCount = 0;
	}

	var MapTemplate = {

		createMap: function(center, zoom, url, options){
			MT();

			this.map = L.map('map').setView(center, zoom);

			L.tileLayer(url, options).addTo(this.map);
			
			return this.map;
		},

		createSidePanel: function(widthPercentage, backgroundColor, title){
			$('#sidePanel').css("width", widthPercentage+"%");
			$('#sidePanel').css("margin-left", (100-widthPercentage)+"%");
			$('#map').css("width", (100-widthPercentage)+"%");
			$('#sidePanel').css("background-color", backgroundColor);

			$('#sidePanel').html("<center><h1>"+title+"</h1></center>");

			this.sidePanel = $('#sidePanel').html();
			return this.sidePanel;
		},

		createPanel: function(title){
			var p = "<div class='panel' id='panel" + (panel.length+1) + "'><h3><center>" + title + "</center></h3></div>";
			this.sidePanel += p;
			$('#sidePanel').html(this.sidePanel);
			return panel.push(p);
		},

		createDropdown: function(panelID, obj, callback){
			var dropdown = "<center><div class='btn-group btn-group-dropdown'><button data-toggle='dropdown' class='btn dropdown-toggle'>" + obj.title + " <span class='caret'></span></button><ul class='dropdown-menu' id='component" + componentIDCount + "'>";
			for(var i=0; i<obj.selections.length; i++){
				dropdown += "<li><a href='#'>" + obj.selections[i] + "</a></li>";
			}
			dropdown += "</ul></div></center>";

			$("#panel" + panelID).append(dropdown);

			$('.dropdown-toggle').dropdown();

			$('#component' + componentIDCount + ' li a').on('click', callback);
			componentIDCount++;
			sidePanel = $("#sidePanel").html();
		}

	};

	return MapTemplate;
}());