const sinball = document.createElement("iframe")
sinball.src = "https://rcph-smz.github.io/smz/html/sin_ball_loading/"
sinball.style.display = `block`
sinball.style.height = `100vh`
sinball.style.width = `100vw`
sinball.style.position = `fixed`
sinball.style.zIndex = `1000`
sinball.style.left = 0
sinball.style.top = 0
document.body.appendChild(sinball)
const my_int = setInterval(() => {
    if(document.readyState == 'complete'){
        sinball.remove()
        clearInterval(my_int)
    }
}, 1000)