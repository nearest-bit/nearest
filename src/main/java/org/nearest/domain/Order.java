package org.nearest.domain;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

public class Order implements Serializable {

	private static final long serialVersionUID = 1L;

	// Field
	protected int no;
	protected Date orderDate;
	protected int orderState;
	protected Mart mart;
	protected Client client;
	protected List<Mart> martList;
  protected List<Client> clientList;
  protected List<Product> product;
	
	// Getter, Setter
  
	public List<Product> getProduct() {
    return product;
  }
  public void setProduct(List<Product> product) {
    this.product = product;
  }
  public int getNo() {
		return no;
	}
	public List<Mart> getMartList() {
    return martList;
  }
  public void setMartList(List<Mart> martList) {
    this.martList = martList;
  }
  public List<Client> getClientList() {
    return clientList;
  }
  public void setClientList(List<Client> clientList) {
    this.clientList = clientList;
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
	
	@Override
  public String toString() {
    return "Order [no=" + no + ", orderDate=" + orderDate + ", orderState=" + orderState + ", mart=" + mart
        + ", client=" + client + ", martList=" + martList + ", clientList=" + clientList + ", product=" + product + "]";
  }
	
}
