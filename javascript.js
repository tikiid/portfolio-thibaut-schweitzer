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

// let isDown = false;
// let startX;
// let scrollLeft;
// const slider = document.querySelector('.main-content-items');

// const end = () => {
// 	isDown = false;
//   slider.classList.remove('active');
// }

// const start = (e) => {
//   isDown = true;
//   slider.classList.add('active');
//   startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
//   scrollLeft = slider.scrollLeft;	
// }

// const move = (e) => {
// 	if(!isDown) return;

//   e.preventDefault();
//   const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
//   const dist = (x - startX);
//   slider.scrollLeft = scrollLeft - dist;
// }

// (() => {
// 	slider.addEventListener('mousedown', start);
// 	slider.addEventListener('touchstart', start);

// 	slider.addEventListener('mousemove', move);
// 	slider.addEventListener('touchmove', move);

// 	slider.addEventListener('mouseleave', end);
// 	slider.addEventListener('mouseup', end);
// 	slider.addEventListener('touchend', end);
// })();
