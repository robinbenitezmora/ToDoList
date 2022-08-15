/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// const { get } = require(\"lodash\");\n\nconst list = document.getElementById('list');\nconst input = document.getElementById('input');\nconst buttonEnter = document.getElementById('enter');\nconst check = 'fa-check-square';\nconst uncheck = 'fa-square';\nconst lineThrough = 'line-through';\nlet LIST;\nlet id;\n\nconst addTask = (task, id, finished, eliminated) => {\n  if (eliminated) {\n    return;\n  }\n  const FINISHED = finished ? check : uncheck;\n  const LINE = finished ? lineThrough : '';\n  const item = `        \n  <li id='item'>\n    <i class=\"far ${FINISHED}\" data=\"finished\" id='${id}'></i>\n    <p class=\"text ${LINE}\">${task}</p>\n    <i class=\"fas fa-trash de\" data=\"eliminated\" id='${id}'></i>\n  </li>\n`;\n  list.insertAdjacentHTML('beforeend', item);\n};\n\n// taskFinished Function\nconst taskFinished = (element) => {\n  element.classList.toggle(check);\n  element.classList.toggle(uncheck);\n  element.parentNode.querySelector('.text').classList.toggle(lineThrough);\n  LIST[element.id].finished = !LIST[element.id].finished;\n};\n\nconst taskEliminated = (element) => {\n  element.parentNode.parentNode.removeChild(element.parentNode);\n  LIST[element.id].eliminated = true;\n};\n\nbuttonEnter.addEventListener('click', () => {\n  const task = input.value;\n  if (task) {\n    addTask(task, id, false, false);\n    LIST.push({\n      name: task,\n      Id: id,\n      finished: false,\n      eliminated: false,\n    });\n    localStorage.setItem('TODO', JSON.stringify(LIST));\n    input.value = '';\n    id += 1;\n  }\n});\n\ndocument.addEventListener('keyup', (e) => {\n  if (e.key === 'Enter') {\n    const task = input.value;\n    if (task) {\n      addTask(task, id, false, false);\n      LIST.push({\n        name: task,\n        Id: id,\n        finished: false,\n        eliminated: false,\n      });\n      localStorage.setItem('TODO', JSON.stringify(LIST));\n      input.value = '';\n      id += 1;\n    }\n  }\n});\n\nlist.addEventListener('click', (e) => {\n  const element = e.target;\n  const elementData = element.attributes.data.value;\n  if ((elementData === 'finished')) {\n    taskFinished(element);\n  } else if (elementData === 'eliminated') {\n    taskEliminated(element);\n  }\n  localStorage.setItem('TODO', JSON.stringify(LIST));\n});\n\n// Local Storage getItem\nconst loadList = (DATA) => {\n  DATA.forEach((item) => {\n    addTask(item.name, item.id, item.finished, item.eliminated);\n  });\n};\n\nconst data = localStorage.getItem('TODO');\nif (data) {\n  LIST = JSON.parse(data);\n  id = LIST.length;\n  loadList(LIST);\n} else {\n  LIST = [];\n  id = 0;\n}\n\n\n//# sourceURL=webpack://todolist/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;