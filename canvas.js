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
    // let touch = e.touches[0];
    // let x = touch.pageX;
    // let y = touch.pageY;
    let painting =false;
    let chosenDraw="";
    // store the whole pic of the canvas
    let dataImage=null;
    let linesize=1;
    let lineCol= "black";
    let imagePointer=-1;
    let undoImage=[]; // Array store a serise of canvas image take it to varios point 
    // let StartTouch=function startPosition(e){
    //     preventDefault()
    //     beginPath
    // }

    function startPosition(e){
        ctx.beginPath();
        startX = e.clientX;
        startY=e.clientY;
        painting = true; 
        draw(e);
        // showVariables()
        
        
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
          if (chosenDraw==="Sline") 
          drawSline(e)
        if (chosenDraw==="triangle") 
         drawtriangle(e)
         if (chosenDraw==="Sline")
         drawSline(e)

        if (chosenDraw==="whiteline")
         drawWhiteLine(e)
        if (chosenDraw==="line")
        doodle(e)
        if (chosenDraw==="addTexT")
        addTexT(e)
    }
    function doodle(e){
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
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
    function AddText(){
        chosenDraw="addTexT"
    }
    function addTexT(e){
         ctx.font = "linesize serif";
         ctx.fillText("Hello world", startX, startY);
    }

        //sizing text
    function lSize() {
        linesize= document.getElementById("line_width").value

        // alert(linesize= document.getElementById("line_width").value)
    }
     //changing color
    function lineColor(){
        // alert (document.getElementById("color-picker").value)
        lineCol= document.getElementById("color-picker").value
        // console.log(lineCol)
  
    }
        // getting the chosen image from device and puting it on the canvas.
    var snap = document.getElementById("snap");
        snap.onchange=function(e){ 
          var url = URL.createObjectURL(e.target.files[0]);
          var img = new Image();
          img.onload = function() {
              ctx.drawImage(img, 0, 0, img.width, img.height);    
          }
          img.src = url;
        };
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
       }
    function drawWhiteLine(e){
        ctx.globalCompositeOperation="destination-out";
        ctx.beginPath();
        ctx.lineTo(e.clientX, e.clientY);
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

//    function showVariables(){
//     console.log("dataImage is"+dataImage);
//    }
   

    // function tochdraw(){
    // console.log(Touch.clientX)


    // }
    const src= document.getElementById("canvas");
    let cX;
    let cY;
    // let tochCol="blue"
    

    canvas.addEventListener(
        "touchstart",
        (e) => {
            // e.preventDefault();
            ctx.beginPath();

        cX = e.touches[0].clientX;
        cY = e.touches[0].clientY;
        painting = true; 
        // draw(e);
        },
        false
        );

    canvas.addEventListener(
    "touchmove",
    (e) => {
        if (!painting) return;
        // Catche the client X/Y coordinates
        cX = e.touches[0].clientX;
        cY = e.touches[0].clientY;
        ctx.lineWidth= linesize;
        ctx.lineCap = "round";
        ctx.strokeStyle= lineCol
        // e.preventDefault();
        
        ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
        ctx.stroke();
        if (chosenDraw==="doodle")
        doodleT(e)
        // if (chosenDraw==="Trect")
        // drawTrect(e)
        if (chosenDraw==="TSline")
        drawTSline(e)
        // console.log("draw")
        // alert("tuch draw")
        // console.log("start"+cX);


    },
    false
    );
    
    canvas.addEventListener(
    "touchend",
    (e) => {
        let deltaX;
        let deltaY;
        painting = false;
        ctx.beginPath();

        // Compute the change in X and Y coordinates.
        // The first touch point in the changedTouches
        // list is the touch point that was just removed from the surface.
        deltaX = e.changedTouches[0].clientX - cX;
        deltaY = e.changedTouches[0].clientY - cY;
        // console.log("cx"+cX);
        // console.log("cy"+cY);

        dataImage= convertCanvasToImage();
        imagePointer++;
        undoImage[imagePointer]=dataImage;

        // Process the data…
    },
    false
    );
    function doodleT(e){
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
        ctx.stroke();
    }
    function chosedoodle(){
        chosenDraw="doodle"
    }
        
    
    // function drawTrect(e) {
    //     // e.preventDefault();
    //     ctx.beginPath();
    //     ctx.globalCompositeOperation="source-over";
    //     ctx.rect(cX, cY, e.changedTouches[0].clientX - cX ,e.changedTouches[0].clientY - cY )
    //     clear_canvas();
    //     if(dataImage!=null)
    //     redraw();
    //     ctx.stroke()
    //     alert("draw rect")
    //     //  console.log("cx"+cX);
    //     // console.log("cy"+cY); 
    // }

    // function drawtrectangle() {
    //     chosenDraw="Trect"
    //     alert("draw rect")
    // }
    function drawTSline(e) {
        // e.preventDefault();
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        // ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);
        ctx.moveTo(cX,cY);
        ctx.lineTo(e.changedTouches[0].clientX - cX,e.changedTouches[0].clientY - cY);
        // ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
        clear_canvas();
        if(dataImage!=null)
        redraw();
        ctx.stroke();
        console.log("cx"+cX);
        console.log("cy"+cY);

        
        
    }
     function choseTuchSline(){
        // alert("you chose sline")
        chosenDraw="TSline"
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
    doodleT2=document.getElementById("btn2")
    doodleT2.addEventListener('click',chosedoodle);

    button3=document.getElementById("btn3")
    button3.addEventListener('click',drawrectangle);
    // button3=document.getElementById("btn3")
    // button3.addEventListener('click',drawtrectangle);


    button4=document.getElementById("btn4")
    button4.addEventListener('click',drawcircle);

    button5=document.getElementById("btn5")
    button5.addEventListener('click',chosetraiangle);

    button6=document.getElementById("btn6")
    button6.addEventListener('click',choseSline);
    buttonLine=document.getElementById("btn6")
    buttonLine.addEventListener('click',choseTuchSline);
    
    button7=document.getElementById("addText")
    button7.addEventListener('click',AddText);

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


