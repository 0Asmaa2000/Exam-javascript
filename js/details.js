/// <reference types="../@types/@types/jquery" />

const search = location.search
const params =new URLSearchParams(search)
const id = params.get('id');




let containerDetails = {};

(async function() {
    
 

  try {
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const responseData = await api.json();
    containerDetails = responseData.meals[0];

    DisplayData(); 
    console.log(responseData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

function DisplayData() {
  const DetailsBox = `
    <div class="col-md-4 mb-3 mb-md-0">
      <div>
        <img
          src="${containerDetails.strMealThumb}"
          alt="meal"
          class="img-fluid rounded-3 shadow border"
        />
        <h2 class="mt-2 text-light fw-bold">${containerDetails.strMeal}</h2>
      </div>
    </div>
    <div class="col-md-8">
      <h3 class="fw-bold text-light">Instructions</h3>
      <p>${containerDetails.strInstructions}</p>

      <h5 class="mt-2">
        <span class="fw-bold text-light">Area : </span>${containerDetails.strArea}
      </h5>

      <h5 class="mt-2">
        <span class="fw-bold text-light">Category : </span>${containerDetails.strCategory}
      </h5>

      <h5 class="mt-2 fw-bold text-light">Ingredients :</h5>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${generateIngredientsList()}
      </ul>

      <h5 class="mt-2 fw-bold text-light">Tags :</h5>
      <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${containerDetails.strTags ? containerDetails.strTags.split(',').map(tag => `<li>${tag.trim()}</li>`).join('') : ''}
      </ul>

      <a target="_blank" href="${containerDetails.strSource}" class="btn btn-primary mt-2 me-1">
        <i class="fa-solid fa-link me-2"></i>Source
      </a>
      <a target="_blank" href="${containerDetails.strYoutube}" class="btn btn-danger mt-2">
        <i class="fa-brands fa-youtube me-2"></i>Youtube
      </a>
    </div>
  `;

  document.getElementById('Rowcontainer').innerHTML = DetailsBox;
}
function generateIngredientsList() {
  let ingredientsList = '';
  for (let i = 1; i <= 20; i++) {
    const ingredientName = containerDetails[`strIngredient${i}`];
    const ingredientMeasure = containerDetails[`strMeasure${i}`];
    if (ingredientName && ingredientName.trim() !== '') {
      ingredientsList += `<li>${ingredientMeasure} ${ingredientName}</li>`;
    }
  }
  return ingredientsList;
}

let closeBtn = document.getElementById("closeBtn");
console.log(closeBtn);
closeBtn.addEventListener('click',function(){
document.getElementById('Details').classList.add('d-none')
window.location.href=`index.html`

console.log('asdf');
})