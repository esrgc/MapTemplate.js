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

	this.createButtonGroup = function(obj, callback){
		var buttonGroup = new ButtonGroup();
		return buttonGroup.createControl(obj, callback, this.panelID);
	};
}

var componentID = 0;

function Control(){
	this.componentID;
}
//Treat this like an interface function for all of the child controls
Control.prototype.createControl = function(obj, callback, panelNum){};

//Child of Control()
function Dropdown(){
	this.createControl = function(obj, callback, panelNum){
		var component = "<center><div class='btn-group btn-group-dropdown'><button data-toggle='dropdown' class='btn dropdown-toggle'>" + obj.title + " <span class='caret'></span></button><ul class='dropdown-menu' id='component-" + componentID + "'>";
		this.componentID = componentID;
		componentID++;
		for(var i=0; i<obj.selections.length; i++){
			component += "<li><a href='#'>" + obj.selections[i] + "</a></li>";
		}
		component += "</ul></div></center>";

		$('#panel-' + panelNum).append(component);

		$('.dropdown-toggle').dropdown();

		$('#component-' + this.componentID + ' li a').on('click', callback);
		return this;
	};
}
Dropdown.prototype  = Object.create(Control.prototype);

//Child of Control()
function ButtonGroup(){
	this.createControl = function(obj, callback, panelNum){
		var component = "<center><div class='btn-group' id='component-" + componentID + "'>";
		this.componentID = componentID;
		componentID++;
		for(var i=0; i<obj.selections.length; i++){
			component += "<button type='button' class='btn btn-default' style='width:" + (100.0/obj.selections.length) + "%''>" + obj.selections[i] + "</button></a></li>";
		}
		component += "</div></center>";

		$('#panel-' + panelNum).append(component);

		$('.dropdown-toggle').dropdown();

		$('#component-' + this.componentID + ' button').on('click', callback);
		return this;
	};
}
ButtonGroup.prototype  = Object.create(Control.prototype);