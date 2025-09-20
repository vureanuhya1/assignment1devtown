// app.js
const express = require('express');
const app = express();

app.use(express.json());

// Mock users (in real case, fetch from DB)
const users = [
    { id: 1, name: 'Admin Alice', role: 'admin' },
    { id: 2, name: 'Doctor Bob', role: 'doctor' },
    { id: 3, name: 'Nurse Carol', role: 'nurse' },
    { id: 4, name: 'Receptionist Dave', role: 'receptionist' },
    { id: 5, name: 'Patient Eve', role: 'patient' },
];

// Middleware to simulate authentication
function authenticate(req, res, next) {
    const userId = parseInt(req.header('user-id'));
    const user = users.find(u => u.id === userId);
    if (!user) return res.status(401).send('User not found');
    req.user = user;
    next();
}

// Middleware for role-based access
function authorize(allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).send('Access denied');
        }
        next();
    };
}

// Routes
app.get('/patients', authenticate, authorize(['admin', 'doctor', 'nurse']), (req, res) => {
    res.send('Viewing all patients data');
});

app.post('/patients', authenticate, authorize(['admin', 'doctor']), (req, res) => {
    res.send('Adding a new patient record');
});

app.put('/patients/:id', authenticate, authorize(['admin', 'doctor', 'nurse']), (req, res) => {
    res.send(`Updating patient record ${req.params.id}`);
});

app.delete('/patients/:id', authenticate, authorize(['admin']), (req, res) => {
    res.send(`Deleting patient record ${req.params.id}`);
});

app.get('/appointments', authenticate, authorize(['admin', 'doctor', 'nurse', 'receptionist', 'patient']), (req, res) => {
    res.send(`Viewing appointments for ${req.user.name}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));
