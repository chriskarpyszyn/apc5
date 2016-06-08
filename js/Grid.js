var Grid = function (_offsetX, _offsetY, _cols, _rows) {
	var offsetX = _offsetX;
	var offsetY = _offsetY;
	var cols = _cols;
	var rows = _rows;
	var size = 30;
	var hexHeight = size * 2;
	var hexWidth = Math.sqrt(3)/2 * hexHeight;
	var spacingX = hexHeight * 3/4; //Unused so far
	var spacingY = hexWidth; //Unused so far
	
	//var bubbleArray [];
	
	//Find corner i of hex at Point "center"
	var hexCorner = function(center, i){
    var angleDeg = 60 * i   + 30;
    var angleRad = Math.PI / 180 * angleDeg;
    return new Point(center.x + size * Math.cos(angleRad),
		                 center.y + size * Math.sin(angleRad))
	}
	
	var drawBubbles = function(){
		for(var i = 0; i < cols; i++){
			for(var j = 0 - Math.floor(i/2); j < rows - i/2; j++){
				console.log("Bubble draw");
				var center = gridCoordsToScreen(j, i);
				drawCircleFill(center.x, center.y, 20, "red", 1);
			}
		}
	}
	
	//Draw bounds of all hexes in grid
	var drawBounds = function(){
		for(var i = 0; i < cols; i++){
			for(var j = 0 - Math.floor(i/2); j < rows - i/2; j++){
				drawHex(j, i);
			}
		}
	}
	
	//Draw half of the bounds around a hex
	var drawHalfHex = function(_q, _r){
		var hexCenter = gridCoordsToScreen(_q, _r);
		var hexPoints = [];
		
		for(var i = 0; i < 4; i++){
			hexPoints[i] = hexCorner(hexCenter, i);
		}
		
		drawLines(hexPoints);
	}
	
	//Draw the bounds around a hex
	var drawHex = function(_q, _r){
		var hexCenter = gridCoordsToScreen(_q, _r);
		var hexPoints = [];
		
		for(var i = 0; i < 7; i++){
			hexPoints[i] = hexCorner(hexCenter, i);
		}
		
		drawLines(hexPoints);
	}
	
	//Take hex coordinates and return center in pixel coordinates
	var gridCoordsToScreen = function (_q, _r){
		var x = size * (_q * Math.sqrt(3) + _r * Math.sqrt(3)/2) + offsetX;
		var y = size * 3/2 * _r + offsetY;
		
		return new Point(x, y);
	}
	
	//Take pixel coordinates and return coordinates of hex that pixel is in
	var screenCoordsToGrid = function(_x, _y){
		var q = ((_x - offsetX) * Math.sqrt(3)/3 - (_y - offsetY)/3) / size;
		var r = (_y - offsetY) * 2/3 / size;
		
    return hexRound(new Point(q, r));
	}
	
	//Generate 4 color map of hex grid
	var debugScreen = function(){
		var curHex = new Point(0, 0);
		for(var i = 0; i < canvas.width; i++){
			for(var j = 0; j < canvas.height; j++){
				curHex = screenCoordsToGrid(i, j);
				if(Math.round(curHex.x) % 2 === 0){
					if(Math.round(curHex.y) % 2 === 0){
						drawPixel(i, j, "red");
					} else {
						drawPixel(i, j, "green");
					}
				} else {
					if(Math.round(curHex.y) % 2 === 0){
						drawPixel(i, j, "blue");
					} else {
						drawPixel(i, j, "yellow");
					}
				}
			}
		}
	}
	
	//Corrects trapezoidal grid into hex grid
	var hexRound = function(h){
		h.z = -h.x - h.y;
		var rx = Math.round(h.x)
		var ry = Math.round(h.y)
		var rz = Math.round(h.z)
		
		var x_diff = Math.abs(rx - h.x)
		var y_diff = Math.abs(ry - h.y)
		var z_diff = Math.abs(rz - h.z)
		
		if(x_diff > y_diff && x_diff > z_diff){
			rx = -ry-rz
		}else if(y_diff > z_diff){
			ry = -rx-rz
		}
		
		return new Point(rx, ry);
	}

	return {
		size: size,
		screenCoordsToGrid: screenCoordsToGrid,
		drawBounds: drawBounds,
		hexRound: hexRound,
		debugScreen: debugScreen,
		drawBubbles: drawBubbles
	};
};
