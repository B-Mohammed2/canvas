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
    // let drawings=[];
    // store the whole pic of the canvas
    let dataImage=null;
    // let undoImage=null;
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
        
    }
    function finishPosition(){
        painting = false;
        ctx.beginPath();
        dataImage= convertCanvasToImage();
        imagePointer++;
        undoImage[imagePointer]=dataImage;
        // redoImage[imagePointer]=dataImage;
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
       
         

    }
   
    function ChooseLine(){
        // alert("You have chosen a Line")
        chosenDraw="line"
    }
    function drawrect(e) {
        ctx.beginPath();
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
        ctx.ellipse(startX, startY, e.clientX-startX, e.clientY-startY, Math.PI /e.clientY, 0, 2 * Math.PI);
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
        
       ctx.moveTo(startX, startY);
       ctx.lineTo(e.clientX,e.clientY);
       ctx.lineTo (e.clientX-startX/2,e.clientY)
       ctx.lineTo(startX,startY)
        // ctx.moveTo(200,60)
        // ctx.lineTo(300,300)
        // ctx.lineTo(300-200,300)
        // ctx.lineTo(200,60)
    //    ctx.closePath()
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
  
    }
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
        redraw()
        console.log(imagePointer)
        console.log(undoImage.length)}
    }
      
      
    

      
     
    
    // function eraser(){
    //     // ctx.clearArc(startX, startY, e.clientX+2, 0, 2 * Math.PI);
    //     chosenDraw="Erase"
    //     alert("eraser")
    //    }
    // function Erase(e){
    //     ctx.clearRect(startX,startY,e.clientX,e.clientY);
    // }
        // code to memorise every step in the canvas
    
        // Save button

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
  
    


    //Eventlistenners
    canvas.addEventListener('mousedown',startPosition);
    canvas.addEventListener('mouseup',finishPosition);
    canvas.addEventListener('mousemove',draw);
    // canvas.addEventListener('onchange',line_width)
    
    button1=document.getElementById("btn")
    button1.addEventListener('click',clear_page);

    // erasebtn=document.getElementById("Eraser")
    // erasebtn.addEventListener('click',eraser)

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

    lColor=document.getElementById("color-picker")
    lColor.addEventListener('click',lineColor);

    lW=document.getElementById("line_width")
    lW.addEventListener('click',lSize);

    }); 



    //sizing

window.addEventListener('resize', function(event) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}, true);


