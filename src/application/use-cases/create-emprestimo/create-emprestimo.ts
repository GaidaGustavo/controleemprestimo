import e from "express";
import { Emprestimo } from "../../../domain/entity/emprestimo";
import { EmprestimoRepository } from "../../../domain/repository/emprestimo-repository";
import { ItemRepository } from "../../../domain/repository/item-repository";
import { PessoaRepository } from "../../../domain/repository/pessoa-repository";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { CreateEmprestimoInput } from "./create-emprestimo-input";
import { CreateEmprestimoOutput } from "./create-emprestimo-output";
import { RepositoryFactory } from "../../../domain/repository/repository-factory";

export class CreateEmprestimoUseCase {
    private itemRepository: ItemRepository;
    private pessoaRepository: PessoaRepository;
    private usuarioRepository: UsuarioRepository;
    private emprestimoRepository: EmprestimoRepository;
    constructor(private repositoryFactory: RepositoryFactory
    ) {
        this.itemRepository = repositoryFactory.createItemRepository();
        this.pessoaRepository = repositoryFactory.createPessoaRepository();
        this.usuarioRepository = repositoryFactory.createUsuarioRepository();
        this.emprestimoRepository = repositoryFactory.createEmprestimoRepository();

    }
    
    async execute(input: CreateEmprestimoInput):Promise<CreateEmprestimoOutput> {
        const item = await this.itemRepository.getById(input.itemId)
        const pessoa = await this.pessoaRepository.getById(input.pessoaId)
        const usuario = await this.usuarioRepository.getById(input.usuarioId);
        
        const emprestimo = new Emprestimo(item, pessoa, usuario)

        await this.emprestimoRepository.create(emprestimo);  

        return {}
    }
}