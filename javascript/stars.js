document.addEventListener("DOMContentLoaded", function() {
    const starsElement = document.getElementById('stars');
    if (!starsElement) return;

    const starsWrapper = document.createElement("div");
    starsWrapper.style.position = "absolute";
    starsWrapper.style.top = "0";
    starsWrapper.style.left = "0";
    starsWrapper.style.width = "100%";
    starsWrapper.style.height = "100%";
    starsWrapper.style.pointerEvents = "none";
    starsWrapper.style.zIndex = "1";
    starsElement.appendChild(starsWrapper);

    const starCount = 200; //nb d'étoiles
    const stars = new Array(starCount).fill(0).map(() => {
        const star = document.createElement("div");
        star.style.position = "absolute";
        star.style.backgroundColor = "#ffcff1";
        star.style.width = "2px";
        star.style.height = "2px";
        starsWrapper.appendChild(star);

        return {
            star,
            x: Math.random() * starsElement.clientWidth,
            y: Math.random() * starsElement.clientHeight,
            r: Math.random() * 2,
        };
    });

    let lastUpdateTime = performance.now();
    const updateInterval = 1000 / 30; //opti

    function update(currentTime) {
        const deltaTime = currentTime - lastUpdateTime;
        if (deltaTime >= updateInterval) {
            stars.forEach((star) => {
                star.x += star.r;
                if (star.x > starsElement.clientWidth) {
                    star.x = 0;
                }

                star.star.style.transform = `translate(${star.x}px, ${star.y}px) scale(${star.r})`;
                star.star.style.opacity = `${star.r / 2}`;
            });
            lastUpdateTime = currentTime;
        }
        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);

    window.addEventListener("beforeunload", function() {
        stars.forEach((star) => star.star.remove());
    });
});