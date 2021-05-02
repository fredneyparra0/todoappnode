const// Variables
  input = document.getElementById('inputAgregar'),
  formularioAgregar = document.getElementById('formularioAgregar'),
  itemList = document.getElementById('container-item-solo'),
  checkFirst = document.querySelector('.agregar__input--first'),
  clearAll = document.querySelector('span#clearAll'),
  itemsRestantes = document.querySelector('#itemsRestantes');

// Agregar elemento desde input
formularioAgregar.addEventListener('submit', (e) => {
  e.preventDefault();
  const nuevaTarea = {
    id: generateUUID(),
    titulo: input.value,
    check: checkFirst.checked
  };
  itemList.appendChild(crearNuevaTareaDOM(nuevaTarea));
  guardarTareaLocalStorage(nuevaTarea);
  input.value = '';
});
// Agregar elementos que se encuentran el localStorage
const cargaRapida = () => {
  document.addEventListener('DOMContentLoaded', () => {
    getTaskDataBase();
    const itemsLS = recibirValoresLocalStorage();
    const fragmentNewItems = document.createDocumentFragment();
    itemsLS.forEach((element) => {
      const divFuncion = crearNuevaTareaDOM(element);
      fragmentNewItems.appendChild(divFuncion);
    });
    itemList.appendChild(fragmentNewItems);
    pruebaContador()
    // eliminarElementoDomLs()
  });
}
cargaRapida();

async function getTaskDataBase () {
  const request = new XMLHttpRequest();
  request.open("GET", "http://localhost:3000/taskget");
  request.send();

  request.addEventListener('readystatechange', () => {
    if (request.readyState === 4) {
      const jsonParse = JSON.parse(request.response);
      jsonParse.forEach(element => {
        itemList.appendChild(crearNuevaTareaDOM(element.titulo));
        // console.log(element.titulo)
      })
      // console.log(jsonParse)
    }
  })
}

clearAll.addEventListener('click', function () {
  const todosElementos = document.querySelectorAll('#container-item-solo .item .agregar__input:checked');
  todosElementos.forEach(element => element.closest('.item').remove());
  const valoresDeLs = recibirValoresLocalStorage();
  const filtroArray = valoresDeLs.filter(tareasGuardar => tareasGuardar.check !== true);
  guardarTareasLocalStorage(filtroArray);
  console.log(filtroArray);
  // valoresDeLs.find(element => /*element.id === todosElementos*/ console.log(element.id) )
  // console.log(todosElementos);
});

//Crear Elemento HTML
const crearNuevaTareaDOM = function (nuevaTarea) {
  const itemElement = document.createElement('div');
  itemElement.className = 'item';
  itemElement.innerHTML = getHTMLStringForNewItem(nuevaTarea.titulo);

  const { itemTextElement, checkElement, deleteElement, filterActived } = getVariablesForNewItem(itemElement);

  if (nuevaTarea.check) {
    itemTextElement.classList.add('agregar__link--decoration');
    checkElement.setAttribute('checked', true);
    filterActived === "Active" && itemElement.classList.add("hidden");
  } else {
    filterActived === "Completed" && itemElement.classList.add("hidden");
  }

  // loadEventsForNewItem({ deleteElement, itemElement, nuevaTarea, checkElement, itemTextElement });

  return itemElement;
}

function getVariablesForNewItem(itemElement) {
  return {
    itemTextElement: itemElement.querySelector('.agregar__link'),
    checkElement: itemElement.querySelector('.agregar__input'),
    deleteElement: itemElement.querySelector('.agregar__link-icon'),
    filterActived: document.querySelector(".item.actions [class*=action-filter].blue").textContent,


    // itemTextElement: document.querySelector('.agregar__link'),
    // checkElement: document.querySelector('.agregar__input'),
    // deleteElement: document.querySelector('.agregar__link--icon'),
    // filterActived: document.querySelector('.item.actions [class*=action-filter].blue')
  };
}

// function loadEventsForNewItem(data) {
//   data.deleteElement.addEventListener('click', eliminarElementoDomLs(data.itemElement, data.nuevaTarea.id));
//   data.checkElement.addEventListener('click', manejarCheckEnTareasAgregadas(data.itemTextElement, data.nuevaTarea.id));
// }

function getHTMLStringForNewItem(titulo) {
  return `
    <div class="agregar__container">
      <label class="agregar__checkbox">
        <input class="agregar__input" type="checkbox">
        <span class="agregar__span"></span>
        </input>
      </label>
      <a class="agregar__link" href="#">${titulo}</a>
    </div>
    <a class="agregar__link-icon" href="#">
      <img class="agregar__icon" src="images/icon-cross.svg" alt="clear">
    </a>
  `;
}

function eliminarElementoDomLs(elementoDiv, id) {
  return function () {
    elementoDiv.remove();
    eliminarTareaLs([id]);
  }
}

function eliminarTareaLs(idArrays) {
  const recibirValores = recibirValoresLocalStorage();
  idArrays.forEach(id => {
    const indexValor = recibirValores.findIndex(tarea => tarea.id === id); // Busca el primer valor en base a una condición devolviendo el indice del array sino consigue devuelve -1
    recibirValores.splice(indexValor, 1);
  });
  guardarTareasLocalStorage(recibirValores);
}

function manejarCheckEnTareasAgregadas(decoracionTexto, id) {
  return function () {
    decoracionTexto.classList.toggle('agregar__link--decoration');
    actualizarTareaLocalStorage(id);
  }
}

function actualizarTareaLocalStorage(id) {
  const items = recibirValoresLocalStorage(),
    item = items.find(tarea => tarea.id === id),
    itemIndex = items.findIndex(tarea => tarea.id === id);

  item.check = item.check ? false : true;
  items[itemIndex] = item;
  guardarTareasLocalStorage(items);
}

// Guardar objeto en array
function guardarTareaLocalStorage(nuevaTarea) {
  const itemsListLS = recibirValoresLocalStorage();
  itemsListLS.push(nuevaTarea);
  localStorage.setItem(ITEMS_PROPS_LS, JSON.stringify(itemsListLS)); // Sobreescribir LS de items
  pruebaContador()
}

function guardarTareasLocalStorage(arrayTareas) {
  localStorage.setItem(ITEMS_PROPS_LS, JSON.stringify(arrayTareas)); // Sobreescribir LS de items
  pruebaContador()
}

const recibirValoresLocalStorage = () => {
  if (!localStorage.getItem(ITEMS_PROPS_LS)) guardarTareasLocalStorage([]);
  const parse = JSON.parse(localStorage.getItem(ITEMS_PROPS_LS));
  return parse;
}

function generateUUID() {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (character) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (character == "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

function pruebaContador() {
  const valoresDelLocalStorage = recibirValoresLocalStorage().length;
  itemsRestantes.textContent = `${valoresDelLocalStorage} items left`;
}

document.querySelectorAll('div.container-list span.item-font[class*=action-filter]').forEach(actionElement => {
  actionElement.addEventListener('click', function () {
    document.querySelectorAll(".item.actions [class*=action-filter].blue").forEach(element => element.classList.remove("blue"));
    switch (this.textContent) {
      case "All":
        filterAllItemsToShowDOM();
        break;

      case "Completed":
        filterCompletedItemsToShowDOM();
        break;

      case "Active":
        filterActiveItemsToShowDOM();
        break;

      default:
        filterAllItemsToShowDOM();
        break;
    }
  });
})

function filterAllItemsToShowDOM() {
  document.querySelectorAll("#container-item-solo div.item").forEach(element => element.classList.remove("hidden"));
  document.querySelectorAll(".item.actions .action-filter-all").forEach(element => element.classList.add("blue"));
}

function filterActiveItemsToShowDOM() {
  document.querySelectorAll("#container-item-solo div.item").forEach(element => {
    const inputCheck = element.querySelector("input");

    !inputCheck.checked ?
      element.classList.remove("hidden") :
      element.classList.add("hidden");
  });
  document.querySelectorAll(".item.actions .action-filter-active").forEach(element => element.classList.add("blue"));
}

function filterCompletedItemsToShowDOM() {
  document.querySelectorAll("#container-item-solo div.item").forEach(element => {
    const inputCheck = element.querySelector("input");

    inputCheck.checked ?
      element.classList.remove("hidden") :
      element.classList.add("hidden");
  });
  document.querySelectorAll(".item.actions .action-filter-completed").forEach(element => element.classList.add("blue"));
}

const clicksip = document.querySelector('.clicksip');
console.log(clicksip)

clicksip.addEventListener('click', function postdatabase () {
  const xhr = new XMLHttpRequest;

  xhr.onload = function () {
    const serverResponse = document.querySelector('.title-final__parrafo')
    serverResponse.innerHTML = this.responseText;
  }

  xhr.open('POST', "http://localhost:3000/taskget");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(JSON.stringify({name: "fredney", age:21}));
});

/**
 * save new task in database
 *
 */
// function postdatabase () {
//   const xhr = new XMLHttpRequest;

//   xhr.onload = function () {
//     const serverResponse = document.querySelector('.title-final__parrafo')
//     serverResponse.innerHTML = this.responseText;
//   }

//   xhr.open('POST', "http://localhost:3000/taskget");
//   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xhr.send("name=domenic&message= how`s its going");
// }
// postdatabase()
  
// async function saveNewTaskDB (taskObject) {
//     const object = {
//       "name": "ney",
//       "age": "21",
//       "country": "venezuela"
//     }


// }

// saveNewTaskDB()