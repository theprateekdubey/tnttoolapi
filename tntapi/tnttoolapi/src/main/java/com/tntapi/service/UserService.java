package com.tntapi.service;

import java.security.MessageDigest;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tntapi.domain.Team;
import com.tntapi.domain.User;
import com.tntapi.exception.PasswordException;
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
			if (!isValidPassword(user.getPassword())) {
				throw new PasswordException(
						"Password must be of minimum 8 character and maximam 20 character, it should contain atleast one upper case letter, lower case Letter & a number");
			}
			user.setPassword(encryptor(user.getPassword()));
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
		try { // find the user
			User user = findUserByUCode(team_id, user_id);
			Team team = teamRepository.findByTeamCode(team_id);
			// if role is changing from team lead to team member
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
			if (!isValidPassword(user.getPassword())) {
				throw new PasswordException(
						"Password must be of minimum 8 character and maximam 20 character, it should contain atleast one upper case letter, lower case Letter & a number");
			}
			// save user
			user.setPassword(encryptor(updateUser.getPassword()));
			return userRepository.save(user);
		} catch (Exception e) {
			throw new UsernameException("username already exisit");
		}
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
			throw new UserNotFoundException(
					"The username you entered doesn't belong to an account. Please check your username and try again.");
		}
		password = encryptor(password);
		if (!user.getPassword().equals(password)) {
			throw new UserNotFoundException("Sorry, your password was incorrect. Please double-check your password.");
		}
		return user;
	}

	public User updateCredentails(String username, String oldPassword, String newPassword) {
		User user = userRepository.findUserByUsername(username);
		if (user == null) {
			throw new UserNotFoundException("username does not exists");
		}
		oldPassword = encryptor(oldPassword);
		if (!user.getPassword().equals(oldPassword)) {
			throw new PasswordException("Your password did not match with the current password");
		}
		if (!isValidPassword(newPassword)) {
			throw new PasswordException(
					"Password must be of minimum 8 character and maximam 20 character, it should contain atleast one upper case letter, lower case Letter & a number");
		}
		user.setPassword(encryptor(newPassword));
		userRepository.save(user);
		return user;
	}

	public String encryptor(String password) {
		String algorithm = "SHA";
		StringBuilder encryptedPassword = new StringBuilder();
		try {
			MessageDigest md = MessageDigest.getInstance(algorithm);
			md.reset();
			md.update(password.getBytes());
			byte[] encodedPassword = md.digest();

			for (int i = 0; i < encodedPassword.length; i++) {
				if ((encodedPassword[i] & 0xff) < 0x10) {
					encryptedPassword.append("0");
				}
				encryptedPassword.append(Long.toString(encodedPassword[i] & 0xff, 16));
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return encryptedPassword.toString();
	}

	public static boolean isValidPassword(String password) {
		String regex = "^(?=.*[0-9])" + "(?=.*[a-z])(?=.*[A-Z])" + "(?=\\S+$).{8,20}$";

		// Compile the ReGex
		Pattern p = Pattern.compile(regex);

		// If the password is empty
		// return false
		if (password == null) {
			return false;
		}

		// Pattern class contains matcher() method
		// to find matching between given password
		// and regular expression.
		Matcher m = p.matcher(password);

		// Return if the password
		// matched the ReGex
		return m.matches();
	}
}