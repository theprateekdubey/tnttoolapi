package com.tntapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tntapi.domain.Team;
import com.tntapi.exception.TeamIdException;
import com.tntapi.exception.TeamNotFoundException;
import com.tntapi.repository.TeamRepository;

@Service
public class TeamService {

	@Autowired
	TeamRepository teamRepository;

	public Team saveOrUpdate(Team team) {
		try {
			team.setTeamCode(team.getTeamCode().toUpperCase());
			return teamRepository.save(team);
		} catch (Exception e) {
			throw new TeamIdException("Team Id already Exists");
		}
	}

	public Team findTeam(String teamCode) {
		Team team = teamRepository.findByTeamCode(teamCode);
		if (team == null) {
			throw new TeamNotFoundException("team does not exist");
		}
		return team;

	}

	public Iterable<Team> listAllTeams() {
		return teamRepository.findAll();
	}

	public void deleteTeam(String teamCode) {
		// getting the team form team code
		Team team = teamRepository.findByTeamCode(teamCode);
		if (team == null) {
			throw new TeamNotFoundException("team does not exist");
		}
		// deleting the team from repository
		teamRepository.delete(team);
	}

}
