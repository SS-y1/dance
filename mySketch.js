let song;
let img;
let fft;
let particles = [];
let dm2 = 50;
let dm1 = 100;
let dm3 = 40;
let dm4 = 45;
let n = 0;
let k = 10;
let o = 10;
let col= ["#F0F0F0","#AABFB9","#85B4F2","#F2B90C","#F0F0F0","#F2A81D","#F0F0F0","#F2D1CE","#B3F2EC",];


let w;//dark blue
let x;//pink
let y;//blue
let z;//yellow
let a;//opacity
let b;
let c;
let speed = 349;
let speeda = 319;
let speed1 = 200;
let speed2 = 0;
let m = 319;
let speedy = 1;
let j = 170;
let g = 0;
let l = 0;
let img1;
let img2;
let img3;
let img4;
let img5;

let space;
let stuff = [];

let ctx;
let amp1;

//1.预读器（新建函数用来读取上传的音频和图像）
function preload() {
  const musicUrl = callAndroid();
  song = loadSound(musicUrl);
  // song = loadSound("Everglow - Patrick Patrikios.mp3");
  img1 = loadImage("processingmoon.png");  // Load the image into the program
  img2 = loadImage("processingplanet1.png");
  img3= loadImage("processingplanet2.png");
  img4= loadImage("processingplanet3.png");
  img5= loadImage("processingufo.png");
 // space = loadImage("space.png");
}

//2.初始化
function setup() {
  createCanvas(windowWidth, 900); //创建画布

  colorMode(HSB);
 // song.play();
  amp1 = new p5.Amplitude();
//  amp.setInput(song);

  ctx = drawingContext;

  // img = createGraphics(width, height);
  // img.background(0).strokeWeight(3);
  // p = width/height; m = max(width,height);
  // for (let i=0; i<100; i++) { drawba(); }


  smooth();
  angleMode(DEGREES);//angleMode()函数用于设置解释角度的模式。可以将其设置为度或弧度。这里为度
  imageMode(CENTER);//imageMode()函数用于设置图像的图像模式
  rectMode(CENTER); //rectMode(CENTER) 将rect() 的前两个参数解释为形状的中心点，而第三和第四个参数是它的宽度和高度。
  fft = new p5.FFT(0.9); //快速傅立叶 0.9平滑值
 //img.filter(BLUR, 3); //图像滤镜，模糊背景
  noLoop();


  for (let i = 0; i < 100; i = i + 1) {
    let x = random(0, width);
    let y = random(0, height);
    stuff[i] = createStuff(x, y);
  }
}
//3.开始绘制
function draw() {
  background(0);
  let vol = amp1.getLevel();
  // let vol = amp.getLevel(); //返回一个振幅读数

  ctx.shadowBlur = 30+vol*20;
  ctx.shadowColor="#EEE8AA";



 // image(space, windowWidth / 2, windowHeight / 2);
  for (let i = 0; i < 100; i = i + 1) {
    updateStuff(stuff[i]);
  }

  // scale(1);
  //
  // drawba();
  //fill(120);
  ellipse(0, 0, 20);

  translate(width / 2, height / 2);//将画面平移到中心
  fft.analyze(); //计算当前频谱并将其作为一个数组返回
  amp = fft.getEnergy(20, 200); //计算频谱的振幅 获得频率为20-200的振幅



  translate(0, 0);

  {
    scale(1);
    image(img1,400,20);
    scale(0.8);
    if ((m<339 || (m > 359))){
      speedy = speedy * -1;
    }
    m=m + speedy;
  }
  ctx.shadowBlur = 20+vol*30;
  ctx.shadowColor="#EEE8AA";
  image(img2,width/2/5*4+100,m-250+vol*60);

  if ((j<190 || (j>210))){
    speedy = speedy * -1;
  }
  j=j + speedy;
  image(img3,width/2/5*2+100,j-450);


  if ((g<-60 || (g>60))){
    speedy = speedy * -1;
  }
  g=g + speedy;
  image(img4,-width/5*2,g-200-vol*60);

  if ((l<-150 || (l>150))){
    speedy = speedy * -1;
  }
  l=l + speedy;
  image(img5,-width/2/5*3+100,l+280);




  // ctx.shadowBlur = 5;
  // ctx.shadowColor="#EEE8AA";

  scale(0.9);

  drawPeo();

}

// function drawba() {
//  // translate(0, 0);
//   if (random()>sin(frameCount/1000)+0.85) { d = 100; img.fill(0,100).noStroke(); }
//   else { d = 250; img.noFill().stroke(random(200),random(120),random(120),random(120)); }
//   for (let i=0; i<50; i++) { img.circle(random(width), random(height), random(m/d/3,m/d)); }
//   for (let i=0; i<3;  i++) { img.image(img,-1,-1/p,width+2+random(-0.5,0.5),height+2/p+random(-0.5,0.5)); }
//   image(img,width/2,height/2);
//
// }


//点击播放音乐，再点击停止播放
function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.play();
    loop();
  }
}

//粒子系统类
class Particle {
  constructor() {
    //创建粒子
    this.pos = p5.Vector.random2D().mult(80); //从随机角度生成一个新的二维单位向量
    //mult(200)从圆的内半径开始显示粒子
    //方向：（0，0）表示任意方向
    this.vel = createVector(0, 0);//创建一个有大小及方向的向量，x，y方向上的分量为0
    //cope将像素区域从一个图像复制到另一个图像
    //粒子生成速度
    this.acc = this.pos.copy().mult(random(0.005, 0.0005));
    this.w = random(4, 6); //为粒子创建随机半径
   // this.color = [random(50, 255), random(100, 255), random(50, 255)];
    this.color = col[0];
  }
  //更新粒子
  update(cond) {
    //为向量添加速度
    this.vel.add(this.acc);
    //为粒子添加方向
    this.pos.add(this.vel);
    //当振幅大于230时,给粒子加速
    if (cond) {
      this.pos.add(this.vel);
      this.pos.add(this.vel);
      this.pos.add(this.vel);
    }
  }
  //粒子角度
  edges() {
    if (
      this.pos.x < -width / 2 ||
      this.pos.x > width / 2 ||
      this.pos.y < -height / 2 ||
      this.pos.y > height / 2
    ) {
      return true;
    } else {
      return false;  //超出边界
    }
  }
  //展示粒子
  show() {
    noStroke();
    fill("#FFFF00");
    ellipse(this.pos.x, this.pos.y, this.w);
  }
}

function drawPeo(){
  var len = song.duration();
  var currentLen = song.currentTime();
  translate(-8*o,8*o);
  translate(8*o,-12*o);

  if((currentLen>=len/10&&currentLen<len/5)){
    // translate(0,0)
    translate(-8*o,8*o);
    translate(12*o,8*o);
  }

  if(currentLen>=len/5&&currentLen<len/10*3){
    translate(-8*o,6*o);
    translate(2*o,8*o);
  }
  if(currentLen>=len/10*3&&currentLen<len/10*4){
    translate(-4*o,-5*o);
    translate(-4*o,5*o);

  }
  if(currentLen>=len/10*4&&currentLen<len/10*5){

    translate(4*o,6*o);
    translate(4*o,-6*o);
  }


  if(currentLen>=len/10*5&&currentLen<len/10*6){
    translate(-8*o,8*o);
    translate(8*o,-12*o);
  }
  if(currentLen>=len/10*6&&currentLen<len/10*7){
    translate(-8*o,6*o);
    translate(12*o,8*o);

  }
  if(currentLen>=len/10*7&&currentLen<len/10*8){
    translate(-8*o,6*o);
    translate(2*o,8*o);
  }
  if(currentLen>=len/10*8&&currentLen<len/10*9){
    translate(8*o,6*o);
    translate(6*o,-6*o);
  }
  if(currentLen>=len/10*9&&currentLen<len/10*10){
    translate(-6*o,-5*o);
    translate(-6*o,5*o);
  }

//  let level = int(amp.getLevel()*100);
  //translate(0,0);
  // scale(0.6); //扩大和收缩顶点，放大或缩小形状。形状物件将会从坐标系统的原点开始缩放
  if ((o<-500 || (o>500))){
    speedy = speedy * -1;
  }
  o=o + speedy;
  peo();

}
//绘制小人
function peo() {

  let vol = amp1.getLevel();
  let vol1 = int(amp1.getLevel()*100);

  let h = dist(mouseX,0,0,0); //dist两点间距离
  let c = map(h,0,windowWidth,0.8,2); //随鼠标移动
  let yaoX = 0+sin(amp*c)*30;
  let yaoY = -10-cos(amp*c)*15;
  let xiongX = 0-sin(amp*c)*20;
  let xiongY = -110;
  let raX = 90+sin(amp*c)*2;
  let raY = -90+cos(amp*c)*20;
  let leX = -90+sin(amp*c)*2;
  let leY = -90+cos(amp*c)*20;
  let rhX = 180+sin(amp*c*n)*10;
  let rhY = -120+cos(amp*c*k)*45;
  let lhX = -180+sin(amp*c*k)*10;
  let lhY =-120+cos(amp*c*n)*45;
  let rlX = 70+sin(amp*1.5*c)*20;
  let rlY = 90+cos(amp*c)*15;
  let llX = -70+sin(amp*1.5*c)*20;
  let llY = 90+cos(amp*c)*15;
  let rfX = 100+sin(amp/50*2*c)*20;
  let rfY = 200+cos(amp/50*2*c)*15;
  let lfX = -100+sin(amp/50*2*c)*20;
  let lfY = 200+cos(amp/50*2*c)*15;
  let hX = 0+sin(amp*c)*15;
  let hY = -185+cos(amp*c)*5;
  strokeWeight(6);
console.log(vol1);
  if(vol1>=0 && vol1<20){
    stroke("#FFE4C4");
    fill("#FFE4C4");
  }
  if(vol1>=20 && vol1<35){
    stroke("#F08080");
    fill("#F08080");

  }
  if(vol1>=35 ){
    stroke("#98FB98");
    fill("#98FB98");
  }


  line(yaoX,yaoY,xiongX,xiongY); //yaoxiong
  line(xiongX,xiongY,hX,hY);//xiongtou

  line(xiongX,xiongY,raX,raY);//youdabi
  line(xiongX,xiongY,leX,leY);//zuodabi

  line(yaoX,yaoY,rlX,rlY);//youdatui
  line(yaoX,yaoY,llX,llY);//zuodatui
  line(rlX,rlY,rfX,rfY);//youxioatui
  line(llX,llY,lfX,lfY);//zuoxiaotui
  strokeWeight(5);
  stroke(color("#8B4513"));
  line(raX,raY,rhX,rhY);//yuoxiaobi
  line(leX,leY,lhX,lhY);//zoushou
  noStroke();
  if(vol1>=0 && vol1<20){
    stroke("#FFE4C4");

  }
  if(vol1>=20 && vol1<35){
    stroke("#F08080");


  }
  if(vol1>=35 ){
    stroke("#98FB98");

  }


  ellipse(yaoX,yaoY,dm2); //yao
  ellipse(xiongX,xiongY,dm3);//xiong
  ellipse(hX,hY,dm1-vol*70);//tou
  ellipse(raX,raY,dm3);//youdabi
  ellipse(leX,leY,dm3);//zuodabi

  ellipse(rlX,rlY,dm4); //youxigai
  ellipse(llX,llY,dm4);//zuoxigai
  ellipse(rfX,rfY,dm4+vol*70);//youjiao
  ellipse(lfX,lfY,dm4+vol*70);//zuojiao
  noStroke();
  fill(color("#8B4513"));
  ellipse(rhX,rhY,30+vol*30);//yuoshou
  ellipse(lhX,lhY,30+vol*30);//zoushou
  n+=4;
  k += 8;




}

// function drawPeo(){
//   var len = song.duration();
//   var currentLen = song.currentTime();
//   peo();
//   if(currentLen>5){
//     translate(-200,-200);
//     //peo().remove();
//     peo();
//   }
// }
function createStuff(x, y) {

  let thing = {};
  thing.x = x;
  thing.y = y;
  thing.velX = random(-10, 10);
  thing.size = random(2, 8);
  thing.hue = (255, 255, 255);
  return thing;
}


function updateStuff(t) {
  t.x = t.x + t.velX;
  if (t.x > width || t.x < 0) {
    t.velX = t.velX * -1;
    t.size = t.size;
  }

  fill(t.hue, 0, 100);
  ellipse(t.x, t.y, t.size, t.size);
}
