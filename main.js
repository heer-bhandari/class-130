song = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightwristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;

function setup(){
    canvas = createCanvas(550 , 500);
    canvas.position(400 , 200);
    video = createCapture(VIDEO);
    video.hide();
poseNet = ml5.poseNet( video , modelLoaded);
poseNet.on('pose' , gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is Initialized');
}

function draw(){
    image(video , 0 , 0 , 550 , 500);

    fill("grey");
    stroke("white");
    if(scorerightwrist > 0.2){
        circle(rightWristX , rightwristY , 20);
        if(rightwristY > 0 && rightwristY <=100){
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }
        if(rightwristY > 100 && rightwristY <=200){
            document.getElementById("speed").innerHTML = "speed = 1x";
            song.rate(1);
        }
        if(rightwristY > 200 && rightwristY <=300){
            document.getElementById("speed").innerHTML = "speed = 1.5x";
            song.rate(1.5);
        }
        if(rightwristY > 300 && rightwristY <=400){
            document.getElementById("speed").innerHTML = "speed = 2x";
            song.rate(2);
        }
        if(rightwristY > 400 && rightwristY <=500){
            document.getElementById("speed").innerHTML = "speed = 2.5x";
            song.rate(2.5);
        }
    }
    if(scoreleftwrist > 0.2){
        circle(leftWristX , leftWristY , 20);
        zxcvbnm = Number(leftWristY);
       asdfghjkl = floor(zxcvbnm);
       volume1 = asdfghjkl / 1000;
    volume = volume1 * 2;
    document.getElementById("volume").innerHTML = "volume = " + volume;
    song.setVolume(volume);
    }
   

}
 
function preload (){
    song =loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop(){
    song.stop();
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log(" leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        scorerightwrist = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log(" rightWristX = " + rightWristX + " rightwristY = " + rightwristY);

        console.log("scorerightwrist =" + scorerightwrist + "scoreleftwrist =" + scoreleftwrist);
    }
}

