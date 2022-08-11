import { storage } from "./storage.js";
import { clearAllFields } from "./clearAllFields.js";

const list = document.getElementById("to-do-list");
const removeBtn = document.getElementById('clearBtn');

class Activities {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
};

const activities = [];

const addActivity = (activityValue) => {
  const localData = JSON.parse(localStorage.getItem('task'));
  localData.map((item) => activities.push(item));
  const ativitiyContainer = document.createElement('li');
  activitiyContainer.className = 'list-item';
  activitiyContainer.innerHTML += `
    <input type= 'checkbox' class='checkbox'>
    <span class='description'>${activityValue}</span>
    <i class='fas fa-ellipsis-v'></i>
    <i class='fas fa-trash'></i>
  `;
  list.appendChild(ativitiyContainer);

  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((item) => {
    item.addEventListener('change', () => {
      item.parentElement.classList.toggle('selected-item');
      item.nextElementSibling.classList.toggle('text-selected');
      item.parentElement.lastElementChild.classList.toggle('delete-icon-selected');
      item.parentElement.lastElementChild.previousElementSibling.classList.toggle('disable-edit');
      updateStorage();
    });
  });

const newActivity = new Activities(activityValue, false, checkbox.length);
activities.push(newActivity);
storage(activities);

const edit = document.querySelectorAll('.fa-ellipsis-v');
edit.forEach((item) => {
  item.addEventListener('click', () => {
    editActivity(activitiyContainer, item.previousElementSibling);
    item.parentElement.classList.add('selected-item');
  });
});

const remove = document.querySelectorAll('.fa-trash');
remove.forEach((item) => {
  item.addEventListener('click', () => {
    removeActivity(item.parentElement);
  });
});
};

const removeActivity = (activity) => {
  list.removeChild(activity);
  let count = 0;
  const localData = JSON.parse(localStorage.getItem('task'));
  const data = Array.from(localData).filter((item) => item.completed === false);
  data.map((item) => item.index = count += 1);
  storage(data);
};
const editActivity = (activitiyContainer, activity) => {
  const editText = document.createElement('input');
  editText.type = 'text';
  editText.className = 'edit-text';
  editText.value = activity.textContent;
  activitiyContainer.replaceChild(editText, activity);
  editText.addEventListener('keypress', (item) => {
    if (item.key === 'Enter') {
      const activityContainers = document.querySelectorAll('.list-item');
      const localData = JSON.parse(localStorage.getItem('task'));
      for (let i = 0; i < activityContainers.length; i += 1) {
        if (activityContainers[i].classList.contains('selected-item')) {
          localData[i].description = editText.value;
          storage(localData);
        }
      }
      editText.parentElement.classList.remove('selected-item');
      activitiyContainer.replaceChild(activity, editText);
      activity.textContent = editText.value;
    }
  });
};

const getStorage = () => {
  const data = JSON.parse(localStorage.getItem('task'));
  if (!data) {
    localStorage.setItem('task', JSON.stringify([]));
  }

  data.map((item) => {
    const ativitiyContainer = document.createElement('li');
    ativitiyContainer.className = 'list-item';
    ativitiyContainer.innerHTML += `
      <input type= 'checkbox' class='checkbox'>
      <span class='description'>${item.description}</span>
      <i class='fas fa-ellipsis-v'></i>
      <i class='fas fa-trash'></i>
    `;
    list.appendChild(ativitiyContainer);

    const edit = document.querySelectorAll('.fa-ellipsis-v');
    edit.forEach((item) => {
      item.addEventListener('click', () => {
        editActivity(ativitiyContainer, item.previousElementSibling);
        item.parentElement.classList.add('selected-item');
      });
    });
  });

  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((item) => {
    item.addEventListener('change', () => {
      item.parentElement.classList.toggle('selected-item');
      item.nextElementSibling.classList.toggle('text-selected');
      item.parentElement.lastElementChild.classList.toggle('delete-icon-selected');
      item.parentElement.lastElementChild.previousElementSibling.classList.toggle('disable-edit');
      updateStorage();
    });
  });

  const remove = document.querySelectorAll('.fa-trash');
  remove.forEach((item) => {
    item.addEventListener('click', () => {
      removeActivity(item.parentElement);
    });
  });
}

window.addEventListener('load', () => {
  getStorage();
});

const updateStorage = () => {
  const localData = JSON.parse(localStorage.getItem('task'));
  const allActivities = document.querySelectorAll('span');
  for (let i = 0; i < allActivities.length; i += 1) {
    if (allActivities[i].classList.contains('text-selected')) {
      localData[i].completed = true;
    } else {
      localData[i].completed = false;
    }
  } 
  storage(localData);
};

removeBtn.addEventListener('click', () => {
  clearAllFields();
});

export { addActivity, removeActivity, activities, updateStorage };