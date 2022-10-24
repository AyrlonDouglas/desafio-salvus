<div align="center">

![image](https://user-images.githubusercontent.com/72106120/197430524-1f048ca3-da0e-4324-8319-4a10c72a9b97.png)

</div>

## 
Veja um pequeno vídeo do projeto em funcionamento: <br/>
https://drive.google.com/file/d/1ltBLuS4rWtT702kUxxsyzesJ2JwNtEMK/view?usp=sharing
##

## Contexto do desafio 
<p>
A Salvus é uma empresa no âmbito de tecnologia para saúde, com foco principal em
aplicações IoMT (Internet of Medical Things) e softwares para ajudar na produtividade e
velocidade das empresas na prestação de serviços médicos.
</p>

## Problema a Resolver

<p>
Entrar em contato com diversos profissionais de saúde para tentar criar uma rede de
profissionais capazes de atender em diferentes localidades do país, para isso é necessário
que a empresa disponibilize uma aplicação para que profissionais possam se cadastrar e
entrar em contato com o Salvus.
</p>

## Funcionalidades
<ul>
  <li>CRUD - usuários/profissionais</li>
  <li>Visualização de dashboard de monitoramento contendo 
  relação dos profissionais como suas proporções quanto a 
  profissões, especialidades, localização de atendimento e 
  data de cadastro na plataforma</li>
  <li>Visualização de lista contendo de todos os profissionais</li>
  <li>Visualização de profissional, contendo seus dados e e meios para contatos</li>
  <li>Configuração para troca de senha do usuário</li>
</ul>

## Principais tecnologias utilizadas no frontend
<ul>
    <li>React</li>
    <li>Typescript</li>
    <li>MUI</li>
    <li>Vite</li>
    <li>redux</li>
    <li>redux-saga</li>
    <li>recharts</li>
    <li>axios</li>
    <li>react-hook-form</li>
    <li>yup</li>
    
</ul>

## Principais tecnologias utilizadas no backend

<ul>
    <li>NestJs</li>
    <li>Typescript</li>
    <li>mysql2</li>
    <li>typeorm</li> 
</ul>

## Clonando o repositório
<code>$ git clone https://github.com/AyrlonDouglas/desafio-salvus.git</code>

## Rodando o frontend

<p>Após o clone, entre na pasta frontend utilizando <code>cd frontend</code>, dentro da pasta utilize <code>npm install</code> ou <code>yarn</code> para instalar as dependências, após isto, utilize <code>npm run dev</code> ou <code>yarn dev</code> para rodar.</p>

#### Observação
<p>O projeto necessita do backend, siga oos próximos passos para configurá-lo.</p>
<p>Após configurado porta do backend, adicione um arquivo .env e crie a varávél de ambiente VITE_HOST_URL com o valor da porta como mostrado no arquivo example.env</p>

## Rodando o backend

<p>utilize <code>cd ..</code> e <code>cd backend</code>, dentro da pasta utilize <code>npm install</code> ou <code>yarn</code> para instalar as dependências.</p>

### configurando backend

<p>Crie um arquivo .env utilizando o arquivo example.env como exemplo. Adicione sua senha do banco de dados na variável DATABASE_PASSWORD, e se necessário altere outras variáveis para se adequar ao seu ambiente. Importe o dump que se encontra em /backend/dump ao seu mysql, e por último inicie o projeto a partir do script <code>npm run start:dev</code> ou <code>yarn start:dev</code></p/>
