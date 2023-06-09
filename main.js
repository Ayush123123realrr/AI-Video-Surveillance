objects = [];
video="";
status1="";

function preload(){
    video = createVideo('video.mp4');
}
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}
function draw() {
    image(video, 0, 0, 480, 380); 
    if(status1 !="")
    {
        objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
        document.getElementById("object").innerHTML = "Number of objects detected are : "+ objects.length;
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        fill("#1303ff");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke("#1303ff");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
    }
}
function gotResult(error, results) {
    if (error) {
    console.log(error);
    }
    console.log(results);
    objects = results;
}
function start1() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded() {
    console.log("Model Loaded!");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
