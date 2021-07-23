import bcrypt from 'bcryptjs';

function hashPass() {
    return bcrypt.hashSync('123456', 10);
}

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashPass(),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashPass(),
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: hashPass(),
    }
]

export default users