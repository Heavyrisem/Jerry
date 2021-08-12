
let FrameLen = 1;
let Quality = 'normal';
let Images = {normal: new Array(), high: new Array()};

function PreloadImage(e) {
    [Quality, FrameLen] = e.target.value.split(" ");
    // Image Preload
    for (let i = 1; i <= FrameLen; i++) {
        let img = new Image;
        img.src = `./${Quality}/frame-${i}.png`;
        Images[Quality][i-1] = img;
    }
}

window.onload = () => {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    const MaxScroll = (document.body.scrollHeight - document.body.clientHeight);
    document.querySelector('input#normal').click();
    // window.addEventListener('scroll', UpdateFrame);
    
    function UpdateFrame() {
        if (Images[Quality].length) {
            if (MaxScroll - window.scrollY <= 1) window.scrollTo(0, 0);
            let FrameNum = Math.min(FrameLen-1, Math.floor(window.scrollY / MaxScroll * FrameLen));

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(Images[Quality][FrameNum], 0, 0, Images[Quality][FrameNum].width, Images[Quality][FrameNum].height);
        }
        requestAnimationFrame(UpdateFrame);
    }

    requestAnimationFrame(UpdateFrame);

}