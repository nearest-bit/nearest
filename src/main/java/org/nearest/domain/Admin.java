package org.nearest.domain;

import java.io.Serializable;

public class Admin implements Serializable {

	private static final long serialVersionUID = 1L;

	// Field
	protected int no;
	protected String phone;
	protected String name;
	protected String id;
	protected String password;

	//Getter, Setter

	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	@Override
  public String toString() {
    return "Admin [no=" + no + ", phone=" + phone + ", name=" + name + ", id=" + id + ", password=" + password + "]";
  }
 	
}
