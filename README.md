
# URL_SHORTENER API

## Descrição do Projeto
<p>API desenvolvida em Node.js visando disponibilizar um encurtador de url.</p>

<br/>
### Requisitos.
<ul>
    <li>
        <a href="https://nodejs.org/en/" target="_blank" >Node.js - v20.0.0 ou superior. Recomendado 20.18.0  </a>
    </li>
    <li>
        <a href="https://www.npmjs.com/" target="_blank" >Node Package Manager (npm) - 10.8.2 ou superior</a>
    </li>
    <li>
        <a href="https://docs.docker.com/compose/install/" target="_blank" >Docker Compose</a>
    </li>
</ul>

### Inicializar a aplicação
Para a execução do projeto de maneira local deve ser executado os seguintes passos.
<br/>
<ul>
    <li><b>Inicializar a aplicação: </b>
    <br/>
    Para inicializar a aplicação é necessário entrar na pasta do projeto e rodar os comando:
    <br/>
    <code>docker-compose up -d</code>. Ao final da execução do comando a aplicação estará rodando.<br>
    <code>docker container exec -ti teddy_backend npm run m:run:p</code>. Para que as migrations do banco sejam executadas.<br>
    </li>

</ul>

### Execução dos testes
Para a execução dos testes deverá ser executado o seguinte comando: <code> npm run test</code>.
<br/>

<p>Após a finalização desse processo você terá a aplicação rodando localmente na porta <code>3000</code>, mais especificamente: <code>http://localhost:3000/</code></p>
<br/>

<p><b>OBS:</b> Você DEVE utilizar um software como <a href="https://www.postman.com/" target="_blank">Postman</a> u usar a extensão do vscode chamada REST CLIENT para disparar requisições para a API. Existem diversas requisções configuradas para execução dentro da pasta requests</p>
<br/>
