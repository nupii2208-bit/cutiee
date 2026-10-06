/* =========================================================
   SCRATCH CARDS
   scratch.js
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {

        const canvases =
            document.querySelectorAll(
                ".scratch-canvas"
            );


        if (!canvases.length) {
            return;
        }


        canvases.forEach(
            function (canvas) {

                setupScratchCard(
                    canvas
                );

            }
        );

    }
);


function setupScratchCard(canvas) {

    const card =
        canvas.closest(
            ".scratch-card"
        );


    if (!card) {
        return;
    }


    const context =
        canvas.getContext("2d");


    let scratching = false;


    function resizeCanvas() {

        const width =
            card.offsetWidth;

        const height =
            card.offsetHeight;


        const ratio =
            window.devicePixelRatio || 1;


        canvas.width =
            width * ratio;

        canvas.height =
            height * ratio;


        canvas.style.width =
            width + "px";

        canvas.style.height =
            height + "px";


        context.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );


        drawCover();

    }


    function drawCover() {

        const width =
            canvas.clientWidth;

        const height =
            canvas.clientHeight;


        context.globalCompositeOperation =
            "source-over";


        context.fillStyle =
            "#c99eaa";


        context.fillRect(
            0,
            0,
            width,
            height
        );


        /* Small dots */

        context.fillStyle =
            "rgba(255,255,255,0.35)";


        for (
            let x = 10;
            x < width;
            x += 28
        ) {

            for (
                let y = 10;
                y < height;
                y += 28
            ) {

                context.beginPath();

                context.arc(
                    x,
                    y,
                    2,
                    0,
                    Math.PI * 2
                );

                context.fill();

            }

        }


        /* Text */

        context.fillStyle =
            "#fff8fa";

        context.font =
            "bold 17px Arial";

        context.textAlign =
            "center";

        context.textBaseline =
            "middle";


        context.fillText(
            "SCRATCH HERE ♡",
            width / 2,
            height / 2
        );

    }


    function getPosition(event) {

        const rect =
            canvas.getBoundingClientRect();


        let clientX;
        let clientY;


        if (
            event.touches &&
            event.touches.length
        ) {

            clientX =
                event.touches[0].clientX;

            clientY =
                event.touches[0].clientY;

        } else {

            clientX =
                event.clientX;

            clientY =
                event.clientY;

        }


        return {

            x:
                clientX -
                rect.left,

            y:
                clientY -
                rect.top

        };

    }


    function scratch(event) {

        const position =
            getPosition(event);


        context.globalCompositeOperation =
            "destination-out";


        context.beginPath();

        context.arc(
            position.x,
            position.y,
            25,
            0,
            Math.PI * 2
        );

        context.fill();

    }


    canvas.addEventListener(
        "mousedown",
        function (event) {

            scratching = true;

            scratch(event);

        }
    );


    canvas.addEventListener(
        "mousemove",
        function (event) {

            if (!scratching) {
                return;
            }

            scratch(event);

        }
    );


    canvas.addEventListener(
        "mouseup",
        function () {

            scratching = false;

        }
    );


    canvas.addEventListener(
        "mouseleave",
        function () {

            scratching = false;

        }
    );


    canvas.addEventListener(
        "touchstart",
        function (event) {

            event.preventDefault();

            scratching = true;

            scratch(event);

        },
        {
            passive: false
        }
    );


    canvas.addEventListener(
        "touchmove",
        function (event) {

            event.preventDefault();

            if (!scratching) {
                return;
            }

            scratch(event);

        },
        {
            passive: false
        }
    );


    canvas.addEventListener(
        "touchend",
        function () {

            scratching = false;

        }
    );


    resizeCanvas();


    window.addEventListener(
        "resize",
        resizeCanvas
    );

}