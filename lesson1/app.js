var c = document.getElementById('myCanvas');
var ctx = c.getContext('2d');
ctx.moveTo(200,100)
ctx.lineTo(200,-100)
ctx.stroke()

ctx.fillStyle = "rgb(0, 100, 100)";
ctx.fillRect(100, 100 ,100, 100);

ctx.strokeStyle = "rgb(100,120, 125)"
ctx.strokeRect(80,80,140,140)
