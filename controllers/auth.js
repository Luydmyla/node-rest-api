const { User } = require("../models/user.js");
const { HttpError, ctrlWrapper } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const {SECRET_KEY} = process.env
const register = async (req, res) => {
  
  // для того щоб воаернути на фронтент уникальний ерор меседж а не той що повернувся з бази, нам потрыбно зробити ще одни запит ы перевырити чи э вже в базы юзер з таким емейлом
  // витягуэмо емейл з реквест баді та пароль
  
  const { email, password } = req.body;
  console.log(email, password )

  const user = await User.findOne({ email });
  console.log(user)
  // якщо є - то викидаємо помилку 409 з текстом, що такий емей уже використовується
  if (user) {
    throw HttpError(409, "This email is already in use");
  }

  //перед тим як зберегти юзера - хешуємо пароль,який нам прислали з фронта і розпиляємо реквест боді а в полі пароль - зь берігємо захешований рядок

  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword)
  const newUser = await User.create({ ...req.body, password: hashPassword });
 console.log(newUser);


  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};


const login = async (req, res) => {
  
  // витягуэмо емейл з реквест баді та пароль

  const { email, password } = req.body;
  // перевіряємо чи є користувач з таким емейлом
  const user = await User.findOne({ email });
  // якщо нема - то викидаємо помилку 409 з текстом, що такий емей уже використовується
  if (!user) {
    throw HttpError(409, "Email or password invalid");
  }
  //  створюємо пейлоад - інформація про користувача, зазвичай достатньо айді
  const payload = {
    id:user.id
 }
//  створюємо токен, викликаємо метод сайн і передаємо пейлоад, секретний ключ і обєкт наслаштувань, де є час життя токена. він залежит від конкретної задачі.
const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})



  //якщо є - перевіряємо  пароль,який нам прислали з фронта і порівнюємо його з тим, що збережено в базі поля пароль  захешований рядок
//  якщо не має - викидаємо помилку, що пароль чи емейл не вірний
  const passwordCompare = await bcrypt.compare(password, user.password);
 if(!passwordCompare) {
  throw HttpError(409, "Email or password invalid");
 }
// якщо є = створюємо токен і відправляємо його на фронтенд
//  const token = "gttasjgkjashfkh09w3-rtjhf";
  res.json({
    token, 
  })
};
const getCurrent =async (req, res) =>{
  // оскільки мідлвара аутотікейт сама перевіряє валідність токена і якщо він не валідний, то сама відсилає помилку, а при валідності повертає юзера в реквесті, то ми можемо з реквеста взяти у цього юзера емей і нейм

const {email, name}= req.user
res.json({email, name,})
}

const logout= async (req, res) =>{ 
  // беремо з реквест айді юзера який хоче розлогінитись і викликаємо метод щоб оновити обєкт і , видяляємо токен - в полі токена порожня строка
  const {_id}= req.user
  await User.findByIdAndUpdate(_id, {token:""})
  res.json({
    message: "Logout success"
  })
}
module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent:ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout)
};
