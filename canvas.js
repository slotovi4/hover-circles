const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
	x: undefined,
	y: undefined
};

const maxRadius = 40;
const colorArray = ["#2c3e50", "#e74c3c", "#ecf0f1", "#3498db", "#2980b9"];

window.addEventListener("mousemove", e => {
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener("resize", () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	initCircle();
});

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.Draw = () => {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	};

	this.Bounce = () => {
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		// interactivity
		if (
			mouse.x - this.x < 50 &&
			mouse.x - this.x > -50 &&
			mouse.y - this.y < 50 &&
			mouse.y - this.y > -50
		) {
			if (this.radius < maxRadius) {
				this.radius += 1;
			}
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}
	};
}

let circlesArray = [];

const initCircle = () => {
	circlesArray = [];

	for (var i = 0; i < 300; i++) {
		const radius = Math.random() * 3 + 1;
		const x = Math.random() * (canvas.width - radius * 2) + radius;
		const y = Math.random() * (canvas.height - radius * 2) + radius;
		const dx = (Math.random() - 0.5) * 2;
		const dy = (Math.random() - 0.5) * 2;

		circlesArray = [...circlesArray, new Circle(x, y, dx, dy, radius)];
	}
};

const animate = () => {
	requestAnimationFrame(animate);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	circlesArray.map(circle => {
		circle.Draw();
		circle.Bounce();
	});
};

initCircle();
animate();
