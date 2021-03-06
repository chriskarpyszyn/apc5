var cannon = (function () {
	var x = 400;
	var y = 600;
	var rot = 90;
	var width = 75;
	var height = 10;
	var color = "#AAAAAA";
	
	var calculateRotation = function(){
		var yDiff = y - mouse.y;
		var xDiff = x - mouse.x;
		if(xDiff < 0){
			rot = Math.atan(yDiff/xDiff);
		} else {
			rot = Math.atan(yDiff/xDiff) - Math.PI;
		}
	};
	
	var draw = function(){
		colorRect(x,y, width,height, color, rot, 0, -height/2);
	};
	
	return {
		x: x,
		y: y,
		width: width,
		height: height,
		color: color,
		draw: draw,
		calculateRotation: calculateRotation,
		rot: rot
	};
})();
