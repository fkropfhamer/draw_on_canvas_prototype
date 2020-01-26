import "./index.css";

let mouseIsPressed = false;
let drawing = [];
let lastMove = {mouseIsPressed: false, x: -Infinity, y: -Infinity}

function drawLine(x1, y1, x2, y2, context) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}


function draw(state, context): void {
    state.forEach(stroke => {
        drawStroke(stroke, context);
    });
    
}

function drawStroke(stroke, context) {
    for(let i = 0; i < stroke[0].length - 1; i++) {
        const x1 = stroke[0][i];
        const y1 = stroke[1][i];
        const x2 = stroke[0][i + 1];
        const y2 = stroke[1][i + 1];
        

        drawLine(x1, y1, x2, y2, context)
    };
}

function main(): void {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.background = "grey";

    document.addEventListener("mousedown", () => {
        mouseIsPressed = true;
        console.log("mousedown", mouseIsPressed);
    });

    document.addEventListener("mouseup", () => {
        mouseIsPressed = false;
        console.log("mousedown", mouseIsPressed);
    });

    canvas.addEventListener("mousemove", (event) => {
        if(mouseIsPressed) {
            if(!lastMove.mouseIsPressed) {
                drawing.push([[], []]);
            }
            const lastStroke = drawing[drawing.length - 1];
            lastStroke[0].push(event.offsetX);
            lastStroke[1].push(event.offsetY);
            draw(drawing, context);
            console.log(drawing);
        } 
        lastMove = {mouseIsPressed, x: event.offsetX, y: event.offsetY}
        
    })
}

main();
