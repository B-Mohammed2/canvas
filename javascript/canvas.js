window.addEventListener("load", ()=>{
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight-100;
    canvas.width = window.innerWidth;
    // canvas.height=canvas.height-100;

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
    // Array store a serise of canvas image take it to varios point 
     let undoImage=[];

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
    }
    function draw(e){
        if (!painting) return;
        ctx.lineWidth= linesize;
        ctx.lineCap = "round";
        ctx.strokeStyle= lineCol;
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

    function choserectangle() {
        chosenDraw="rect"
        
    }
    
    function drawarc(e) {
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.ellipse(startX, startY, Math.abs(e.clientX-startX), Math.abs(e.clientY-startY), Math.PI /e.clientY, 0, 2 * Math.PI);
        clear_canvas();
        if(dataImage!=null)
        redraw();
        ctx.stroke();  
    }
   
    function drawcircle() {
        chosenDraw="arc"
    }
    function drawtriangle(e) {
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.moveTo(startX, startY);
        ctx.lineTo(e.clientX,e.clientY);
        let Difference=e.clientX-startX
        ctx.lineTo(startX-Difference,e.clientY);
        ctx.lineTo(startX,startY);
         clear_canvas();
         if(dataImage!=null)
         redraw();
       ctx.stroke();
       
    }
    function chosetraiangle (){
        chosenDraw="triangle"
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
        chosenDraw="Sline"
     }       
   

        //sizing text
    function lSize() {
        linesize= document.getElementById("line_width").value
    }
     //changing color
    function lineColor(){
        lineCol= document.getElementById("color-picker").value
  
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
    
   }
   function clear_page() {
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    dataImage=null;
    
   }
    let cX;
    let cY;
    
    function startTouch(e){
        e.preventDefault();
        ctx.beginPath();
        // Catche the client X/Y coordinates
        cX = e.touches[0].clientX;
        cY = e.touches[0].clientY;
        painting = true; 
        draw(e);
        }
       
    function moveTouch(e) {
        if (!painting) return;
        
        e.preventDefault();
        e.stopImmediatePropagation();
        ctx.lineWidth= linesize;
        ctx.lineCap = "round";
        ctx.strokeStyle= lineCol
        
        ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
        ctx.stroke();
        if (chosenDraw==="doodle")
        doodleT(e)
        if (chosenDraw==="TSline")
        drawTSline(e)

        if (chosenDraw==="Tarc") 
        drawTocharc(e)

        if (chosenDraw==="TochTriangle")
        drawTochTriangle(e)
        if (chosenDraw==="Tochrect")
        drawTochrect(e)

    }
    function endTouch(e) {
        let deltaX;
        let deltaY;
        painting = false;
        ctx.beginPath();
        deltaX = e.changedTouches[0].clientX - cX;
        deltaY = e.changedTouches[0].clientY - cY;
        dataImage= convertCanvasToImage();
        imagePointer++;
        undoImage[imagePointer]=dataImage;

        // Process the data…
    }
   
    function doodleT(e){
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
        ctx.stroke();
    }
    function chosedoodle(){
        chosenDraw="doodle"
    }

    function drawTochrect(e) {
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.rect(cX, cY, e.touches[0].clientX -cX ,e.touches[0].clientY-cY )
        clear_canvas();
        if(dataImage!=null)
        redraw();
        ctx.stroke()
       
    }
    function choseTrectangle(e) {
        
        chosenDraw="Tochrect"
        e.preventDefault();
        
    }
    function drawTocharc(e) {
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.ellipse(cX, cY, Math.abs(e.changedTouches[0].clientX - cX), Math.abs(e.changedTouches[0].clientY - cY ), Math.PI /e.changedTouches[0].clientY, 0, 2 * Math.PI);
        clear_canvas();
        if(dataImage!=null)
        redraw();
        ctx.stroke(); 
    }
   
    function drawTcircle(e) {
        chosenDraw="Tarc"
        e.preventDefault()
    }
    function drawTSline(e) {
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.moveTo(cX,cY);
        ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
        clear_canvas();
        if(dataImage!=null)
        redraw();
        ctx.stroke()
       
    }
     function choseTuchSline(e){
        e.preventDefault()
        chosenDraw="TSline"
     }      
     function drawTochTriangle(e) {
        ctx.beginPath();
        ctx.globalCompositeOperation="source-over";
        ctx.moveTo(cX, cY);
        ctx.lineTo(e.touches[0].clientX,e.touches[0].clientY);
        let deltaX=e.touches[0].clientX-cX
        ctx.lineTo (cX-deltaX,e.touches[0].clientY);
        ctx.lineTo(cX,cY);
         clear_canvas();
         if(dataImage!=null)
         redraw();
       ctx.stroke();
    }
    function choseTochTraiangle (e){
        chosenDraw="TochTriangle"
        e.preventDefault()
    } 
     //resizing the window

    window.addEventListener('resize', function(event) {
        // canvas.height = window.innerHeight-100;
        // canvas.width = window.innerWidth;
        canvas.height = 2000;
        canvas.width = 2000;
        clear_canvas();
        redraw()
    }, true);
        
    
    //Eventlistenners for mouse
    canvas.addEventListener('mousedown',startPosition);
    canvas.addEventListener('mouseup',finishPosition);
    canvas.addEventListener('mousemove',draw);
    canvas.addEventListener('mouseout',finishPosition);
    // event listener for touchscreen
    canvas.addEventListener('touchstart',startTouch)
    canvas.addEventListener('touchmove',moveTouch)
    canvas.addEventListener('touchend',endTouch)
    canvas.addEventListener('touchout',endTouch)

    
    clearAll=document.getElementById("clear_all")
    clearAll.addEventListener('click',clear_page);

    erasebtn=document.getElementById("Eraser")
    erasebtn.addEventListener('click',eraser)

    undoButton=document.getElementById("undo")
    undoButton.addEventListener('click',goBack);

    redoBtn=document.getElementById("redo")
    redoBtn.addEventListener('click',goNext);

    button2=document.getElementById("pencil")
    button2.addEventListener('click',ChooseLine);
    doodleT2=document.getElementById("pencil")
    doodleT2.addEventListener('click',chosedoodle);

    button3=document.getElementById("draw_square")
    button3.addEventListener('click',choserectangle);
    button3=document.getElementById("draw_square")
    button3.addEventListener('touchstart',choseTrectangle);


    button4=document.getElementById("draw_circle")
    button4.addEventListener('click',drawcircle);
    button4=document.getElementById("draw_circle")
    button4.addEventListener('touchstart',drawTcircle);

    button5=document.getElementById("draw_triangle")
    button5.addEventListener('click',chosetraiangle);
    button5=document.getElementById("draw_triangle")
    button5.addEventListener('touchstart',choseTochTraiangle);
 

    button6=document.getElementById("draw_line")
    button6.addEventListener('click',choseSline);
    buttonLine=document.getElementById("draw_line")
    buttonLine.addEventListener('touchstart',choseTuchSline);
    

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

    // Help button window
    popupBtn=document.getElementById("help") 
    popupBtn.addEventListener('click',Mypopup)
    function Mypopup(){
        var windowFeatures = "left=1000,top=100,width=300,height=600";
         window.open(
          "html/help.html",
          "popup",
          windowFeatures
        );
    }
   
    





