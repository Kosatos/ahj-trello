import AppSection from './components/AppSection';
import DnD from './components/DnD';

window.onload = () => {
  const todo = new AppSection('todo');
  const inProgress = new AppSection('in-progress');
  const done = new AppSection('done');

  const dnd = new DnD();
};
