package com.tntapi.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
public class Team {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@NotBlank(message = "Team name is required")
	private String name;
	private String projectName;
	private Integer userSequence =0;
	@NotBlank(message = "Team Code is Required")
	@Size(min = 3,max = 5,message = "It should be between 3 to 5 characters")
	@Column(updatable = false,unique = true)
	private String teamCode;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL,mappedBy = "team")
	private List<User> users = new ArrayList<>();
	
	public Team() {
		super();
	}
	
	public Integer getUserSequence() {
		return userSequence;
	}
	public void setUserSequence(Integer userSequence) {
		this.userSequence = userSequence;
	}
	public List<User> getUsers() {
		return users;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getTeamCode() {
		return teamCode;
	}
	public void setTeamCode(String teamCode) {
		this.teamCode = teamCode;
	}
	
}