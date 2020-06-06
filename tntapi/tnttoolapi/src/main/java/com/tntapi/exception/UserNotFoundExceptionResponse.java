package com.tntapi.exception;

public class UserNotFoundExceptionResponse {
	private String userCode;

	public UserNotFoundExceptionResponse(String userCode) {
		super();
		this.userCode = userCode;
	}

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
}
