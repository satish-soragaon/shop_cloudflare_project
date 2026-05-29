# BookStore MVP - UI/UX Design Guide

## Design Philosophy

Keep the application:

* Clean
* Minimal
* Beginner-friendly
* Mobile responsive
* Easy to navigate

Avoid unnecessary animations and complex layouts.

---

## Color Palette

Primary:

* #2563EB

Background:

* #FFFFFF

Text:

* #111827

Secondary Text:

* #6B7280

Border:

* #E5E7EB

Success:

* #16A34A

---

## Typography

Font Family:

* Inter

Font Weights:

* 400 Regular
* 500 Medium
* 600 SemiBold
* 700 Bold

---

## Layout Rules

### Container Width

Desktop:

* Max Width: 1200px

Mobile:

* Full width with padding

---

## Navigation Bar

Height:

* 64px

Items:

* Logo
* Catalog
* Cart
* Logout

Navbar should remain visible at the top.

---

## Login Page

Layout:

* Centered card

Components:

* Logo
* Welcome Text
* Email Input
* Password Input
* Login Button
* Register Link

Card Width:

* 400px maximum

---

## Landing Page

### Hero Section

Content:

Heading:
"Discover Your Next Favorite Book"

Subheading:
"Browse and purchase books from our collection."

Button:
"Browse Books"

---

### Featured Books

Display:

* Grid Layout
* 4 books maximum

Card Components:

* Book Cover
* Title
* Author
* Price

---

## Catalog Page

Layout:

* Search Bar
* Book Grid

Grid:

* 4 columns desktop
* 2 columns tablet
* 1 column mobile

Book Card:

Top:

* Cover Image

Middle:

* Title
* Author

Bottom:

* Price
* Add to Cart Button

---

## Cart Page

Display:

For each item:

* Cover
* Title
* Price
* Quantity
* Remove Button

Bottom Section:

* Total Price
* Checkout Button

---

## Checkout Page

Form Fields:

* Full Name
* Address
* Phone Number

Order Summary:

* Selected Books
* Quantities
* Total Amount

Primary Button:
"Place Order"

---

## Empty States

Cart Empty:

"Your cart is empty."

Button:
"Browse Books"

---

## Responsive Design

Mobile First Design

Breakpoints:

Mobile:

* < 640px

Tablet:

* 640px – 1024px

Desktop:

* > 1024px

---

## Technical UI Recommendations

Frontend:

* React
* Vite
* Tailwind CSS

Icons:

* Lucide React

State Management:

* React Context

Forms:

* React Hook Form

Notifications:

* Sonner

Focus on simplicity and consistency rather than feature richness.
