# BookStore MVP - Product Requirements Document

## Project Overview

Build a simple online bookstore web application where users can browse books, add books to a cart, and place an order.

This project is intended as a beginner-friendly MVP and should prioritize simplicity, clean code, and fast deployment over advanced features.

---

## Goals

* Learn full-stack web development.
* Deploy a working application on Cloudflare.
* Create a portfolio-quality project.
* Keep scope small and manageable.

---

## Target Users

People who want to browse and purchase books online.

---

## Core Features

### Authentication

Users should be able to:

* Register with email and password
* Login with email and password
* Logout

Authentication can be simple and does not require social login.

---

### Landing Page

The landing page should:

* Display application branding
* Show a hero section
* Contain a call-to-action button
* Display featured books

---

### Catalog Page

Users should be able to:

* View all books
* Search books by title
* View basic book information

Book information:

* Cover Image
* Title
* Author
* Price

---

### Cart

Users should be able to:

* Add books to cart
* Remove books from cart
* View total amount

Cart state should persist during the session.

---

### Checkout

Users should be able to:

* View order summary
* Enter name
* Enter address
* Enter phone number
* Place order

No real payment integration is required.

After placing an order, show a success message.

---

## Data Models

### User

* id
* email
* password_hash

### Book

* id
* title
* author
* description
* price
* image_url

### Order

* id
* user_id
* customer_name
* address
* phone
* total_amount
* created_at

### Order Item

* id
* order_id
* book_id
* quantity

---

## Non-Goals

The following features are intentionally excluded:

* Online payments
* Reviews
* Ratings
* Wishlist
* Coupons
* Categories
* Admin dashboard
* Inventory management

---

## Success Criteria

A user can:

1. Register
2. Login
3. Browse books
4. Add books to cart
5. Checkout
6. Receive order confirmation

The application should be fully deployable on Cloudflare.
