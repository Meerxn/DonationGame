 
    function __triggerKeyboardEvent(el, keyCode)
    {
        var eventObj = document.createEventObject ?
            document.createEventObject() : document.createEvent("Events");
    
        if(eventObj.initEvent){
        eventObj.initEvent("keydown", true, true);
        }
    
        eventObj.keyCode = keyCode;
        eventObj.which = keyCode;
        
        el.dispatchEvent ? el.dispatchEvent(eventObj) : el.fireEvent("onkeydown", eventObj); 
    
    } 

    function traceEvent(e){
        $(".logs").prepend(jQuery("<li>").html(
        "Key = " + e.keyCode
        ).fadeIn());
        
        console.log(e);
    }

    function triggerKeyboardEvent(el, keyCode){
        var keyboardEvent = document.createEvent("KeyboardEvent");
        
        var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
    
    
        keyboardEvent[initMethod](
                        "keydown",
                            true,      // bubbles oOooOOo0
                            true,      // cancelable   
                            window,    // view
                            false,     // ctrlKeyArg
                            false,     // altKeyArg
                            false,     // shiftKeyArg
                            false,     // metaKeyArg
                            keyCode,  
                            0          // charCode   
        );
    
        el.dispatchEvent(keyboardEvent); 
    }

    $(document).ready(function(){
    
    document.addEventListener("keydown", function(e){
        traceEvent(e);
    });
    
    $(document).find("button").click(function(){
        __triggerKeyboardEvent(document.body, parseInt($(this).attr("data-key")));
    });

    $("#buttons-keyboard").find("button").click(function(){
        triggerKeyboardEvent(document.body, parseInt($(this).attr("data-key")));
    });
    
    /*
    setInterval(function(){
        __triggerKeyboardEvent(document.body, 13);
    }, 5000);
    */
    });





    window.onload=function() {

        canv=document.getElementById("canvasGrid");

        ctx=canv.getContext("2d");

        document.addEventListener("keydown",keyPush);

        setInterval(game,1000/15);

    }
 
 
    // console.log(Math.sqrt(screen.width));

    var clicks = 0; 
    var apple = new Image();
    apple.src = "Untitled-1.png";

    canvasGrid = canvaSize = 22;

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    posX = posY = getRandomInt(10);
    applePosX = applePosY = getRandomInt(20);
    

    velocityX=0;
    velocityY=0;

    snakeRoute=[];

    tail = 5;

    function game() {

        posX+=velocityX;

        posY+=velocityY;

        if(posX<0) {

            posX= canvaSize-1;

        }

        if(posX>canvaSize) {

            posX= 0;

        }

        if(posY<0) {

            posY= canvaSize-1;

        }

        if(posY>canvaSize-1) {

            posY= 0;

        }

        ctx.fillStyle="black";

        ctx.fillRect(0,0,canv.width,canv.height);



        ctx.fillStyle="yellow";

        for(var i=0;i<snakeRoute.length;i++) {

            ctx.fillRect(snakeRoute[i].x*canvasGrid,snakeRoute[i].y*canvasGrid-2,canvasGrid,canvasGrid);
        
            if(snakeRoute[i].x==posX && snakeRoute[i].y==posY && clicks > 0){
            
                gameOver();
            

            }


    }
    snakeRoute.push({x:posX,y:posY});


    while(snakeRoute.length>tail) {
        
        

    snakeRoute.shift();

    }



    if(applePosX==posX && applePosY==posY) {

        tail++;

        applePosX=getRandomInt(22);

        applePosY=getRandomInt(22);
        this.scoreUpdate();

    }

    ctx.fillStyle="red";

    ctx.drawImage(apple,applePosX*(canvasGrid) - 4,applePosY*canvasGrid -4,canvasGrid-4,canvasGrid-4);

    }
    function scoreUpdate(){
    this.clicks = this.clicks + 1;
    document.getElementById("score").innerHTML = clicks;
    donation = clicks/4
    document.getElementById("donation").innerHTML = donation;
    }
    
    function gameOver(){
        document.getElementById("score").innerHTML = 0;
        document.getElementById("donation").innerHTML = 0;
        alert("Your score was: " +  clicks +  " Take a screenshot of this page before clicking OK to the socials below. ");
        this.clicks = 0 ;

        // canvasGrid=canvaSize=20;
        // canvasGrid = 25;
        // canvaSize=25;

        // posX=posY=10;
        canvasGrid = canvaSize = 22;
        posX = posY = getRandomInt(20);
        applePosX = applePosY = getRandomInt(20);
    


        // applePosX=applePosY=15;

        velocityX=velocityY=0;

        snakeRoute=[];
        this.tail = 4;

    }

    function keyPush(evt) {

    switch(evt.keyCode) {

        case 37:
            evt.preventDefault()
                velocityX=-1;velocityY=0;

                break;

            case 38:
            evt.preventDefault()
                velocityX=0;velocityY=-1;

                break;

            case 39:
            evt.preventDefault()
                velocityX=1;velocityY=0;

                break;

            case 40:
            evt.preventDefault()
                velocityX=0;velocityY=1;

                break;

        }

    }
