// Package data
const packages = [
  {id:1,destination:"Goa",durationDays:5,basePrice:10000,season:"peak"},
  {id:2,destination:"Manali",durationDays:7,basePrice:15000,season:"off"},
  {id:3,destination:"Kerala",durationDays:6,basePrice:12000,season:"regular"}
];

function calculateFinalPrice(pkg){
  let multiplier=1;
  switch(pkg.season){
    case "peak": multiplier=1.3; break;
    case "off": multiplier=0.8; break;
    default: multiplier=1;
  }
  let price = pkg.basePrice*multiplier;
  // weekend surcharge example
  if(pkg.durationDays>6) price+=2000;
  return price;
}

// Render packages table
function renderPackages(){
  const tbody=document.querySelector("#packagesTable tbody");
  tbody.innerHTML="";
  packages.forEach(pkg=>{
    const row=document.createElement("tr");
    const finalPrice=calculateFinalPrice(pkg);
    row.innerHTML=`<td>${pkg.id}</td><td>${pkg.destination}</td><td>${pkg.durationDays}</td><td>${pkg.basePrice}</td><td>${pkg.season}</td><td>${finalPrice}</td>`;
    tbody.appendChild(row);
  });
}

// Populate booking select
function populatePackageSelect(){
  const sel=document.getElementById("packageSelect");
  packages.forEach(pkg=>{
    const opt=document.createElement("option");
    opt.value=pkg.id;
    opt.textContent=pkg.destination;
    sel.appendChild(opt);
  });
}

// Booking form calculations
function estimatePrice(){
  const pkgId=parseInt(document.getElementById("packageSelect").value);
  const pkg=packages.find(p=>p.id===pkgId);
  if(!pkg) return 0;

  const checkIn=new Date(document.getElementById("checkIn").value);
  const checkOut=new Date(document.getElementById("checkOut").value);
  if(isNaN(checkIn)||isNaN(checkOut)||checkOut<=checkIn) return 0;

  const nights=(checkOut-checkIn)/(1000*60*60*24);
  let total=calculateFinalPrice(pkg)*(nights/pkg.durationDays);

  const guests=parseInt(document.getElementById("guests").value)||1;
  if(guests>2) total*=1.2;

  const code=document.getElementById("promoCode").value.trim().toUpperCase();
  switch(code){
    case "EARLYBIRD": total*=0.9; break;
    case "FESTIVE": total*=0.85; break;
  }

  return Math.round(total);
}

function updateTotal(){
  const price=estimatePrice();
  document.getElementById("totalPrice").textContent=price;
  document.querySelector("#bookingForm button").disabled=price<=0;
}

// Gallery modal
function setupGallery(){
  const thumbs=document.querySelectorAll(".thumb");
  const modal=document.getElementById("modal");
  const modalImg=document.getElementById("modalImg");
  const caption=document.getElementById("caption");
  const close=document.getElementById("closeModal");

  thumbs.forEach(img=>{
    img.addEventListener("click",()=>{
      modal.style.display="block";
      modalImg.src=img.dataset.large;
      modalImg.alt=img.alt;
      caption.textContent=img.title;
    });
  });

  close.onclick=()=>{modal.style.display="none";};
}

// Nav active toggle on scroll
function setupNav(){
  const sections=document.querySelectorAll("section");
  const navLinks=document.querySelectorAll(".nav-link");

  window.addEventListener("scroll",()=>{
    let current="";
    sections.forEach(sec=>{
      const top=window.scrollY;
      if(top>=sec.offsetTop-60){ current=sec.getAttribute("id"); }
    });
    navLinks.forEach(a=>{
      a.classList.remove("active");
      if(a.getAttribute("href")==="#"+current){ a.classList.add("active"); }
    });
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  renderPackages();
  populatePackageSelect();
  setupGallery();
  setupNav();
  document.querySelectorAll("#packageSelect,#checkIn,#checkOut,#guests,#promoCode").forEach(el=>{
    el.addEventListener("input",updateTotal);
    el.addEventListener("change",updateTotal);
  });
  document.getElementById("bookingForm").addEventListener("submit",e=>{
    e.preventDefault();
    alert("Booking submitted with total: "+document.getElementById("totalPrice").textContent);
  });
});
