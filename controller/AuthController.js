import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async(req, res) => {
    const {username, email, password, role} = req.body;

    try {
        //find exist email
        const exist1 = await User.findOne({where: {email}});
        if(exist1) return res.status(400).json({msg: "Email already used!"});
        
        const exist2 = await User.findOne({where: {username}});
        if(exist2) return res.status(400).json({msg: "Username already used!"});

        //hash
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        //save user
        await User.create({
            username,
            email,
            password: hashPassword,
            role
        });
        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        console.error("Register Error:", error); // Log ke terminal backend
        res.status(500).json({ msg: "Registration failed" });
    }
}

export const Login = async(req, res) => {
    const{email, password} = req.body;

    try {
        const user = await User.findOne({where: {email}});
        if(!user) return res.status(404).json({msg: "User not found"});

        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(401).json({msg: "Password Wrong"});

        const userId = user.id;
        const name = user.username; 
        const mail = user.email;
        // const role = user.role;

        const accessToken = jwt.sign({ userId, name, mail}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
        const refreshToken = jwt.sign({ userId, name, mail}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

        await User.update({ refresh_token: refreshToken }, {
            where: { id: userId }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ 
            accessToken,
            msg: "Login Successfully"
        });
    } catch (error) {
        console.error("Login Error:", error); // Log ke terminal backend
        res.status(500).json({ msg: "Login failed" });
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204); // Jika tidak ada refreshToken, kirimkan status 204

    // Cek user dengan refresh_token yang diterima dari cookie
    const users = await User.findAll({
        where: {
            refresh_token: refreshToken
        }
    });

    if (!users[0]) return res.sendStatus(204); // Jika user tidak ditemukan, kirimkan status 204

    const userId = users[0].id;

    // Hapus refresh_token di database
    await User.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });

    // Bersihkan refresh token di cookie
    res.clearCookie('refreshToken');

    return res.sendStatus(200); // Mengirimkan status 200 setelah berhasil logout
};