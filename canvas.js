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
    // store the whole pic of the canvas
    let dataImage=null;
    let linesize=1;
    let lineCol= "black";
    let imagePointer=-1;
    let undoImage=[]; // Array store a serise of canvas image take it to varios point 
    

    function startPosition(e){
        ctx.beginPath();
        startX = e.clientX;
        startY=e.clientY;
        painting = true; 
        draw(e);
        showVariables()
        // alert("start touch")
        
    }
    function finishPosition(){
        painting = false;
        ctx.beginPath();
        dataImage= convertCanvasToImage();
        imagePointer++;
        undoImage[imagePointer]=dataImage;
        // alert("end touch")
    }
    function draw(e){
        if (!painting) return;
        
        ctx.lineWidth= linesize;
        ctx.lineCap = "round";
        ctx.strokeStyle= lineCol;
        
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

        if (chosenDraw==="whiteline")
         drawWhiteLine(e)
       
         

    }
   
    function ChooseLine(){
        // alert("You have chosen a Line")
        chosenDraw="line"
    }
    function drawrect(e) {
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.rect(startX, startY, e.clientX -startX, e.clientY - startY );
        clear_canvas();
        if(dataImage!=null)
        redraw();
        ctx.stroke()
        // chosenDraw="rect"
    }

    function drawrectangle() {
        // alert("You have chosen a rectangle")
        chosenDraw="rect"
        
    }
    
    function drawarc(e) {
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        // ctx.ellipse(startX, startY, e.clientX-startX, e.clientY-startY, Math.PI /e.clientY, 0, 2 * Math.PI);
        ctx.ellipse(startX, startY, Math.abs(e.clientX-startX), Math.abs(e.clientY-startY), Math.PI /e.clientY, 0, 2 * Math.PI);
        clear_canvas();
        if(dataImage!=null)
        redraw();
        ctx.stroke();  
    }
   
    function drawcircle() {
        // alert("you have chosen circle")
        chosenDraw="arc"
    }
    function drawtriangle(e) {
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.moveTo(startX, startY);
        ctx.lineTo(e.clientX,e.clientY);
        ctx.lineTo (e.clientX-startX/2,e.clientY);
        ctx.lineTo(startX,startY);
         clear_canvas();
         if(dataImage!=null)
         redraw();
       ctx.stroke();
       
    }
    function chosetraiangle (){
        chosenDraw="triangle"
        // alert ("traingle")
    }
    function drawSline(e) {
     
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.moveTo(startX, startY);
        ctx.lineTo(e.clientX, e.clientY);
        clear_canvas();
        if(dataImage!=null)
        redraw();
        ctx.stroke();
    }
     function choseSline(){
        // alert("you chose sline")
        chosenDraw="Sline"
     }       
    // }
        // speach shape

        //sizing text
    function lSize() {
        linesize= document.getElementById("line_width").value

        // alert(linesize= document.getElementById("line_width").value)
    }
     //changing color
    function lineColor(){
        // alert (document.getElementById("color-picker").value)
        lineCol= document.getElementById("color-picker").value
        console.log(lineCol)
  
    }
    // code to memorise every step in the canvas
    function convertCanvasToImage(){
        let canvas=document.getElementById("canvas");
        let image= new Image();
        image.src=canvas.toDataURL("img/png");
        return image;
    }
    
    function redraw(){
       ctx.drawImage(dataImage,0,0);
    }
        // undo button
    function goBack(){
      //look to the previous load img of the canvas
    //   imagePointer--;
    //   dataImage=undoImage[imagePointer];
    //   clear_canvas();
    //   redraw()
      if(imagePointer!=0){
         imagePointer--;
        dataImage=undoImage[imagePointer];
        clear_canvas();
        redraw()}
        
    }

    
    function goNext() {
       
      if(imagePointer<undoImage.length-1){
        imagePointer++;
        dataImage=undoImage[imagePointer];
        clear_canvas();
        redraw();
        console.log(imagePointer)
        console.log(undoImage.length)}
    }
    
    function eraser(){
        
        chosenDraw="whiteline"
        alert("eraser")
       }
    function drawWhiteLine(e){
        ctx.globalCompositeOperation="destination-out";
        ctx.beginPath();
        ctx.lineTo(e.clientX, e.clientY);
        // clear_canvas();
        // redraw();
        ctx.stroke();
    }

        //upload file

   function clear_canvas() {
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    // console.log(window.innerHeight)
    
   }
   function clear_page() {
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    // console.log(window.innerHeight)
    dataImage=null;
    
   }
   function showVariables(){
    console.log("dataImage is"+dataImage);
   }
    function tochdraw(){
    alert("draw touch")
    }
    
      

  
    


    //Eventlistenners
    canvas.addEventListener('mousedown',startPosition);
    canvas.addEventListener('mouseup',finishPosition);
    canvas.addEventListener('mousemove',draw);
    canvas.addEventListener('mouseout',finishPosition);
    

   // event listenners for toch screen
    // canvas.addEventListener('touchstart',startPosition,false)
    // canvas.addEventListener('touchmove',draw,false)
    // canvas.addEventListener('touchend',finishPosition,false)
    // canvas.addEventListener('touchout',finishPosition,false)

    canvas.addEventListener('touchstart',startPosition)
    canvas.addEventListener('touchmove',draw)
    canvas.addEventListener('touchend',finishPosition)
    canvas.addEventListener('touchout',finishPosition)

    // canvas.addEventListener("touchstart", touch2Mouse, true);
    // canvas.addEventListener("touchmove", touch2Mouse, true);
    // canvas.addEventListener("touchend", touch2Mouse, true);
    

    // canvas.addEventListener('onchange',line_width)
    
    button1=document.getElementById("btn")
    button1.addEventListener('click',clear_page);

    erasebtn=document.getElementById("Eraser")
    erasebtn.addEventListener('click',eraser)

    undoButton=document.getElementById("undo")
    undoButton.addEventListener('click',goBack);

    redoBtn=document.getElementById("Redo")
    redoBtn.addEventListener('click',goNext);

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

    // lColor=document.getElementById("color-picker")
    // lColor.addEventListener('click',lineColor);
    lColor=document.getElementById("color-picker")
    lColor.addEventListener('input',lineColor);

    lW=document.getElementById("line_width")
    lW.addEventListener('input',lSize);

    }); 
    // Save button
    saveButton = document.getElementById("save");
    save.onclick = function(e) {
        dataUrl = canvas.toDataURL('image/png');
        save.href = dataUrl;
    };
    

    //sizing

window.addEventListener('resize', function(event) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}, true);


