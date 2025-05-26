package com.ControleEstoque.ControleEstoque.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ControleEstoque.ControleEstoque.model.Aluno;

@Repository
public interface alunoRepository extends JpaRepository<Aluno, Long> {

}
