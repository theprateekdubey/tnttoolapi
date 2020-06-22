package com.tntapi.exception;

public class DueDateAndTimeExceptionResponse {

	private String dueDateAndTime;

	public DueDateAndTimeExceptionResponse(String dueDateAndTime) {
		super();
		this.setDueDateAndTime(dueDateAndTime);
	}

	public String getDueDateAndTime() {
		return dueDateAndTime;
	}

	public void setDueDateAndTime(String dueDateAndTime) {
		this.dueDateAndTime = dueDateAndTime;
	}

}
