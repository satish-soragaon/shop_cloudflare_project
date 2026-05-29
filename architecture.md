# BookStore MVP - Architecture Guide

## Purpose

This document defines the technical architecture for the BookStore application.

All generated code should follow these guidelines.

---

## Tech Stack

Frontend:

* React
* Vite
* TypeScript
* Tailwind CSS

Backend:

* Cloudflare Workers

Database:

* Cloudflare D1

Deployment:

* Cloudflare Pages

---

## Development Principles

* Keep code beginner-friendly.
* Avoid over-engineering.
* Prefer simple solutions.
* Write clean and readable code.
* Use TypeScript everywhere.
* Create reusable components.

---

## Folder Structure

src/

components/

* Navbar.tsx
* BookCard.tsx
* SearchBar.tsx

pages/

* Login.tsx
* Home.tsx
* Catalog.tsx
* Cart.tsx
* Checkout.tsx

services/

* api.ts

context/

* AuthContext.tsx
* CartContext.tsx

types/

* book.ts
* order.ts
* user.ts

---

## Routing

Routes:

/login
/
/catalog
/cart
/checkout

Use React Router.

---

## Authentication

Simple email/password authentication.

Store user session locally.

No OAuth.

---

## Database Tables

users
books
orders
order_items

---

## API Endpoints

POST /api/register

POST /api/login

GET /api/books

POST /api/orders

---

## State Management

Use React Context.

Do not use Redux.

---

## Styling

Use Tailwind CSS.

Avoid custom CSS unless necessary.

---

## Error Handling

Display user-friendly messages.

Never expose stack traces.

---

## Deployment

Frontend:
Cloudflare Pages

Backend:
Cloudflare Workers

Database:
Cloudflare D1

The application must be deployable using Cloudflare's free tier.

---

## AI Coding Instructions

When generating code:

* Generate complete files.
* Do not leave TODO comments.
* Do not use placeholder implementations.
* Use TypeScript.
* Keep functions small.
* Explain major changes before making them.
