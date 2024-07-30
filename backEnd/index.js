import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import User from "./models/user.js";
import Task from "./models/task.js";
import cors from "cors";
import dotenv from "dotenv";

// load enviromental variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const db_URI = process.env.db_URI;

app.use(cors());
app.use(bodyParser.json());

app.use('/', (req, res) => {
    res.json({ message: 'Default route' });
});

// User POST route
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        const newUser = new User({
            username,
            password
        });

        await newUser.save();
        res.status(201).send(newUser);

    }catch (error) {
        res.status(400).send(error);
    }
});

// User POST route used for sign-in
app.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const findUser = await User.findOne({ username });
        if (findUser && findUser.password === password) {
            res.json({ message: 'Login successful', objectIdOfUser: findUser._id });
        } else if (!findUser) {
            res.status(401).send({ message: 'Please create an account' });
        } else {
            res.status(401).send({ message: 'Incorrect password' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

// Task POST route used to add new tasks
app.post('/task', async (req, res) => {
    try{
        const { info, date, time, status, userId } = req.body;

        const newTask = new Task({
            info,
            date,
            time,
            status,
            userId
        });

        await newTask.save();
        res.status(201).send(newTask);
    } catch(error){
        res.status(400).send(error);
    }
});

// Task GET route to get all the tasks created by a specific user
app.get('/tasks/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const tasks = await Task.find({ userId: userId });

        if (!tasks) {
            return res.status(404).json({ message: 'Tasks not found' });
        }

        res.json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server Error' });
    }
});

// Task DELETE route to delete a specific task
app.delete('/tasks/deleteTask/:taskId', async (req, res) => {
    try{
        const { taskId } = req.params;
        const deleteTask = await Task.findByIdAndDelete(taskId);
        if (deleteTask) {
            return res.status(200).send('Task deleted successfully');
        }
        res.status(404).send('Task not found');
    } catch (error) {
        console.log(error);
    }
})

// Task PUT route to edit specific tasks
app.put('/tasks/editTask/:taskId', async (req, res) => {
    try {
        const { info, date, time, status } = req.body;
        const task = await Task.findByIdAndUpdate(req.params.taskId, { info, date, time, status }, { new: true });
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.json(task);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Task GET route to get a specific task
app.get('/task/:taskId', async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.json(task);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

mongoose.connect(db_URI)
    .then(() => {
        console.log("Connected to Mongodb :) ")
        app.listen(port, () => {
            console.log('Server is listening to incoming requests');
        })
    })
    .catch((error) => {
        console.log(error);
    })