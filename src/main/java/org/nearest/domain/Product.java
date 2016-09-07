package org.nearest.domain;

import java.io.Serializable;

public class Product implements Serializable {

	private static final long serialVersionUID = 1L;

	// Field
	protected int no;
	protected String name;
	protected int price;
	protected int entity;
	protected int discountRate;
	protected String majorCategory;
	protected String subCategory;
	protected String photo;
	protected Mart mart;
	
	// Getter, Setter
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
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getEntity() {
		return entity;
	}
	public void setEntity(int entity) {
		this.entity = entity;
	}
	public int getDiscountRate() {
		return discountRate;
	}
	public void setDiscountRate(int discountRate) {
		this.discountRate = discountRate;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public Mart getMart() {
		return mart;
	}
	public void setMart(Mart mart) {
		this.mart = mart;
	}
	public String getMajorCategory() {
		return majorCategory;
	}
	public void setMajorCategory(String majorCategory) {
		this.majorCategory = majorCategory;
	}
	public String getSubCategory() {
		return subCategory;
	}
	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}
	
	@Override
	public String toString() {
		return "Product [no=" + no + ", name=" + name + ", price=" + price + ", entity=" + entity + ", discountRate="
				+ discountRate + ", majorCategory=" + majorCategory + ", subCategory=" + subCategory + ", photo="
				+ photo + ", mart=" + mart + "]";
	}
	
	
}
