window.addEventListener('load', ()=>{
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    canvas.height=canvas.height-100;




    //variable
    let startX;
    let startY;
    let painting =false;
    let chosenDraw="";
    function startPosition(e){
        ctx.beginPath();
        startX = e.clientX;
        startY=e.clientY;
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
        // clear_canvas();
        // ctx.lineTo(e.clientX, e.clientY);
        // ctx.stroke();
        if(chosenDraw==="rect")
           drawrect(e)
        // alert("working")
        
        //ctx.beginPath();
        //ctx.moveTo(e.clintX, e.clientY);
    }
   
    function ChooseLine(){
        
        // ctx.beginPath();
        // ctx.moveTo(startX, startY);
        // ctx.lineTo(clientX, clientY);
        // ctx.stroke();
        alert("You have chosen a Line")
        chosenDraw="line"
    }
    function drawrect(e) {
        // ctx.beginPath();
        clear_canvas();
        ctx.rect(startX, startY, e.clientX -startX, e.clientY - startY );
        ctx.stroke()
        chosenDraw="rect"

    function drawrectangle() {
        alert("You have chosen a rectangle")
        
        chosenDraw="rect"
    }
    
    }

   function clear_canvas() {
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    console.log(window.innerHeight)
    
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
    
    button1=document.getElementById("btn")
    button1.addEventListener('click',clear_canvas);

    button2=document.getElementById("btn2")
    button2.addEventListener('click',ChooseLine);

    button3=document.getElementById("btn3")
    button3.addEventListener('click',drawrectangle);
   
   

});

    //sizing

window.addEventListener('resize', function(event) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}, true);


