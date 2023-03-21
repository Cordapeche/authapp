import connectMongo from "../../../data/connect";
import Users from "../../../model/Schema";
import { hash } from 'bcryptjs';

export default async function handler(req, res){
    connectMongo().catch(error => res.json({ error: "Connection Failed...!"}))

    // only post method is accepted
    if(req.method === 'POST'){

        if(!req.body) {
            return res.status(404).json({ status: false, message: "Don't have form data...!"});
        }
        const { username, email, password } = req.body;

        // check duplicate users
        const checkexisting = await Users.findOne({ email });
        if(checkexisting){
            return res.status(422).json({ status: false, message: "User Already Exists...!"});
        }

        const user = { 
            username, 
            email, 
            password : await hash(password, 12)
        }; 

        // hash password
        const iscreated = await Users.create(user);

        console.log(iscreated);

        if(iscreated){
            res.status(201).json({ status : true, user: iscreated })
        }
        else{
            return res.status(404).json({ status : false, message: "User creation failed" });
        }

        /*function(err, data){
            if(err) 
            res.status(201).json({ status : true, user: data})
        } */

    } else{
        res.status(500).json({ message: "HTTP method not valid only POST Accepted"})
    }

}