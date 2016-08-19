package org.nearest.domain;

import java.io.Serializable;

public class Cart implements Serializable {

	private static final long serialVersionUID = 1L;
	
	// Field
	protected int clientNo;
	protected int productNo;
	
	// Getter, Setter
	public int getClientNo() {
		return clientNo;
	}
	public void setClientNo(int clientNo) {
		this.clientNo = clientNo;
	}
	public int getProductNo() {
		return productNo;
	}
	public void setProductNo(int productNo) {
		this.productNo = productNo;
	}
	
	@Override
	public String toString() {
		return "Cart [client=" + clientNo + ", product=" + productNo + "]";
	}
		
}
