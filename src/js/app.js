import Request from './Request';
import Dom from './Dom';
import Form from './Form'

class Todo {
  constructor() {
    this.isAuth
    this.task
    this.container = Dom.getContainer();
    this.loading = Dom.createLiading();
    this.application;
    this.sort = {
      name: false,
      email: false,
      status: false,
    };
    this.orderSort;

    this.activeBtn = 1;
    this.length = 0
    this.count
    this.nextButton = document.querySelector('.next-btn');
    this.prevButton = document.querySelector('.prev-btn');
    this.buttons;
  }

  addListenerTable() {
    Array.from(this.application.querySelectorAll('.sorted')).forEach((el) => {
      el.addEventListener('click', this.clickHandlerTable.bind(this));
    });
  }

  updateData(data) {
    this.task = data.task;
    this.showData();
    this.length = data.length;
  }

  clickHandlerTable(e) {
    this.value = e.target.dataset.name;
    const request = new Request();
    this.sort[this.value] ? this.orderSort = 'down' : this.orderSort = 'up';
    this.sort[this.value] = !this.sort[this.value];
    request.createRequest(`http://localhost/mysite/sort${this.orderSort}?offset=${(this.activeBtn * 3) - 3}&sort=${this.value}`)
      .then((data) => {
        this.updateData(data)
      });
  }

  clearTable() {
    this.application.querySelector('tbody').innerHTML = ''
  }

  clickCompleted(e) {
    const id = e.target.closest('tr').dataset.id
    const URL = this.clreateCompletedURL(id)
    const request = new Request()
    request.createRequest(URL, 'PATCH')
      .then((data) => {
        this.updateData(data)
      });
  }

  clreateCompletedURL(id) {
    if (this.orderSort) {
      return `http://localhost/mysite/sort${this.orderSort}?offset=${(this.activeBtn * 3) - 3}&sort=${this.value}&id=${id}`
    }
    return `http://localhost/mysite/offset?offset=${(this.activeBtn * 3) - 3}&id=${id}`
  }

  appendForm(form) {
    document.body.append(form)
    document.querySelector('.application').style.display = 'none'
    document.querySelector('.pagination').style.display = 'none'
  }

  updateAuthData() {
    this.activeBtn = 1;
    this.clearPagination()
    document.querySelector('.pagination').style.display = 'block'
  }

  createTaskList() {
    this.task.forEach((element) => {
      const list = document.createElement('tr');
      list.dataset.id = element.id
      list.innerHTML = ` 
              <td>${element.name}</td>
              <td>${element.email}</td>
              <td>${element.text}</td>
              <td>${parseInt(element.status) ? 'comleted <br/> отредактировано администратором' : '<button class="completed">completed</button>'}</td>
          `;
      if (!this.auth) {
        if (list.querySelector('.completed')) {
          list.querySelector('.completed').disabled = true;
        }
      }
      if (list.querySelector('.completed')) {
        list.querySelector('.completed').addEventListener('click', this.clickCompleted.bind(this))
      }
      this.application.querySelector('tbody').append(list);
    });
  }

  handlerAuthBtn() {
    document.querySelector('.auth-btn').addEventListener('click', e => {
      if (this.auth) {
        this.auth = false
        localStorage.removeItem('auth')
        const request = new Request();
        request.createRequest(`http://localhost/mysite/${this.createURL()}`)
          .then((data) => {
            this.updateData(data)
          });
      } else {
        const form = new Form()
        const authElement = form.createAuthForm()
        authElement.addEventListener('submit', e => {
          e.preventDefault()
          const request = new Request()
          request.createRequest('http://localhost/mysite/auth', 'POST', form.createAuthData())
            .then((data) => {
              if (data.success === 'ok') {
                document.querySelector('.create-auth-form').remove()
                this.auth = true
                this.showData();
                this.updateAuthData()
                localStorage.setItem('auth', 'ok')
              } else {
                document.querySelector('.loading').remove();
                form.resetForm()
                form.addError()
              }
            })
        })
        this.appendForm(authElement)
      }
    })
  }

  handlerAddTicketBtn() {
    this.container.querySelector('.add-ticket-btn').addEventListener('click', e => {
      const form = new Form()
      const formElement = form.createForm()
      formElement.addEventListener('submit', e => {
        e.preventDefault()
        const request = new Request()
        request.createRequest('http://localhost/mysite/tasks', 'POST', form.createFormData())
          .then((data) => {
            document.querySelector('.create-form').remove()
            this.updateData(data)
            this.updateAuthData()
          })
      })
      this.appendForm(formElement)
    })
  }

  showData() {
    this.application = Dom.createApplication(this.auth)
    this.addListenerTable();
    document.querySelector('.loading').remove();
    this.container.append(this.application);
    this.clearTable()
    this.createTaskList()
    this.handlerAuthBtn()
    this.handlerAddTicketBtn()
  }

  clearPagination() {
    Array.from(document.querySelectorAll('.int-btn')).forEach(el => {
      el.remove()
    })
    this.updatePagination()
  }

  editArrowBtn() {
    if (this.count <= 1) {
      this.nextButton.disabled = 'true';
      this.prevButton.disabled = 'true';
    } else if (this.activeBtn === 1) {
      this.prevButton.disabled = 'true';
      this.nextButton.disabled = false;
    } else if (this.activeBtn === this.count) {
      this.nextButton.disabled = 'true';
      this.prevButton.disabled = false;
    } else {
      this.nextButton.disabled = false;
      this.prevButton.disabled = false;
    }
  }

  pastePagination() {
    this.count = Math.ceil(this.length / 3);
    this.editArrowBtn();
    for (let i = 1; i <= (this.count); i++) {
      const button = document.createElement('button');
      button.className = `pagination-btn ${i === this.activeBtn ? 'active' : ''} int-btn`;
      button.classList.contains('active') ? button.disabled = 'true' : null;
      button.textContent = `${i}`;
      this.nextButton.insertAdjacentElement('beforebegin', button);
    }
    this.buttons = Array.from(document.querySelectorAll('.pagination-btn.int-btn'));
  }
  updatePagination() {
    this.pastePagination()
    this.updatePaginationListener()
  }

  createPagination() {
    this.pastePagination()
    this.addPaginationListener();
  }

  createURL() {
    if (this.value) {
      return `sort${this.orderSort}?offset=${(this.activeBtn * 3) - 3}&sort=${this.value}`
    }
    return `offset?offset=${(this.activeBtn * 3) - 3}`
  }

  editPagination() {
    this.editArrowBtn();
    document.querySelector('.active.int-btn').disabled = false;
    document.querySelector('.active').classList.remove('active');
    this.buttons.forEach((el, i) => {
      i++;
      if (i === this.activeBtn) {
        el.classList.add('active');
        el.disabled = 'true';
      }
    });
    const request = new Request();
    request.createRequest(`http://localhost/mysite/${this.createURL()}`)
      .then((data) => {
        this.updateData(data)
      });
  }

  clickArrowHandler(e) {
    if (e.target.classList.contains('next-btn')) {
      this.activeBtn++;
    } else {
      this.activeBtn--;
    }
    this.editPagination();
  }

  addPaginationListener() {
    this.nextButton.addEventListener('click', this.clickArrowHandler.bind(this));
    this.prevButton.addEventListener('click', this.clickArrowHandler.bind(this));
    this.updatePaginationListener()
  }

  updatePaginationListener() {
    this.buttons.forEach((element) => {
      element.addEventListener('click', (e) => {
        this.activeBtn = parseInt(e.target.textContent);
        this.editPagination();
      });
    });
  }

  init() {
    localStorage.getItem('auth') ? this.auth = true : false
    const request = new Request();
    request.createRequest('http://localhost/mysite/tasks')
      .then((data) => {
        this.updateData(data)
        this.createPagination();
      });
  }
}

const app = new Todo()
app.init();

