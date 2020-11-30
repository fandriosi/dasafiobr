import { Request, Response } from "express"
import { getRepository, JoinTable } from "typeorm";
import { Tasks } from "../module/entity/tasks";

export default{
    async index(request:Request, response:Response) {
        const tasksRepository = getRepository(Tasks);
        const tasks = await tasksRepository.find({relations:["user"]});  
        return response.json(tasks);    
    },
    async show(request:Request, response:Response) {
        try{
            const {id} = request.params;
            const tasksRepository = getRepository(Tasks);
            const tasks = await tasksRepository.findOneOrFail(id,{relations:["user"]});  
            return response.json(tasks);
        }catch(err){
            response.json(err);
        }            
    },
    async findByAsc(request:Request, response:Response) {
        try{
            const tasksRepository = getRepository(Tasks);
            const tasks = await tasksRepository.createQueryBuilder("tasks")
            .innerJoinAndSelect("tasks.user","user")
            .orderBy("user.name","ASC")
            .addOrderBy("tasks.data_criacao","ASC")
            .addOrderBy("tasks.status","ASC").getMany();  
            return response.json(tasks);
        }catch(err){
            response.json(err);
        }            
    },
    async findByDesc(request:Request, response:Response) {
        try{
            const tasksRepository = getRepository(Tasks);
            const tasks = await tasksRepository.createQueryBuilder("tasks")
            .innerJoinAndSelect("tasks.user","user")
            .orderBy("user.name","DESC")
            .addOrderBy("tasks.data_criacao","DESC")
            .addOrderBy("tasks.status","DESC").getMany(); 
            return response.json(tasks);
        }catch(err){
            response.json(err);
        }            
    },
    async create(request: Request,response: Response){
        try{
            const {
                descricao,
                user,
                status,
                data_inicio,
                data_finalizacao
            }= request.body;
            const tasksRepository = getRepository(Tasks);
            const tasks = tasksRepository.create({
                descricao,
                user,
                status,
                data_inicio,
                data_finalizacao
            });
            await tasksRepository.save(tasks);
            return response.status(201).json(tasks);     
        }catch(err){
            response.json(err);
        }        
    },
    async delete(request: Request,response: Response){
        try{
            const {id} = request.params;
            const tasksRepository = getRepository(Tasks);
            await tasksRepository.delete([id]);
            response.send("Deleted");
        }catch(err){
            response.json(err);
        }        
    },
    async sum(request: Request,response: Response){
        try{
            const {id} = request.params;
            const tasksRepository = getRepository(Tasks);
            const sum =await tasksRepository.createQueryBuilder().getCount();
            response.send("Deleted");
        }catch(err){
            response.json(err);
        }        
    },
    async udpate(request: Request,response: Response){
        try{
            const {id} = request.params;
            const {
                descricao,
                user,
                status,
                data_inicio,
                data_finalizacao
            }= request.body;
            const tasksRepository = getRepository(Tasks);
            const tasks = tasksRepository.create({
                descricao,
                user,
                status,
                data_inicio,
                data_finalizacao
            });
            const tasksrRepository = getRepository(Tasks);
            await tasksrRepository.update({id},tasks);
            return response.status(200).json(tasks);     
        }catch(err){
            response.json(err);
        }        
    }
}