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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "User name is required")
	private String name;
	@NotBlank(message = "Username is required")
	@Column (unique = true)
	private String username;
	@NotBlank(message = "password is required")
	private String password;
	@Column(unique = true, updatable = false)
	private String userCode;
	private int role;
	@Column(updatable = false)
	private String teamCode;
	private Integer taskSequence = 0;
	
	//creating many to one relationship between user and team
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JoinColumn(name="team_id",updatable =false , nullable = false)
	@JsonIgnore
	private Team team;
	
	//creating one to many relationship between user and todo 
	@OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,mappedBy = "user")
	List<Todo> todos=new ArrayList<>();
	
	public User() {
		super();
	}
	
	public Integer getTaskSequence() {
		return taskSequence;
	}
	public void setTaskSequence(Integer taskSequence) {
		this.taskSequence = taskSequence;
	}
	public List<Todo> getTodos() {
		return todos;
	}
	public void setTodos(List<Todo> todos) {
		this.todos = todos;
	}
	public String getUserCode() {
		return userCode;
	}
	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
	public String getTeamCode() {
		return teamCode;
	}
	public void setTeamCode(String teamCode) {
		this.teamCode = teamCode;
	}
	public Team getTeam() {
		return team;
	}
	public void setTeam(Team team) {
		this.team = team;
	}
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public int getRole() {
		return role;
	}
	public void setRole(int role) {
		this.role = role;
	}
}
