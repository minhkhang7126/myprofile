document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("galaxy");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = [];
    const numStars = 100;
    const mouse = { x: canvas.width / 2, y: canvas.height / 2, radius: 100 };

    // Tạo ngôi sao ngẫu nhiên
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
        });
    }

    // Vẽ sao
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";

        stars.forEach((star) => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        updateStars();
    }

    // Cập nhật vị trí sao
    function updateStars() {
        stars.forEach((star) => {
            let dx = star.x - mouse.x;
            let dy = star.y - mouse.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                let angle = Math.atan2(dy, dx);
                let force = (mouse.radius - distance) / mouse.radius;
                star.x += Math.cos(angle) * force * 5;
                star.y += Math.sin(angle) * force * 5;
            }

            star.x += star.speedX;
            star.y += star.speedY;

            if (star.x < 0 || star.x > canvas.width) star.speedX *= -1;
            if (star.y < 0 || star.y > canvas.height) star.speedY *= -1;
        });

        requestAnimationFrame(drawStars);
    }

    // Lắng nghe di chuột
    canvas.addEventListener("mousemove", (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    canvas.addEventListener("mouseleave", () => {
        mouse.x = canvas.width / 2;
        mouse.y = canvas.height / 2;
    });

    drawStars();

    // Hiệu ứng particles.js
    particlesJS("particles-js", {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 1 },
            size: { value: 3, random: true },
            move: { enable: true, speed: 2 }
        },
        interactivity: { detect_on: "canvas" }
    });
});
