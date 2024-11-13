import { CreateItemInput } from "./create-item-input";
import { CreateItemOutput } from "./create-item-output";
import { ItemRepository } from "../../../domain/repository/item-repository";
import { Item } from "../../../domain/entity/item";
import { TipoItemRepository } from "../../../domain/repository/tipoitem-repository";
import { RepositoryFactory } from "../../../domain/repository/repository-factory";
import { ItemEPI } from "../../../domain/entity/value-object/item-epi";

export class CreateItemUseCase {
    private itemRepository: ItemRepository;
    private tipoItemRepository: TipoItemRepository;
    constructor(private repositoryFactory: RepositoryFactory
    ) {
        this.itemRepository = repositoryFactory.createItemRepository();
        this.tipoItemRepository = repositoryFactory.createTipoItemRepository();
    }
    
    async execute(input: CreateItemInput): Promise<CreateItemOutput> {
        if (!input.nome) {
            throw new Error('Insira um nome para o item');
        }
        if (!input.tipoItemId) {
            throw new Error('Insira um tipo de item');
        }
    
        const tipoItem = await this.tipoItemRepository.getById(input.tipoItemId);
        const itemEPI = new ItemEPI(input.itemEpi?.ca, input.itemEpi?.validade)
    
        const item = new Item(input.nome, tipoItem, input.id, itemEPI);
    
        await this.itemRepository.create(item);
    
        return {};
    }
    
}