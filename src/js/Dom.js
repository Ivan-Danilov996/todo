export default class Dom {
    static getContainer() {
        return document.querySelector('.container');
    }

    static createApplication(isAuth) {
        const application = document.createElement('section');
        application.className = 'application';
        application.innerHTML = `<header class="header">
                                ${isAuth? '<button class="auth-btn btn">Выйти</button>':'<button class="auth-btn btn">Войти</button>'}
                                <button class="add-ticket-btn btn" type='button'>Создать задачу</button>
                                </header>
                                <table class="table table-bordered">
                                  <thead>
                                      <tr>
                                          <th data-name='name' class='name sorted btn' scope="col">Name</th>
                                          <th data-name='email' class='email sorted btn ' scope="col">Email</th>
                                          <th class='text' scope="col">Text</th>
                                          <th data-name='status' class='status sorted btn' scope="col">Status</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                  </tbody>
                                </table>
    `;
        return application;
    }

    static createLiading() {
        const loading = document.createElement('section');
        loading.className = 'loading';
        loading.innerHTML = '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>';
        return loading;
    }
}
