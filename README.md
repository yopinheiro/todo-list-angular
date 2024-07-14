# Todolist Angular 15

Este projeto foi gerado com Angular CLI versão 15.0.0. Inclui uma aplicação Todolist básica integrada com `json-server` para simular um backend RESTful através do arquivo `db.json`.

## Requisitos

Certifique-se de ter o Angular CLI versão 15 e o `json-server` instalados globalmente:

```bash
npm install -g @angular/cli@15.0.0
npm install -g json-server
```

## Instalação

Após clonar este repositório, instale as dependências:

```bash
npm install
```

## Executando o JSON Server

Para iniciar o `json-server` e simular o backend da aplicação:

```bash
npx json-server --watch db.json
```

O servidor estará disponível em `http://localhost:3000`.

## Executando a Aplicação Angular

Para iniciar a aplicação Angular:

```bash
ng serve
```

Navegue para `http://localhost:4200/`. A aplicação será recarregada automaticamente se você modificar qualquer um dos arquivos de origem.

## Funcionalidades

- Adicionar novas tarefas.
- Marcar tarefas como concluídas.
- Editar descrição das tarefas.
- Remover tarefas da lista.

## Estrutura do Projeto

```
todolist-angular-15/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── task-list/
│   │   │   │   ├── task-list.component.html
│   │   │   │   ├── task-list.component.ts
│   │   │   │   └── task-list.component.css
│   │   │   ├── add-task/
│   │   │   │   ├── add-task.component.html
│   │   │   │   ├── add-task.component.ts
│   │   │   │   └── add-task.component.css
│   │   ├── models/
│   │   │   └── task.model.ts
│   │   ├── services/
│   │   │   └── task.service.ts
│   │   ├── app.component.html
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   └── ...
├── db.json
├── package.json
└── README.md
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.