const WIDTH = 800;
const HEIGHT = 400;
const PADDING = 5;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function chart(canvas, data) {
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
        ctx.stroke();

        ctx.beginPath()
        ctx.arc(x, HEIGHT - y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();
    }

    ctx.beginPath()
    let [x, y] = data[data.length - 1];
    ctx.arc(x, HEIGHT - y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
}

function getData() {
    const countOfPoints = Math.ceil((3 + (Math.random() * 6)));
    const data = [];
    const gapBtwX = WIDTH / countOfPoints + 1;
    for (let i = 1; i < countOfPoints; i++) {
        data.push([i * gapBtwX, PADDING + Math.random() * (HEIGHT - 2 * PADDING)])
    }
    return data;
}

function getArrayOfDifferenceXY(newPoints) {
    const diffBtwQuantityOfPoints = newPoints.length - prevPoints.length;
    const arrDiffXY = [];

    if (diffBtwQuantityOfPoints > 0) {
        for (let i = 0; i < diffBtwQuantityOfPoints; i++) {
            prevPoints.push(getValue(i, [...prevPoints]));
        }
        prevPoints.sort((a, b) => a[0] - b[0]);
    }
    if (diffBtwQuantityOfPoints < 0) {
        const pointsLeftSide = Math.ceil(-diffBtwQuantityOfPoints / 2);
        const pointsRightSide = Math.floor(-diffBtwQuantityOfPoints / 2);
        const [firstEl, lastEL] = [newPoints[0], newPoints[newPoints.length - 1]];
        const arrFirstEl = new Array(pointsLeftSide).fill(firstEl);
        const arrLastEl = new Array(pointsRightSide).fill(lastEL);
        newPoints = arrFirstEl.concat(newPoints).concat(arrLastEl);
    }
    for (let i = 0; i < newPoints.length; i++) {
        let [startX, startY] = prevPoints[i];
        let [endX, endY] = newPoints[i];
        arrDiffXY.push([endX - startX, endY - startY]);
    }
    return arrDiffXY;
}


function getValue(i, arr, circle = 0) {
    const value = arr[i - arr.length * circle];
    if (!value) {
        return getValue(i, circle + 1);
    }
    return value;
}


function animation() {
    const newPoints = getData();
    const differenceXY = getArrayOfDifferenceXY(newPoints);
    let count = 1;
    const timer = setInterval(() => {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < prevPoints.length - 1; i++) {
            let [x, y] = prevPoints[i];
            let [x2, y2] = prevPoints[i + 1];
            let [difX, difY] = differenceXY[i];
            let [difX2, difY2] = differenceXY[i + 1];
            ctx.beginPath();
            ctx.moveTo(x + difX * count / 30, HEIGHT - y - difY * count / 30);
            ctx.lineTo(x2 + difX2 * count / 30, HEIGHT - y2 - difY2 * count / 30);
            ctx.stroke();

            ctx.beginPath()
            ctx.arc(x + difX * count / 30, HEIGHT - y - difY * count / 30, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.stroke();
        }

        ctx.beginPath()
        let [x, y] = prevPoints[prevPoints.length - 1];
        let [difX, difY] = differenceXY[differenceXY.length - 1]
        ctx.arc(x + difX * count / 30, HEIGHT - y - difY * count / 30, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();

        if (count === 30) {
            clearInterval(timer);
            prevPoints = newPoints;
        }

        count++;

    }, 30)
}


let prevPoints = getData();
chart(canvas, prevPoints);
canvas.addEventListener('click', animation);
