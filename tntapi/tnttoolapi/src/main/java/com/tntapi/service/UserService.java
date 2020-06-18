package com.tntapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tntapi.domain.Team;
import com.tntapi.domain.User;
import com.tntapi.exception.TeamNotFoundException;
import com.tntapi.exception.UserNotFoundException;
import com.tntapi.exception.UsernameException;
import com.tntapi.repository.TeamRepository;
import com.tntapi.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TeamRepository teamRepository;

	public User addUser(String teamCode, User user) {

		try {
			// find team
			Team team = teamRepository.findByTeamCode(teamCode);
			// setting team to user
			user.setTeam(team);
			// setting team code to user
			user.setTeamCode(teamCode);
			// generating userCode with teamCode and userSequence
			Integer userSequence = team.getUserSequence();
			userSequence++;
			team.setUserSequence(userSequence);
			user.setUserCode(user.getTeamCode() + "-" + userSequence);
			 // setting user as team lead if role is specified as that
            if (user.getRole() == 2) {
                if (team.getTeamLead() == null) {
                    team.setTeamLead(user.getName());
                    team.setTeamLeadCode(user.getUserCode());
                } else {
                    String teamLeadCode = team.getTeamLeadCode();
                    User teamLead = findUserByUCode(teamCode, teamLeadCode);
                    teamLead.setRole(1);
                    team.setTeamLead(user.getName());
                    team.setTeamLeadCode(user.getUserCode());
                }
            }
			return userRepository.save(user);
		} catch (NullPointerException ex) {
			throw new TeamNotFoundException("Team Does not exist");
		} catch (Exception e) {
			throw new UsernameException("Username already exists");
		}
	}

	public User findUserByUCode(String teamCode, String userCode) {

		// finding team
		Team team = teamRepository.findByTeamCode(teamCode);
		// if not found
		if (team == null) {
			throw new TeamNotFoundException("Team with team code '" + teamCode + "' does not exist");
		}
		// finding user
		User user = userRepository.findUserByUserCode(userCode);
		// if user not found
		if (user == null) {
			throw new UserNotFoundException("User not found");
		}
		if (!user.getTeamCode().equals(teamCode)) {
			throw new UserNotFoundException(
					"user code '" + userCode + "' does not match with team code '" + teamCode + "'");
		}
		return user;
	}

	public List<User> findUserList(String teamCode) {
		// find team
		Team team = teamRepository.findByTeamCode(teamCode);
		// team not found
		if (team == null) {
			throw new TeamNotFoundException("Team with team code '" + teamCode + "' does not exist");
		}
		return userRepository.findByTeamCode(teamCode);

	}

	public User updateByUserCode(User updateUser, String team_id, String user_id) {
        // find the user
        User user = findUserByUCode(team_id, user_id);
        Team team = teamRepository.findByTeamCode(team_id);
        //if role is changing from team lead to team member
        if ((user.getRole() == 2) && (updateUser.getRole() == 1)) {
            team.setTeamLead(null);
            team.setTeamLeadCode(null);
        }
        // mapping new user to old user for updating
        user = updateUser;
        // setting team Lead in team if user role is assign as team lead (i.e. 2)
        if (updateUser.getRole() == 2) {
            if (team.getTeamLead() == null) {
                team.setTeamLead(user.getName());
                team.setTeamLeadCode(user.getUserCode());
            } else {
                String teamLeadCode = team.getTeamLeadCode();
                User teamLead = findUserByUCode(team_id, teamLeadCode);
                teamLead.setRole(1);
                team.setTeamLead(user.getName());
                team.setTeamLeadCode(user.getUserCode());
            }
        }
        // save user
        return userRepository.save(user);
    }
	
	public Iterable<User> listAllUsers() {
		return userRepository.findAll();
	}
	
	public void deleteUser(String team_id, String user_id) {

		// finding the user
		User user = findUserByUCode(team_id, user_id);

		// getting the team details from user
		Team team = user.getTeam();

		// Getting the list of users in the team
		List<User> users = team.getUsers();

		if (user.getRole() == 2) {
			team.setTeamLead(null);
			team.setTeamLeadCode(null);
		}

		// removing the user from the list of users
		users.remove(user);

		// saving the team
		teamRepository.save(team);

		// deleting the user from repository
		userRepository.delete(user);
	}

	public User userLoginCheck(String username, String password) {
		User user = userRepository.findUserByUsername(username);
		if (user == null) {
			throw new UserNotFoundException("Username does not exists");
		}
		if (!user.getPassword().equals(password)) {
			throw new UserNotFoundException("Wrong Password");
		}
		return user;
	}
}