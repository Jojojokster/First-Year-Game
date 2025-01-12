/*
	The Game Project Part 4 - Character Interaction
*/

var gameChar_x;
var gameChar_y;
var floorPos_y;

var canyons;
var collectables;
var flagpole;

//interaction variables
var isLeft;
var isRight;
var isFalling;
var isPlemmeting;

var treePos_x;
var treePos_y;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    cameraPosX = 0
    gameChar_x = width/2
    gameScore = 0
    

	canyons = [{x_pos: 2490, width: 150},{x_pos: 900, width: 150},
               {x_pos: 3100, width: 150},{x_pos: 3350, width: 150},
               {x_pos: 2680, width: 150},{x_pos: 2490, width: 150},
               {x_pos: 2870, width: 150},{x_pos: 1780, width: 150},
               {x_pos: 2000, width: 150},{x_pos: 2170, width: 150},
               {x_pos: 3530, width: 150},];
    
    treePos_x = [-1500,000, 100, 1500];
    treePos_y = floorPos_y - 143
    
    cloud = [
        {x_pos: 200, y_pos: 100, size: 1},
        {x_pos: 250, y_pos: 150, size: 1.1}
    ]
    
    mountain = [
        {x_pos: 150, y_pos: floorPos_y - 208},
        {x_pos: 600, y_pos: floorPos_y - 208},
        {x_pos: 1200, y_pos: floorPos_y - 208},
        {x_pos: 1500, y_pos: floorPos_y - 208},
        {x_pos: 2100, y_pos: floorPos_y - 208},
        {x_pos: 2500, y_pos: floorPos_y - 208},
        {x_pos: 3000, y_pos: floorPos_y - 208},
        {x_pos: 3100, y_pos: floorPos_y - 208},
        {x_pos: 3500, y_pos: floorPos_y - 208},
        {x_pos: 3700, y_pos: floorPos_y - 208},
        {x_pos: 3900, y_pos: floorPos_y - 208},
        {x_pos: 4100, y_pos: floorPos_y - 208},
        {x_pos: 4400, y_pos: floorPos_y - 208},
    ]
    
    isLeft = false;
    isRight = false;
    isFalling = false; 
    isPlemmeting = false;
    gameOver = false;
    levelComplete = false;
    
    collectables = [
        {x_pos: 1700, 
        y_pos: floorPos_y, 
        size: 1,
        isFound: false},
        {x_pos: 2480, 
        y_pos: floorPos_y, 
        size: 1,
        isFound: false},
        {x_pos: 3050, 
        y_pos: floorPos_y, 
        size: 1,
        isFound: false},
        {x_pos: 3340, 
        y_pos: floorPos_y, 
        size: 1,
        isFound: false},
        {x_pos: 3520, 
        y_pos: floorPos_y, 
        size: 1,
        isFound: false},
        {x_pos: 2850, 
        y_pos: floorPos_y, 
        size: 1,
        isFound: false},
        {x_pos: 3800, 
        y_pos: floorPos_y, 
        size: 1,
        isFound: false}
    ];
    
    flagpole = 
    {
        x_pos: 4000,
        y_pos: floorPos_y - 200,
        isReached: false,
        height: 200
    };
    
    flag =
    {
        x_pos: flagpole.x_pos,
        y_pos: floorPos_y - 80
    }
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
    
    push(translate(-cameraPosX, 0))
    
    cameraPosX = gameChar_x - width/2
    
	//draw the canyons
	noStroke();
	fill(92, 40, 0);
    for(var i = 0; i < canyons.length; i++){
	   rect(canyons[i].x_pos, floorPos_y, canyons[i].width, height -floorPos_y);
    }
    
    
    for(var i = 0; i < collectables.length; i++){
        if(dist(gameChar_x, gameChar_y, collectables[i].x_pos, collectables[i].y_pos) < collectables[i].size && !collectables[i].isFound){
                collectables[i].isFound = true
                gameScore += 1
            }
    }
    
    if(dist(gameChar_x, gameChar_y, flagpole.x_pos, flagpole.y_pos+200) < 20){
            flagpole.isReached = true
        }else{
            flagpole.isReached = false
        }
    
    if(gameChar_y > 700){
        gameOver = true
    }
    
    for(var i = 0; i < canyons.length; i++){
        if((gameChar_x > canyons[i].x_pos && gameChar_x < canyons[i].x_pos + canyons[i].width) && gameChar_y >= floorPos_y){
            isPlemmeting = true
        }
    }
    if(flagpole.isReached == true && flag.y_pos > flagpole.y_pos){
            flag.y_pos -= 2
            levelComplete = true
        }
    
    if(isPlemmeting && floorPos_y <= gameChar_y){
            isFalling = false,
            gameChar_y += 2
        }
    
    for(var i = 0; i < cloud.length; i++){
        //cloud
        fill(248,248,255)
        ellipse(cloud[i].x_pos,cloud[i].y_pos,
                150 * cloud[i].size,50 * cloud[i].size)
        ellipse(cloud[i].x_pos+15,cloud[i].y_pos+10,
                150 * cloud[i].size,50 * cloud[i].size)
        ellipse(cloud[i].x_pos+15,cloud[i].y_pos-10,
                150 * cloud[i].size,50 * cloud[i].size)
        ellipse(cloud[i].x_pos-25,cloud[i].y_pos+10,
                150 * cloud[i].size,50 * cloud[i].size)
        //cloud2
        fill(248,248,255)
        ellipse(cloud[i].x_pos+350,cloud[i].y_pos-10,
                150 * cloud[i].size,50 * cloud[i].size)
        ellipse(cloud[i].x_pos+365,cloud[i].y_pos,
                150 * cloud[i].size,50 * cloud[i].size)
        ellipse(cloud[i].x_pos+365,cloud[i].y_pos-20,
                150 * cloud[i].size,50 * cloud[i].size)
        ellipse(cloud[i].x_pos+325,cloud[i].y_pos,
                150 * cloud[i].size,50 * cloud[i].size)
        //cloud3
        fill(248,248,255)
        ellipse(cloud[i].x_pos+650,cloud[i].y_pos+20,
                150 * cloud[i].size,50 * cloud[i].size)
        ellipse(cloud[i].x_pos+665,cloud[i].y_pos+30,
                150 * cloud[i].size,50 * cloud[i].size)
        ellipse(cloud[i].x_pos+665,cloud[i].y_pos+10,
                150 * cloud[i].size,50 * cloud[i].size)
        ellipse(cloud[i].x_pos+625,cloud[i].y_pos+30,
                150 * cloud[i].size,50 * cloud[i].size)
    }
    
    for(var i = 0; i < mountain.length; i++){
        //Moutains
        fill(128,128,128)
        triangle(mountain[i].x_pos,mountain[i].y_pos,
                 mountain[i].x_pos-145,mountain[i].y_pos+208,
                 mountain[i].x_pos+155,mountain[i].y_pos+208)
        triangle(mountain[i].x_pos-95,mountain[i].y_pos+25,
                 mountain[i].x_pos-245,mountain[i].y_pos+208,
                 mountain[i].x_pos+55,mountain[i].y_pos+208)
        //Snow
        fill(255,250,250)
        triangle(mountain[i].x_pos,mountain[i].y_pos,
                 mountain[i].x_pos-45,mountain[i].y_pos+65,
                 mountain[i].x_pos+48,mountain[i].y_pos+65)
        triangle(mountain[i].x_pos-95,mountain[i].y_pos+25,
                 mountain[i].x_pos-35,mountain[i].y_pos+99,
                 mountain[i].x_pos-155,mountain[i].y_pos+99)
    }
    
    for(var i = 0; i < treePos_x.length; i++){
        //Tree
        fill(139,69,19)
        rect(treePos_x[i],treePos_y+31,15,113)
        //Tree Leaves
        fill(34,139,34)
        ellipse(treePos_x[i]-25,treePos_y-19,150,150)
        ellipse(treePos_x[i]-15,treePos_y-39,150,150)
        ellipse(treePos_x[i]+25,treePos_y+1,150,150)
        ellipse(treePos_x[i]+30,treePos_y-49,150,150)
        //Apples
        fill(255,0,0)
        ellipse(treePos_x[i]-10,treePos_y+1,10,10)
        ellipse(treePos_x[i]-5,treePos_y-19,10,10)
        ellipse(treePos_x[i]-40,treePos_y-39,10,10)
        ellipse(treePos_x[i]-30,treePos_y+31,10,10)
        ellipse(treePos_x[i]+20,treePos_y+21,10,10)
        ellipse(treePos_x[i],treePos_y-59,10,10)
        ellipse(treePos_x[i]+60,treePos_y-19,10,10)
    }
    
    //Diamond
    for(var i = 0; i < collectables.length; i++){
        if(!collectables[i].isFound){
            fill(0,255,255)
            triangle(collectables[i].x_pos,collectables[i].y_pos,
                     collectables[i].x_pos-15,collectables[i].y_pos-35,
                     collectables[i].x_pos+15,collectables[i].y_pos-35) 
            triangle(collectables[i].x_pos,collectables[i].y_pos-70,
                     collectables[i].x_pos-15,collectables[i].y_pos-35,
                     collectables[i].x_pos+15,collectables[i].y_pos-35);
        }
    }
    
    //flagpole
    fill(255,250,250)
    rect(flagpole.x_pos,flagpole.y_pos,5,flagpole.height)
    //Flag
    fill(255,0,0)
    rect(flag.x_pos+5,flag.y_pos,90,60)
    

	//the game character
	if(isLeft && (isFalling || isPlemmeting))
	{
		// add your jumping-left code.
        fill(0,0,0);
        //chest
        rect(gameChar_x-2, gameChar_y-50 , 5, 30);
        //legs
        fill(0,0,0)
        rect(gameChar_x-11, gameChar_y-20, 10, 3);
        rect(gameChar_x+2, gameChar_y-20, 3, 13);
        //right leg
        rect(gameChar_x-12, gameChar_y-17, 3, 11);
        //left leg
        rect(gameChar_x+5, gameChar_y-10, 11, 3);
        //Left arm
        fill(0,0,0);
        rect(gameChar_x-14, gameChar_y-50, 13, 3);
        rect(gameChar_x-14, gameChar_y-60, 3, 13);
        //left hand
        fill(139,69,19);
        rect(gameChar_x-14, gameChar_y-60, 3, 4);
        //right arm
        fill(0,0,0);
        rect(gameChar_x+1, gameChar_y-50, 13, 3);
        rect(gameChar_x+12, gameChar_y-50, 3, 13);
        //right hand
        fill(139,69,19);
        rect(gameChar_x+12, gameChar_y-40, 3, 4);
        //head
        fill(139,69,19);
        ellipse(gameChar_x, gameChar_y-58 , 15, 15);
        //glasses
        fill(0,0,0);
        arc(gameChar_x-4, gameChar_y-60, 5, 5, 0, PI);

	}
	else if(isRight && (isFalling || isPlemmeting))
	{
		// add your jumping-right code
        fill(0,0,0);
        //chest
        rect(gameChar_x-2, gameChar_y-50 , 5, 30);
        //legs
        fill(0,0,0)
        rect(gameChar_x+2, gameChar_y-20, 10, 3);
        rect(gameChar_x-4, gameChar_y-20, 3, 13);
        //right leg
        rect(gameChar_x+10, gameChar_y-17, 3, 11);
        //left leg
        rect(gameChar_x-13, gameChar_y-10, 11, 3);
        //right arm
        fill(0,0,0);
        rect(gameChar_x+1, gameChar_y-50, 13, 3);
        rect(gameChar_x+12, gameChar_y-60, 3, 13);
        //right hand
        fill(139,69,19);
        rect(gameChar_x+12, gameChar_y-60, 3, 4);
        //left arm
        fill(0,0,0);
        rect(gameChar_x-14, gameChar_y-50, 13, 3);
        rect(gameChar_x-14, gameChar_y-50, 3, 13);
        //left hand
        fill(139,69,19);
        rect(gameChar_x-14, gameChar_y-40, 3, 4);
        //head
        fill(139,69,19);
        ellipse(gameChar_x, gameChar_y-58 , 15, 15);
        //glasses
        fill(0,0,0);
        arc(gameChar_x+4, gameChar_y-60, 5, 5, 0, PI);

	}
	else if(isLeft)
	{
		// add your walking left code
        fill(0,0,0);
        //chest
        rect(gameChar_x-2, gameChar_y-50 , 5, 30);
        //legs
        fill(0,0,0);
        rect(gameChar_x-4, gameChar_y-20, 3, 7);
        rect(gameChar_x+2, gameChar_y-20, 3, 7);
        //left leg
        rect(gameChar_x-5, gameChar_y-13, 3, 11);
        rect(gameChar_x-5, gameChar_y-2, 3, 4);
        //right leg
        rect(gameChar_x+3, gameChar_y-13, 3, 11);
        rect(gameChar_x+4, gameChar_y-2, 3, 4);
        //left arm
        fill(0,0,0);
        rect(gameChar_x-5, gameChar_y-50, 3, 10);
        rect(gameChar_x-6, gameChar_y-40, 3, 10);
        //left hand
        fill(139,69,19);
        rect(gameChar_x-7, gameChar_y-30, 3, 4);
        //right arm
        fill(0,0,0);
        rect(gameChar_x+2, gameChar_y-50, 3, 10);
        rect(gameChar_x+3, gameChar_y-40, 3, 10);
        //right hand
        fill(139,69,19);
        rect(gameChar_x+4, gameChar_y-30, 3, 4);
        //head
        fill(139,69,19);
        ellipse(gameChar_x, gameChar_y-58 , 15, 15);
        //glasses
        fill(0,0,0);
        arc(gameChar_x-4, gameChar_y-60, 5, 5, 0, PI);

	}
	else if(isRight)
	{
		// add your walking right code
        fill(0,0,0);
        //chest
        rect(gameChar_x-2, gameChar_y-50 , 5, 30);
        //legs
        fill(0,0,0)
        rect(gameChar_x+2, gameChar_y-20, 3, 7);
        rect(gameChar_x-4, gameChar_y-20, 3, 7);
        //right leg
        rect(gameChar_x+3, gameChar_y-13, 3, 11);
        rect(gameChar_x+3, gameChar_y-2, 3, 4);
        //left leg
        rect(gameChar_x-5, gameChar_y-13, 3, 11);
        rect(gameChar_x-6, gameChar_y-2, 3, 4);
        //right arm
        fill(0,0,0);
        rect(gameChar_x+3, gameChar_y-50, 3, 10);
        rect(gameChar_x+4, gameChar_y-40, 3, 10);
        //right hand
        fill(139,69,19);
        rect(gameChar_x+5, gameChar_y-30, 3, 4);
        //left arm
        fill(0,0,0);
        rect(gameChar_x-4, gameChar_y-50, 3, 10);
        rect(gameChar_x-5, gameChar_y-40, 3, 10);
        //left hand
        fill(139,69,19);
        rect(gameChar_x-6, gameChar_y-30, 3, 4);
        //head
        fill(139,69,19);
        ellipse(gameChar_x, gameChar_y-58 , 15, 15);
        //glasses
        fill(0,0,0);
        arc(gameChar_x+4, gameChar_y-60, 5, 5, 0, PI);

	}
	else if(isFalling || isPlemmeting)
	{
		// add your jumping facing forwards code
        fill(0,0,0);
        //chest
        rect(gameChar_x-5, gameChar_y-50 , 10, 30);
        //legs
        rect(gameChar_x-6, gameChar_y-20, 3, 11);
        rect(gameChar_x+3, gameChar_y-20, 3, 22);
        //Shoulders
        rect(gameChar_x, gameChar_y-50 , 10, 2);
        rect(gameChar_x-10, gameChar_y-50 , 10, 2);
        //arms
        rect(gameChar_x-12, gameChar_y-50, 11, 3);
        rect(gameChar_x+1, gameChar_y-50, 11, 3);
        //elbows
        rect(gameChar_x-23, gameChar_y-52, 11, 3);
        rect(gameChar_x+12, gameChar_y-52, 11, 3);
        //head
        fill(139,69,19);
        ellipse(gameChar_x, gameChar_y-58 , 15, 15);
        //Hands
        fill(139,69,19);
        rect(gameChar_x-23, gameChar_y-52, 5, 3);
        rect(gameChar_x+18, gameChar_y-52, 5, 3);
        //Shirt upper
        fill(255,255,245);
        triangle(gameChar_x-3, gameChar_y-50, 
                 gameChar_x+3, gameChar_y-50, 
                 gameChar_x, gameChar_y-35);
        //shirt middle
        fill(0,0,0);
        triangle(gameChar_x-1, gameChar_y-50, 
                 gameChar_x+1, gameChar_y-50, 
                 gameChar_x, gameChar_y-48);
        triangle(gameChar_x-3, gameChar_y-20, 
                 gameChar_x+3, gameChar_y-20, 
                 gameChar_x, gameChar_y-48);
        //glasses
        arc(gameChar_x-3, gameChar_y-60, 5, 5, 0, PI);
        arc(gameChar_x+3, gameChar_y-60, 5, 5, 0, PI);
        rect(gameChar_x-1, gameChar_y-60, 5, 1);

	}
	else
	{
		// add your standing front facing code
        fill(0,0,0);
        //chest
        rect(gameChar_x-5, gameChar_y-50 , 10, 30);
        //legs
        rect(gameChar_x-6, gameChar_y-20, 3, 22);
        rect(gameChar_x+3, gameChar_y-20, 3, 22);
        //Shoulders
        rect(gameChar_x, gameChar_y-50 , 10, 2);
        rect(gameChar_x-10, gameChar_y-50 , 10, 2);
        //arms
        rect(gameChar_x-10, gameChar_y-50, 3, 22);
        rect(gameChar_x+7, gameChar_y-50, 3, 22);
        //head
        fill(139,69,19);
        ellipse(gameChar_x, gameChar_y-58 , 15, 15);
        //Elbows
        fill(139,69,19);
        rect(gameChar_x-10, gameChar_y-33, 3, 5);
        rect(gameChar_x+7, gameChar_y-33, 3, 5);
        //Shirt upper
        fill(255,255,245);
        triangle(gameChar_x-3, gameChar_y-50, gameChar_x+3,
                 gameChar_y-50, gameChar_x, gameChar_y-35);
        //shirt middle
        fill(0,0,0);
        triangle(gameChar_x-1, gameChar_y-50, gameChar_x+1,
                 gameChar_y-50, gameChar_x, gameChar_y-48);
        triangle(gameChar_x-3, gameChar_y-20, gameChar_x+3,
                 gameChar_y-20, gameChar_x, gameChar_y-48);
        //glasses
        arc(gameChar_x-3, gameChar_y-60, 5, 5, 0, PI);
        arc(gameChar_x+3, gameChar_y-60, 5, 5, 0, PI);
        rect(gameChar_x-1, gameChar_y-60, 5, 1);

	}
    
    pop()
    Score = "Score:" + gameScore
    text(Score ,cameraPosX+10,10)
    
    if(gameOver == true){
        fill(0,0,0)
        //G
        rect(cameraPosX+200, 100, 10, 150)
        rect(cameraPosX+200, 100, 100, 10)
        rect(cameraPosX+200, 250, 100, 10)
        rect(cameraPosX+300, 190, 10, 70)
        //A
        rect(cameraPosX+350, 100, 10, 160)
        rect(cameraPosX+350, 100, 100, 10)
        rect(cameraPosX+450, 100, 10, 160)
        rect(cameraPosX+350, 175, 100, 10)
        //M
        rect(cameraPosX+500, 100, 10, 160)
        rect(cameraPosX+500, 100, 45, 10)
        rect(cameraPosX+555, 100, 45, 10)
        rect(cameraPosX+545, 110, 10, 45)
        rect(cameraPosX+590, 100, 10, 160)
        //E
        rect(cameraPosX+650, 100, 10, 160)
        rect(cameraPosX+650, 100, 100, 10)
        rect(cameraPosX+650, 250, 100, 10)
        rect(cameraPosX+650, 175, 75, 10)
        //O
        rect(cameraPosX+200, 300, 10, 150)
        rect(cameraPosX+200, 300, 100, 10)
        rect(cameraPosX+200, 450, 100, 10)
        rect(cameraPosX+300, 300, 10, 160)
        //V
        rect(cameraPosX+350, 300, 10, 110)
        rect(cameraPosX+360, 410, 10, 10)
        rect(cameraPosX+370, 420, 10, 10)
        rect(cameraPosX+380, 430, 10, 10)
        rect(cameraPosX+390, 440, 10, 10)
        rect(cameraPosX+400, 450, 10, 10)
        rect(cameraPosX+410, 440, 10, 10)
        rect(cameraPosX+420, 430, 10, 10)
        rect(cameraPosX+430, 420, 10, 10)
        rect(cameraPosX+440, 410, 10, 10)
        rect(cameraPosX+450, 300, 10, 110)
        //E
        rect(cameraPosX+500, 300, 10, 160)
        rect(cameraPosX+500, 300, 100, 10)
        rect(cameraPosX+500, 450, 100, 10)
        rect(cameraPosX+500, 375, 75, 10)
        //R
        rect(cameraPosX+650, 300, 10, 150)
        rect(cameraPosX+650, 300, 100, 10)
        rect(cameraPosX+650, 360, 90, 10)
        rect(cameraPosX+650, 390, 10, 70)
        rect(cameraPosX+740, 300, 10, 60)
        rect(cameraPosX+740, 370, 10, 90)
    }
    
    if(levelComplete == true){
        fill(0,0,0)
        //W
        rect(cameraPosX+200, 100, 10, 160)
        rect(cameraPosX+200, 250, 45, 10)
        rect(cameraPosX+255, 250, 45, 10)
        rect(cameraPosX+245, 205, 10, 45)
        rect(cameraPosX+290, 100, 10, 160)
        //I
        rect(cameraPosX+320, 130, 10, 130)
        rect(cameraPosX+320, 100, 10, 20)
        //N
        rect(cameraPosX+350, 100, 10, 160)
        rect(cameraPosX+350, 100, 100, 10)
        rect(cameraPosX+440, 100, 10, 160)
        //N
        rect(cameraPosX+460, 100, 10, 160)
        rect(cameraPosX+460, 100, 100, 10)
        rect(cameraPosX+550, 100, 10, 160)
        //E
        rect(cameraPosX+570, 100, 10, 160)
        rect(cameraPosX+570, 100, 100, 10)
        rect(cameraPosX+570, 250, 100, 10)
        rect(cameraPosX+570, 175, 75, 10)
        //R
        rect(cameraPosX+680, 100, 10, 150)
        rect(cameraPosX+680, 100, 100, 10)
        rect(cameraPosX+680, 160, 90, 10)
        rect(cameraPosX+680, 190, 10, 70)
        rect(cameraPosX+770, 100, 10, 60)
        rect(cameraPosX+770, 170, 10, 90)
    }


	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    if(isLeft == true){
        gameChar_x -= 2;
    }else if(isRight == true){
        gameChar_x += 2;
    }
    if(gameChar_y < floorPos_y){
        gameChar_y += 1;
        isFalling = true;
    }else if(gameChar_y == floorPos_y){
        isFalling = false;
    }
    
}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    
     if(key == "l"){
        gameOver = true
    }

    if(!isPlemmeting && !gameOver && !levelComplete)
        {
            if(key == "a"){
                isLeft = true;
            }else if(key == "d"){
                isRight = true;
            }if(key == "w" && isFalling == false){
                gameChar_y -= 100;
            }
        }
    
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
    if(key == "a"){
        isLeft = false;
    }else if(key == "d"){
        isRight = false;
    }
}

