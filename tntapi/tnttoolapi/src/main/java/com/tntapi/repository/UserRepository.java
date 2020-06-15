package com.tntapi.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tntapi.domain.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

	// used to find user by userCode
	User findUserByUserCode(String userCode);

	// used to find the list of users from a team
	List<User> findByTeamCode(String team_id);

	User findUserByUsername(String username);
}
