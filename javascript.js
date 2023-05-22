import { gsap } from "gsap";

nextButton = document.getElementById('next-button')

window.smoothScroll = function(target) {
    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);
    
    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);
    
    scroll = function(c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function(){ scroll(c, a, b, i); }, 10);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

/*--------------------
Vars
--------------------*/
const $menu = document.querySelector('#main-content')
const $items = document.querySelectorAll('.main-content-items')
const $images = document.querySelectorAll('.main-content-items img')
let menuWidth = $menu.clientWidth
let itemWidth = $items[0].clientWidth
let wrapWidth = $items.length * itemWidth

let scrollSpeed = 0
let oldScrollY = 0
let scrollY = 0
let y = 0


/*--------------------
Lerp
--------------------*/
const lerp = (v0, v1, t) => {
  return v0 * ( 1 - t ) + v1 * t
}


/*--------------------
Dispose
--------------------*/
const dispose = (scroll) => {
  gsap.set($items, {
    x: (i) => {
      return i * itemWidth + scroll
    },
    modifiers: {
      x: (x, target) => {
        const s = gsap.utils.wrap(-itemWidth, wrapWidth - itemWidth, parseInt(x))
        return `${s}px`
      }
    }
  })
} 
dispose(0)


/*--------------------
Wheel
--------------------*/
const handleMouseWheel = (e) => {
  scrollY -= e.deltaY * 0.9
}


/*--------------------
Touch
--------------------*/
let touchStart = 0
let touchX = 0
let isDragging = false
const handleTouchStart = (e) => {
  touchStart = e.clientX || e.touches[0].clientX
  isDragging = true
  $menu.classList.add('is-dragging')
}
const handleTouchMove = (e) => {
  if (!isDragging) return
  touchX = e.clientX || e.touches[0].clientX
  scrollY += (touchX - touchStart) * 2.5
  touchStart = touchX
}
const handleTouchEnd = () => {
  isDragging = false
  $menu.classList.remove('is-dragging')
}


/*--------------------
Listeners
--------------------*/
$menu.addEventListener('mousewheel', handleMouseWheel)

$menu.addEventListener('touchstart', handleTouchStart)
$menu.addEventListener('touchmove', handleTouchMove)
$menu.addEventListener('touchend', handleTouchEnd)

$menu.addEventListener('mousedown', handleTouchStart)
$menu.addEventListener('mousemove', handleTouchMove)
$menu.addEventListener('mouseleave', handleTouchEnd)
$menu.addEventListener('mouseup', handleTouchEnd)

$menu.addEventListener('selectstart', () => { return false })


/*--------------------
Resize
--------------------*/
window.addEventListener('resize', () => {
  menuWidth = $menu.clientWidth
  itemWidth = $items[0].clientWidth
  wrapWidth = $items.length * itemWidth
})


/*--------------------
Render
--------------------*/
const render = () => {
  requestAnimationFrame(render)
  y = lerp(y, scrollY, .1)
  dispose(y)
  
  scrollSpeed = y - oldScrollY
  oldScrollY = y
  
  gsap.to($items, {
    skewX: -scrollSpeed * .2,
    rotate: scrollSpeed * .01,
    scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003
  })
}
render()





