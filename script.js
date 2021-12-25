const canvas = document.querySelector("canvas");
const canvasLeft = canvas.offsetLeft;
const canvasTop = canvas.offsetTop;
const ctx = canvas.getContext("2d");
const chordName = document.getElementById("chordText");
const fretName = document.getElementById("fretText");
const clearButton = document.getElementById("clear-button");
const exportButton = document.getElementById("export-button");
const addButton = document.getElementById('add-button');
let text = "C"
let fret = "1th"
const circles = [];
//TODO：此处要用到节流
function chordNameChange(e) {
  const target = e.target;
  text = target.value;
  drawChordName();
}
function fretNameChange(e) {
  const target = e.target;
  fret = target.value;
  drawStartFret();
}
//绘制和弦名称 1.清除上一次输入的和弦 2.使文字居中
function drawChordName() {
  ctx.clearRect(0, 0, 400, 70);
  ctx.font = "40px Helvetica";
  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  const xPosition = canvas.width / 2 - textWidth / 2;
  ctx.fillText(text, xPosition, 60);
}
function drawStartFret() {
  ctx.clearRect(356, 40, 150, 150);
  ctx.font = "30px Helvetica";
  ctx.fillText(fret, 360, 115);
}
// 圆圈对象
function Circle(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
}
//初始化存储每个点的坐标
for (let i = 0; i <= 3; i++) {
  for (let j = 0; j <= 5; j++) {
    let x = 140 + j * 40;
    let y = 105 + i * 50;
    let radius = 14;
    //初始化存储每个圆的坐标数据
    let circle = new Circle(x, y, radius);
    circles.push(circle);
  }
}
function drawCircle(e) {
  const x = e.pageX - canvasLeft;
  const y = e.pageY - canvasTop;
  // console.log(`鼠标点击位置为[${x},${y}]`);
  circles.forEach(element => {
    if ((Math.sqrt(Math.pow((element.x - x), 2) + Math.pow((element.y - y), 2))) <= element.radius) {
      // console.log('点击了' + element);
      ctx.beginPath();
      ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
      //设置点击后的样式
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill()
    }
   }
  )
}
function newChord() {
  //画和弦框架
  ctx.beginPath();
  ctx.rect(140, 80, 200, 200);
  ctx.stroke();
  // 画琴弦
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(180 + 40 * i, 80);
    ctx.lineTo(180 + 40 * i, 280);
    ctx.moveTo(140, 130 + 50 * i)
    ctx.lineTo(340, 130 + 50 * i)
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}
//清除画布
function clearCanvas() {
  // 去除所有圆圈
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
//导出图片
function exportImage() {
  const data = canvas.toDataURL();
  const image = new Image();
  image.src = data;
  const url = window.open("");
  url.document.write(image.outerHTML);
}
chordName.addEventListener('keyup', chordNameChange, false);
fretName.addEventListener('keyup', fretNameChange, false);
canvas.addEventListener('click', drawCircle, false);
clearButton.addEventListener('click',clearCanvas,false);
exportButton.addEventListener('click',exportImage,false);
drawChordName();
drawStartFret();
newChord();
