package com.tntapi.exception;

public class TeamNotFoundExceptionResponse {
	
	private String teamCode;

	public TeamNotFoundExceptionResponse(String teamCode) {
		super();
		this.teamCode = teamCode;
	}

	public String getTeamCode() {
		return teamCode;
	}

	public void setTeamCode(String teamCode) {
		this.teamCode = teamCode;
	}

}
