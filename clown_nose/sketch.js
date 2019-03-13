let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let leftEyeX = 0;
let leftEyeY = 0;

function setup() {
  createCanvas(640, 480);
  //video will be BELOW the canvas; creates separate DOM element:
  video = createCapture(VIDEO);
  video.hide();
  //load the poseNet model and connect it to the video
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  // console.log(poses) //the poses array
  //each elem in poses is an object with all the points and certainties
  if (poses.length) {
    let newNoseX = poses[0].pose.keypoints[0].position.x;
    let newNoseY = poses[0].pose.keypoints[0].position.y;
    let newEyeX = poses[0].pose.keypoints[1].position.x;
    let newEyeY = poses[0].pose.keypoints[1].position.y;
    //lerp to stabilize---!
    //LERP: linear interolation: finding point between 2 points
    //lerp args: val 1, val 2, percentage
    //e.g., 6, 10, 5...would be finding the # 50% of the way between (8)
    noseX = lerp(noseX, newNoseX, 0.5);
    noseY = lerp(noseY, newNoseY, 0.5);
    leftEyeX = lerp(leftEyeX, newEyeX, 0.5);
    leftEyeY = lerp(leftEyeY, newEyeY, 0.5);
  }
}

function modelReady() {
  console.log('model ready');
}

function draw() {
  image(video, 0, 0);
  // //dist is a built in thing, like lerp, that finds the proportional distance
  let diameter = dist(noseX, noseY, leftEyeX, leftEyeY)
  
  fill(255, 0, 0, ) //r, g, b: (0-255)
  ellipse(noseX, noseY, diameter*1.25)
  //fill(0,255,255)
  //ellipse(leftEyeX, leftEyeY-120, 30)
  
  // if (mouseIsPressed){
  //   fill(0)
  // } else fill(255)
  // ellipse(mouseX, mouseY,80,80)
}  

/*
POSE ARRAY ANATOMY:
level 1: ARRAY -> [{...}, ...]
level 2: OBJECT-> {pose: {...}, skeleton: [[...]]}
                  /                             \
{                                               [{...}, ...]
  keypoints: [{...}, ...],                        \
            /                                      {
    {                                                part: "string",
      part: "string",                                position: {x: #, y: #},
      position: {x: #, y: #},                        score: 0.#
      score: 0.#                                    }
    }
  score: 0.#
  //(degree of certainty about the pose itself)
}


KEYPOINTS:
0 - nose
1 - left eye
2 - right eye
3 - left ear
4 - right ear
5 - left shoulder
6 - right shoulder
7 - left elbow
8 - right elbow
9 - left wrist
10 - right wrist
11 - left hip
12 - right hip
13 - left knee
14 - right knee
15 - left ankle
16 - right ankle

*/
