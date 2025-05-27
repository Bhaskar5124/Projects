import express from 'express';
const app = express();
const PORT = 8050;



app.listen(PORT,()=>{
    console.log(`Server Connected on port ${PORT}`)
});

app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.method);
    next();
});

const users = [
    {
        "id":1,
        "firstName": "Bhaskar",
        "lastName": "Chaurasiya",
        "Hobby": "Badminton",
    },
    {
        "id":2,
        "firstName": "Venky",
        "lastName": "Prakash",
        "Hobby": "Teaching",
    },
]


app.get('/users',(req,res)=>{
    res.send(users);
});

app.get('/users/:id',(req,res)=>{
    const seluser = users.find(user=>user.id == req.params.id);
    if(!seluser){
        res.status(404).json({message:"User with this ID does not exist"})
    }else{
        res.send(seluser);
    }
});

app.post('/user',(req,res)=>{
    const {firstName, lastName, Hobby} = req.body;
    const newuser = {
        "id": users.length+1,
        firstName:firstName,
        lastName:lastName,
        Hobby:Hobby,
    };
    users.push(newuser);
    res.send(users);
});

app.put('/user/:id',(req,res)=>{
    const userid = req.params.id;
    const user = users.find(user=>user.id == userid);
    if(!user){
        res.status(404).json({message:"User with this ID does not exist"})
    }
    else{
        const keys = Object.keys(req.body);
        keys.forEach(key=>{
            user[key] = req.body[key];
        });
        res.send(users);
    }
});

app.delete('/user/:id',(req,res)=>{
    const deluser = users.find(user=>user.id == req.params.id);
        
    if(!deluser){
        res.status(404).json({message:"User with this ID does not exist"})
    }
    else{
        const filteredusers = users.filter((user)=>user.id != req.params.id);
        res.send(filteredusers);
    }
});