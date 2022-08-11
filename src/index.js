import './index.css';
import { addActivity } from './CRUD.js';

const inputBtn = document.getElementById('task');

inputBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addActivity(e.target.value);
    e.target.value = '';
  }
});
