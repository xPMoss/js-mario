class Controller{
    constructor(_player){
        document.addEventListener('keydown', logKey);
        document.addEventListener('keyup', logKeyUP);
        
        
        function logKey(e) {
            console.log(e.key)
            if (e.key == "ArrowRight" || e.key == "d") {
                _player.speed = unit*2;
                _player.direction = "R";
            
            }
            if (e.key == "ArrowLeft" || e.key == "a") {
                _player.speed = -2*unit;
                _player.direction = "L";
            
            }
            if (e.key == " ") {
                if (_player.isJumping == false) {
                    _player.isJumping = true;
                    //_player.isJumping = true;
                    //_player.speedY = 15*unit;
                } 
            
            }
            
            //console.log(e);
        
        }
        
        function logKeyUP(e) {
            if (e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "d" || e.key == "a") {
                _player.speed = 0;
              }
        
              if (e.key == " ") {
                _player.isJumping = false;
                //_player.speed = 0;
              }
              
            //console.log(e);
          
        }
        
    }

}

class Player{
    constructor(_posX, _posY){
        this.name = "player";
        this.type = "player";
        this.groundPosY = unit*200;
        this.posX = _posX;
        this.posY = _posY - this.groundPosY;
        this.relativPosX = unit*42;

        this.W = unit*16;
        this.H = unit*17;
        this.CM_W = this.W/10;
        this.CM_H = this.H/10;

        this.speedX = 0;
        this.speedY = 0;
        this.speed = 0;
        this.direction = "R";

        this.isFalling = true;
        this.isJumping = false;
        this.isMoving;
        this.isSelected;
        this.isClickable = true;
        this.isGrounded = false;
        this.isColliding = false;
        this.xCollision = false;
        this.obj;

        this.grounded = false;
        this.jump = false;
        this.jumpClock = 20;
        this.stats = {speed:1, normalSpeed:1, boostSpeed:5, attackSpeed:0, attackDmg:0, distance:0, vSpeed:5, lvl:0, energy:0, maxEnergy:100}

        this.T;
        this.R;
        this.B;
        this.L;
        this.x = new Array;

        this.controller = new Controller(this);
    }

    
    draw(){
        
        if(this.direction == "L"){
            this.moveL();
        }
        else{
            this.moveR();
        }

        this.Debug();
   
    }

    moveL(){

        // HEAD //
        ctx.fillStyle = "#eebb99";
        ctx.fillRect(unit*4 + this.posX, unit*3 + this.posY, unit*6, unit*5);
        ctx.fillRect(unit*10 + this.posX, unit*4 + this.posY, unit*1, unit*2);
        ctx.fillRect(unit*2 + this.posX, unit*4 + this.posY, unit*2, unit*2);
        ctx.fillRect(unit*1 + this.posX, unit*5 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*3 + this.posX, unit*7 + this.posY, unit*1, unit*1);


        // HAIR
        ctx.fillStyle = "brown";
        ctx.fillRect(unit*2 + this.posX, unit*6 + this.posY, unit*4, unit*1);
        ctx.fillRect(unit*4 + this.posX, unit*5 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*8 + this.posX, unit*3 + this.posY, unit*3, unit*1);
        ctx.fillRect(unit*9 + this.posX, unit*4 + this.posY, unit*1, unit*2);
        ctx.fillRect(unit*8 + this.posX, unit*5 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*11 + this.posX, unit*4 + this.posY, unit*1, unit*3);
        ctx.fillRect(unit*10 + this.posX, unit*6 + this.posY, unit*1, unit*1);
        
        // CAP //
        ctx.fillStyle = "red";
        ctx.fillRect(unit*5 + this.posX, unit*1 + this.posY, unit*5, unit*1);
        ctx.fillRect(unit*2 + this.posX, unit*2 + this.posY, unit*9, unit*1);

        // EYE //
        ctx.fillStyle = "black";
        ctx.fillRect(unit*5 + this.posX, unit*3 + this.posY, unit*1, unit*2);
        
        // BODY //
        ctx.fillStyle = "blue";
        ctx.fillRect(unit*5 + this.posX, unit*8 + this.posY, unit*6, unit*1);
        ctx.fillRect(unit*2 + this.posX, unit*9 + this.posY, unit*10, unit*1);
        ctx.fillRect(unit*1 + this.posX, unit*10 + this.posY, unit*12, unit*1);
        ctx.fillRect(unit*3 + this.posX, unit*11 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*10 + this.posX, unit*11 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*2 + this.posX, unit*15 + this.posY, unit*3, unit*1);
        ctx.fillRect(unit*9 + this.posX, unit*15 + this.posY, unit*3, unit*1);
        ctx.fillStyle = "red";
        ctx.fillRect(unit*5 + this.posX, unit*8 + this.posY, unit*1, unit*2);
        ctx.fillRect(unit*8 + this.posX, unit*8 + this.posY, unit*1, unit*2);
        ctx.fillRect(unit*5 + this.posX, unit*10 + this.posY, unit*4, unit*1);
        ctx.fillRect(unit*4 + this.posX, unit*11 + this.posY, unit*6, unit*2);
        ctx.fillRect(unit*3 + this.posX, unit*13 + this.posY, unit*3, unit*2);
        ctx.fillRect(unit*6 + this.posX, unit*13 + this.posY, unit*2, unit*1);
        ctx.fillRect(unit*8 + this.posX, unit*13 + this.posY, unit*3, unit*2);

        // HANDS //
        ctx.fillStyle = "#eebb99";
        ctx.fillRect(unit*1 + this.posX, unit*11 + this.posY, unit*2, unit*3);
        ctx.fillRect(unit*3 + this.posX, unit*12 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*10 + this.posX, unit*12 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*11 + this.posX, unit*11 + this.posY, unit*2, unit*3);

        // FEET //
        ctx.fillStyle = "brown";
        ctx.fillRect(unit*1 + this.posX, unit*16 + this.posY, unit*4, unit*1);
        ctx.fillRect(unit*9 + this.posX, unit*16 + this.posY, unit*4, unit*1);

    }

    moveR(){
        // HEAD //
        ctx.fillStyle = "#eebb99";
        ctx.fillRect(unit*3 + this.posX, unit*3 + this.posY, unit*7, unit*4);
        ctx.fillRect(unit*4 + this.posX, unit*7 + this.posY, unit*7, unit*1);
        ctx.fillRect(unit*10 + this.posX, unit*4 + this.posY, unit*2, unit*2);
        ctx.fillRect(unit*12 + this.posX, unit*5 + this.posY, unit*1, unit*1);

        // CAP //
        ctx.fillStyle = "red";
        ctx.fillRect(unit*4 + this.posX, unit*1 + this.posY, unit*5, unit*1);
        ctx.fillRect(unit*3 + this.posX, unit*2 + this.posY, unit*9, unit*1);

        // HAIR
        ctx.fillStyle = "brown";
        ctx.fillRect(unit*3 + this.posX, unit*3 + this.posY, unit*3, unit*1);
        ctx.fillRect(unit*4 + this.posX, unit*4 + this.posY, unit*1, unit*2);
        ctx.fillRect(unit*5 + this.posX, unit*5 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*2 + this.posX, unit*4 + this.posY, unit*1, unit*3);
        ctx.fillRect(unit*3 + this.posX, unit*6 + this.posY, unit*1, unit*1);

        ctx.fillRect(unit*9 + this.posX, unit*5 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*8 + this.posX, unit*6 + this.posY, unit*4, unit*1);
        
        // EYE //
        ctx.fillStyle = "black";
        ctx.fillRect(unit*8 + this.posX, unit*3 + this.posY, unit*1, unit*2);

        // BODY //
        ctx.fillStyle = "blue";
        ctx.fillRect(unit*3 + this.posX, unit*8 + this.posY, unit*6, unit*1);
        ctx.fillRect(unit*2 + this.posX, unit*9 + this.posY, unit*10, unit*1);
        ctx.fillRect(unit*1 + this.posX, unit*10 + this.posY, unit*12, unit*1);
        ctx.fillRect(unit*3 + this.posX, unit*11 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*10 + this.posX, unit*11 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*2 + this.posX, unit*15 + this.posY, unit*3, unit*1);
        ctx.fillRect(unit*9 + this.posX, unit*15 + this.posY, unit*3, unit*1);
        ctx.fillStyle = "red";
        ctx.fillRect(unit*5 + this.posX, unit*8 + this.posY, unit*1, unit*2);
        ctx.fillRect(unit*8 + this.posX, unit*8 + this.posY, unit*1, unit*2);
        ctx.fillRect(unit*5 + this.posX, unit*10 + this.posY, unit*4, unit*1);
        ctx.fillRect(unit*4 + this.posX, unit*11 + this.posY, unit*6, unit*2);
        ctx.fillRect(unit*3 + this.posX, unit*13 + this.posY, unit*3,unit* 2);
        ctx.fillRect(unit*6 + this.posX, unit*13 + this.posY, unit*2, unit*1);
        ctx.fillRect(unit*8 + this.posX, unit*13 + this.posY, unit*3, unit*2);

        // HANDS //
        ctx.fillStyle = "#eebb99";
        ctx.fillRect(unit*1 + this.posX, unit*11 + this.posY, unit*2, unit*3);
        ctx.fillRect(unit*3 + this.posX, unit*12 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*10 + this.posX, unit*12 + this.posY,unit* 1, unit*1);
        ctx.fillRect(unit*11 + this.posX, unit*11 + this.posY, unit*2, unit*3);

        // FEET //
        ctx.fillStyle = "brown";
        ctx.fillRect(unit*1 + this.posX, unit*16 + this.posY, unit*4, unit*1);
        ctx.fillRect(unit*9 + this.posX, unit*16 + this.posY, unit*4, unit*1);



    }

    Jump(){
        this.posY -= unit*10*this.jumpClock*0.1;
        this.jumpClock--;

    }

    update(){
        this.tempPosX = this.posX;
        this.tempPosY = this.posY;

        // JUMP //
        if (this.posY + this.H < this.groundPosY) {
            this.grounded = false;
        }
        else{
            this.grounded = true;
            this.jumpClock = 20;
            this.posY = this.groundPosY - this.H

        }

        
        
        if (this.grounded == false) {
            this.posY += unit*this.stats.vSpeed;

        }
        

        if(this.isJumping && this.jumpClock > 0){
            this.Jump();

        }
        
        if (this.jumpClock <= 0 && this.grounded == true) {
            this.isJumping = false;
            this.jumpClock = 20; 
            
        }

        

        this.T = this.posY;
        this.R = this.posX + this.W;
        this.B = this.posY + this.H;
        this.L = this.posX;

        this.collisionDetection();
        this.groundDetection();

        console.log();
        this.relativPosX += this.speed;
            canvasOffsetX = -this.speed;
            this.posX += this.speed;



        if(this.tempPosX != this.posX || this.tempPosY != this.posY){
            this.speedX = this.tempPosX - this.posX;
            this.speedY = this.tempPosY - this.posY;

            this.isMoving = true;
            
        }
        else{
            this.isMoving = false;
            this.speedX = 0;
            this.speedY = 0;
            
        }

        // OLD JUMP //
        /*
        if (this.speedY != null && this.speedY != 0) {
            this.posY -= this.speedY;
            
        }

        */
        
        /*
        if(this.B > this.groundPosY){ 
            this.posY = this.groundPosY - this.H;
            this.isJumping = false;
        }

        if(this.B < this.groundPosY){ 
            //this.isJumping = true;
            this.posY -= gravity;
        }

        if (this.isColliding == false) {
            this.groundPosY = unit*200;
        }


        if(this.T < 0){ 
            this.posY = 0;
        }

        if (this.tempPosY > this.posY) {
            //this.isJumping = true;
            this.isFalling = false;
        }

        if (this.tempPosY < this.posY) {
            //this.isJumping = false;
            this.isFalling = true;
        }

        if (this.tempPosY == this.posY){
            //this.isJumping = false;
            this.isFalling = false;

        }

        if (this.B < this.groundPosY){
            this.isGrounded = false;
            //console.log("isGrounded: " + this.isGrounded);
        }

        if (this.B >= this.groundPosY){
            this.isGrounded = true;
            //console.log("isGrounded: " + this.isGrounded);
        }
        */

        
    }

    groundDetection(){
        let condition;

        for (let j = 0; j < gameObjects.length; j++) {
            let obj = gameObjects[j];

            if (this.T <= obj.B -1 && this.R >= obj.L +5 && this.L <= obj.R -5 && this.B > obj.T -5) {
                if (this.B <= obj.B +5) {
                    /*
                    this.groundPosY = obj.posY;
                    condition = true;
                    this.isColliding = true;
                    */
                    if (obj.name == "castle" || obj.name == "flag") {
                        win = true;
                    }

                }
                
            }
            else {
                condition = false;
                //this.isColliding = false;
            }

        }

        return condition;
    }

    collisionDetection(){

        let collisionPointX;
        let collisionPointY;
        let distance = {
            x:0,
            y:0,
            v:0
        };
        
        let closest;

        let boxes = new Array();

        for (let i = 0; i < gameObjects.length; i++) {
            let go = gameObjects[i];

            if (go.name == "box") {
                boxes.push(go);
            }


        }
        
        for (let i = 0; i < boxes.length; i++) {
            let go = boxes[i];

            if (this.posX < go.posX) {
                distance.x = go.posX - this.posX;
            }
            else{
                distance.x = this.posX - go.posX;
            }
            
            if (this.posY < go.posY) {
                distance.y = go.posY - this.posY;
            }
            else{
                distance.y = this.posY - go.posY;
            }
            

            ctx.fillStyle = "black";
            ctx.font = unit*4 + "px Lucida Console";
            ctx.fillText(go.name + ": ["+ distance.x + ", " + distance.y + "]", this.posX + this.W, this.posY -(i+2)*5*unit );
            
        }

        for (let i = 0; i < gameObjects.length; i++) {
            let go = gameObjects[i];
            let vCollision = {x: go.posX - this.posX, y: go.posY - this.posY};
            let distanceTo = Math.sqrt((go.posX-this.posX)*(go.posX-this.posX) + (go.posY-this.posY)*(go.posY-this.posY));

            let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};

            let vRelativeVelocity = {x: this.vx - go.vx, y: this.vy - go.vy};
            let speedTo = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

            if (this.posX < go.posX) {
                distance.x = go.posX - this.posX;
            }
            else{
                distance.x = this.posX - go.posX;
            }
            
            if (this.posY < go.posY) {
                distance.y = go.posY - this.posY;
            }
            else{
                distance.y = this.posY - go.posY;
            }

            if (distance.x < this.W/2 + go.W/2 && distance.y < this.H/2 + go.H/2) {
                ctx.strokeStyle = "red";
                console.log("Collision");
                this.isColliding = true;


            }
            else{
                ctx.strokeStyle = "black";
                //this.isColliding = false;
            }
            
            if (go.name == "pipe" || go.name == "box") {
                ctx.lineWidth = unit*1;
                ctx.beginPath();
                ctx.moveTo(this.posX + this.W/2, this.posY + this.H/2);
                ctx.lineTo(go.posX + go.W/2, go.posY + this.H/2);
                ctx.closePath();
                ctx.stroke();
            }
            
            
        }


        



        for (let i = 0; i < gameObjects.length; i++) {
            let go = gameObjects[i];
            
        
            if (this.T < go.B && this.R > go.L && this.B > go.T && this.L < go.R ) {

                if (this.R > go.L || this.L < go.R) {
                    if (this.speedY > 0) {
                        this.posY = go.posY;
                    }
                }


                collisionPointX = this.posX - go.posX;
                collisionPointY = this.posY - go.posY;
                


                if (go.name == "castle" || go.name == "flag") {
                    win = true;
                }
                else{
                    //gameOver = true;

                }
                

            }

        }


        
        
    }

    Debug(){


        ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
        ctx.fillRect(this.L, this.T, this.W, this.H);

        // TOP //
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.posX, this.posY, this.W, unit*1);

        // R //
        ctx.fillStyle = "purple";
        ctx.fillRect(this.R, this.T, unit*1, this.H);

        // L //
        ctx.fillStyle = "red";
        ctx.fillRect(this.L, this.T, unit*1, this.H);


        // SPEED-X //
        ctx.strokeStyle = "green";
        ctx.lineWidth = unit*1;
        ctx.beginPath();
        ctx.moveTo(this.posX + this.W/2, this.posY + this.H/2);
        ctx.lineTo(this.posX + this.W/2 - this.speedX*10, this.posY + this.H/2);
        ctx.closePath();
        ctx.stroke();

        // SPEED-Y //
        ctx.strokeStyle = "red";
        ctx.lineWidth = unit*1;
        ctx.beginPath();
        ctx.moveTo(this.posX + this.W/2, this.posY + this.H/2);
        ctx.lineTo(this.posX + this.W/2, this.posY + this.H/2 - this.speedY*5);
        ctx.closePath();
        ctx.stroke();

        
        ctx.fillStyle = "black";
        ctx.font = unit*8 + "px Lucida Console";
        ctx.fillText(this.speedY, this.posX + this.W, this.posY);

        ctx.fillStyle = "black";
        ctx.font = unit*8 + "px Lucida Console";
        ctx.fillText("Relative Pos: " + this.relativPosX, this.posX-unit*180, unit*20);
        ctx.fillText("Position X: " + this.posX, this.posX-unit*180, unit*30);
        ctx.fillText("Speed X: " + this.speed, this.posX-unit*180, unit*40);
        ctx.fillText("Speed Y: " + this.speedY, this.posX-unit*180, unit*50);


        

    }
}

class brick{
    constructor(_posX, _posY){
        this.name = "brick";
        this.type = "obsticle";

        this.W = unit*16;
        this.H = unit*16;

        this.posX = _posX; // 88px fr botten
        this.posY = _posY;

        this.isJumping = false;
        this.isMoving;
        this.isSelected;
        this.isClickable = false;
        
        this.T;
        this.R;
        this.B;
        this.L;
    }

    draw(){

        // line //
        ctx.fillStyle = "#ffbfb3";
        ctx.fillRect(this.posX, this.posY, unit*16, unit*1);

        // bricks //
        ctx.fillStyle = "black";
        ctx.fillRect(this.posX, unit*1 + this.posY, unit*16, unit*15);
        

        // bricks //
        ctx.fillStyle = "#cb4f0f";
        ctx.fillRect(unit*0 + this.posX, unit*1 + this.posY, unit*7, unit*2);
        ctx.fillRect(unit*8 + this.posX, unit*1 + this.posY, unit*7, unit*2);

        ctx.fillRect(unit*0 + this.posX, unit*4 + this.posY, unit*3, unit*3);
        ctx.fillRect(unit*4 + this.posX, unit*4 + this.posY, unit*7, unit*3);
        ctx.fillRect(unit*12 + this.posX, unit*4 + this.posY, unit*4, unit*3);

        ctx.fillRect(unit*0 + this.posX, unit*8 + this.posY, unit*7, unit*3);
        ctx.fillRect(unit*8 + this.posX, unit*8 + this.posY, unit*7, unit*3);

        ctx.fillRect(unit*0 + this.posX, unit*12 + this.posY, unit*3, unit*3);
        ctx.fillRect(unit*4 + this.posX, unit*12 + this.posY, unit*7, unit*3);
        ctx.fillRect(unit*12 + this.posX, unit*12 + this.posY, unit*4, unit*3);


        
    }
    update(){
        this.T = this.posY;
        this.R = this.posX + this.W;
        this.B = this.posY + this.H;
        this.L = this.posX;
    }
}

class box{
    constructor(_posX, _posY){
        this.name = "box";
        this.type = "obsticle";

        this.W = unit*16;
        this.H = unit*16;

        this.posX = _posX; // 88px fr botten
        this.posY = _posY;

        this.isJumping = false;
        this.isMoving;
        this.isSelected = false;
        this.isClickable = false;
        
        this.T;
        this.R;
        this.B;
        this.L;
    }

    draw(){


        if (this.isSelected == false) {
            // line //
            ctx.fillStyle = "cb4f0f";
            ctx.fillRect(unit*1 + this.posX, unit*0 + this.posY, unit*14, unit*1);
            ctx.fillRect(unit*0 + this.posX, unit*1 + this.posY, unit*1, unit*14);

            ctx.fillStyle = "black";
            ctx.fillRect(unit*15 + this.posX, unit*1 + this.posY, unit*1, unit*14);
            ctx.fillRect(unit*0 + this.posX, unit*15 + this.posY, unit*16, unit*1);
            
            // main //
            ctx.fillStyle = "#ff9b3b";
            ctx.fillRect(unit*1 + this.posX, unit*1 + this.posY, unit*14, unit*14);

            ctx.fillStyle = "black";
            // ? //
            ctx.fillRect(unit*6 + this.posX, unit*4 + this.posY, unit*3, unit*1);
            ctx.fillRect(unit*5 + this.posX, unit*5 + this.posY, unit*2, unit*3);
            ctx.fillRect(unit*9 + this.posX, unit*5 + this.posY, unit*3, unit*4);
            ctx.fillRect(unit*8 + this.posX, unit*9 + this.posY, unit*2, unit*2);

            ctx.fillRect(unit*8 + this.posX, unit*12 + this.posY, unit*2, unit*2);
            // ? end//

            // ? //
            ctx.fillStyle = "#cb4f0f";
            ctx.fillRect(unit*5 + this.posX, unit* 3 + this.posY, unit*5, unit*1);
            ctx.fillRect(unit*4 + this.posX, unit*4 + this.posY, unit*2, unit*3);
            ctx.fillRect(unit*9 + this.posX, unit*4 + this.posY, unit*2, unit*3);
            ctx.fillRect(unit*8 + this.posX, unit*7 + this.posY, unit*3, unit*1);
            ctx.fillRect(unit*7 + this.posX, unit*8 + this.posY, unit*2, unit*2);

            ctx.fillRect(unit*7 + this.posX, unit*11 + this.posY, unit*2, unit*2);
            
            
            ctx.fillStyle = "black";
            ctx.fillRect(unit*2 + this.posX, unit*2 + this.posY, unit*1, unit*1);
            ctx.fillRect(unit*13 + this.posX, unit*2 + this.posY, unit*1, unit*1);
            ctx.fillRect(unit*13 + this.posX, unit*13 + this.posY, unit*1, unit*1);
            ctx.fillRect(unit*2 + this.posX, unit*13 + this.posY, unit*1, unit*1);
        }
        else{
            // line //
            ctx.fillStyle = "black";
            ctx.fillRect(unit*1 + this.posX, unit*0 + this.posY, unit*14, unit*1);
            ctx.fillRect(unit*0 + this.posX, unit*1 + this.posY, unit*1, unit*14);
            ctx.fillRect(unit*15 + this.posX, unit*1 + this.posY, unit*1, unit*14);
            ctx.fillRect(unit*1 + this.posX, unit*15 + this.posY, unit*14, unit*1);

            // main //
            ctx.fillStyle = "#cb4f0f";
            ctx.fillRect(unit*1 + this.posX, unit*1 + this.posY, unit*14, unit*14);

            ctx.fillStyle = "black";
            ctx.fillRect(unit*2 + this.posX, unit*2 + this.posY, unit*1, unit*1);
            ctx.fillRect(unit*13 + this.posX, unit*2 + this.posY, unit*1, unit*1);
            ctx.fillRect(unit*13 + this.posX, unit*13 + this.posY, unit*1, unit*1);
            ctx.fillRect(unit*2 + this.posX, unit*13 + this.posY, unit*1, unit*1);
        }
        



        /*
        
        */
        
    }
    update(){
        this.T = this.posY;
        this.R = this.posX + this.W;
        this.B = this.posY + this.H;
        this.L = this.posX;
    }
}

class groundTile{
    constructor(_posX, _posY){
        this.name = "groundTile";
        this.type = "ground";

        this.W = unit*16;
        this.H = unit*16;

        this.posX = _posX; // 88px fr botten
        this.posY = _posY;

        this.isJumping = false;
        this.isMoving;
        this.isSelected;
        this.isClickable = false;
        
        this.T;
        this.R;
        this.B;
        this.L;
    }

    draw(){
        ctx.fillStyle = "#ffbfb3";
        ctx.fillRect(unit*0 + this.posX, unit*0 + this.posY, unit*16, unit*16);

        ctx.fillStyle = "#cb4f0f";
        ctx.fillRect(unit*1 + this.posX, unit*1 + this.posY, unit*15, unit*15);
        ctx.fillRect(unit*0 + this.posX, unit*0 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*10 + this.posX, unit*0 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*15 + this.posX, unit*0 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*0 + this.posX, unit*15 + this.posY, unit*1, unit*1);


        ctx.fillStyle = "#ffbfb3";
        ctx.fillRect(unit*10 + this.posX, unit*1 + this.posY, unit*1, unit*4);
        ctx.fillRect(unit*10 + this.posX, unit*6 + this.posY, unit*1, unit*4);
        ctx.fillRect(unit*11 + this.posX, unit*6 + this.posY, unit*4, unit*1);
        ctx.fillRect(unit*1 + this.posX, unit*11 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*2 + this.posX, unit*12 + this.posY, unit*2, unit*1);
        ctx.fillRect(unit*4 + this.posX, unit*13 + this.posY, unit*3, unit*1);
        ctx.fillRect(unit*8 + this.posX, unit*12 + this.posY, unit*1, unit*4);
        ctx.fillRect(unit*9 + this.posX, unit*10 + this.posY, unit*1, unit*2);

        // line //
        ctx.fillStyle = "black";
        ctx.fillRect(unit*8 + this.posX, unit*10 + this.posY, unit*1, unit*2);
        ctx.fillRect(unit*0 + this.posX, unit*10 + this.posY, unit*2, unit*1);
        ctx.fillRect(unit*2 + this.posX, unit*11 + this.posY, unit*2, unit*1);
        ctx.fillRect(unit*4 + this.posX, unit*12 + this.posY, unit*4, unit*1);
        ctx.fillRect(unit*7 + this.posX, unit*13 + this.posY, unit*1, unit*2);
        ctx.fillRect(unit*11 + this.posX, unit*4 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*11 + this.posX, unit*5 + this.posY, unit*4, unit*1);
        ctx.fillRect(unit*9 + this.posX, unit*0 + this.posY, unit*1, unit*10);
        ctx.fillRect(unit*15 + this.posX, unit*1 + this.posY, unit*1, unit*4);
        ctx.fillRect(unit*15 + this.posX, unit*6 + this.posY, unit*1, unit*9);
        ctx.fillRect(unit*14 + this.posX, unit*14 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*1 + this.posX, unit*15 + this.posY, unit*6, unit*1);
        ctx.fillRect(unit*9 + this.posX, unit*15 + this.posY, unit*6, unit*1);
        
    }

    update(){
        this.T = this.posY;
        this.R = this.posX + this.W;
        this.B = this.posY + this.H;
        this.L = this.posX;
    }

}

class pipe{
    constructor(_posX, _posY){
        this.name = "pipe";
        this.type = "obsticle";

        this.W = unit*32;
        this.H = unit*64;

        this.posX = _posX;
        this.posY = _posY;

        this.isJumping = false;
        this.isMoving;
        this.isSelected;
        this.isClickable = false;

        this.T;
        this.R;
        this.B;
        this.L;
    }

    draw(){

        ctx.fillStyle = "black";
        ctx.fillRect(unit*0 + this.posX, unit*0 + this.posY, unit*32, unit*15);
        ctx.fillRect(unit*2 + this.posX, unit*15 + this.posY, unit* 28, unit*64);

        ctx.fillStyle = "#83d313";
        ctx.fillRect(unit*1 + this.posX, unit*1 + this.posY, unit*30, unit*13);
        ctx.fillRect(unit*3 + this.posX, unit*15 + this.posY, unit*26, unit*64);

        ctx.fillStyle = "#00ab00";
        ctx.fillRect(unit*1 + this.posX, unit*2 + this.posY, unit*5, unit*1);
        ctx.fillRect(unit*4 + this.posX, unit*3 + this.posY, unit*2, unit*11);
        ctx.fillRect(unit*12 + this.posX, unit*3 + this.posY, unit*2, unit*11);
        ctx.fillRect(unit*12 + this.posX, unit*2 + this.posY, unit*19, unit*1);
        ctx.fillRect(unit*16 + this.posX, unit*3 + this.posY, unit*10, unit*11);

        ctx.fillRect(unit*6 + this.posX, unit*15 + this.posY, unit*2, unit*64);
        ctx.fillRect(unit*13 + this.posX, unit*15 + this.posY, unit*1, unit*64);
        ctx.fillRect(unit*16 + this.posX, unit*15 + this.posY, unit*8, unit*64);
        
    }
    update(){        
        this.T = this.posY;
        this.R = this.posX + this.W;
        this.B = this.posY + this.H;
        this.L = this.posX;

    }
}

class pipeTop{
    constructor(_posX, _posY){
        this.name = "pipeTop";
        this.type = "obsticle";

        this.W = unit*32;
        this.H = unit*(64+15);

        this.posX = _posX;
        this.posY = _posY;

        this.isJumping = false;
        this.isMoving;
        this.isSelected;
        this.isClickable = false;

        this.T;
        this.R;
        this.B;
        this.L;
        this.ctx = ctx;
    }

    draw(){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(unit*0 + this.posX, unit*64 + this.posY, unit*32, unit*15);
        this.ctx.fillRect(unit*2 + this.posX, unit*0 + this.posY, unit*28, unit*64);


        
        this.ctx.fillStyle = "#83d313";
        this.ctx.fillRect(unit*1 + this.posX, unit*65 + this.posY, unit*30, unit*13);
        this.ctx.fillRect(unit*3 + this.posX, unit*0 + this.posY, unit*26, unit*64);
        
        this.ctx.fillStyle = "#00ab00";
        this.ctx.fillRect(unit*1 + this.posX, unit*76 + this.posY, unit*5, unit*1);
        this.ctx.fillRect(unit*4 + this.posX, unit*76 + this.posY, unit*2, unit*-11);
        this.ctx.fillRect(unit*12 + this.posX, unit*76 + this.posY, unit*2, unit*-11);
        this.ctx.fillRect(unit*12 + this.posX, unit*76 + this.posY, unit*19, unit*1);
        this.ctx.fillRect(unit*16 + this.posX, unit*76 + this.posY, unit*10, unit*-11);
        
        this.ctx.fillRect(unit*6 + this.posX, unit*0 + this.posY, unit*2, unit*64);
        this.ctx.fillRect(unit*13 + this.posX, unit*0 + this.posY, unit*1, unit*64);
        this.ctx.fillRect(unit*16 + this.posX, unit*0 + this.posY, unit*8, unit*64);
        
    }

    update(){        
        this.T = this.posY;
        this.R = this.posX + this.W;
        this.B = this.posY + this.H;
        this.L = this.posX;

    }
}

class block{
    constructor(_posX, _posY){
        this.name = "block";
        this.type = "obsticle";

        this.W = unit*16;
        this.H = unit*16;

        this.posX = _posX; // 88px fr botten
        this.posY = _posY;

        this.isJumping = false;
        this.isMoving;
        this.isSelected;
        this.isClickable = false;

        this.T;
        this.R;
        this.B;
        this.L;
        
    }

    draw(){

        // line //
        ctx.fillStyle = "#ffbfb3";
        ctx.fillRect(unit*0 + this.posX, unit*0 + this.posY, unit*16, unit*16);

        // bricks //
        ctx.fillStyle = "black";
        ctx.fillRect(unit*15 + this.posX, unit*0 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*14 + this.posX, unit*1 + this.posY, unit*2, unit*1);
        ctx.fillRect(unit*13 + this.posX, unit*2 + this.posY, unit*3, unit*1);
        ctx.fillRect(unit*12 + this.posX, unit*3 + this.posY, unit*4, unit*1);
        ctx.fillRect(unit*11 + this.posX, unit*4 + this.posY, unit*5, unit*1);
        ctx.fillRect(unit*10 + this.posX, unit*5 + this.posY, unit*6, unit*1);
        ctx.fillRect(unit*10 + this.posX, unit*6 + this.posY, unit*6, unit*8);


        ctx.fillRect(unit*3 + this.posX, unit*12 + this.posY, unit*13, unit*1);
        ctx.fillRect(unit*2 + this.posX, unit*13 + this.posY, unit*14, unit*1);
        ctx.fillRect(unit*1 + this.posX, unit*14 + this.posY, unit*15, unit*1);
        ctx.fillRect(unit*0 + this.posX, unit*15 + this.posY, unit*16, unit*1);


        // bricks //
        ctx.fillStyle = "#cb4f0f";
        ctx.fillRect(unit*0 + this.posX, unit*0 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*1 + this.posX, unit*1 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*2 + this.posX, unit*2 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*3 + this.posX, unit*3 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*4 + this.posX, unit*4 + this.posY, unit*8, unit*8);
        ctx.fillRect(unit*12 + this.posX, unit*12 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*13 + this.posX, unit*13 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*14 + this.posX, unit*14 + this.posY, unit*1, unit*1);
        ctx.fillRect(unit*15 + this.posX, unit*15 + this.posY, unit*1, unit*1);
        
    }
    update(){
        this.T = this.posY;
        this.R = this.posX + this.W;
        this.B = this.posY + this.H;
        this.L = this.posX;
    }
}

class flag{
    constructor(_posX, _posY){
        this.name = "flag";
        this.type = "obsticle";

        this.W = unit*16;
        this.H = unit*152;

        this.posX = _posX; // 88px fr botten
        this.posY = _posY;

        this.isJumping = false;
        this.isMoving;
        this.isSelected;
        this.isClickable = false;
        
    }

    draw(){

        // line //
        ctx.fillStyle = "#80d010";
        ctx.fillRect(unit*3 + this.posX, unit*40 + this.posY -32*unit, unit*2, unit*144);
        
        ctx.fillStyle = "#00a800";
        ctx.beginPath();
        ctx.arc(unit*4 + this.posX, unit*36 + this.posY -32*unit, unit*4, unit*0, 2 * Math.PI);
        ctx.lineWidth = unit*1;
        ctx.stroke();
        ctx.fill();
        
        ctx.fillStyle = "#80d010";
        ctx.fillRect(unit*1 + this.posX, unit*33 + this.posY-32*unit, unit*1, unit*2);
        ctx.fillRect(unit*2 + this.posX, unit*32 + this.posY-32*unit, unit*1, unit*1);

        ctx.fillStyle = "white";
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(-16*unit + this.posX, unit*42 + this.posY-32*unit);
        ctx.lineTo(unit*4 + this.posX, unit*42 + this.posY-32*unit);
        ctx.lineTo(unit*4 + this.posX, unit*(42+16) + this.posY-32*unit);
        ctx.closePath();
        ctx.lineWidth = unit*1;
        ctx.fill();

        ctx.fillStyle = "#00a800";
        ctx.beginPath();
        ctx.arc(-2*unit + this.posX, unit*46 + this.posY-32*unit, unit*3, unit*0, 2 * Math.PI);
        ctx.lineWidth = unit*1;
        ctx.fill();
        
    }
    update(){
        this.T = this.posY;
        this.R = this.posX + this.W;
        this.B = this.posY + this.H;
        this.L = this.posX;
    }
}

class castle{
    constructor(_posX, _posY){
        this.name = "castle";
        this.type = "obsticle";

        this.W = unit*80;
        this.H = unit*80;

        this.posX = _posX; // 88px fr botten
        this.posY = _posY;

        this.isJumping = false;
        this.isMoving;
        this.isSelected;
        this.isClickable = false;
        
        this.T;
        this.R;
        this.B;
        this.L;
    }

    draw(){

        //  //
        ctx.fillStyle = "white";
        ctx.fillRect(unit*34 + this.posX, -11*unit + this.posY, unit*11, unit*9);

        ctx.fillStyle = "#d82800";
        ctx.fillRect(unit*33 + this.posX, -11*unit + this.posY, unit*1, unit*11);

        ctx.fillStyle = "#fc9838";
        ctx.fillRect(unit*33 + this.posX, -14*unit + this.posY, unit*1, unit*3);
        ctx.fillRect(unit*32 + this.posX, -13*unit + this.posY, unit*3, unit*1);

        ctx.fillStyle = "#d82800";
        ctx.beginPath();
        ctx.arc(unit*39.5 + this.posX, -6.5*unit + this.posY, unit*3, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = "#ffbfb3";
        ctx.fillRect(unit*16 + this.posX, unit*0 + this.posY, unit*4, unit*7);
        ctx.fillRect(unit*(16+11) + this.posX, unit*0 + this.posY, unit*9, unit*7);
        ctx.fillRect(unit*(32+11) + this.posX, unit*0 + this.posY, unit*9, unit*7);
        ctx.fillRect(unit*(16+11+32) + this.posX, unit*0 + this.posY, unit*5, unit*7);

        // bkg //
        ctx.fillStyle = "black";
        ctx.fillRect(unit*16 + this.posX, unit*7 + this.posY, unit*48, unit*34);


        ctx.fillStyle = "#cb4f0f";
        ctx.fillRect(unit*16 + this.posX, unit*1 + this.posY, unit*3, unit*6);
        ctx.fillRect(unit*(16+12) + this.posX, unit*1 + this.posY, unit*7, unit*6);
        ctx.fillRect(unit*(16+12+16) + this.posX, unit*1 + this.posY, unit*7, unit*6);
        ctx.fillRect(unit*(16+12+16+16) + this.posX, unit*1 + this.posY, unit*4, unit*6);


        // bricks //
        ctx.fillStyle = "#cb4f0f";
        let tempY = 8;
        for (let i = 0; i < 4; i++) {
            for (let j = 16; j < 64; j+=8) {
                ctx.fillRect(unit*j + this.posX, unit*tempY + this.posY, unit*7, unit*3);
            }

            tempY += 4;
            ctx.fillRect(unit*16 + this.posX, unit*tempY + this.posY, unit*3, unit*3);
            for (let k = 20; k < 60; k+=8) {
                ctx.fillRect(unit*k + this.posX, unit*tempY + this.posY, unit*7, unit*3);
            }
            ctx.fillRect(unit*60 + this.posX, unit*tempY + this.posY, unit*4, unit*3);
            tempY += 4;
        }


        ctx.fillStyle = "#ffbfb3";
        ctx.fillRect(unit*0 + this.posX, unit*32 + this.posY, unit*5, unit*8);
        ctx.fillRect(unit*11 + this.posX, unit*32 + this.posY, unit*9, unit*8);
        ctx.fillRect(unit*27 + this.posX, unit*32 + this.posY, unit*9, unit*8);
        ctx.fillRect(unit*(27+16) + this.posX, unit*32 + this.posY, unit*9, unit*8);
        ctx.fillRect(unit*(27+16*2) + this.posX, unit*32 + this.posY, unit*9, unit*8);
        ctx.fillRect(unit*(27+16*3) + this.posX, unit*32 + this.posY, unit*5, unit*8);

        // bkg //
        ctx.fillStyle = "black";
        ctx.fillRect(unit*0 + this.posX, unit*39 + this.posY, unit*80, unit*41);

        // DOORS UPPER //
        ctx.fillRect(unit*24 + this.posX, unit*15 + this.posY, unit*8, unit*5);
        ctx.fillRect(unit*24 + this.posX, unit*18 + this.posY, unit*8, unit*5);
        ctx.fillRect(unit*24 + this.posX, unit*22 + this.posY, unit*8, unit*5);
        ctx.fillRect(unit*24 + this.posX, unit*26 + this.posY, unit*8, unit*5);

        ctx.fillRect(unit*48 + this.posX, unit*15 + this.posY, unit*8, unit*5);
        ctx.fillRect(unit*48 + this.posX, unit*18 + this.posY, unit*8, unit*5);
        ctx.fillRect(unit*48 + this.posX, unit*22 + this.posY, unit*8, unit*5);
        ctx.fillRect(unit*48 + this.posX, unit*26 + this.posY, unit*8, unit*5);

        // bricks //
        ctx.fillStyle = "#cb4f0f";
        tempY = 40;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 76; j+=8) {
                ctx.fillRect(unit*j + this.posX, unit*tempY + this.posY, unit*7, unit*3);
            }

            tempY += 4;
            ctx.fillRect(unit*0 + this.posX, unit*tempY + this.posY, unit*3, unit*3);
            for (let k = 4; k < 76; k+=8) {
                ctx.fillRect(unit*k + this.posX, unit*tempY + this.posY, unit*7, unit*3);
            }
            ctx.fillRect(unit*76 + this.posX, unit*tempY + this.posY, unit*4, unit*3);
            tempY += 4;
        }

        ctx.fillRect(unit*0 + this.posX, unit*33 + this.posY, unit*4, unit*6);
        ctx.fillRect(unit*12 + this.posX, unit*33 + this.posY, unit*7, unit*6);
        ctx.fillRect(unit*(12+16) + this.posX, unit*33 + this.posY, unit*7, unit*6);
        ctx.fillRect(unit*(12+32) + this.posX, unit*33 + this.posY, unit*7, unit*6);
        ctx.fillRect(unit*(12+48) + this.posX, unit*33 + this.posY, unit*7, unit*6);
        ctx.fillRect(unit*(12+64) + this.posX, unit*33 + this.posY, unit*4, unit*6);

        ctx.fillStyle = "#ffbfb3";
        ctx.fillRect(unit*19 + this.posX, unit*7 + this.posY, unit*9, unit*1);
        ctx.fillRect(unit*(19+16) + this.posX, unit*7 + this.posY, unit*9, unit*1);
        ctx.fillRect(unit*(19+32) + this.posX, unit*7 + this.posY, unit*9, unit*1);

        ctx.fillRect(unit*3 + this.posX, unit*39 + this.posY, unit*9, unit*1);
        ctx.fillRect(unit*(3+16) + this.posX, unit*39 + this.posY, unit*9, unit*1);
        ctx.fillRect(unit*(3+32) + this.posX, unit*39 + this.posY, unit*9, unit*1);
        ctx.fillRect(unit*(3+48) + this.posX, unit*39 + this.posY, unit*9, unit*1);
        ctx.fillRect(unit*(3+64) + this.posX, unit*39 + this.posY, unit*9, unit*1);

        // DOOR //
        ctx.fillStyle = "black";
        ctx.fillRect(unit*34 + this.posX, unit*(47+5) + this.posY, unit*16, unit*32);
        ctx.fillRect(unit*32 + this.posX, unit*(47+5) + this.posY, unit*8, unit*5);
        ctx.fillRect(unit*32 + this.posX, unit*(47+9) + this.posY, unit*8, unit*5);
        ctx.fillRect(unit*32 + this.posX, unit*(47+14) + this.posY, unit*8, unit*5);
        ctx.fillRect(unit*32 + this.posX, unit*(47+19) + this.posY, unit*8, unit*5);
        ctx.fillRect(unit*32 + this.posX, unit*(47+24) + this.posY, unit*8, unit*5);
        ctx.fillRect(unit*32 + this.posX, unit*(47+28) + this.posY, unit*8, unit*5);
        ctx.beginPath();
        ctx.arc(unit*41 + this.posX, unit*(50+2) + this.posY, unit*8, 0, 2 * Math.PI);
        ctx.fill();
    }

    update(){
        this.T = this.posY;
        this.R = this.posX + this.W;
        this.B = this.posY + this.H;
        this.L = this.posX;
    }

}

class background{
    constructor(){
        this.name = "bkg";
        this.type = "bkg";

        this.W = unit*2048;
        this.H = unit*224;

        this.posX = 0;
        this.posY = 0;

        this.isJumping = false;
        this.isMoving;
        this.isSelected;
        this.isClickable = false;
        this.cloud = document.getElementById("cloud")
        this.cloud_big = document.getElementById("cloud_big")
        this.bush3x = document.getElementById("bush3x")
        this.bush2x = document.getElementById("bush2x")
        this.bush1x = document.getElementById("bush1x")
    }

    draw(){

        // STOR KULLE //
        // 768 
        
        this.bigHill(unit*0);
        this.bigHill(unit*768);
        this.bigHill(unit*1536);
        this.bigHill(unit*2304);
        this.bigHill(unit*3072);
        
        this.smallHill(unit*256);
        this.smallHill(unit*1024);
        this.smallHill(unit*1792);
        this.smallHill(unit*2560);
        this.smallHill(unit*3328);

        // CLOUDS //
        ctx.drawImage(this.cloud, unit*136, unit*40, unit*32, unit*24);
        ctx.drawImage(this.cloud, unit*312, unit*24, unit*32, unit*24);
        ctx.drawImage(this.cloud, unit*904, unit*40, unit*32, unit*24);
        ctx.drawImage(this.cloud, unit*1080, unit*24, unit*32, unit*24);
        ctx.drawImage(this.cloud, unit*1672, unit*40, unit*32, unit*24);
        ctx.drawImage(this.cloud, unit*1848, unit*24, unit*32, unit*24);
        ctx.drawImage(this.cloud, unit*2440, unit*40, unit*32, unit*24);
        ctx.drawImage(this.cloud, unit*2616, unit*24, unit*32, unit*24);
        ctx.drawImage(this.cloud, unit*3208, unit*40, unit*32, unit*24);

        ctx.drawImage(this.cloud_big, unit*440, unit*40, unit*48, unit*24); // 3x
        ctx.drawImage(this.cloud_big, unit*584, unit*24, unit*48, unit*24);
        ctx.drawImage(this.cloud_big, unit*1208, unit*24, unit*48, unit*24); // 3x
        ctx.drawImage(this.cloud_big, unit*1352, unit*24, unit*48, unit*24);
        ctx.drawImage(this.cloud_big, unit*1976, unit*24, unit*48, unit*24); // 3x
        ctx.drawImage(this.cloud_big, unit*2120, unit*24, unit*48, unit*24);
        ctx.drawImage(this.cloud_big, unit*2744, unit*24, unit*48, unit*24); // 3x
        ctx.drawImage(this.cloud_big, unit*2888, unit*24, unit*48, unit*24);
        
        ctx.drawImage(this.bush3x, unit*184, unit*184, unit*64, unit*16);
        ctx.drawImage(this.bush3x, unit*952, unit*184, unit*64, unit*16);
        ctx.drawImage(this.bush3x, unit*1720, unit*184, unit*64, unit*16);
        ctx.drawImage(this.bush3x, unit*2200, unit*184, unit*64, unit*16);
        

        ctx.drawImage(this.bush2x, unit*664, unit*184, unit*48, unit*16);
        ctx.drawImage(this.bush2x, unit*1448, unit*184, unit*48, unit*16);
         
        ctx.drawImage(this.bush1x, unit*376, unit*184, unit*32, unit*16);
        ctx.drawImage(this.bush1x, unit*1144, unit*184, unit*32, unit*16);
        ctx.drawImage(this.bush1x, unit*1912, unit*184, unit*32, unit*16);
        ctx.drawImage(this.bush1x, unit*2518, unit*184, unit*32, unit*16);
        ctx.drawImage(this.bush1x, unit*2680, unit*184, unit*32, unit*16);
        ctx.drawImage(this.bush1x, unit*3288, unit*184, unit*32, unit*16);
         
    }

    smallHill(_pX){
        let pX = _pX/unit;
        
        ctx.fillStyle = "#00a800";
        ctx.lineWidth = unit*1;
        ctx.beginPath();
        ctx.moveTo(unit*(0+pX), unit*200);
        ctx.lineTo(unit*(16+pX), unit*(200-16));
        ctx.lineTo(unit*(16+2+pX), unit*(200-17));
        ctx.lineTo(unit*(16+2+3+pX), unit*(200-18));
        ctx.lineTo(unit*(16+2+3+6+pX), unit*(200-18));
        ctx.lineTo(unit*(16+2+3+6+3+pX), unit*(200-16-1));
        ctx.lineTo(unit*(16+2+3+6+3+2+pX), unit*(200-16));
        ctx.lineTo(unit*(16+16+pX), unit*(200-16));
        ctx.lineTo(unit*(16+16+16+pX), unit*200);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.fillRect( unit*(25+pX), unit*188, unit*2, unit*4);
        ctx.fillRect( unit*(28+pX), unit*185, unit*3, unit*4);
        ctx.fillRect( unit*(29+pX), unit*184, unit*1, unit*6);


    }

    bigHill(_pX){
        let pX = _pX/unit;
        
        ctx.fillStyle = "#00a800";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(unit*(0+pX), unit*200);
        ctx.lineTo(unit*(32+pX), unit*(200-32));
        ctx.lineTo(unit*(32+2+pX), unit*(200-32-1));
        ctx.lineTo(unit*(32+2+3+pX), unit*(200-32-1-1));
        ctx.lineTo(unit*(32+2+3+6+pX), unit*(200-32-1-1));
        ctx.lineTo(unit*(32+2+3+6+3+pX), unit*(200-32-1));
        ctx.lineTo(unit*(32+2+3+6+3+2+pX), unit*(200-32));
        ctx.lineTo(unit*(32+16+pX), unit*(200-32));
        ctx.lineTo(unit*(32+16+32+pX), unit*200);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.fillRect( unit*(25+pX), unit*188 , unit*2, unit*4);
        ctx.fillRect( unit*(28+pX), unit*185 , unit*3, unit*4);
        ctx.fillRect( unit*(29+pX), unit*184 , unit*1, unit*6);
        
        ctx.fillRect( unit*(52+pX), unit*185, unit*3, unit*4);
        ctx.fillRect( unit*(49+4+pX), unit*184, unit*1, unit*6);

        ctx.fillRect( unit*(48+4-8+pX), unit*(185-16), unit*3, unit*4);
        ctx.fillRect( unit*(49+4-8+pX), unit*(184-16), unit*1, unit*6);
        ctx.fillRect( unit*(48+4-11+pX), unit*(185-16+3), unit*2, unit*4);
    }

}

class enemy{
    constructor(_posX, _posY, _minX, _maxX, _name){
        this.name = _name;
        this.type = "enemy";

        this.W = unit*16;
        this.H = unit*16;

        this.posX = _posX;
        this.posY = _posY;
        this.minX = _minX;
        this.maxX = _maxX;
        this.rndNr = Math.floor((Math.random() * 8) + 4) *0.1;
        
        this.speedX = unit*this.rndNr;

        this.isJumping = false;
        this.isMoving;
        this.isSelected;
        this.isClickable = false;

        if (this.name == "mush") {
            this.sprt1 = document.getElementById("mushroom1")
            this.sprt1_V = document.getElementById("mushroom1")
            this.sprt2 = document.getElementById("mushroom2")
            this.sprt2_V = document.getElementById("mushroom2")
        }

        if (this.name == "turtle") {
            this.sprt1 = document.getElementById("turtle1")
            this.sprt1_V = document.getElementById("turtle1_V")
            this.sprt2 = document.getElementById("turtle2")
            this.sprt2_V = document.getElementById("turtle2_V")
        }

        this.T;
        this.R;
        this.B;
        this.L;
    }

    draw(){
        if (frames < 12) {
            if (this.speedX < 0) {
                ctx.drawImage(this.sprt1, this.posX, this.posY, this.W, this.H);
            }
            else{
                ctx.drawImage(this.sprt1_V, this.posX, this.posY, this.W, this.H);
            }
        }
        else{
            if (this.speedX < 0) {
                ctx.drawImage(this.sprt2, this.posX, this.posY, this.W, this.H);
            }
            else{
                ctx.drawImage(this.sprt2_V, this.posX, this.posY, this.W, this.H);
            }
        }
        
         
    }
    update(){
        if (this.posX >= this.maxX - this.W) {
            this.speedX = -this.speedX
        }

        if (this.posX <= this.minX) {
            this.speedX = -this.speedX
        }

        this.posX += this.speedX;

        this.T = this.posY;
        this.R = this.posX + this.W;
        this.B = this.posY + this.H;
        this.L = this.posX;

        this.collisionDetection();
    }
    collisionDetection(){
        if (this.T < playerObj.B && this.R > playerObj.L && this.B > playerObj.T && this.L < playerObj.R) {
            //infoP2.innerHTML = "ENEMY COLLISION!";
            gameOver = true;
        }

    }

}

class hole{
    constructor(_posX, _posY){
        this.name = "hole";
        this.type = "trigger";

        this.W = unit*32;
        this.H = unit*64;

        this.posX = _posX;
        this.posY = _posY;

        this.isJumping = false;
        this.isMoving;
        this.isSelected;
        this.isClickable = false;

        this.T;
        this.R;
        this.B;
        this.L;
    }

    draw(){
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.fillRect(unit*0 + this.posX, 0, unit*32, canvas.height);
        
    }
    update(){        
        this.T = this.posY;
        this.R = this.posX + this.W;
        this.B = this.posY + this.H;
        this.L = this.posX;

    }
}