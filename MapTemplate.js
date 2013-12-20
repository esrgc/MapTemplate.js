var MapTemplate = new MapTemplate();

function MapTemplate(){
	this.createMap = function(center, zoom, url, options){
		var map = new Map();
		return map.createMap(center, zoom, url, options);
	};

	this.createSidePanel = function(widthPercentage, backgroundColor, title){
		var sidePanel = new SidePanel();
		return sidePanel.createSidePanel(widthPercentage, backgroundColor, title);
	};
}

function Map(){
	this.map;

	this.createMap = function(center, zoom, url, options){
		this.map = L.map('map').setView(center, zoom);

		L.tileLayer(url, options).addTo(this.map);

		return this;
	}
}

function SidePanel(){
	this.createSidePanel = function(widthPercentage, backgroundColor, title){
		$('#sidePanel').css("width", widthPercentage+"%");
		$('#sidePanel').css("margin-left", (100-widthPercentage)+"%");
		$('#map').css("width", (100-widthPercentage)+"%");
		$('#sidePanel').css("background-color", backgroundColor);

		$('#sidePanel').html("<center><h1>"+title+"</h1></center>");
		return this;
	};
	this.createPanel = function(title){
		var panel = new Panel();
		return panel.createPanel(title);
	};
}

var panelID = 0;

function Panel(){
	this.panelID;

	this.createPanel = function(title){
		this.panelID = panelID;
		$('#sidePanel').append("<div class='panel' id='panel-" + panelID + "'><h3><center>" + title + "</center></h3></div>");
		panelID++;
		return this;
	}

	this.createDropdown = function(obj, callback){
		var dropdown = new Dropdown();
		return dropdown.createControl(obj, callback, this.panelID);
	};
}

var componentID = 0;

//Treat this like an interface for all of the child controls
function Control(){}
Control.prototype.createControl = function(obj, callback, panelNum){};

function Dropdown(){
	this.componentID;

	this.createControl = function(obj, callback, panelNum){
		var dropdown = "<center><div class='btn-group btn-group-dropdown'><button data-toggle='dropdown' class='btn dropdown-toggle'>" + obj.title + " <span class='caret'></span></button><ul class='dropdown-menu' id='component-" + componentID + "'>";
		this.componentID = componentID;
		componentID++;
		for(var i=0; i<obj.selections.length; i++){
			dropdown += "<li><a href='#'>" + obj.selections[i] + "</a></li>";
		}
		dropdown += "</ul></div></center>";

		$('#panel-' + panelNum).append(dropdown);

		$('.dropdown-toggle').dropdown();

		$('#component-' + this.componentID + ' li a').on('click', callback);
		return this;
	};
}
Dropdown.prototype  = Object.create(Control.prototype);