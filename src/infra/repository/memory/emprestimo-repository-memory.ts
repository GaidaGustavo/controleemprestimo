import { Emprestimo } from "../../../domain/entity/emprestimo";
import { Item } from "../../../domain/entity/item";
import { Pessoa } from "../../../domain/entity/pessoa";
import { TipoItem } from "../../../domain/entity/tipoitem";
import { Usuario } from "../../../domain/entity/usuario";
import { EmprestimoRepository } from "../../../domain/repository/emprestimo-repository";


export default class EmprestimoRepositoryMemory implements EmprestimoRepository{
    private emprestimos: Emprestimo[];
    constructor(){
        const tipoItem = new TipoItem('Copos', '4694690b-d32a-4050-86a9-041a90765e7f');
        const item = new Item('Copo de Café', tipoItem, 'eb51e356-16c1-4b1e-bfea-aadc07a2c60c');
        const pessoa = new Pessoa('Jacson Santos', '2151eb0d-642a-4224-8229-aefd5832ad85');
        const usuario = new Usuario('jacson_santos', pessoa, '7e461e53-0793-4ba3-8c34-dc5f45481b31', '123');
        const date = new Date();
        
        this.emprestimos = [
            new Emprestimo(item,  pessoa, usuario, '7bb91674-3f3c-4f86-923e-dd1f266dfca4', date)
        ]
    }
    delete(id: string): void {
        this.emprestimos = this.emprestimos.filter(value => value.getID() !== id);
    }
    
    getAll(): Emprestimo[] {
        return this.emprestimos;
    }
    getById(id: string): Emprestimo {
        const emprestimo = this.emprestimos.find(valor => valor.getID() == id);

        if (!emprestimo) {
            throw new Error('User not Found');
        }

        return emprestimo;
    }
    create(emprestimo: Emprestimo): void {
        this.emprestimos.push(emprestimo);
    }
    update(emprestimo: Emprestimo): void {
        const emprestimoAntigo = this.emprestimos.findIndex(value => value.getID() == emprestimo.getID());
        this.emprestimos[emprestimoAntigo] = emprestimo;
    }
    
}