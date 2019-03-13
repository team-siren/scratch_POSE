const path = require('path');

module.exports = () => `<!DOCTYPE html>
<html>

<head>
    <title>PoseNet - Camera Feed Demo</title>
    <style>
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        color: black;
    }

    .footer-text {
        max-width: 600px;
        text-align: center;
        margin: auto;
    }

    @media only screen and (max-width: 600px) {
      .footer-text, .dg {
        display: none;
      }
    }
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <div id="info" style='display:none'>
    </div>
    <div id="loading">
        Loading the model...
    </div>

    <div id='main' style='display:none'>
        <video id="video" playsinline style=" -moz-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        display: none;
        ">
        </video>
        <canvas id="output" />
    </div>
    <div class="footer">
        <div class="footer-text">
            <p>
                PoseNet runs with either a <strong>single-pose</strong> or <strong>multi-pose</strong> detection algorithm. The single person pose detector is faster and more accurate but requires only one subject present in the image.
                <br>
                <br> The <strong>output stride</strong> and <strong>image scale factor</strong> have the largest effects on accuracy/speed. A <i>higher</i> output stride results in lower accuracy but higher speed. A <i>higher</i> image scale factor results in higher accuracy but lower speed.
            </p>
        </div>
    </div>
    <script src='/camera.js'></script>
</body>

</html>`;
