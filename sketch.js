let circles = [];
let n = 59;
let max_v = 10;
let max_r = 100;
let t = 0, dt = 0.01, duration = 10;
let size = 600;

function setup() {
  createCanvas(600, 600); 
  background(50);

  //Draw the borders
  line(0,0,600,0);
  line(0,0,0,600);
  line(0,600,600,600);
  line(600,600,600,0);

  let protection = 0;
  while(circles.length < n){

	//Draw n circles of random diameters and masses
  	let circle = {
  		r: random(max_r),
  		v_x: random(2*max_v)-max_v,
  		v_y: random(2*max_v)-max_v,
  		c: [random(255),random(255),random(255)]
  	}
  	circle.x = random(width - 2*circle.r)+circle.r;
  	circle.y = random(height - 2*circle.r)+circle.r;
	circle.m = circle.r*circle.r;
	  

	// Ensure that no two circles overlap
  	let overlapping = false;
  	for (j = 0; j < circles.length; j++){
  		let other = circles[j]
  		let d = dist(circle.x,circle.y,other.x,other.y);
  		if (d < circle.r + other.r){
  			overlapping = true;
  			break;
  		}
  	}
  	if(!overlapping){
  		circles.push(circle);
	  }
	  
	// Protection ensures app doesn't crash
  	protection++
  	if(protection > 1000){
  		break;
  	}
	for (i = 0; i < circles.length; i++){
		fill('rgb(51, 221, 255)');
		// noStroke();
		ellipse(circles[i].x,circles[i].y,circles[i].r*2,circles[i].r*2);
	}
  	}
  return circles;  
}

function draw() {
	background(50);
	update();
	
}

function update(){
	for (i = 0; i < circles.length; i++){

		//Iterate over every circle and update its position and momentum
		circles[i].x += circles[i].v_x*dt;
		circles[i].y += circles[i].v_y*dt;
		// fill(circles[i].c);
		fill('rgb(51, 221, 255)');
  		// noStroke();
  		ellipse(circles[i].x,circles[i].y,circles[i].r*2,circles[i].r*2);

		//Check for collisions with walls, reflect on collision
  		if (circles[i].x > size-circles[i].r || circles[i].x < circles[i].r){
  			circles[i].v_x = -circles[i].v_x;
  		}
  		if (circles[i].y > size-circles[i].r || circles[i].y < circles[i].r){
  			circles[i].v_y = -circles[i].v_y;
  		} 

  		for (j = 0; j < circles.length; j++){

  			if(!(i===j)){

  				let X1 = createVector(circles[i].x,circles[i].y);
  				let V1 = createVector(circles[i].v_x,circles[i].v_y);
  				let V2 = createVector(circles[j].v_x,circles[j].v_y);
  				let X2 = createVector(circles[j].x,circles[j].y);

  				let dx = circles[i].x - circles[j].x;
  				let dy = circles[i].y - circles[j].y;
  				let dist = Math.sqrt(dx*dx + dy*dy);
 
				//Check for collision
  				if (dist <= circles[i].r + circles[j].r){
				  // console.log("collision!!");				  
  				let dir = createVector(dx,dy);

  				let dv_x = circles[i].v_x-circles[j].v_x;
  				let dv_y = circles[i].v_y-circles[j].v_y;

  				let v_dir = createVector(dv_x,dv_y);

  				let dot = v_dir.x*dir.x+v_dir.y*dir.y;

  				V1.x = V1.x - 2*circles[j].m/(circles[i].m + circles[j].m) * dot / (dist*dist) * dir.x ; //Calculate new velocity
  				V1.y = V1.y - 2*circles[j].m/(circles[i].m + circles[j].m) * dot / (dist*dist) * dir.y ;

  				dir = createVector(-dx,-dy);

  				V2.x = V2.x - 2*circles[i].m/(circles[i].m + circles[j].m) * dot / (dist*dist) * dir.x ; //Calculate new velocity
  				V2.y = V2.y - 2*circles[i].m/(circles[i].m + circles[j].m) * dot / (dist*dist) * dir.y ;

  				circles[i].v_x = V1.x;
  				circles[i].v_y = V1.y;
  				circles[j].v_x = V2.x;
  				circles[j].v_y = V2.y;

  				circles[i].x += 2*circles[i].v_x*dt;
				circles[i].y += 2*circles[i].v_y*dt; 
				circles[j].x += 2*circles[j].v_x*dt;
				circles[j].y += 2*circles[j].v_y*dt;
  				}
  			}
  		}
	}
}