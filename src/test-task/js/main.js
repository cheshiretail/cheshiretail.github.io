{ const modalMenu = {
    node: {
      menu: document.querySelector('.menu'),
      openButton: document.querySelector('.header__menu-open'),
      closeButton: document.querySelector('.menu__close'),
    },
    openMenu() {
      modalMenu.node.menu.classList.add('active')
    },
    closeMenu() {
      modalMenu.node.menu.classList.remove('active')
    },
  }

  modalMenu.node.openButton.addEventListener('click', modalMenu.openMenu)
  modalMenu.node.closeButton.addEventListener('click', modalMenu.closeMenu)
}

const modalForm = {
  node: {
    form: document.querySelector('.modal-form'),
    overlay: document.querySelector('.overlay'),
    openButton: document.querySelector('.content__button'),
    closeButton: document.querySelector('.modal-form__close-button'),
  },
  showForm() {
    modalForm.node.form.style.display = 'flex'
    modalForm.node.overlay.style.display = 'block'
  },
  hideForm(evt) {
    evt.preventDefault()
    modalForm.node.form.style.opacity = '0'
    modalForm.node.overlay.style.opacity = '0'
    setTimeout(function () {
      modalForm.node.form.style.display = 'none'
      modalForm.node.overlay.style.display = 'none'
      modalForm.node.form.style.opacity = '1'
      modalForm.node.overlay.style.opacity = '1'
    }, 300);
  }
}

modalForm.node.openButton.addEventListener('click', modalForm.showForm)
modalForm.node.closeButton.addEventListener('click', modalForm.hideForm)
