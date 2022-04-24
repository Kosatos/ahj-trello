import AppSection from './components/AppSection';
import DnD from './components/DnD';
import State from './components/State';

window.onload = () => {
  const todo = new AppSection('todo');
  const inProgress = new AppSection('inprogress');
  const done = new AppSection('done');

  const state = new State();

  const dnd = new DnD();
};
