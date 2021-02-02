const express = require("express");
const server = express();
const fs = require("fs");
const bodyParser = require("body-parser");

const { assureNotEmpty, isNumeric, assureRegLogin } = require("./service");

server.use(bodyParser.json());

const SERVER_PORT = 5000;

const DB_FILE_NAME = "usersDB.json";

const DB_FILE_ERROR = "error.json";


const startupCallback = function () {

    console.log(`Server started  at: http://localhost:${service.address().port}`);

};


//Get * users

server.get("/", (req, res) => {

    fs.readFile(DB_FILE_NAME, "utf8", (err, data) => {

        let users = JSON.parse(data);

        console.log(data);

        res.json(users);

        res.end();

    });

})

//Get user by id

server.get("/:id", (req, res) => {

    fs.readFile(DB_FILE_NAME, "utf8", (err, data) => {

        let users = JSON.parse(data);

        //Читаем пользователя из массива объектов по параметру id из request
        let usersFound = users.filter(user => user.id == req.params.id);

        console.log(usersFound);

        if (usersFound.length > 0) {
            res.json(usersFound[0]);
        }
        else {
            res.json({});
        }

        res.end(); 

    });

});

server.post("/", (req, res) => {

    fs.readFile(DB_FILE_NAME, "utf8", (err, data) => {

        let users = JSON.parse(data);

        //Получим нового пользователя из тела POST запроса
        let newUser = req.body;
        
        fs.readFile(DB_FILE_ERROR, "utf8", (err, data) => {

            let message = JSON.parse(data);
    
            if (!assureNotEmpty(newUser.id) || !assureNotEmpty(newUser.name) || !assureNotEmpty(newUser.email)) {
                console.log(message[0]);
            }
            else if (!(isNumeric(newUser.id)) || (parseInt(newUser.id) === 0)) {
                console.log(message[1]);
            }
            else if (!assureRegLogin(newUser.email)) {
                console.log(message[2]);
            }
            else {
                //Добавим его в новый массив вместе с существующими уже
                users = [...users, newUser];
    
                //Перезапишем файл JSON
    
                fs.writeFile(DB_FILE_NAME, JSON.stringify(users), () => {
    
                    //Перечитываем файл базы данных чтобы вернуть его в response
                    fs.readFile(DB_FILE_NAME, "utf8", (err, data) => {
    
                        res.json(JSON.parse(data));
    
                    });
    
                });
    
    
            }
    
            res.end();
            
        });

        

    });

});

server.put("/", (req, res) => {

    fs.readFile(DB_FILE_NAME, "utf8", (err, data) => {

        let users = JSON.parse(data);
        let updatedUser = req.body;

        fs.readFile(DB_FILE_ERROR, "utf8", (err, data) => {

            let message = JSON.parse(data);

            if (!assureNotEmpty(newUser.id) || !assureNotEmpty(newUser.name) || !assureNotEmpty(newUser.email)) {
                console.log(message[0]);
            }
            else if (!(isNumeric(newUser.id)) || (parseInt(newUser.id) === 0)) {
                console.log(message[1]);
            }
            else if (!assureRegLogin(newUser.email)) {
                console.log(message[2]);
            }
            else {
                //копируем из старого массива всех пользователей которые не менялись
                let unchangedUsers = users.filter(user => user.id != updatedUser.id);
    
                //Добавляем обновлённого пользователя к тем кто не менялся
                let allUsers = [...unchangedUsers, updatedUser];
    
                fs.writeFile(DB_FILE_NAME, JSON.stringify(allUsers), () => {
    
                    //Перечитываем файл базы данных чтобы вернуть его в response
                    fs.readFile(DB_FILE_NAME, "utf8", (err, data) => {
    
                        res.json(JSON.parse(data));
    
                    });
    
                });
    
    
            }
    
            res.end();
            
        });


        

    });

});

server.delete("/:id", (req, res) => {

    fs.readFile(DB_FILE_NAME, "utf8", (err, data) => {

        let users = JSON.parse(data);

        //Берём всех пользователей чей id не совпадает с id удаляемого пользователя
        //users left - оставшиеся пользователи
        let usersLeft = users.filter(user => user.id != req.params.id);

        fs.writeFile(DB_FILE_NAME, JSON.stringify(usersLeft), () => {

            res.json({
                "result": true
            });

            res.end();

        });

    });

});

const service = server.listen(SERVER_PORT, startupCallback)

