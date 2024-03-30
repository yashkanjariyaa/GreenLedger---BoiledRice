const bcrypt = require('bcrypt');

const hashPassword = async (req, res, next) => {
    try {
        if (req.body && req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds
            req.body.password = hashedPassword;
        }
        next();
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    hashPassword
};
