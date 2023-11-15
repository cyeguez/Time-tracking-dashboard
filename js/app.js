import data from "../data.json" assert { type: "json" };
const frequiencies = document.querySelector(".timeframe-container__period");
const allLi = frequiencies.querySelectorAll("li");
const allFrequiencies = [...allLi];
const container = document.querySelector(".container");
const wrap = document.querySelector(".wrap");
let nId = "daily";

setData(nId);

allFrequiencies.forEach((item) => {
  item.addEventListener("click", function (e) {
    clear();
    nId = item.id;
    let linkSeleted = e.target;

    selected(linkSeleted);

    setData(nId);
  });
});

function setData(nId) {
  //Esta funcion recorre el data.json y extrae los datos requeridos en el proyecto y se los envia a la funcion render
  data.forEach((elemento) => {
    const tagClass = elemento.title.replace(/\s/g, "-").toLowerCase(); //extraigo el titulo y los paso a minusculas y les quito el espacio y lo sustituyo por un guion en el caso de self care
    const title = elemento.title;
    const nHour = elemento.timeframes[nId].current;
    const previous = elemento.timeframes[nId].previous;

    render(tagClass, title, nHour, previous);
  });
}

function render(nameClass, title, hour, prev) { // la funcion render recibe los datos por parametros  y los pinta con el template de cada tarjeta
  const template = `<div class='activity-container activity-container--${nameClass}'> 
      <div class='activity'>
        <div class='activity__category'>
          <p>${title}</p>
          <p>...</p>
        </div>
      <div class='activity__duration'>
        <p class='hour'>${hour}hrs</p>
        <p class='day'>Last Week - ${prev}hr</p>
      </div>
    </div>
</div>`;

//la plantilla contiene el nameClass el cual sirve para que a carda tarjeta se le asigne la clase dinamicamente y pueda usar su respectivo estilo(como el color, la imagen de fondo)
//los demas datos se rellenan el plantilla son el titulo las horas y la frecuencia de entrenamiento
  let newContent = document.createElement("div");
  newContent.innerHTML = template;

  wrap.appendChild(newContent);
}

function clear() {
  //esta función limpia el dom cuando preiono algun link como daily, weekly, monthly
  wrap.innerHTML = "";
}

function selected(linkSeleted) {
  // funcion que quita la clase active de los link
  allLi.forEach((itemSelected) => {
    //me traigo todos los Li que contienen los link daily,weekly,month
    itemSelected.classList.remove("active"); //los recorro y les elimino la clase active

    linkSeleted.classList.add("active"); //como parametro recibo el evento clik y le asigno la clase active
  });
}
