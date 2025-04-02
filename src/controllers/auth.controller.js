export const register = (req, res) => {
    const {email, password} = req.body;

    console.log(email, password); // Para ver los datos que se envian en el body de la peticion

    res.send('registrando');
}

export const login = (req, res) => {res.send('login')}