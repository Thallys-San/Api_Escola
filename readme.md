# API Controle de Estoque

API RESTful desenvolvida em Java com Spring Boot para gerenciamento de **produtos**, **usuários** e **saídas de estoque**.

## 🔧 Tecnologias Utilizadas

- Java 17  
- Spring Boot  
- Spring Data JPA  
- Maven  
- MySQL

## 📂 Funcionalidades

- Cadastro, listagem, atualização e remoção de **produtos**  
- Cadastro e autenticação de **usuários**  
- Registro de **saídas de produtos** do estoque  

## 🚀 Como Executar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/Thallys-San/API_ControleEstoque.git
   
2. Acesse o diretório do projeto:
   ```bash
   cd API_ControleEstoque
   
3. Configure o arquivo src/main/resources/application.properties com suas credenciais de banco de dados. Exemplo:
   ```bash
   spring.datasource.url=jdbc:mysql://localhost:3306/ControleEstoque
   spring.datasource.username=seu usuario
   spring.datasource.password=sua senha
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.format_sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

4. Execute o projeto com o Maven:
   ```bash
   ./mvnw spring-boot:run
   
5. em seguida execute no MySql o arquivo src/db/controleEstoque.sql ou se quiser manualmente:
   ```bash
   CREATE DATABASE ControleEstoque;
   USE ControleEstoque;

   CREATE TABLE usuario (
    idUsuario BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(250) NOT NULL,
    endereco VARCHAR(150) NOT NULL,
    setor VARCHAR(150) NOT NULL
   );

   CREATE TABLE produtos (
    idProduto BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(250) NOT NULL,
    quantidade INT NOT NULL,
    stats VARCHAR(80)
   );

   CREATE TABLE saida (
    idSaida BIGINT PRIMARY KEY AUTO_INCREMENT,
    dataSaida DATE NOT NULL,
    id_Usuario BIGINT,
    id_Produto BIGINT,
    quantidade_saida INT NOT NULL,
    FOREIGN KEY (id_Usuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (id_Produto) REFERENCES produtos(idProduto)
   );

- A aplicação estará disponível em: http://localhost:8080



