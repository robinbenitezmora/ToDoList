import { storage } from './storage.js';
import { removeActivity } from './CRUD.js';

const clearAllFields = () => {
  const localData = JSON.parse(localStorage.getItem('task'));
  const activitiyContainer = document.querySelectorAll('.list-item');
  activitiyContainer.forEach((e) => {
    if (e.classList.contains('selected-item')) {
      removeActivity(e);
    }
  });
  let count = 0;
  const data = Array.from(localData).filter((e) => e.completed === false);
  data.map((e) => e.index = count += 1);
  storage(data);
};

export { clearAllFields };
