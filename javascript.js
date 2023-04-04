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

const svgTwitter = document.getElementById("link-to-twitter")
const svgLinkedin = document.getElementById("link-to-linkedin")
const svgInstagram = document.getElementById("link-to-instagram")
const svgGithub = document.getElementById("link-to-github")

const linkTwitter = 0
const linkLinkedin = "https://www.linkedin.com/in/thibaut-schweitzer-635223201/"
const linkInstagram = 'https://twitter.com/Tikiid_'
const linkGithub = 'https://github.com/tikiid'

function goToUrl(url){
    window.open(url, '_blank').focus()
}

// svgLinkedin.addEventListener('click', function(){
//     window.open(linkLinkedin, '_blank').focus()
// })

function showMsg() {
    console.log("Bonjour");
}

svgLinkedin.addEventListener('click', showMsg)



