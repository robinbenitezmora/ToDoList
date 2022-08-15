// const { get } = require("lodash");

const list = document.getElementById('list');
const input = document.getElementById('input');
const buttonEnter = document.getElementById('enter');
const check = 'fa-check-square';
const uncheck = 'fa-square';
const lineThrough = 'line-through';
let LIST;
let id;

const addTask = (task, id, finished, eliminated) => {
  if (eliminated) {
    return;
  }
  const FINISHED = finished ? check : uncheck;
  const LINE = finished ? lineThrough : '';
  const item = `        
  <li id='item'>
    <i class="far ${FINISHED}" data="finished" id='${id}'></i>
    <p class="text ${LINE}">${task}</p>
    <i class="fas fa-trash de" data="eliminated" id='${id}'></i>
  </li>
`;
  list.insertAdjacentHTML('beforeend', item);
};

// taskFinished Function
const taskFinished = (element) => {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector('.text').classList.toggle(lineThrough);
  LIST[element.id].finished = !LIST[element.id].finished;
};

const taskEliminated = (element) => {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].eliminated = true;
};

buttonEnter.addEventListener('click', () => {
  const task = input.value;
  if (task) {
    addTask(task, id, false, false);
    LIST.push({
      name: task,
      Id: id,
      finished: false,
      eliminated: false,
    });
    localStorage.setItem('TODO', JSON.stringify(LIST));
    input.value = '';
    id += 1;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const task = input.value;
    if (task) {
      addTask(task, id, false, false);
      LIST.push({
        name: task,
        Id: id,
        finished: false,
        eliminated: false,
      });
      localStorage.setItem('TODO', JSON.stringify(LIST));
      input.value = '';
      id += 1;
    }
  }
});

list.addEventListener('click', (e) => {
  const element = e.target;
  const elementData = element.attributes.data.value;
  if ((elementData === 'finished')) {
    taskFinished(element);
  } else if (elementData === 'eliminated') {
    taskEliminated(element);
  }
  localStorage.setItem('TODO', JSON.stringify(LIST));
});

// Local Storage getItem
const loadList = (DATA) => {
  DATA.forEach((item) => {
    addTask(item.name, item.id, item.finished, item.eliminated);
  });
};

const data = localStorage.getItem('TODO');
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}
