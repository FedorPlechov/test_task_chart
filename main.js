class Chart {
    WIDTH = 800;
    HEIGHT = 400;
    PADDING = 5;

    constructor() {
        const canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.prevPoints = this.getData();
        this.firstRender(canvas, this.prevPoints)
        canvas.addEventListener('click',  this.animation.bind(this) );
    }

    firstRender(canvas, data) {
        canvas.style.width = this.WIDTH + 'px';
        canvas.style.height = this.HEIGHT + 'px';
        canvas.width = this.WIDTH;
        canvas.height = this.HEIGHT;

        for (let i = 0; i < data.length - 1; i++) {
            let [x, y] = data[i];
            let [x2, y2] = data[i + 1];
            this.ctx.beginPath();
            this.ctx.moveTo(x, this.HEIGHT - y);
            this.ctx.lineTo(x2, this.HEIGHT - y2);
            this.ctx.stroke();

            this.ctx.beginPath()
            this.ctx.arc(x, this.HEIGHT - y, 5, 0, 2 * Math.PI);
            this.ctx.fillStyle = "white";
            this.ctx.fill();
            this.ctx.stroke();
        }

        this.ctx.beginPath()
        let [x, y] = data[data.length - 1];
        this.ctx.arc(x, this.HEIGHT - y, 5, 0, 2 * Math.PI);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.stroke();
    }

    animation() {
        const newPoints = this.getData();
        const differenceXY = this.getArrayOfDifferenceXY(newPoints);
        let count = 1;
        const timer = setInterval(() => {
            this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

            for (let i = 0; i < this.prevPoints.length - 1; i++) {
                let [x, y] = this.prevPoints[i];
                let [x2, y2] = this.prevPoints[i + 1];
                let [difX, difY] = differenceXY[i];
                let [difX2, difY2] = differenceXY[i + 1];

                this.ctx.beginPath();
                this.ctx.moveTo(x + difX * count / 30, this.HEIGHT - y - difY * count / 30);
                this.ctx.lineTo(x2 + difX2 * count / 30, this.HEIGHT - y2 - difY2 * count / 30);
                this.ctx.stroke();

                this.ctx.beginPath()
                this.ctx.arc(x + difX * count / 30, this.HEIGHT - y - difY * count / 30, 5, 0, 2 * Math.PI);
                this.ctx.fillStyle = "white";
                this.ctx.fill();
                this.ctx.stroke();
            }
            this.ctx.beginPath()
            let [x, y] = this.prevPoints[this.prevPoints.length - 1];
            let [difX, difY] = differenceXY[differenceXY.length - 1]
            this.ctx.arc(x + difX * count / 30, this.HEIGHT - y - difY * count / 30, 5, 0, 2 * Math.PI);
            this.ctx.fillStyle = "white";
            this.ctx.fill();
            this.ctx.stroke();

            if (count === 30) {
                clearInterval(timer);
                this.prevPoints = newPoints;
            }
            count++;
        }, 15)
    }

    getData() {
        const countOfPoints = Math.ceil((3 + (Math.random() * 6)));
        const data = [];
        const gapBtwX = this.WIDTH / countOfPoints + 1;
        for (let i = 1; i < countOfPoints; i++) {
            data.push([i * gapBtwX, this.PADDING + Math.random() * (this.HEIGHT - 2 * this.PADDING)])
        }
        return data;
    }

    getArrayOfDifferenceXY(newPoints) {
        const diffBtwQuantityOfPoints = newPoints.length - this.prevPoints.length;
        const arrDiffXY = [];

        if (diffBtwQuantityOfPoints > 0) {
            for (let i = 0; i < diffBtwQuantityOfPoints; i++) {
                this.prevPoints.push(this.getValue(i, [...this.prevPoints]));
            }
            this.prevPoints.sort((a, b) => a[0] - b[0]);
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
            let [startX, startY] = this.prevPoints[i];
            let [endX, endY] = newPoints[i];
            arrDiffXY.push([endX - startX, endY - startY]);
        }
        return arrDiffXY;
    }

    getValue(i, arr, circle = 0) {
        const value = arr[i - arr.length * circle];
        if (!value) {
            return getValue(i, circle + 1);
        }
        return value;
    }
}

const chart = new Chart();
