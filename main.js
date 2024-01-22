video="";
status="";
objects=[];

function preload(){
}

function setup() {
    canvas = createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function start() {
    document.getElementById("status").innerHTML = "Status: Detecting objects";
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
}

function modelLoaded(){
    console.log("model loaded!");
    status=true;
   
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects=results
    };
}

function draw(){
    image(video,0,0,480,380);
    if(status !=""){
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
           document.getElementById("status").innerHTML="Status:Found objects";
           document.getElementById("number_of_objects").innerHTML="Number of objects detected are"+objects.length;
           fill("#ff0000");
           percentage=floor(objects[i].confidence * 100);
           text(objects[i].label+""+percentage+"%", objects[i].x+15, objects[i].y+15);
           noFill();
           stroke("#ff0000");
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    };
}