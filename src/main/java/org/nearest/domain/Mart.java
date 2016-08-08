package org.nearest.domain;

import java.io.Serializable;

public class Mart implements Serializable {

	private static final long serialVersionUID = 1L;
	
	//Field
	protected int no;
	protected String name;
	protected String addr;
	protected String addrDetail;
	protected String postNo;
	protected String telNo;
	protected String latitude;
	protected String logitude;
	protected Admin admin;
	
	
	//getter, setter
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
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getAddrDetail() {
		return addrDetail;
	}
	public void setAddrDetail(String addrDetail) {
		this.addrDetail = addrDetail;
	}
	public String getPostNo() {
		return postNo;
	}
	public void setPostNo(String postNo) {
		this.postNo = postNo;
	}
	public String getTelNo() {
		return telNo;
	}
	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLogitude() {
		return logitude;
	}
	public void setLogitude(String logitude) {
		this.logitude = logitude;
	}
	public Admin getAdmin() {
		return admin;
	}
	public void setAdmin(Admin admin) {
		this.admin = admin;
	}
	
}
