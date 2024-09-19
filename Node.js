app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Here you would check the credentials against your database
    if (username === 'admin' && password === 'password123') {
        res.send('Login successful');
    } else {
        res.send('Login failed');
    }
});
