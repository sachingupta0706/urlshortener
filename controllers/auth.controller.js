import { createUser, getUserByEmail } from "../services/auth.services.js";

export const getRegisterPage = (req, res) => {
    return res.render("auth/register");
}

export const postRegister = async (req, res) => {

    const { name, email, password } = req.body;

    const userExists = await getUserByEmail(email);
    console.log(userExists);

    if (userExists) return res.redirect("/register");

    const [users] = await createUser({ name, email, password })
    console.log(users);

    res.redirect("/login");

}

export const getLoginPage = (req, res) => {
    return res.render("auth/login");
}

export const postLogin = async (req, res) => {

    const { email, password } = req.body;

    const users = await getUserByEmail(email);
    console.log(users);

    if (!users) return res.redirect("/login");

    if (users.password != password) return res.redirect("/login");

    res.cookie("isLoggedIn", true);
    res.redirect("/");
}