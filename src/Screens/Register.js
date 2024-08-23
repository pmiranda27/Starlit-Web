import './Register.css'
import starlitLogo from '../Assets/Images/starlit-logo.png'

import axios from 'axios';

const apiUrl = "https://def5f95f-e30e-4f86-b1e0-9f53460f5248-00-1pjmbawk5ifrf.worf.replit.dev"
const api = axios.create({
    baseURL: apiUrl 
})

const verificarForm = (e) => {
    e.preventDefault();
    
    let nomeForm = document.getElementById('nome-form');
    let emailForm = document.getElementById('email-form');
    let senhaForm = document.getElementById('senha-form');
    let confirmarForm = document.getElementById('confirmar-form');
    
    const userData = {
        "username": nomeForm.value,
        "password": senhaForm.value
    }
    
    apiRegister(userData);
}

async function apiRegister(data) {
    try {
        const response = await api.post('/register', data)
        console.log(response);
        console.log(`StatusCode: ${response.status}`);
    } catch (error) {
        console.log(error)
    }
}


const Register = () => {

    return (
        <div className='register-main'>
            <img src={starlitLogo} alt="Starlit Logo" className='starlit-logo' />
            <form className="form" id='form-register' action={verificarForm}>
                <input type="text" name="name" id='nome-form' className='input-padrao' placeholder='Nome' />
                <input type="email" name="email" id='email-form' className='input-padrao' placeholder='Email' />
                <input type="password" name="senha" id='senha-form' className='input-padrao' placeholder='Senha' />
                <input type="password" name="confirmar-senha" id='confirmar-form' className='input-padrao' placeholder='Confirmar senha' />

                <input type="submit" value="Registrar" />
            </form>
        </div>
    );
}

export default Register;