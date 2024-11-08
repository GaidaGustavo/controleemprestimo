import { Pessoa } from "./pessoa";
import { v4 } from 'uuid';

export class Usuario {
    readonly id?: string;
    readonly senha?: string;
    private pessoa: Pessoa;

    constructor(readonly username: string, pessoa: Pessoa, id?: string, senha?: string,) {
        if (!id) {
            id = v4();
        };
        this.id = id;
        this.username = username;
        if(!senha) {
            senha = '123'
        }
        this.senha = senha;
        this.pessoa = pessoa;
    }

    getID(): string | undefined{
        return this.id;
    }

    getName(): string{
        return this.username;
    }   

    getSenha(): string | undefined{
        return this.senha;
    }

    getPessoa(): Pessoa{
        return this.pessoa;
    }
}
