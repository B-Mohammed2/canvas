window.addEventListener('load', ()=>{
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    canvas.height=canvas.height-100;
    // canvas.width = canvas.width-200 ;
   
    


    //variable
    let startX;
    let startY;
    let painting =false;
    let chosenDraw="";
    let linesize=1;
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
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        if (chosenDraw==="rect") 
           drawrect(e)
         if (chosenDraw==="arc") 
          drawarc(e)
        //   if (chosenDraw==="Sline") 
        //   drawSline(e)
        if (chosenDraw==="triangle") 
         drawtriangle(e)
         if (chosenDraw==="Sline")
         drawSline(e)
    
       
    }
   
    function ChooseLine(){
        alert("You have chosen a Line")
        chosenDraw="line"
    }
    function drawrect(e) {
        ctx.beginPath();
        clear_canvas();
        ctx.rect(startX, startY, e.clientX -startX, e.clientY - startY );
        ctx.stroke()
        // chosenDraw="rect"
    }

    function drawrectangle() {
        alert("You have chosen a rectangle")
        
        chosenDraw="rect"
    }
    
    function drawarc(e) {
        ctx.beginPath();
        clear_canvas();
        ctx.ellipse(startX, startY, e.clientX-startX, e.clientY-startY, Math.PI /e.clientY, 0, 2 * Math.PI);
        ctx.stroke();
        
    }
    function drawcircle() {
        alert("you have chosen circle")
        chosenDraw="arc"
    }
    function drawtriangle(e) {
        ctx.beginPath();
        clear_canvas();
       ctx.moveTo(startX, startY);
       ctx.lineTo(e.clientX,e.clientY);
       ctx.lineTo (e.clientX-startX,e.clientY)
       ctx.lineTo(startX,startY)
        // ctx.moveTo(200,60)
        // ctx.lineTo(300,300)
        // ctx.lineTo(300-200,300)
        // ctx.lineTo(200,60)
    //    ctx.closePath()
       
       ctx.stroke();
       
    }
    function chosetraiangle (){
        chosenDraw="triangle"
        // alert ("traingle")
    }
    function drawSline(e) {
     
        ctx.beginPath();
        clear_canvas();
        ctx.moveTo(startX, startY);
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
    }
     function choseSline(){
        alert("you chose sline")
        chosenDraw="Sline"
     }       
    // }
        // speach shape

        //sizing text
    function lSize() {

        alert("change")
    }

        
        //changing color

        // Save button

        //upload file

   function clear_canvas() {
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    // console.log(window.innerHeight)
    
   }
    


    //Eventlistenners
    canvas.addEventListener('mousedown',startPosition);
    canvas.addEventListener('mouseup',finishPosition);
    canvas.addEventListener('mousemove',draw);
    // canvas.addEventListener('onchange',line_width)
    
    button1=document.getElementById("btn")
    button1.addEventListener('click',clear_canvas);

    button2=document.getElementById("btn2")
    button2.addEventListener('click',ChooseLine);

    button3=document.getElementById("btn3")
    button3.addEventListener('click',drawrectangle);

    button4=document.getElementById("btn4")
    button4.addEventListener('click',drawcircle);

    button5=document.getElementById("btn5")
    button5.addEventListener('click',chosetraiangle);
    button6=document.getElementById("btn6")
    button6.addEventListener('click',choseSline);

    lW=document.getElementById("line_width")
    lW.addEventListener('click',lSize);

    }); 



    //sizing

window.addEventListener('resize', function(event) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}, true);


