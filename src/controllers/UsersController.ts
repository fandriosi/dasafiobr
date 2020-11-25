import { Request, Response } from "express"
import { createQueryBuilder, getRepository } from "typeorm";
import { Users } from "../module/entity/users";

export default{
    async index(request:Request, response:Response) {
        const usesrRepository = getRepository(Users);
        const users = await usesrRepository.find({relations:["tasks"]});  
        return response.json(users);    
    },
    async show(request:Request, response:Response) {
        try{
            const {id} = request.params;
            const usesrRepository = getRepository(Users);
            const user = await usesrRepository.findOneOrFail(id,{relations:["tasks"]});  
            return response.json(user);
        }catch(err){
            response.send(err);
        }            
    },
    
    async create(request: Request,response: Response){
        try{
            const {
                name,
                email,
            }= request.body;
            const usesrRepository = getRepository(Users);
            const user = usesrRepository.create({
                name,
                email
            });
            await usesrRepository.save(user);
            return response.status(201).json(user);     
        }catch(err){
            response.send(err);
        }        
    },
    async delete(request: Request,response: Response){
        try{
            const {id} = request.params;
            const usesrRepository = getRepository(Users);
            console.log(id);
            await usesrRepository.delete([id]);
            response.send("Deleted");
        }catch(err){
            response.send(err);
        }        
    },
    async udpate(request: Request,response: Response){
        try{
            const {id} = request.params;
            const {
                name,
                email,
            }= request.body;
            const usesrRepository = getRepository(Users);
            const user = usesrRepository.create({
                name,
                email
            });
            await usesrRepository.update({id},user);
            return response.status(200).json(user);     
        }catch(err){
            response.send(err);
        }        
    }
}