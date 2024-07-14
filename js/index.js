"use strict";

/// <reference types="../@types/@types/jquery" />
let Home = document.getElementById("Home");
let Details = document.getElementById("#Details");
let categorie = document.getElementById("Categories");
let categoriesection = document.getElementById("category");
let Areas = document.getElementById("Areass");
let Areassection = document.getElementById("Area");
let Ingredient = document.getElementById("Ingredients");
let Ingredientssection = document.getElementById("Ingredientss");
let search = document.getElementById("searchclick");
let searchsection = document.getElementById("search");
let contact = document.getElementById("contactclick");
let contactsection = document.getElementById("contactUS");
///////////////////
$(function () {
  $(".loader").fadeOut(500, function () {
    $(".loading").fadeOut(500, function () {
      $("body").css("overflow", "auto");
      $("#Home").removeClass("d-none");
      displayMealsHome(HomeMeals)      
    });
 
  });
  
});


///////////////// open side bar
$(".open").on("click", function () {
  $(".sidebar-box").animate({ width: "toggle", paddingInline: "toggle" }, 700);
  $(".close").addClass("d-block");
  $(".Group-logo .open").addClass("d-none");
});
///////////////// close side bar

$(".close").on("click", function () {
  $(".sidebar-box").animate({ width: "toggle", paddingInline: "toggle" }, 700);
  $(".Group-logo .open").removeClass("d-none");
  $(".close").removeClass("d-block");
});
///////////////////   search function


async function searchByName(term) {
  let apiResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  let responseData = await apiResponse.json();
  displayMealsHome(responseData.meals);
  console.log(HomeMeals);

}
async function searchByFLetter(term) {
  if (term === "") {
    term = "l";
  }
  let apiResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  let responseData = await apiResponse.json();
  displayMealsHome(responseData.meals);
}

///////////////////////////////////////////

//////////////////Get meals Home
let HomeMeals = [];
async function GetmealsHome() {
  const apiHome = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s`
  );
  let response = await apiHome.json();
  HomeMeals = response.meals;
  console.log(HomeMeals);
}
function displayMealsHome(HomeMeals) {
  let Homemealss = ``;
  for (let i = 0; i < HomeMeals.length; i++) {
    Homemealss += `
  
            <div class="col-md-3 position-relative  overflow-hidden g-4 p-2 card  "  onclick="showDetails(${HomeMeals[i].idMeal })">
                <img src="${HomeMeals[i].strMealThumb}" class='rounded-3 overflow-hidden' alt="Food">
                <div class="inner"> <h4 class=''>${HomeMeals[i].strMeal} </h4>
              
                </div>
                         
                     </div>
    
    `;
  }

  document.getElementById("RowDataHome").innerHTML = Homemealss;
}
GetmealsHome();


/////////////////Get categories from api


let meals = [];

async function getcategories() {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    if (!api.ok) {
      throw new Error(`Failed to fetch categories: ${api.status}`);
    }
    let response = await api.json();
    meals = response.categories;
    console.log(meals);
    DisplayMeals();
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

getcategories();

function DisplayMeals() {
  try {
    let mealscontainer = ``;
    for (let i = 0; i < meals.length; i++) {
      mealscontainer += `
        <div class="col-md-3 position-relative overflow-hidden g-4 p-2 card">
          <img src="${meals[i].strCategoryThumb}" alt="Food">
          <div class="inner"> 
            <h4>${meals[i].strCategory}</h4>
            <p>${meals[i].strCategoryDescription}</p>
          </div>
        </div> 
      `;
    }
    document.getElementById("RowData").innerHTML = mealscontainer;
  } catch (error) {
    console.error('Error displaying meals:', error);
  }
}


/////////////////////show Details Home
function showDetails(idmeals){

  window.location.href=`Details.html?id=${idmeals}`
  
    console.log('ssss');
  }
////////////////////Ingredients


let ingredientsList = [];

async function GetIngredients() {
  try {
    const apiIngredient = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const response = await apiIngredient.json();
    ingredientsList = response.meals.slice(0, 20);
    console.log(ingredientsList);
    DisplayIngredients();
  } catch (error) {
    console.error('Error fetching ingredients:', error);
  }
}

function DisplayIngredients() {
  let Ingredientscontainer = ``;
  ingredientsList.forEach(ingredient => {
    Ingredientscontainer += `
      <div class="col-md-3">
        <i class="fa-solid fa-drumstick-bite text-center text-light fa-4x"></i>
        <h2 class='text-light h4'>${ingredient.strIngredient}</h2>
        <p class='text-light'>${ingredient.strDescription ? ingredient.strDescription.split(" ").slice(0, 20).join(" ") : ''}</p>
      </div>
    `;
  });
  document.getElementById('ingredientsdata').innerHTML = Ingredientscontainer;
}

GetIngredients();
///////////////////////////////////// Area


let Area = [];

async function GetArea() {
  try {
    const apiArea = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const response = await apiArea.json();
    Area = response.meals
    console.log(Area);
    DisplayArea();
  } catch (error) {
    console.error('Error fetching ingredients:', error);
  }
}
function DisplayArea(){
 let areaContainer=``
  for(let i=0 ; i<Area.length;i++ ){
    areaContainer += `
    <div class="col-md-3 text-light">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${Area[i].strArea}</h3>
        </div>
    
    `

  }
  document.getElementById('AreaData').innerHTML=areaContainer;
}
GetArea();
//////////////////////////////////////////contact us
$("#contact input").on('keyup',function(){
  inputsValidation();
})
$("#nameWarning").fadeOut(0);
$("#emailWarning").fadeOut(0);
$("#phoneWarning").fadeOut(0);
$("#ageWarning").fadeOut(0);
$("#passwordWarning").fadeOut(0);
$("#rePasswordWarning").fadeOut(0);
let submitBtn = document.getElementById("submitBtn");

function inputsValidation() {
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.classList.remove("disabled");
   
  } else {
    submitBtn.classList.add("disabled");
    $("#submitBtn").css("cursor", "not-allowed");
  
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test($("#userName").val());
}

$("#userName").on('keyup',function(){
  if (nameValidation()) {
    $("#nameWarning").fadeOut(300);
  } else {
    $("#nameWarning").fadeIn(300);
  }
});

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

$("#emailInput").on('keyup',function(){
  if (emailValidation()) {
    $("#emailWarning").fadeOut(300);
  } else {
    $("#emailWarning").fadeIn(300);
  }
});

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

$("#phoneInput").on('keyup',function(){
  if (phoneValidation()) {
    $("#phoneWarning").fadeOut(300);
  } else {
    $("#phoneWarning").fadeIn(300);
  }
});

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

$("#ageInput").on('keyup',function(){
  if (ageValidation()) {
    $("#ageWarning").fadeOut(300);
  } else {
    $("#ageWarning").fadeIn(300);
  }
});

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

$("#passwordInput").on('keyup',function(){
  if (passwordValidation()) {
    $("#passwordWarning").fadeOut(300);
  } else {
    $("#passwordWarning").fadeIn(300);
  }
});

function repasswordValidation() {
  return (
    document.getElementById("rePassword").value ===
    document.getElementById("password").value
  );
}
$("#rePassword").on('keyup',function(){
  if (repasswordValidation()) {
    $("#rePasswordWarning").fadeOut(300);
  } else {
    $("#rePasswordWarning").fadeIn(300);
  }
});


////////////////////////////Show categories from sidebar
categorie.addEventListener('click',function(){
  Home.classList.add('d-none')
searchsection.classList.add('d-none')
  categoriesection.classList.remove('d-none');
  Areassection.classList.add('d-none');
  contacsection.classList.add('d-none');

  $(".sidebar-box").animate(
               { width: "toggle", paddingInline: "toggle" }
              );
              $(".Group-logo .open").removeClass("d-none");
              $(".close").removeClass("d-block");
  console.log('hello');
})
////////////////////////////Show Areas from sidebar
Areas.addEventListener('click',function(){
  Home.classList.add('d-none')
  searchsection.classList.add('d-none')

Ingredientssection.classList.add('d-none')
  Areassection.classList.remove('d-none');
  categoriesection.classList.add('d-none');
  contacsection.classList.add('d-none');

  $(".sidebar-box").animate(
    { width: "toggle", paddingInline: "toggle" }
   );
   $(".Group-logo .open").removeClass("d-none");
   $(".close").removeClass("d-block");
  console.log('hello');
})
////////////////////////////Show Ingredient from sidebar

Ingredient.addEventListener('click',function(){
  searchsection.classList.add('d-none')

  Ingredientssection.classList.remove('d-none');
  categoriesection.classList.add('d-none');
  Areassection.classList.add('d-none');
  Home.classList.add('d-none')
  contacsection.classList.add('d-none');

  $(".sidebar-box").animate(
    { width: "toggle", paddingInline: "toggle" }
   );
   $(".Group-logo .open").removeClass("d-none");
   $(".close").removeClass("d-block");
  console.log('hello');
  console.log('hello');
})
////////////////////////////Show search from sidebar

search.addEventListener('click',function(){
  searchsection.classList.remove('d-none');
  categoriesection.classList.add('d-none');
  Areassection.classList.add('d-none');
  Home.classList.remove('d-none')
  Ingredientssection.classList.add('d-none')
  contactsection.classList.add('d-none');
  $(".sidebar-box").animate(
    { width: "toggle", paddingInline: "toggle" }
   );
   $(".Group-logo .open").removeClass("d-none");
   $(".close").removeClass("d-block");
  console.log('hello');
  console.log('hello');
})
////////////////////////////Show contactus from sidebar

contact.addEventListener('click',function(){
  contactsection.classList.remove('d-none');
  categoriesection.classList.add('d-none');
  Areassection.classList.add('d-none');
  Home.classList.add('d-none')
  searchsection.classList.add('d-none')
  Ingredientssection.classList.add('d-none')
  $(".sidebar-box").animate(
    { width: "toggle", paddingInline: "toggle" }
   );
   $(".Group-logo .open").removeClass("d-none");
   $(".close").removeClass("d-block");
  console.log('hello');
  console.log('hello');
})