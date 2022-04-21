export default class DnD {
  constructor() {
    this.cardLists = [...document.querySelectorAll('.app__card-list')];
    this.draggedEl = null;
    this.ghostEl = null;
    this.dragged = false;

    this.cardLists.forEach((cardList) => {
      cardList.addEventListener('mousedown', (evt) => {
        // evt.preventDefault();
        const target = evt.target;
        if (!target.classList.contains('app__card')) {
          return;
        }
        // this.draggedEl = evt.target;
        // this.ghostEl = evt.target.cloneNode(true);
        // this.ghostEl.classList.add('dragged');
        // document.body.appendChild(this.ghostEl);

        // this.ghostEl.style.width = `${evt.target.clientWidth}px`;
        // this.ghostEl.style.height = `${evt.target.clientHeight}px`;
        // this.ghostEl.style.left = `${
        //   evt.pageX - this.ghostEl.offsetWidth / 2
        // }px`;
        // this.ghostEl.style.top = `${
        //   evt.pageY - this.ghostEl.offsetHeight / 2
        // }px`;

        this.ghostEl = target.cloneNode(true);
        this.ghostEl.classList.add('dragged');
        this.ghostEl.style.width = `${target.getBoundingClientRect().width}px`;
        this.ghostEl.style.transform = 'rotate(5deg)';
        document.body.appendChild(this.ghostEl);
        this.coordsEl = {
          x: target.getBoundingClientRect().x,
          y: target.getBoundingClientRect().y,
        };
        this.size = {
          width: target.getBoundingClientRect().width,
          height: target.getBoundingClientRect().height,
        };
        this.delta = {
          x: evt.pageX - this.coordsEl.x,
          y: evt.pageY - this.coordsEl.y,
        };

        this.ghostEl.style.left = `${this.coordsEl.x}px`;
        this.ghostEl.style.top = `${this.coordsEl.y}px`;

        this.emptyEl = document.createElement('div');
        this.emptyEl.className = 'empty';
        this.emptyEl.style.width = `${this.size.width}px`;
        this.emptyEl.style.height = `${this.size.height}px`;
        evt.target.replaceWith(this.emptyEl);

        this.dragged = true;
      });

      document.addEventListener('mousemove', (evt) => {
        if (!this.dragged) {
          return;
        }
        this.ghostEl.style.left = `${evt.pageX - this.delta.x}px`;
        this.ghostEl.style.top = `${evt.pageY - this.delta.y}px`;

        this.closestEl = document.elementFromPoint(evt.pageX, evt.pageY);
        this.closestList = this.closestEl.closest('.app__card-list');
        this.closestCard = this.closestEl.closest('.app__card');
        this.closestBtn = this.closestEl.closest('app__add-card-btn');
        this.closestForm = this.closestEl.closest('app__form');
        if (this.closestBtn) {
          console.log(kek);
        }

        if (this.closestList && this.closestCard && this.dragged) {
          this.closestCard.insertAdjacentElement('beforebegin', this.emptyEl);
          console.log('2');
        } else if (this.dragged && this.closestBtn) {
          this.closestList.appendChild(this.emptyEl);
          console.log('3');
        }
      });

      //   cardList.addEventListener('mousemove', (evt) => {
      //     evt.preventDefault();
      //     if (!this.draggedEl) {
      //       return;
      //     }
      //     this.ghostEl.style.left = `${
      //       evt.pageX - this.ghostEl.offsetWidth / 2
      //     }px`;
      //     this.ghostEl.style.top = `${
      //       evt.pageY - this.ghostEl.offsetHeight / 2
      //     }px`;
      //   });

      cardList.addEventListener('mouseup', (evt) => {
        // if (!this.draggedEl) {
        //   return;
        // }
        // const closest = document.elementFromPoint(evt.clientX, evt.clientY);
        // evt.currentTarget.insertBefore(this.draggedEl, closest);

        // this.ghostEl.remove();
        // this.ghostEl = null;
        // this.draggedEl = null;

        cardList.addEventListener('mouseup', (evt) => {
          if (!this.dragged) {
            return;
          }
          console.log('allo');
          if (this.closestList && this.closestCard) {
            evt.currentTarget.insertBefore(this.ghostEl, this.closestCard);

            document.body.removeChild(this.ghostEl);
            this.ghostEl = null;

            this.dragged = false;
          }
        });
      });
    });
  }
}
