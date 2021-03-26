export default class Form {
    constructor() {
        this.form,
        this.formData
    }

    createForm() {
        this.form = document.createElement('section')
        this.form.className = 'create-form'
        this.form.innerHTML = `<form class="form">
                <div class="row">
                    <label for="name" >Name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="row">
                    <label for="e-mail-form">E-mail</label>
                    <input type="email" id="e-mail-form" required>
                </div>
                <div class="row">
                    <label for="textarea">Text</label>
                    <textarea maxlength='150' class='textarea' type="text" id="textarea" required></textarea>
                </div>
                <div class="row-btns">
                    <button type="button" class="btn btn-cancel">Отмена</button>
                    <button type='submit' class="btn btn-submit">Создать</button>
                </div>
            </form>`
        this.form.querySelector('.btn-cancel').addEventListener('click', e => {
            document.querySelector('.create-form').remove()
            document.querySelector('.application').style.display = 'block'
            document.querySelector('.pagination').style.display = 'block'
        })
        return this.form
    }
    createFormData() {
        this.formData = new FormData()
        this.formData.append('name', this.form.querySelector('#name').value)
        this.formData.append('email', this.form.querySelector('#e-mail-form').value)
        this.formData.append('textarea', this.form.querySelector('#textarea').value)
        return this.formData
    }

    createAuthData() {
        this.formData = new FormData()
        this.formData.append('login', this.form.querySelector('#login').value)
        this.formData.append('password', this.form.querySelector('#password').value)
        return this.formData
    }

    resetForm() {
        this.form.querySelector('#login').value = ''
        this.form.querySelector('#password').value = ''
        this.form.querySelector('.error').textContent = ''
    }

    addError() {
        this.form.querySelector('.error').textContent = 'Неверный логин или пароль'
    }


    createAuthForm() {
        this.form = document.createElement('section')
        this.form.className = 'create-auth-form'
        this.form.innerHTML = `<form class="form">
                <div class="row">
                    <label for="login" >Login</label>
                    <input type="text" id="login" required>
                </div>
                <div class="row">
                    <label for="password">password</label>
                    <input type="password" id="password" required>
                </div>
                <div class="row-btns">
                    <button type="button" class="btn btn-cancel">Отмена</button>
                    <button type='submit' class="btn btn-submit">Войти</button>
                </div>
                <p class="error"></p>
            </form>`
        this.form.querySelector('.btn-cancel').addEventListener('click', e => {
            document.querySelector('.create-auth-form').remove()
            document.querySelector('.application').style.display = 'block'
            document.querySelector('.pagination').style.display = 'block'
        })
        return this.form
    }
}