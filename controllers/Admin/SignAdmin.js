require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Admin = require('../../models/Admin');


const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email, verify: true })

        if(admin && (await bcrypt.compare(password, admin.password)))
        {
            const accessToken = jwt.sign({
                admin: {
                    email: admin.email,
                    id: admin.id,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    telephone: admin.telephone
                }
            }, 
            process.env.ACCESS_TOKEN_ADMIN,
            { expiresIn: "5m" }
            )
            res.status(201).json({ accessToken })
        }
        else
        {
            res.status(401).json({ message: "Incorrect account information or email unconfirmed account" })
        }

    } catch (error) {
        res.status(500).json({ message: "have error " + error });
    }
};

const currentToken = async (req, res) => {
    res.status(201).json({ json: req.session.admin });
}

module.exports = {
    AdminLogin,
    currentToken
}