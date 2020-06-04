package com.tntapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tntapi.domain.User;

@Repository
public interface UserRepository extends  CrudRepository<User, Long> {

}
