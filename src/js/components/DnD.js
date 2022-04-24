export default class DnD {
  constructor() {
    this.cardLists = [...document.querySelectorAll('.app__card-list')];
    this.draggedEl = null;
    this.ghostEl = null;
    this.emptyEl = null;

    this.dragged = false;

    this.pageX = 0;
    this.pageY = 0;

    this.cardLists.forEach((cardList) => {
      cardList.addEventListener('mousedown', (evt) => {
        evt.preventDefault();
        this.draggedEl = evt.target;
        if (!this.draggedEl.classList.contains('app__card')) {
          return;
        }

        this.pageX = evt.pageX;
        this.pageY = evt.pageY;

        this.ghostEl = this.draggedEl.cloneNode(true);
        this.ghostEl.classList.add('dragged');
        this.ghostEl.style.width = `${
          this.draggedEl.getBoundingClientRect().width
        }px`;
        this.ghostEl.style.transform = 'rotate(5deg)';
        document.body.appendChild(this.ghostEl);
        this.coordsEl = {
          x: this.draggedEl.getBoundingClientRect().x,
          y: this.draggedEl.getBoundingClientRect().y,
        };
        this.size = {
          width: this.draggedEl.getBoundingClientRect().width,
          height: this.draggedEl.getBoundingClientRect().height,
        };
        this.delta = {
          x: evt.pageX - this.coordsEl.x,
          y: evt.pageY - this.coordsEl.y,
        };

        this.ghostEl.style.left = `${this.coordsEl.x}px`;
        this.ghostEl.style.top = `${this.coordsEl.y}px`;
        document.body.style.cursor = 'grabbing';

        this.emptyEl = document.createElement('div');
        this.emptyEl.className = 'empty';
        this.emptyEl.style.width = `${this.size.width}px`;
        this.emptyEl.style.height = `${this.size.height}px`;
        this.draggedEl.replaceWith(this.emptyEl);

        this.dragged = true;
      });

      document.addEventListener('mousemove', (evt) => {
        evt.preventDefault();
        if (!this.dragged) {
          return;
        }

        this.ghostEl.style.left = `${evt.pageX - this.delta.x}px`;
        this.ghostEl.style.top = `${evt.pageY - this.delta.y}px`;
        const ghostElTop = this.ghostEl.getBoundingClientRect().y;

        this.closestEl = document.elementFromPoint(evt.pageX, evt.pageY);
        const closestElTop = this.closestEl.getBoundingClientRect().y;

        let closestSection;
        if (this.closestEl.closest('.app__section')) {
          closestSection = this.closestEl.closest('.app__section');
          this.closestList = closestSection.querySelector('.app__card-list');
        }

        if (this.closestEl.classList.contains('app__card')) {
          if (ghostElTop < closestElTop) {
            this.closestEl.insertAdjacentElement('beforebegin', this.emptyEl);
          } else if (ghostElTop > closestElTop) {
            this.closestEl.insertAdjacentElement('afterend', this.emptyEl);
          }
        } else if (this.closestList && this.closestList.children.length === 0) {
          this.closestList.appendChild(this.emptyEl);
        }
      });

      document.addEventListener('mouseup', (evt) => {
        evt.preventDefault();
        if (!this.dragged) {
          return;
        }

        if (
          (this.closestList && document.querySelector('.empty')) ||
          (this.pageX === evt.pageX && this.pageY === evt.pageY)
        ) {
          document.body.removeChild(this.ghostEl);
          this.emptyEl.replaceWith(this.draggedEl);

          this.ghostEl = null;
          this.draggedEl = null;
          this.dragged = false;
        }
        document.body.style.cursor = 'auto';
      });
    });
  }
}
