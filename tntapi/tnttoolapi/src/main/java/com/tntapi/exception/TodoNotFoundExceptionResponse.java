package com.tntapi.exception;

public class TodoNotFoundExceptionResponse {

	private String taskIdentifier;

	public TodoNotFoundExceptionResponse(String taskIdentifier) {
		super();
		this.taskIdentifier = taskIdentifier;
	}

	public String getTaskIdentifier() {
		return taskIdentifier;
	}

	public void setTaskIdentifier(String taskIdentifier) {
		this.taskIdentifier = taskIdentifier;
	}

}
