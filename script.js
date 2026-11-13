let banCo = document.getElementById("banCo");
let nutBam = document.getElementById("nutBam");
let dongHo = document.getElementById("dongHo");
let thongBao = document.getElementById("thongBao");
let lichSu = document.getElementById("lichSu");

let mangThang = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0];
let mang = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0];
let mauSac = [
  "bg-black", "bg-green-300", "bg-red-300", "bg-blue-300", 
  "bg-purple-300", "bg-pink-300", "bg-yellow-300", "bg-indigo-300", 
  "bg-gray-300", "bg-emerald-300", "bg-amber-300", "bg-lime-300"
];

let dangChoi = false;
let giay = 0;
let buocDi = 0;
let luotChoi = 0;
let boDem;

function tinhThoiGian(s) {
  let phut = Math.floor(s / 60);
  let giayLe = s % 60;
  
  if (phut < 10) {
    phut = "0" + phut;
  }
  if (giayLe < 10) {
    giayLe = "0" + giayLe;
  }
  return phut + ":" + giayLe;
}

function veGiaoDien() {
  let html = "";
  for (let i = 0; i < 12; i++) {
    let so = mang[i];
    let chuSo = so;
    
    if (so === 0) {
      chuSo = "";
    }
    
    html += '<div class="box ' + mauSac[so] + '">' + chuSo + '</div>';
  }
  banCo.innerHTML = html;
}

function diChuyen(huong, laNguoiDung) {
  let viTriDen = mang.indexOf(0);
  let viTriMoi = -1;
  
  if (huong === "len" && viTriDen > 3) {
    viTriMoi = viTriDen - 4;
  }
  if (huong === "xuong" && viTriDen < 8) {
    viTriMoi = viTriDen + 4;
  }
  if (huong === "trai" && viTriDen % 4 !== 0) {
    viTriMoi = viTriDen - 1;
  }
  if (huong === "phai" && viTriDen % 4 !== 3) {
    viTriMoi = viTriDen + 1;
  }

  if (viTriMoi !== -1) {
    let tam = mang[viTriDen];
    mang[viTriDen] = mang[viTriMoi];
    mang[viTriMoi] = tam;
    
    if (laNguoiDung === true) {
      buocDi++;
      veGiaoDien();
      kiemTraThang();
    }
  }
}

function kiemTraThang() {
  let thang = true;
  for (let i = 0; i < 12; i++) {
    if (mang[i] !== mangThang[i]) {
      thang = false;
    }
  }

  if (thang === true) {
    dangChoi = false;
    clearInterval(boDem);
    thongBao.style.display = "block";
    nutBam.innerText = "Chơi lại";
    
    luotChoi++;
    lichSu.innerHTML += '<tr><td>' + luotChoi + '</td><td>' + buocDi + '</td><td>' + tinhThoiGian(giay) + '</td></tr>';
  }
}

nutBam.onclick = function() {
  mang = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0];
  
  if (nutBam.innerText === "Kết thúc") {
    dangChoi = false;
    clearInterval(boDem);
    giay = 0;
    dongHo.innerText = "00:00";
    nutBam.innerText = "Bắt đầu";
    veGiaoDien();
  } else {
    dangChoi = true;
    buocDi = 0;
    giay = 0;
    thongBao.style.display = "none";
    nutBam.innerText = "Kết thúc";
    
    let cacHuong = ["len", "xuong", "trai", "phai"];
    for (let i = 0; i < 100; i++) {
      let huongNgauNhien = cacHuong[Math.floor(Math.random() * 4)];
      diChuyen(huongNgauNhien, false);
    }
    veGiaoDien();
    
    clearInterval(boDem);
    boDem = setInterval(function() {
      giay++;
      dongHo.innerText = tinhThoiGian(giay);
    }, 1000);
  }
};

document.onkeydown = function(e) {
  if (dangChoi === false) {
    return;
  }
  
  let phim = e.key;
  
  if (phim === "w" || phim === "ArrowUp") {
    diChuyen("len", true);
  }
  if (phim === "s" || phim === "ArrowDown") {
    diChuyen("xuong", true);
  }
  if (phim === "a" || phim === "ArrowLeft") {
    diChuyen("trai", true);
  }
  if (phim === "d" || phim === "ArrowRight") {
    diChuyen("phai", true);
  }
};

veGiaoDien();