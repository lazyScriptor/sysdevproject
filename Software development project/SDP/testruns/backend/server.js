import express from 'express';
import { getUsers, createUser } from "./database.js";
const app = express();



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.get("/notes", async (req, res) => {
    const users=await getUsers();
    res.json(users)
   
    // try {
    //     const notes = await getUsers();
    //     res.send(notes);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send('Error retrieving notes");
    // }
});
app.get("/users", async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Error retrieving users' });
    }
});
app.listen(8080, () => {
    console.log("listening in port 8080");
});
