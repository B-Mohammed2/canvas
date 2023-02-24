window.addEventListener('load', ()=>{
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    




    //variable
    let startX;
    let startY;
    let painting =false;
    function startPosition(e){
        ctx.beginPath();
        startX = e.clientX;
        startY=e.clintY;
        painting = true;
        draw(e);
    }
    function finishPosition(){
        painting = false;
        ctx.beginPath();
    }
    function draw(e){
        if (!painting) return;
        ctx.linewidth = 10;
        ctx.lineCap = "round";
        
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        drawrect(e)
        
        //ctx.beginPath();
        //ctx.moveTo(e.clintX, e.clientY);
    }



    function drawrect(e) {
        // ctx.beginPath();
        console.log("xxxxxxx")
        ctx.rect(startX, startY, 150, 100);
        ctx.stroke()
    }
    // function startPosition(r){
    //     painting = true;
    //     draw(r);
    // }
    // function finishPosition(){
    //     painting = false;
    //     ctx.beginPath();
    // }
    // function draw(r) {
    //     if (!painting) return;
    //     ctx.linewidth=10;
    //     ctx.rect(startX,startY,r.clientX,r.clientY);
    //     ctx.stroke();

    // } 


    //Eventlistenners
    canvas.addEventListener('mousedown',startPosition);
    canvas.addEventListener('mouseup',finishPosition);
    canvas.addEventListener('mousemove',draw);
   

});
//sizing

window.addEventListener('resize', function(event) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}, true);


