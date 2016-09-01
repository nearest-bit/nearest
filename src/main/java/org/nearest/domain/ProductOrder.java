package org.nearest.domain;

import java.io.Serializable;

public class ProductOrder implements Serializable {

	private static final long serialVersionUID = 1L;
	
	// Field
	protected Order order;
	protected Product product;
	protected String orderName;
	protected int orderPrice;
	protected int orderDiscount;
	protected int entity;
	
	// Getter, Setter
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public int getEntity() {
		return entity;
	}
	public void setEntity(int entity) {
		this.entity = entity;
	}
	
	public String getOrderName() {
    return orderName;
  }
  public void setOrderName(String orderName) {
    this.orderName = orderName;
  }
  public int getOrderPrice() {
    return orderPrice;
  }
  public void setOrderPrice(int orderPrice) {
    this.orderPrice = orderPrice;
  }
  public int getOrderDiscount() {
    return orderDiscount;
  }
  public void setOrderDiscount(int orderDiscount) {
    this.orderDiscount = orderDiscount;
  }
  @Override
  public String toString() {
    return "ProductOrder [order=" + order + ", product=" + product + ", orderName=" + orderName + ", orderPrice="
        + orderPrice + ", orderDiscount=" + orderDiscount + ", entity=" + entity + "]";
  }
	
}
