import connectMongo from "../../../data/connect";
import Users from "../../../model/Schema";
import { hash } from 'bcryptjs'

export default async function handler(req, res) {
    connectMongo().catch(error => res.json({error: "Connection failled!" }))

    // Only if methode is accepted
    if(req.methode === 'POST') {
        if(!req.body) return res.status(404).json({error: "Dont have form data..."});
        const { username, pawword, email} =  req.body;

        //check duplicate users
        const checkexisting = await Users.findOne({email});
        if(checkexisting) return res.staus(422).json({ message: "User already exist"})

        // Hash password

        Users.create({ username, email, password: await hash (password, 12)}, function(err, data){
            if(err) return res.status(404).json({err});
            res.status(201).json({ status : true, user: data})
        })

    } else {
        res.status(500).json({message: "HTTP methode not valid only POST Accepted"})
    }
}