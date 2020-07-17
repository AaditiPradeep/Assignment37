var canvas;
var drawing =[];
var curentPath = [];
var isDrawing = false;
var allDrawing;


function setup(){
    canvas = createCanvas(600,600);
    canvas.mousePressed(startPath);
    canvas.mouseReleased(endPath);
    database = firebase.database();
      
     
    var ref = database.ref('drawings');
    ref.on("value",gotData);
}

function startPath(){
    isDrawing = true;
    currentPath=[];
    drawing.push(currentPath);
}

function endPath(){
    isDrawing = false;
    saveDrawing();
  
}

function draw(){
   var clearButton = createButton('Clear');
   clearButton.position(650,750);
   clearButton.mousePressed(clearDrawing); 

  background(255);

if(isDrawing){
    var point = {
        x:mouseX,
        y:mouseY
    }
        currentPath.push(point);
      }

    stroke(0,0,255);
    strokeWeight(4);
    noFill();
    for(i = 0;i < drawing.length; i++){
        var path = drawing[i];
            beginShape();
          for(j = 0; j < path.length; j++){
             vertex(path[j].x, path[j].y);
    }
     endShape();
    }
}

function gotData(data){
    var drawings = data.val();
    var keys = Object.keys(drawings);
    for(var i = 0; i<keys.length; i++){
        var key = keys[i];
        showDrawing(key);
    }
}


function saveDrawing(){
    var ref = database.ref('drawings')
    var data= {
        drawing:drawing
    }
    ref.push(data);
}

function showDrawing(keys){
        var ref = database.ref('drawings/'+keys);
        ref.on("value",oneDrawing);

        function oneDrawing(data){
            var dbdrawing = data.val();
            drawing = dbdrawing.drawing; 
        } 
}

   function clearDrawing(){
    drawing = [];
}