package org.nearest.domain;

import java.io.Serializable;
import java.sql.Date;

public class Client implements Serializable{

   
  private static final long serialVersionUID = 1L;
  
  
    protected int no;
    protected String name;
    protected String phone;
    protected Date birth;
    protected String email;
    protected String id;
    protected String password;
    
    //Constructor
    public Client() {
     
    }
    public Client(int no) {
      super();
      this.no = no;
    }
   
    public int getNo() {
      return no;
    }
    public void setNo(int no) {
      this.no = no;
    }
    public String getName() {
      return name;
    }
    public void setName(String name) {
      this.name = name;
    }
    public String getPhone() {
      return phone;
    }
    public void setPhone(String phone) {
      this.phone = phone;
    }
    public Date getBirth() {
      return birth;
    }
    public void setBirth(Date birth) {
      this.birth = birth;
    }
    public String getEmail() {
      return email;
    }
    public void setEmail(String email) {
      this.email = email;
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
		return "Client [no=" + no + ", name=" + name + ", phone=" + phone + ", birth=" + birth + ", email=" + email
				+ ", id=" + id + ", password=" + password + "]";
	}
    
}
