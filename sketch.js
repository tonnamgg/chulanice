

// Classifier Variable
let classifier;
// Model URL

// ทดสองให้กรรมการดู >>> SpTlzExrG เมื่อวานนี้ผมไปเล่นสเกด
//let imageModelURL = 'https://teachablemachine.withgoogle.com/models/SpTlzExrG/';

// ทดสองให้กรรมการดู >>> 4FUBqnAP7 มีคำว่า ไอ ปวดหัว ไม่สบาย ปวดกระเพาะอาหาร
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/4FUBqnAP7/';


// คำราชการ cbmusPY5H >>> ทำ บัตร ประชาชน ทะเบียนสมรส ที่ไหน
//let imageModelURL = 'https://teachablemachine.withgoogle.com/models/cbmusPY5H/';

// >>> ห้องน้ำไปทางไหน
//let imageModelURL = 'https://teachablemachine.withgoogle.com/models/Ihz0MZtyE/';


// คำราชการ cbmusPY5H >>> กขค
//let imageModelURL = 'https://teachablemachine.withgoogle.com/models/c7BOXtGVF/';

// คำราชการ cbmusPY5H >>> ABC
//let imageModelURL = 'https://teachablemachine.withgoogle.com/models/UfXXRivK1/';

// คำราชการ cbmusPY5H >>> 123
//let imageModelURL = 'https://teachablemachine.withgoogle.com/models/FSZOvABnq/';

// oA4LHCP2L MUwnH3h-8 MUwnH3h-8 eyS_kWEQf I-F14RlaL 4FUBqnAP7 9dWdGSe9q
// Video
let video;
let flippedVideo;
// To store the classification
var label = "";
var full_sentence = "";
var prev_label = "";
var force_stop = false;
// Load the model first

// faceice();

function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  
}
//--------------------------------จัดหน้าต่างวีดีโอ canva พื้นหลัง----------------------------------------------
function setup() {
    //createCanvas(320, 260);
    // Create the video
    video = createCapture(VIDEO);
    video.parent("videoContainer");
    video.size(1280, 500);
    video.position(-30, 245)

    //video.hide();

    flippedVideo = ml5.flipImage(video)
        // Start classifying
}



function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
    
}

// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    
}

// When we get a result
//-----------------------------------------การเรียงลำดับข้อความ------------------------------------
function gotResult(error, results) {
    // If there is an error
    if (error) {
        console.error(error);
        
        return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    
    document.getElementById("per").innerHTML = [results[0].confidence.toFixed(2) * 100 ]+ "% คำว่า" +results[0].label  
      
    prev_label = label;
    label = results[0].label;
    // Classifiy again!
    console.log("previous label is",prev_label);
    
    console.log(label);

    setTimeout(() => {
    if(prev_label != label && label != "" && label != " ") {
        full_sentence += label;
        document.getElementById("result").innerHTML = full_sentence;
    }
    if(force_stop == true) {
        force_stop = false;
       
        return 0;
    }
     
    classifyVideo();
    
    
}, 2000);
   

}

//-----------------------------------------ปุ่มกด------------------------------------------
start_app = () => {
    setTimeout(() => {
    force_stop = false;
    classifyVideo(); 
    }, 2000);
    label = "";
    prev_label = "";
    // for (let i =0;i<=1;i++)
    // {
    //     faceice();
    // }
    
}

stop_app = () => {
    label = "";
    prev_label = "";
    force_stop = true;
    // full_sentence = "";
}
del = () => {
    document.getElementById("result").innerHTML = ""
    label = "";
    prev_label = "";
    full_sentence = "";
    force_stop = true;


}



function faceice() {
    const video = document.getElementById('video55')
    
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/NSC-19.48-220122/NSC2021/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/NSC-19.48-220122/NSC2021/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/NSC-19.48-220122/NSC2021/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/NSC-19.48-220122/NSC2021/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
    
  )
  
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    // faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    // console.log(withFaceExpressions(canvas, resizedDetections   ))
  }, 100)
}) 

}