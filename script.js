let w = 512;
let h = 224;
let unit = getWidth()/w;

// CANVAS //
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let scale = 1;
ctx.scale(scale, scale);
ctx.translate(0, 0);

let canvasOffsetX = 0;

function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
}
  
function getHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
}




canvas.setPointerCapture

let gameOver = false;
let win = false;

// OBJECTS //
let player;
let controller;
let enemies = new Array;
let gameObjects = new Array;
let holes = new Array;
let groundObjectsPre = new Array;
let groundObjects0 = new Array;
let groundObjects1 = new Array;
let groundObjects2 = new Array;
let groundObjects3 = new Array;
let groundObjectsPost = new Array;
let bkg;
let standableTiles = new Array;
// --- //
let gravity = -5*unit;


// INPUT //


var myVar = setInterval(timerFunc, 20);


function timerFunc(){
    if (player.isGrounded == false && timer < 100) {
        timer += 1;
        //console.log(timer);
    }
    else if (player.isGrounded == true) {
        timer = 0;

    }

    
    
}

function update(){

    if (gameOver == false && win == false) {
        logic();
        draw();

    }
    else if(win == true){
        winDraw();

    }
    else{
        goDraw();

    }


}

function logic(){
    if (frames < 25) {
        frames += 1;
    }
    else{
        frames = 0;
    }
    
}

// WIN SCREEN //
function winDraw(){
    
    ctx.clearRect(-320*unit, 0, unit*4096, canvas.height); // CLEAR CANVAS //

    ctx.resetTransform();

    ctx.fillStyle = "white";
    ctx.fillRect(-5*unit, -5*unit, canvas.width + unit*10, canvas.height + unit*10);

    ctx.fillStyle = "black";
    ctx.font = "20px Lucida Console";
    ctx.fillText("YOU WIN!", 200, 120);
}

// GAME OVER SCREEN //
function goDraw(){
    ctx.clearRect(-320, 0, 4096, canvas.height); // CLEAR CANVAS //

    ctx.resetTransform();

    ctx.fillStyle = "black";
    ctx.fillRect(-5, -5, canvas.width +10, canvas.height+10);

    ctx.fillStyle = "white";
    ctx.font = "20px Lucida Console";
    ctx.fillText("GAME OVER", 200, 120);
}

function draw(){
    ctx.clearRect(-320*unit, 0, unit*4096, canvas.height); // CLEAR CANVAS //

    bkg.draw();

    ctx.translate(canvasOffsetX, 0);


    for (let i = 0; i < enemies.length; i++) {
        //enemies[i].update();
        enemies[i].draw();
        
    }

    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].update();
        gameObjects[i].draw();

    }

    for (let i = 0; i < groundObjectsPre.length; i++) {
        groundObjectsPre[i].update();
        groundObjectsPre[i].draw();

    }

    for (let i = 0; i < groundObjects0.length; i++) {
        groundObjects0[i].update();
        groundObjects0[i].draw();

    }

    for (let i = 0; i < groundObjects1.length; i++) {
        groundObjects1[i].update();
        groundObjects1[i].draw();

    }

    for (let i = 0; i < groundObjects2.length; i++) {
        groundObjects2[i].update();
        groundObjects2[i].draw();

    }

    for (let i = 0; i < groundObjects3.length; i++) {
        groundObjects3[i].update();
        groundObjects3[i].draw();

    }

    for (let i = 0; i < groundObjectsPost.length; i++) {
        groundObjectsPost[i].update();
        groundObjectsPost[i].draw();

    }
    

    for (let i = 0; i < holes.length; i++) {
        holes[i].update();
        holes[i].draw();

    }

    player.update();
    player.draw();

}

function generateEnemies(){
    // ENEMIES //
    enemies[0] = new enemy(unit*320, unit*184, unit*0, unit*448, "mush");
    enemies[1] = new enemy(unit*650, unit*184, unit*640, unit*736, "mush");
    enemies[2] = new enemy(unit*800, unit*184, unit*768, unit*912, "mush");
    enemies[3] = new enemy(unit*1600, unit*184, unit*1424, unit*2144, "mush");
    enemies[4] = new enemy(unit*2700, unit*184, unit*2640, unit*2864, "mush");

    enemies[5] = new enemy(unit*500, unit*75, unit*400, unit*1280, "turtle");
     
    enemies[6] = new enemy(unit*1600, unit*40, unit*1412, unit*1932, "turtle");
    enemies[7] = new enemy(unit*2700, unit*50, unit*2112, unit*3000, "turtle");
    enemies[8] = new enemy(unit*2200, unit*85, unit*2112, unit*2950, "turtle");

}

function generateObsticles(){
    // GAME OBJECTS //
    gameObjects[0] = new box(unit*256, unit*136);

    gameObjects[1] = new brick(unit*320, unit*136);
    gameObjects[2] = new box(unit*(320+16), unit*136);
    gameObjects[3] = new brick(unit*352, unit*136);
    gameObjects[4] = new box(unit*368, unit*136);
    gameObjects[5] = new brick(unit*384, unit*136);
    gameObjects[6] = new box(unit*352, unit*72);

    // PIPES //
    gameObjects[7] = new pipe(unit*448, unit*168);
    gameObjects[8] = new pipe(unit*608, unit*152);
    gameObjects[9] = new pipe(unit*736, unit*136);
    gameObjects[10] = new pipe(unit*912, unit*136);


    gameObjects[11] = new box(unit*1024, unit*120);

    gameObjects[12] = new brick(unit*1232, unit*136);
    gameObjects[13] = new box(unit*(1232+16), unit*136);
    gameObjects[14] = new brick(unit*(1232+32), unit*136);

    // HIGH BRICKS //
    gameObjects[15] = new brick(unit*1280, unit*72);
    gameObjects[16] = new brick(unit*1296, unit*72);
    gameObjects[17] = new brick(unit*(1280+32), unit*72);
    gameObjects[18] = new brick(unit*(1280+16*3), unit*72);
    gameObjects[19] = new brick(unit*(1280+64), unit*72);
    gameObjects[20] = new brick(unit*(1280+16*5), unit*72);
    gameObjects[21] = new brick(unit*(1280+16*6), unit*72);
    gameObjects[22] = new brick(unit*(1280+16+7), unit*72);

    gameObjects[23] = new brick(unit*1456, unit*72);
    gameObjects[24] = new brick(unit*(1456+16), unit*72);
    gameObjects[25] = new brick(unit*(1456+16*2), unit*72);
    gameObjects[26] = new box(unit*(1456+16*3), unit*72);

    // //
    gameObjects[27] = new brick(unit*(1456+16*3), unit*136);

    gameObjects[28] = new brick(unit*1600, unit*136);
    gameObjects[29] = new box(unit*1616, unit*136);
    
    gameObjects[30] = new box(unit*1696, unit*136);
    gameObjects[31] = new box(unit*(1696 +32), unit*136);
    gameObjects[32] = new box(unit*(1696 +32+32), unit*136);

    gameObjects[33] = new box(unit*(1696 + 32), unit*72 );

    gameObjects[34] = new brick(unit*1888, unit*136);
    
    gameObjects[35] = new brick(unit*1936, unit*72);
    gameObjects[36] = new brick(unit*(1936+16), unit*72);
    gameObjects[37] = new brick(unit*(1936+32), unit*72);

    gameObjects[38] = new brick(unit*2048, unit*72);
    gameObjects[39] = new box(unit*(2048+16), unit*72);
    gameObjects[40] = new box(unit*(2048+16*2), unit*72);
    gameObjects[41] = new brick(unit*(2048+16*3), unit*72);
    
    gameObjects[42] = new brick(unit*(2048+16), unit*136);
    gameObjects[43] = new brick(unit*(2048+16*2), unit*136);

    let pX0 = 2144;
    // L-SIDE STAIRS //
    gameObjects[44] = new block(unit*pX0, unit*(200-16));
    gameObjects[45] = new block(unit*(pX0+16), unit*(200-16));
    gameObjects[46] = new block(unit*(pX0+16*2), unit*(200-16));
    gameObjects[47] = new block(unit*(pX0+16*3), unit*(200-16));
    gameObjects[48] = new block(unit*(pX0+16), unit*(200-32));
    gameObjects[49] = new block(unit*(pX0+16*2), unit*(200-32));
    gameObjects[50] = new block(unit*(pX0+16*3), unit*(200-32));
    gameObjects[51] = new block(unit*(pX0+16*2), unit*(200-48));
    gameObjects[52] = new block(unit*(pX0+16*3), unit*(200-48));
    gameObjects[53] = new block(unit*(pX0+16*3), unit*(200-64));
    // R-SIDE STAIRS //
    pX0 = 2240;
    gameObjects[54] = new block(unit*pX0, unit*(200-16));
    gameObjects[55] = new block(unit*(pX0+16), unit*(200-16));
    gameObjects[56] = new block(unit*(pX0+16*2), unit*(200-16));
    gameObjects[57] = new block(unit*(pX0+16*3), unit*(200-16));
    gameObjects[58] = new block(unit*pX0, unit*(200-32));
    gameObjects[59] = new block(unit*(pX0+16), unit*(200-32));
    gameObjects[60] = new block(unit*(pX0+16*2), unit*(200-32));
    gameObjects[61] = new block(unit*pX0, unit*(200-48));
    gameObjects[62] = new block(unit*(pX0+16), unit*(200-48));
    gameObjects[63] = new block(unit*pX0, unit*(200-64));

    // PIPES //
    gameObjects[64] = new pipe(unit*2608, unit*168);
    gameObjects[65] = new pipe(unit*2864, unit*168);

    // L-SIDE STAIRS //
    let pX1 = 2368;
    gameObjects[66] = new block(unit*pX1, unit*(200-16));
    gameObjects[67] = new block(unit*(pX1+16), unit*(200-16));
    gameObjects[68] = new block(unit*(pX1+16*2), unit*(200-16));
    gameObjects[69] = new block(unit*(pX1+16*3), unit*(200-16));
    gameObjects[70] = new block(unit*(pX1+16), unit*(200-32));
    gameObjects[71] = new block(unit*(pX1+16*2), unit*(200-32));
    gameObjects[72] = new block(unit*(pX1+16*3), unit*(200-32));
    gameObjects[73] = new block(unit*(pX1+16*2), unit*(200-48));
    gameObjects[74] = new block(unit*(pX1+16*3), unit*(200-48));
    gameObjects[75] = new block(unit*(pX1+16*3), unit*(200-64));
    gameObjects[76] = new block(unit*(pX1+16*4), unit*(200-64));
    gameObjects[77] = new block(unit*(pX1+16*4), unit*(200-64+16));
    gameObjects[78] = new block(unit*(pX1+16*4), unit*(200-32));
    gameObjects[79] = new block(unit*(pX1+16*4), unit*(200-32+16));
    // R-SIDE STAIRS //
    pX1 = 2480;
    gameObjects[80] = new block(unit*pX1, unit*(184));
    gameObjects[81] = new block(unit*(pX1+16), unit*(184));
    gameObjects[82] = new block(unit*(pX1+16*2), unit*(184));
    gameObjects[83] = new block(unit*(pX1+16*3), unit*184);
    gameObjects[84] = new block(unit*pX1, unit*(200-32));
    gameObjects[85] = new block(unit*(pX1+16), unit*(200-32));
    gameObjects[86] = new block(unit*(pX1+32), unit*(200-32));
    gameObjects[87] = new block(unit*pX1, unit*(200-48));
    gameObjects[88] = new block(unit*(pX1+16), unit*(200-48));
    gameObjects[89] = new block(unit*pX1, unit*(200-64));

    // BRICKS + BOX //
    gameObjects[90] = new brick(unit*2688, unit*136);
    gameObjects[91] = new brick(unit*(2688+16), unit*136);
    gameObjects[92] = new box(unit*(2688+32), unit*136);
    gameObjects[93] = new brick(unit*(2688+16*3), unit*136);
    
    // STAIRS END //
    let pX2 = 2896;
    gameObjects[94] = new block(unit*pX2, unit*(200-16));
    gameObjects[95] = new block(unit*(pX2+16), unit*184);
    gameObjects[96] = new block(unit*(pX2+16*2), unit*184);
    gameObjects[97] = new block(unit*(pX2+16*3), unit*184);
    gameObjects[98] = new block(unit*(pX2+16*4), unit*184);
    gameObjects[99] = new block(unit*(pX2+16*5), unit*184);
    gameObjects[100] = new block(unit*(pX2+16*6), unit*184);
    gameObjects[101] = new block(unit*(pX2+16*7), unit*184);
    gameObjects[102] = new block(unit*(pX2+16), unit*(200-32)); // <-| NEW ROW |-> //
    gameObjects[103] = new block(unit*(pX2+16*2), unit*(200-32));
    gameObjects[104] = new block(unit*(pX2+16*3), unit*(200-32));
    gameObjects[105] = new block(unit*(pX2+16*4), unit*(200-32));
    gameObjects[106] = new block(unit*(pX2+16*5), unit*(200-32));
    gameObjects[107] = new block(unit*(pX2+16*6), unit*(200-32));
    gameObjects[108] = new block(unit*(pX2+16*7), unit*(200-32));
    gameObjects[109] = new block(unit*(pX2+16*2), unit*(200-48)); // <-| NEW ROW |-> //
    gameObjects[110] = new block(unit*(pX2+16*3), unit*(200-48));
    gameObjects[111] = new block(unit*(pX2+16*4), unit*(200-48));
    gameObjects[112] = new block(unit*(pX2+16*5), unit*(200-48));
    gameObjects[113] = new block(unit*(pX2+16*6), unit*(200-48));
    gameObjects[114] = new block(unit*(pX2+16*7), unit*(200-48));
    gameObjects[115] = new block(unit*(pX2+16*3), unit*(200-64)); // <-| NEW ROW |-> //
    gameObjects[116] = new block(unit*(pX2+16*4), unit*(200-64));
    gameObjects[117] = new block(unit*(pX2+16*5), unit*(200-64));
    gameObjects[118] = new block(unit*(pX2+16*6), unit*(200-64));
    gameObjects[119] = new block(unit*(pX2+16*7), unit*(200-64));
    gameObjects[120] = new block(unit*(pX2+16*4), unit*(200-80)); // <-| NEW ROW |-> //
    gameObjects[121] = new block(unit*(pX2+16*5), unit*(200-80));
    gameObjects[122] = new block(unit*(pX2+16*6), unit*(200-80));
    gameObjects[123] = new block(unit*(pX2+16*7), unit*(200-80));
    gameObjects[124] = new block(unit*(pX2+16*5), unit*(200-96)); // <-| NEW ROW |-> //
    gameObjects[125] = new block(unit*(pX2+16*6), unit*(200-96));
    gameObjects[126] = new block(unit*(pX2+16*7), unit*(200-96));
    gameObjects[127] = new block(unit*(pX2+16*6), unit*(200-96-16)); // <-| NEW ROW |-> //
    gameObjects[128] = new block(unit*(pX2+16*7), unit*(200-96-16));
    gameObjects[129] = new block(unit*(pX2+16*7), unit*(200-96-32)); // <-| NEW ROW |-> //

    gameObjects[130] = new pipeTop(unit*2550, -50*unit);
    gameObjects[131] = new pipeTop(unit*1800, -50*unit);

    gameObjects[132] = new pipeTop(unit*1150, -30*unit);
    gameObjects[133] = new pipeTop(unit*800, -50*unit);
    gameObjects[134] = new pipeTop(unit*530, -50*unit);
}

function generateGround() {
    // GENERATE GROUND //
    // PRERUN //
    var groundOffsetX = 0;

    for (let i = 0; i < 10; i++) {
        groundObjectsPre[i] = new groundTile(groundOffsetX, canvas.height -unit*24);
        groundOffsetX -= unit*16;
        
    }
    
    groundOffsetX = 0;

    for (let i = 10; i < 10+10; i++) {
        groundObjectsPre[i] = new groundTile(groundOffsetX, canvas.height -unit*8);
        groundOffsetX -= unit*16;
    }

    // 1st CHUNK //
    var groundOffsetX = 0;
    for (let i = 0; i < 69; i++) {
        groundObjects0[i] = new groundTile(groundOffsetX, canvas.height -unit*24);
        groundOffsetX += unit*16;
        
    }
    
    groundOffsetX = 0;
    for (let i = 69; i < 69+69; i++) {
        groundObjects0[i] = new groundTile(groundOffsetX, canvas.height -unit*8);
        groundOffsetX += unit*16;
    }

    // 2nd CHUNK //
    var groundOffsetX = unit*1136;
    for (let i = 0; i < 15; i++) {
        groundObjects1[i] = new groundTile(groundOffsetX, canvas.height -unit*24);
        groundOffsetX += unit*16;
        
    }
    var groundOffsetX = unit*1136;
    for (let i = 15; i < 15+15; i++) {
        groundObjects1[i] = new groundTile(groundOffsetX, canvas.height -unit*8);
        groundOffsetX += unit*16;
        
    }

    // 3rd CHUNK //
    var groundOffsetX = unit*(69*16) + unit*(3*16) + unit*(15*16) + unit*(3*16);
    for (let i = 0; i < 63; i++) {
        groundObjects2[i] = new groundTile(groundOffsetX, canvas.height -unit*24);
        groundOffsetX += unit*16;
        
    }

    var groundOffsetX = unit*(69*16) + unit*(3*16) + unit*(15*16) + unit*(3*16);
    for (let i = 63; i < 63+63; i++) {
        groundObjects2[i] = new groundTile(groundOffsetX, canvas.height -unit*8);
        groundOffsetX += unit*16;
        
    }

    // 4th CHUNK //
    var groundOffsetX = unit*(69*16) + unit*(3*16) + unit*(64*16) + unit*(3*16) + unit*(2*16) + unit*(14*16);
    for (let i = 0; i < 65; i++) {
        groundObjects3[i] = new groundTile(groundOffsetX, canvas.height -unit*24);
        groundOffsetX += unit*16;
        
    }

    var groundOffsetX = unit*(69*16) + unit*(3*16) + unit*(64*16) + unit*(3*16) + unit*(2*16) + unit*(14*16);
    for (let i = 65; i < 65+65; i++) {
        groundObjects3[i] = new groundTile(groundOffsetX, canvas.height -unit*8);
        groundOffsetX += unit*16;
        
    }
 
    // ??? //
    let j = 0;
    let tempX = 3400;
    for (let i = 0; i < 13; i++) {
        groundObjectsPost[i] = new groundTile(unit*tempX, unit*j);
        
        //ctx.fillStyle = "black";
        //ctx.fillRect(unit*tempX, unit*j, unit*10, unit*32);
        //ctx.fill();

        j+=16;
        
    }

    j = 0;
    for (let i = 13; i < 13+13; i++) {
        groundObjectsPost[i] = new groundTile(unit*(tempX+16), unit*j);
        j+=16;
        
    }
}

function generateHoles() {
    holes.push(new hole(unit*1, canvas.height/2));

}

function start(){
    canvas.width = unit * w;
    canvas.height = unit * h;

    bkg = new background();

    player = new Player(unit*200, unit*(200 - 16));
   
    generateEnemies();
    generateObsticles();
    
    // FLAG //
    gameObjects[135] = new flag(unit*3172, unit*32);
    gameObjects[136] = new block(unit*3168, unit*(200-16));

    // CASTLE //
    gameObjects[137] = new castle(unit*(3168+64), unit*120);

    generateGround();
    generateHoles();
    

}


function loop(timestamp) {
    var progress = timestamp - lastRender;

    update(progress);

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}


start();

var timer = 0;
var frames = 0;
var lastRender = 0;
window.requestAnimationFrame(loop);


