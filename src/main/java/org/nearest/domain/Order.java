package org.nearest.domain;

import java.io.Serializable;
import java.sql.Date;

public class Order implements Serializable {

	private static final long serialVersionUID = 1L;

	// Field
	protected int no;
	protected Date orderDate;
	protected int orderState;
	protected String orderRequestDate;
	protected Mart mart;
	protected Client client;
	
	// Getter, Setter

  public int getNo() {
		return no;
	}
  public void setNo(int no) {
		this.no = no;
	}
	public Date getOrderDate() {
		return orderDate;
	}
	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}
	public int getOrderState() {
		return orderState;
	}
	public void setOrderState(int orderState) {
		this.orderState = orderState;
	}
	public Mart getMart() {
		return mart;
	}
	public void setMart(Mart mart) {
		this.mart = mart;
	}
	public Client getClient() {
		return client;
	}
	public void setClient(Client client) {
		this.client = client;
	}	
	public String getOrderRequestDate() {
		return orderRequestDate;
	}
	public void setOrderRequestDate(String orderRequestDate) {
		this.orderRequestDate = orderRequestDate;
	}
	
	@Override
  public String toString() {
    return "Order [no=" + no + ", orderDate=" + orderDate + ", orderState=" + orderState + ", mart=" + mart
        + ", client=" + client + "]";
  }
	
}
