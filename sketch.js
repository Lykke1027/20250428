let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background(245, 245, 220); // 米色背景 (RGB: 245, 245, 220)
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上

  // 建立與攝影機影像一樣大小的 overlayGraphics
  overlayGraphics = createGraphics(capture.width, capture.height);
}

function draw() {
  background(245, 245, 220); // 確保背景為米色

  // 檢查攝影機是否準備好
  if (capture.loadedmetadata) {
    translate(width, 0); // 將畫布的原點移到右上角
    scale(-1, 1); // 水平翻轉畫布

    // 顯示攝影機影像
    image(
      capture,
      (width - capture.width) / 2, // 計算影像水平置中位置
      (height - capture.height) / 2 // 計算影像垂直置中位置
    );

    // 更新 overlayGraphics 並顯示在攝影機影像上方
    drawOverlayGraphics();
    image(
      overlayGraphics,
      (width - capture.width) / 2, // 與攝影機影像水平對齊
      (height - capture.height) / 2 // 與攝影機影像垂直對齊
    );
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 更新影像大小

  // 更新 overlayGraphics 的大小
  overlayGraphics = createGraphics(capture.width, capture.height);
}

function drawOverlayGraphics() {
  overlayGraphics.background(0); // 設定背景為黑色
  overlayGraphics.noStroke();

  // 每隔 20 繪製一個方框和圓
  for (let y = 0; y < overlayGraphics.height; y += 20) {
    for (let x = 0; x < overlayGraphics.width; x += 20) {
      // 從 capture 中取顏色
      let col = capture.get(x, y);
      let g = col[1]; // 保留 G 值
      overlayGraphics.fill(0, g, 100); // 設定方框顏色 (R=0, G=取自 capture, B=100)
      overlayGraphics.rect(x + 1, y + 1, 18, 18); // 繪製方框，稍微偏移以避免重疊

      // 繪製中間的黑色圓
      overlayGraphics.fill(0); // 黑色
      overlayGraphics.ellipse(x + 10, y + 10, 5, 5); // 圓心在方框中心，大小為 5
    }
  }
}
