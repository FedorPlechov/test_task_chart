const WIDTH = 800;
const HEIGHT = 400;
const PADDING = 5;

const canvas = document.getElementById('canvas');

function chart(canvas, data) {
    const ctx = canvas.getContext('2d');
    canvas.style.width = WIDTH + 'px';
    canvas.style.height = HEIGHT + 'px';
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    for (let i = 0; i < data.length - 1; i++) {
        let [x, y] = data[i];
        let [x2, y2] = data[i + 1];
        ctx.beginPath();
        ctx.moveTo(x, HEIGHT - y);
        ctx.lineTo(x2, HEIGHT - y2);
        ctx.fillStyle = "red";
        ctx.stroke();

        ctx.beginPath()
        ctx.arc(x, HEIGHT - y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();
    }

    ctx.beginPath()
    let [x, y] = data.pop();
    ctx.arc(x, HEIGHT - y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
}

function getData() {
    const countOfPoints = Math.ceil((2 + (Math.random() * 6)));
    const data = [];
    const gapBtwX = WIDTH / countOfPoints + 1;
    for (let i = 1; i < countOfPoints; i++) {
        data.push([i * gapBtwX, PADDING + Math.random() * (HEIGHT - 2 * PADDING)])
    }
    return data;
}

chart(canvas, getData())
canvas.addEventListener('click', () => {
    chart(canvas, getData())
})

function getArrayOfDifferenceXY(prevPoints) {
    const newPoints = getData();
    const diffBtwQuantityOfPoints = newPoints.length - prevPoints.length;
    if (diffBtwQuantityOfPoints === 0) {
        const arrDiffXY = [];
        for (let i = 0; i < newPoints.length; i++) {
            let [startX, startY] = prevPoints[i];
            let [endX, endY] = newPoints[i];
            arrDiffXY.push([endX - startX, endY - startY]);
        }
        return arrDiffXY;
    }
    if (diffBtwQuantityOfPoints < 0) {

    }
}


